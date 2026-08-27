import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { AppState, AppStateStatus, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Language, translations, TranslationKey } from '../i18n/translations';

export type Theme = 'dark' | 'light';
export type NoiseType = 'off' | 'rain' | 'night' | 'purr';
export type TimerPhase = 'idle' | 'focus' | 'break' | 'longBreak' | 'done';

interface Settings {
  focusDuration: number;
  breakDuration: number;
  longBreakDuration: number;
  theme: Theme;
  language: Language;
  noise: NoiseType;
  hasSeenFirstRun: boolean;
}

interface Session {
  date: string;
  durationMs: number;
}

interface TimerState {
  phase: TimerPhase;
  durationMs: number;
  startedAt: number | null;
  pausedAt: number | null;
  completedSessions: number;
}

interface PersistedTimerState {
  phase: TimerPhase;
  durationMs: number;
  startedAt: number | null;
  pausedAt: number | null;
  completedSessions: number;
}

interface AppContextType {
  settings: Settings;
  timerState: TimerState;
  sessions: Session[];
  remainingMs: number;
  isRunning: boolean;
  pendingChime: boolean;
  
  updateSettings: (partial: Partial<Settings>) => void;
  t: (key: TranslationKey) => string;
  
  startTimer: () => void;
  pauseTimer: () => void;
  skipBreak: () => void;
  resetTimer: () => void;
  acknowledgeComplete: () => void;
  clearPendingChime: () => void;
  
  getSessionsForDate: (date: string) => { count: number; totalMs: number };
  getTotalStats: () => { days: number; totalMs: number };
}

const defaultSettings: Settings = {
  focusDuration: 25,
  breakDuration: 5,
  longBreakDuration: 15,
  theme: 'dark',
  language: 'en',
  noise: 'off',
  hasSeenFirstRun: false,
};

const getLocalDateString = (date: Date = new Date()): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [timerState, setTimerState] = useState<TimerState>({
    phase: 'idle',
    durationMs: 25 * 60 * 1000,
    startedAt: null,
    pausedAt: null,
    completedSessions: 0,
  });
  const [sessions, setSessions] = useState<Session[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [tick, setTick] = useState(0);
  const [pendingChime, setPendingChime] = useState(false);
  
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const settingsRef = useRef(settings);
  const isBackgroundedRef = useRef<boolean>(false);
  settingsRef.current = settings;

  const markForeground = useCallback(() => {
    isBackgroundedRef.current = false;
  }, []);

  const markBackground = useCallback(() => {
    isBackgroundedRef.current = true;
  }, []);

  const computeRemaining = useCallback((state: TimerState): number => {
    if (state.phase === 'idle' || state.phase === 'done') {
      return state.durationMs;
    }
    if (state.pausedAt !== null && state.startedAt !== null) {
      const elapsed = state.pausedAt - state.startedAt;
      return Math.max(0, state.durationMs - elapsed);
    }
    if (state.startedAt !== null) {
      const elapsed = Date.now() - state.startedAt;
      return Math.max(0, state.durationMs - elapsed);
    }
    return state.durationMs;
  }, []);

  const isRunning = timerState.startedAt !== null && timerState.pausedAt === null && 
                    timerState.phase !== 'idle' && timerState.phase !== 'done';
  const remainingMs = computeRemaining(timerState);

  const recordFocusCompletion = useCallback((durationMs: number) => {
    const localDate = getLocalDateString();
    setSessions(prev => [...prev, { date: localDate, durationMs }]);
  }, []);

  const transitionToBreak = useCallback((completedSessions: number, s: Settings): TimerState => {
    const isLongBreak = completedSessions % 4 === 0 && completedSessions > 0;
    const nextPhase = isLongBreak ? 'longBreak' : 'break';
    const duration = isLongBreak ? s.longBreakDuration * 60 * 1000 : s.breakDuration * 60 * 1000;
    
    return {
      phase: nextPhase,
      durationMs: duration,
      startedAt: Date.now(),
      pausedAt: null,
      completedSessions,
    };
  }, []);

  const handleFocusComplete = useCallback((prev: TimerState, s: Settings, forceBreak: boolean): TimerState => {
    const newCompletedSessions = prev.completedSessions + 1;
    recordFocusCompletion(prev.durationMs);
    
    if (forceBreak || isBackgroundedRef.current) {
      setPendingChime(true);
      return transitionToBreak(newCompletedSessions, s);
    }
    
    setPendingChime(true);
    return {
      ...prev,
      phase: 'done',
      startedAt: null,
      pausedAt: null,
      completedSessions: newCompletedSessions,
    };
  }, [recordFocusCompletion, transitionToBreak]);

  const handleTimerComplete = useCallback((prev: TimerState, s: Settings): TimerState => {
    if (prev.phase === 'focus') {
      return handleFocusComplete(prev, s, false);
    }
    
    return {
      phase: 'idle',
      durationMs: s.focusDuration * 60 * 1000,
      startedAt: null,
      pausedAt: null,
      completedSessions: prev.completedSessions,
    };
  }, [handleFocusComplete]);

  const checkAndHandleCompletion = useCallback((state: TimerState, s: Settings): TimerState | null => {
    if (state.phase === 'idle' || state.phase === 'done') return null;
    if (state.startedAt === null) return null;
    
    const now = Date.now();
    const elapsed = state.pausedAt !== null ? state.pausedAt - state.startedAt : now - state.startedAt;
    const remaining = state.durationMs - elapsed;
    
    if (remaining <= 0) {
      if (state.phase === 'focus') {
        const newCompletedSessions = state.completedSessions + 1;
        recordFocusCompletion(state.durationMs);
        setPendingChime(true);
        return transitionToBreak(newCompletedSessions, s);
      } else {
        return {
          phase: 'idle',
          durationMs: s.focusDuration * 60 * 1000,
          startedAt: null,
          pausedAt: null,
          completedSessions: state.completedSessions,
        };
      }
    }
    return null;
  }, [recordFocusCompletion, transitionToBreak]);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (nextAppState === 'active') {
        markForeground();
        setTimerState(prev => {
          const newState = checkAndHandleCompletion(prev, settingsRef.current);
          return newState || prev;
        });
      } else {
        markBackground();
      }
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);
    
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      const handleVisible = () => {
        markForeground();
        setTimerState(prev => {
          const newState = checkAndHandleCompletion(prev, settingsRef.current);
          return newState || prev;
        });
      };
      
      const handleHidden = () => {
        markBackground();
      };
      
      const handleVisibilityChange = () => {
        if (document.visibilityState === 'visible') {
          handleVisible();
        } else {
          handleHidden();
        }
      };
      
      const handleFocus = () => {
        markForeground();
      };
      
      const handleBlur = () => {
        markBackground();
      };
      
      const handlePageHide = () => {
        markBackground();
      };
      
      const handleFreeze = () => {
        markBackground();
      };
      
      document.addEventListener('visibilitychange', handleVisibilityChange);
      window.addEventListener('focus', handleFocus);
      window.addEventListener('blur', handleBlur);
      window.addEventListener('pagehide', handlePageHide);
      
      if ('onfreeze' in document) {
        (document as any).addEventListener('freeze', handleFreeze);
      }
      
      return () => {
        subscription.remove();
        document.removeEventListener('visibilitychange', handleVisibilityChange);
        window.removeEventListener('focus', handleFocus);
        window.removeEventListener('blur', handleBlur);
        window.removeEventListener('pagehide', handlePageHide);
        if ('onfreeze' in document) {
          (document as any).removeEventListener('freeze', handleFreeze);
        }
      };
    }
    
    return () => subscription.remove();
  }, [checkAndHandleCompletion, markForeground, markBackground]);

  useEffect(() => {
    if (isLoaded) {
      saveSettings();
    }
  }, [settings, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      saveSessions();
    }
  }, [sessions, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      saveTimerState();
    }
  }, [timerState, isLoaded]);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTick(t => t + 1);
        
        setTimerState(prev => {
          if (prev.startedAt === null || prev.pausedAt !== null) return prev;
          
          const elapsed = Date.now() - prev.startedAt;
          const remaining = prev.durationMs - elapsed;
          
          if (remaining <= 0) {
            if (intervalRef.current) {
              clearInterval(intervalRef.current);
              intervalRef.current = null;
            }
            return handleTimerComplete(prev, settingsRef.current);
          }
          
          return prev;
        });
      }, 100);
    }
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isRunning, handleTimerComplete]);

  const loadData = async () => {
    try {
      const [settingsStr, sessionsStr, timerStr] = await Promise.all([
        AsyncStorage.getItem('nox_settings'),
        AsyncStorage.getItem('nox_sessions'),
        AsyncStorage.getItem('nox_timer'),
      ]);
      
      let loadedSettings = defaultSettings;
      if (settingsStr) {
        loadedSettings = { ...defaultSettings, ...JSON.parse(settingsStr) };
        setSettings(loadedSettings);
      }
      
      if (sessionsStr) {
        const parsed = JSON.parse(sessionsStr);
        if (Array.isArray(parsed)) {
          const migrated = parsed.map((s: any) => {
            if (typeof s.count === 'number' && s.durationMs === undefined) {
              return { date: s.date, durationMs: s.count * 25 * 60 * 1000 };
            }
            return s;
          });
          setSessions(migrated);
        }
      }
      
      if (timerStr) {
        const savedTimer: PersistedTimerState = JSON.parse(timerStr);
        const newState = checkAndHandleCompletion(savedTimer, loadedSettings);
        if (newState) {
          setTimerState(newState);
        } else {
          setTimerState(savedTimer);
        }
      } else {
        setTimerState({
          phase: 'idle',
          durationMs: loadedSettings.focusDuration * 60 * 1000,
          startedAt: null,
          pausedAt: null,
          completedSessions: 0,
        });
      }
    } catch (e) {
      console.error('Failed to load data:', e);
    } finally {
      setIsLoaded(true);
    }
  };

  const saveSettings = async () => {
    try {
      await AsyncStorage.setItem('nox_settings', JSON.stringify(settings));
    } catch (e) {
      console.error('Failed to save settings:', e);
    }
  };

  const saveSessions = async () => {
    try {
      await AsyncStorage.setItem('nox_sessions', JSON.stringify(sessions));
    } catch (e) {
      console.error('Failed to save sessions:', e);
    }
  };

  const saveTimerState = async () => {
    try {
      await AsyncStorage.setItem('nox_timer', JSON.stringify(timerState));
    } catch (e) {
      console.error('Failed to save timer state:', e);
    }
  };

  const updateSettings = useCallback((partial: Partial<Settings>) => {
    setSettings(prev => {
      const updated = { ...prev, ...partial };
      
      if (partial.focusDuration !== undefined) {
        setTimerState(ts => {
          if (ts.phase === 'idle') {
            return { ...ts, durationMs: partial.focusDuration! * 60 * 1000 };
          }
          return ts;
        });
      }
      
      return updated;
    });
  }, []);

  const t = useCallback((key: TranslationKey): string => {
    return translations[settings.language][key] || key;
  }, [settings.language]);

  const startTimer = useCallback(() => {
    setTimerState(prev => {
      if (prev.phase === 'idle' || prev.phase === 'done') {
        return {
          phase: 'focus',
          durationMs: settingsRef.current.focusDuration * 60 * 1000,
          startedAt: Date.now(),
          pausedAt: null,
          completedSessions: prev.completedSessions,
        };
      }
      
      if (prev.pausedAt !== null && prev.startedAt !== null) {
        const pauseDuration = Date.now() - prev.pausedAt;
        return {
          ...prev,
          startedAt: prev.startedAt + pauseDuration,
          pausedAt: null,
        };
      }
      
      return prev;
    });
  }, []);

  const pauseTimer = useCallback(() => {
    setTimerState(prev => ({
      ...prev,
      pausedAt: Date.now(),
    }));
  }, []);

  const skipBreak = useCallback(() => {
    setTimerState(prev => {
      if (prev.phase === 'break' || prev.phase === 'longBreak') {
        return {
          phase: 'idle',
          durationMs: settingsRef.current.focusDuration * 60 * 1000,
          startedAt: null,
          pausedAt: null,
          completedSessions: prev.completedSessions,
        };
      }
      return prev;
    });
  }, []);

  const resetTimer = useCallback(() => {
    setTimerState({
      phase: 'idle',
      durationMs: settingsRef.current.focusDuration * 60 * 1000,
      startedAt: null,
      pausedAt: null,
      completedSessions: 0,
    });
  }, []);

  const acknowledgeComplete = useCallback(() => {
    setTimerState(prev => transitionToBreak(prev.completedSessions, settingsRef.current));
  }, [transitionToBreak]);

  const clearPendingChime = useCallback(() => {
    setPendingChime(false);
  }, []);

  const getSessionsForDate = useCallback((date: string): { count: number; totalMs: number } => {
    const matching = sessions.filter(s => s.date === date);
    return {
      count: matching.length,
      totalMs: matching.reduce((sum, s) => sum + s.durationMs, 0),
    };
  }, [sessions]);

  const getTotalStats = useCallback((): { days: number; totalMs: number } => {
    const uniqueDates = new Set(sessions.map(s => s.date));
    const totalMs = sessions.reduce((sum, s) => sum + s.durationMs, 0);
    return { days: uniqueDates.size, totalMs };
  }, [sessions]);

  if (!isLoaded) {
    return null;
  }

  return (
    <AppContext.Provider
      value={{
        settings,
        timerState,
        sessions,
        remainingMs,
        isRunning,
        pendingChime,
        updateSettings,
        t,
        startTimer,
        pauseTimer,
        skipBreak,
        resetTimer,
        acknowledgeComplete,
        clearPendingChime,
        getSessionsForDate,
        getTotalStats,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export { getLocalDateString };

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
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
  count: number;
}

interface TimerState {
  phase: TimerPhase;
  remainingMs: number;
  isRunning: boolean;
  completedSessions: number;
  startTime: number | null;
  pausedAt: number | null;
}

interface AppContextType {
  settings: Settings;
  timerState: TimerState;
  sessions: Session[];
  
  updateSettings: (partial: Partial<Settings>) => void;
  t: (key: TranslationKey) => string;
  
  startTimer: () => void;
  pauseTimer: () => void;
  skipBreak: () => void;
  resetTimer: () => void;
  acknowledgeComplete: () => void;
  
  getSessionsForDate: (date: string) => number;
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

const defaultTimerState: TimerState = {
  phase: 'idle',
  remainingMs: 25 * 60 * 1000,
  isRunning: false,
  completedSessions: 0,
  startTime: null,
  pausedAt: null,
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [timerState, setTimerState] = useState<TimerState>(defaultTimerState);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    loadData();
  }, []);

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
    if (timerState.isRunning && timerState.startTime) {
      intervalRef.current = setInterval(() => {
        setTimerState(prev => {
          if (!prev.isRunning || !prev.startTime) return prev;
          
          const elapsed = Date.now() - prev.startTime;
          const durationMs = getDurationMs(prev.phase, settings);
          const remaining = Math.max(0, durationMs - elapsed);
          
          if (remaining === 0) {
            if (intervalRef.current) {
              clearInterval(intervalRef.current);
              intervalRef.current = null;
            }
            return handleTimerComplete(prev);
          }
          
          return { ...prev, remainingMs: remaining };
        });
      }, 100);
    }
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [timerState.isRunning, timerState.startTime, settings]);

  const getDurationMs = (phase: TimerPhase, s: Settings): number => {
    switch (phase) {
      case 'focus':
        return s.focusDuration * 60 * 1000;
      case 'break':
        return s.breakDuration * 60 * 1000;
      case 'longBreak':
        return s.longBreakDuration * 60 * 1000;
      default:
        return s.focusDuration * 60 * 1000;
    }
  };

  const handleTimerComplete = (prev: TimerState): TimerState => {
    if (prev.phase === 'focus') {
      const newCompletedSessions = prev.completedSessions + 1;
      const today = new Date().toISOString().split('T')[0];
      
      setSessions(currentSessions => {
        const existing = currentSessions.find(s => s.date === today);
        if (existing) {
          return currentSessions.map(s => 
            s.date === today ? { ...s, count: s.count + 1 } : s
          );
        }
        return [...currentSessions, { date: today, count: 1 }];
      });
      
      return {
        ...prev,
        phase: 'done',
        remainingMs: 0,
        isRunning: false,
        completedSessions: newCompletedSessions,
        startTime: null,
      };
    }
    
    return {
      ...prev,
      phase: 'idle',
      remainingMs: settings.focusDuration * 60 * 1000,
      isRunning: false,
      completedSessions: prev.completedSessions,
      startTime: null,
    };
  };

  const loadData = async () => {
    try {
      const [settingsStr, sessionsStr] = await Promise.all([
        AsyncStorage.getItem('nox_settings'),
        AsyncStorage.getItem('nox_sessions'),
      ]);
      
      if (settingsStr) {
        const loaded = JSON.parse(settingsStr);
        setSettings({ ...defaultSettings, ...loaded });
        setTimerState(prev => ({
          ...prev,
          remainingMs: (loaded.focusDuration || 25) * 60 * 1000,
        }));
      }
      
      if (sessionsStr) {
        setSessions(JSON.parse(sessionsStr));
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

  const updateSettings = useCallback((partial: Partial<Settings>) => {
    setSettings(prev => {
      const updated = { ...prev, ...partial };
      
      if (partial.focusDuration !== undefined && timerState.phase === 'idle') {
        setTimerState(ts => ({
          ...ts,
          remainingMs: partial.focusDuration! * 60 * 1000,
        }));
      }
      
      return updated;
    });
  }, [timerState.phase]);

  const t = useCallback((key: TranslationKey): string => {
    return translations[settings.language][key] || key;
  }, [settings.language]);

  const startTimer = useCallback(() => {
    setTimerState(prev => {
      if (prev.phase === 'idle' || prev.phase === 'done') {
        return {
          ...prev,
          phase: 'focus',
          remainingMs: settings.focusDuration * 60 * 1000,
          isRunning: true,
          startTime: Date.now(),
          pausedAt: null,
        };
      }
      
      if (prev.pausedAt !== null) {
        const pauseDuration = prev.pausedAt ? Date.now() - prev.pausedAt : 0;
        return {
          ...prev,
          isRunning: true,
          startTime: (prev.startTime || 0) + pauseDuration,
          pausedAt: null,
        };
      }
      
      return {
        ...prev,
        isRunning: true,
        startTime: Date.now(),
        pausedAt: null,
      };
    });
  }, [settings.focusDuration]);

  const pauseTimer = useCallback(() => {
    setTimerState(prev => ({
      ...prev,
      isRunning: false,
      pausedAt: Date.now(),
    }));
  }, []);

  const skipBreak = useCallback(() => {
    setTimerState(prev => {
      if (prev.phase === 'break' || prev.phase === 'longBreak') {
        return {
          ...prev,
          phase: 'idle',
          remainingMs: settings.focusDuration * 60 * 1000,
          isRunning: false,
          startTime: null,
          pausedAt: null,
        };
      }
      return prev;
    });
  }, [settings.focusDuration]);

  const resetTimer = useCallback(() => {
    setTimerState({
      phase: 'idle',
      remainingMs: settings.focusDuration * 60 * 1000,
      isRunning: false,
      completedSessions: 0,
      startTime: null,
      pausedAt: null,
    });
  }, [settings.focusDuration]);

  const acknowledgeComplete = useCallback(() => {
    setTimerState(prev => {
      const isLongBreak = prev.completedSessions % 4 === 0 && prev.completedSessions > 0;
      const nextPhase = isLongBreak ? 'longBreak' : 'break';
      const duration = isLongBreak ? settings.longBreakDuration : settings.breakDuration;
      
      return {
        ...prev,
        phase: nextPhase,
        remainingMs: duration * 60 * 1000,
        isRunning: true,
        startTime: Date.now(),
        pausedAt: null,
      };
    });
  }, [settings.breakDuration, settings.longBreakDuration]);

  const getSessionsForDate = useCallback((date: string): number => {
    const session = sessions.find(s => s.date === date);
    return session?.count || 0;
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
        updateSettings,
        t,
        startTimer,
        pauseTimer,
        skipBreak,
        resetTimer,
        acknowledgeComplete,
        getSessionsForDate,
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

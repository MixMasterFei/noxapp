import { useState, useEffect, useCallback } from 'react';
import { AppState, AppStateStatus } from 'react-native';

export type ThemeSetting = 'auto' | 'dark' | 'light';
export type ResolvedTheme = 'dark' | 'light';

const DAY_START_HOUR = 7;
const DAY_END_HOUR = 19;

const getThemeForTime = (): ResolvedTheme => {
  const hour = new Date().getHours();
  return hour >= DAY_START_HOUR && hour < DAY_END_HOUR ? 'light' : 'dark';
};

export const useResolvedTheme = (themeSetting: ThemeSetting): ResolvedTheme => {
  const resolveTheme = useCallback((): ResolvedTheme => {
    if (themeSetting === 'auto') {
      return getThemeForTime();
    }
    return themeSetting;
  }, [themeSetting]);

  const [resolved, setResolved] = useState<ResolvedTheme>(resolveTheme);

  useEffect(() => {
    setResolved(resolveTheme());
  }, [themeSetting, resolveTheme]);

  useEffect(() => {
    if (themeSetting !== 'auto') return;

    const checkTheme = () => {
      const newTheme = getThemeForTime();
      setResolved(prev => prev !== newTheme ? newTheme : prev);
    };

    const interval = setInterval(checkTheme, 60000);

    const handleAppState = (state: AppStateStatus) => {
      if (state === 'active') {
        checkTheme();
      }
    };

    const subscription = AppState.addEventListener('change', handleAppState);

    return () => {
      clearInterval(interval);
      subscription.remove();
    };
  }, [themeSetting]);

  return resolved;
};

export const resolveThemeSync = (themeSetting: ThemeSetting): ResolvedTheme => {
  if (themeSetting === 'auto') {
    return getThemeForTime();
  }
  return themeSetting;
};

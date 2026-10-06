import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Audio } from 'expo-av';
import { AppProvider, useApp } from './src/context/AppContext';
import { AppNavigator } from './src/navigation/AppNavigator';
import { useResolvedTheme } from './src/utils/useResolvedTheme';

const AppContent: React.FC = () => {
  const { settings } = useApp();
  const resolvedTheme = useResolvedTheme(settings.theme);
  
  useEffect(() => {
    Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      staysActiveInBackground: true,
    }).catch(() => {});
  }, []);
  
  return (
    <>
      <StatusBar style={resolvedTheme === 'dark' ? 'light' : 'dark'} />
      <AppNavigator />
    </>
  );
};

export default function App() {
  return (
    <SafeAreaProvider>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </SafeAreaProvider>
  );
}

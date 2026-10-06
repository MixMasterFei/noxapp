import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useApp } from '../context/AppContext';
import { themes } from '../utils/theme';
import { useResolvedTheme } from '../utils/useResolvedTheme';
import { IdleCat } from '../components/cats';

const { width } = Dimensions.get('window');

export const FirstRunScreen: React.FC = () => {
  const { settings, updateSettings, t } = useApp();
  const resolvedTheme = useResolvedTheme(settings.theme);
  const theme = themes[resolvedTheme];

  const handleTapCat = () => {
    updateSettings({ hasSeenFirstRun: true });
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.content}>
        {/* Tap the cat to continue */}
        <TouchableOpacity 
          style={styles.catContainer} 
          onPress={handleTapCat}
          activeOpacity={0.8}
        >
          <IdleCat width={width * 0.6} height={width * 0.72} />
        </TouchableOpacity>

        {/* Title - only "Stay. Focus." / "Reste. Concentre-toi." */}
        <View style={styles.titleContainer}>
          <Text style={[styles.title, { color: theme.text }]}>
            {t('firstRunTitle')}
          </Text>
          <Text style={[styles.subtitle, { color: theme.accent }]}>
            {t('firstRunSubtitle')}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 80,
    paddingHorizontal: 40,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  catContainer: {
    marginBottom: 56,
  },
  titleContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: '200',
    letterSpacing: 3,
  },
  subtitle: {
    fontSize: 36,
    fontWeight: '600',
    letterSpacing: 3,
    marginTop: -2,
  },
});

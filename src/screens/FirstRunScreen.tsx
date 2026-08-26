import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useApp } from '../context/AppContext';
import { themes } from '../utils/theme';
import { IdleCat } from '../components/cats';

const { width } = Dimensions.get('window');

export const FirstRunScreen: React.FC = () => {
  const { settings, updateSettings, t } = useApp();
  const theme = themes[settings.theme];

  const handleGetStarted = () => {
    updateSettings({ hasSeenFirstRun: true });
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.content}>
        {/* Cat illustration */}
        <View style={styles.catContainer}>
          <IdleCat width={width * 0.6} height={width * 0.72} />
        </View>

        {/* Title */}
        <View style={styles.titleContainer}>
          <Text style={[styles.title, { color: theme.text }]}>
            {t('firstRunTitle')}
          </Text>
          <Text style={[styles.subtitle, { color: theme.accent }]}>
            {t('firstRunSubtitle')}
          </Text>
        </View>
      </View>

      {/* Get Started button */}
      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.accent }]}
        onPress={handleGetStarted}
      >
        <Text style={styles.buttonText}>{t('getStarted')}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 80,
    paddingHorizontal: 32,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  catContainer: {
    marginBottom: 48,
  },
  titleContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 42,
    fontWeight: '200',
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: 42,
    fontWeight: '600',
    letterSpacing: 2,
    marginTop: -4,
  },
  button: {
    paddingVertical: 18,
    borderRadius: 32,
    alignItems: 'center',
  },
  buttonText: {
    color: '#1A1A1A',
    fontSize: 18,
    fontWeight: '600',
  },
});

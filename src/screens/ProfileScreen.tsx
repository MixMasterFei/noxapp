import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useApp, NoiseType } from '../context/AppContext';
import { themes } from '../utils/theme';

export const ProfileScreen: React.FC = () => {
  const { settings, updateSettings, t } = useApp();
  const theme = themes[settings.theme];

  const Stepper: React.FC<{
    value: number;
    onIncrement: () => void;
    onDecrement: () => void;
    min?: number;
    max?: number;
  }> = ({ value, onIncrement, onDecrement, min = 1, max = 60 }) => (
    <View style={styles.stepperContainer}>
      <TouchableOpacity
        style={[styles.stepperButton, { backgroundColor: theme.surfaceSecondary }]}
        onPress={onDecrement}
        disabled={value <= min}
      >
        <Svg width={20} height={20} viewBox="0 0 24 24">
          <Path d="M5 12h14" stroke={value <= min ? theme.border : theme.text} strokeWidth={2} />
        </Svg>
      </TouchableOpacity>
      
      <Text style={[styles.stepperValue, { color: theme.text }]}>
        {value} {t('minutes')}
      </Text>
      
      <TouchableOpacity
        style={[styles.stepperButton, { backgroundColor: theme.surfaceSecondary }]}
        onPress={onIncrement}
        disabled={value >= max}
      >
        <Svg width={20} height={20} viewBox="0 0 24 24">
          <Path d="M12 5v14M5 12h14" stroke={value >= max ? theme.border : theme.text} strokeWidth={2} />
        </Svg>
      </TouchableOpacity>
    </View>
  );

  const ToggleButton: React.FC<{
    label: string;
    isActive: boolean;
    onPress: () => void;
  }> = ({ label, isActive, onPress }) => (
    <TouchableOpacity
      style={[
        styles.toggleButton,
        { 
          backgroundColor: isActive ? theme.accent : theme.surfaceSecondary,
          borderColor: isActive ? theme.accent : theme.border,
        },
      ]}
      onPress={onPress}
    >
      <Text style={[
        styles.toggleText, 
        { color: isActive ? '#1A1A1A' : theme.textSecondary }
      ]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  const noiseOptions: { key: NoiseType; label: string }[] = [
    { key: 'rain', label: t('rain') },
    { key: 'night', label: t('night') },
    { key: 'purr', label: t('purr') },
  ];

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: theme.background }]}
      contentContainerStyle={styles.content}
    >
      <Text style={[styles.title, { color: theme.text }]}>{t('profile')}</Text>

      {/* Duration Settings - labels without "duration" word */}
      <View style={[styles.section, { backgroundColor: theme.surface }]}>
        <View style={styles.settingRow}>
          <Text style={[styles.settingLabel, { color: theme.text }]}>
            {t('focusLabel')}
          </Text>
          <Stepper
            value={settings.focusDuration}
            onIncrement={() => updateSettings({ focusDuration: settings.focusDuration + 1 })}
            onDecrement={() => updateSettings({ focusDuration: settings.focusDuration - 1 })}
          />
        </View>

        <View style={[styles.divider, { backgroundColor: theme.border }]} />

        <View style={styles.settingRow}>
          <Text style={[styles.settingLabel, { color: theme.text }]}>
            {t('breakLabel')}
          </Text>
          <Stepper
            value={settings.breakDuration}
            onIncrement={() => updateSettings({ breakDuration: settings.breakDuration + 1 })}
            onDecrement={() => updateSettings({ breakDuration: settings.breakDuration - 1 })}
          />
        </View>

        <View style={[styles.divider, { backgroundColor: theme.border }]} />

        <View style={styles.settingRow}>
          <Text style={[styles.settingLabel, { color: theme.text }]}>
            {t('longBreakLabel')}
          </Text>
          <Stepper
            value={settings.longBreakDuration}
            onIncrement={() => updateSettings({ longBreakDuration: settings.longBreakDuration + 1 })}
            onDecrement={() => updateSettings({ longBreakDuration: settings.longBreakDuration - 1 })}
          />
        </View>
      </View>

      {/* Sound Settings - Off is icon only on timer, here show all options */}
      <View style={[styles.section, { backgroundColor: theme.surface }]}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>{t('sounds')}</Text>
        <View style={styles.toggleGroup}>
          {noiseOptions.map((option) => (
            <ToggleButton
              key={option.key}
              label={option.label}
              isActive={settings.noise === option.key}
              onPress={() => updateSettings({ noise: settings.noise === option.key ? 'off' : option.key })}
            />
          ))}
        </View>
      </View>

      {/* Theme Settings */}
      <View style={[styles.section, { backgroundColor: theme.surface }]}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>{t('theme')}</Text>
        <View style={styles.toggleGroup}>
          <ToggleButton
            label={t('dark')}
            isActive={settings.theme === 'dark'}
            onPress={() => updateSettings({ theme: 'dark' })}
          />
          <ToggleButton
            label={t('light')}
            isActive={settings.theme === 'light'}
            onPress={() => updateSettings({ theme: 'light' })}
          />
        </View>
      </View>

      {/* Language Settings */}
      <View style={[styles.section, { backgroundColor: theme.surface }]}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>{t('language')}</Text>
        <View style={styles.toggleGroup}>
          <ToggleButton
            label={t('english')}
            isActive={settings.language === 'en'}
            onPress={() => updateSettings({ language: 'en' })}
          />
          <ToggleButton
            label={t('french')}
            isActive={settings.language === 'fr'}
            onPress={() => updateSettings({ language: 'fr' })}
          />
        </View>
      </View>

      {/* App info */}
      <View style={styles.appInfo}>
        <Text style={[styles.appName, { color: theme.textSecondary }]}>Nox</Text>
        <Text style={[styles.appVersion, { color: theme.textSecondary }]}>v1.0.0</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingTop: 60,
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 24,
  },
  section: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '500',
    flex: 1,
  },
  divider: {
    height: 1,
    marginVertical: 8,
  },
  stepperContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  stepperButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepperValue: {
    fontSize: 14,
    fontWeight: '500',
    minWidth: 60,
    textAlign: 'center',
  },
  toggleGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  toggleButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
  },
  toggleText: {
    fontSize: 14,
    fontWeight: '500',
  },
  appInfo: {
    alignItems: 'center',
    marginTop: 24,
  },
  appName: {
    fontSize: 16,
    fontWeight: '600',
  },
  appVersion: {
    fontSize: 12,
    marginTop: 4,
  },
});

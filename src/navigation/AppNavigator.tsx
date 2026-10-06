import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path, Circle, Rect } from 'react-native-svg';
import { useApp } from '../context/AppContext';
import { themes } from '../utils/theme';
import { useResolvedTheme } from '../utils/useResolvedTheme';
import { TimerScreen, CalendarScreen, ProfileScreen, FirstRunScreen } from '../screens';

const Tab = createBottomTabNavigator();

const TimerIcon = ({ color, size }: { color: string; size: number }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Circle cx="12" cy="13" r="8" stroke={color} strokeWidth={1.5} fill="none" />
    <Path d="M12 9v4l2.5 2.5" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M9 2h6" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
    <Path d="M12 2v2" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
  </Svg>
);

const CalendarIcon = ({ color, size }: { color: string; size: number }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Rect x="3" y="4" width="18" height="18" rx="3" stroke={color} strokeWidth={1.5} fill="none" />
    <Path d="M16 2v4M8 2v4M3 10h18" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
    <Circle cx="12" cy="16" r="2" fill={color} />
  </Svg>
);

const ProfileIcon = ({ color, size }: { color: string; size: number }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Circle cx="12" cy="8" r="4" stroke={color} strokeWidth={1.5} fill="none" />
    <Path d="M4 21c0-4.5 3.5-7 8-7s8 2.5 8 7" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
  </Svg>
);

const TabNavigator: React.FC = () => {
  const { settings, t } = useApp();
  const resolvedTheme = useResolvedTheme(settings.theme);
  const theme = themes[resolvedTheme];
  const insets = useSafeAreaInsets();
  
  const bottomPadding = Math.max(insets.bottom, 8);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.surface,
          borderTopColor: theme.border,
          borderTopWidth: 1,
          paddingBottom: bottomPadding,
          paddingTop: 12,
        },
        tabBarActiveTintColor: theme.accent,
        tabBarInactiveTintColor: theme.textSecondary,
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '500',
          letterSpacing: 0.3,
        },
      }}
    >
      <Tab.Screen
        name="Timer"
        component={TimerScreen}
        options={{
          tabBarLabel: t('timer'),
          tabBarIcon: ({ color, size }) => <TimerIcon color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{
          tabBarLabel: t('calendar'),
          tabBarIcon: ({ color, size }) => <CalendarIcon color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: t('profile'),
          tabBarIcon: ({ color, size }) => <ProfileIcon color={color} size={size} />,
        }}
      />
    </Tab.Navigator>
  );
};

export const AppNavigator: React.FC = () => {
  const { settings } = useApp();

  if (!settings.hasSeenFirstRun) {
    return (
      <NavigationContainer>
        <FirstRunScreen />
      </NavigationContainer>
    );
  }

  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
};

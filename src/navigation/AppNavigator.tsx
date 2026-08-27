import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Svg, { Path, Circle, Rect, G } from 'react-native-svg';
import { useApp } from '../context/AppContext';
import { themes } from '../utils/theme';
import { TimerScreen, CalendarScreen, ProfileScreen, FirstRunScreen } from '../screens';

const Tab = createBottomTabNavigator();

const TimerIcon = ({ color, size }: { color: string; size: number }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Circle cx="12" cy="13" r="8" stroke={color} strokeWidth={2} fill="none" />
    <Path d="M12 9v4l2 2" stroke={color} strokeWidth={2} strokeLinecap="round" />
    <Path d="M9 2h6" stroke={color} strokeWidth={2} strokeLinecap="round" />
  </Svg>
);

const CalendarIcon = ({ color, size }: { color: string; size: number }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Rect x="3" y="4" width="18" height="18" rx="2" stroke={color} strokeWidth={2} fill="none" />
    <Path d="M16 2v4M8 2v4M3 10h18" stroke={color} strokeWidth={2} strokeLinecap="round" />
    <Circle cx="12" cy="16" r="1.5" fill={color} />
  </Svg>
);

const ProfileIcon = ({ color, size }: { color: string; size: number }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Circle cx="12" cy="8" r="4" stroke={color} strokeWidth={2} fill="none" />
    <Path d="M4 20c0-4 4-6 8-6s8 2 8 6" stroke={color} strokeWidth={2} strokeLinecap="round" />
  </Svg>
);

export const AppNavigator: React.FC = () => {
  const { settings, t } = useApp();
  const theme = themes[settings.theme];

  if (!settings.hasSeenFirstRun) {
    return (
      <NavigationContainer>
        <FirstRunScreen />
      </NavigationContainer>
    );
  }

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: theme.surface,
            borderTopColor: theme.border,
            borderTopWidth: 1,
            height: 80,
            paddingBottom: 20,
            paddingTop: 10,
          },
          tabBarActiveTintColor: theme.accent,
          tabBarInactiveTintColor: theme.textSecondary,
          tabBarLabelStyle: {
            fontSize: 11,
            fontWeight: '500',
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
    </NavigationContainer>
  );
};

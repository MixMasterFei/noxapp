import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useApp, getLocalDateString } from '../context/AppContext';
import { themes } from '../utils/theme';
import { PawStamp } from '../components/PawStamp';

export const CalendarScreen: React.FC = () => {
  const { settings, t, getSessionsForDate, getTotalStats } = useApp();
  const theme = themes[settings.theme];
  
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const monthNames = [
    t('january'), t('february'), t('march'), t('april'),
    t('may'), t('june'), t('july'), t('august'),
    t('september'), t('october'), t('november'), t('december'),
  ];

  const dayNames = [t('sun'), t('mon'), t('tue'), t('wed'), t('thu'), t('fri'), t('sat')];

  const formatDuration = (ms: number): string => {
    const totalMinutes = Math.floor(ms / 60000);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  const calendarDays = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startPadding = firstDay.getDay();
    const daysInMonth = lastDay.getDate();
    
    const days: Array<{ date: Date | null; dateString: string | null }> = [];
    
    for (let i = 0; i < startPadding; i++) {
      days.push({ date: null, dateString: null });
    }
    
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
      days.push({ date, dateString });
    }
    
    return days;
  }, [currentMonth]);

  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const goToToday = () => {
    setCurrentMonth(new Date());
  };

  const isToday = (dateString: string | null): boolean => {
    if (!dateString) return false;
    return dateString === getLocalDateString();
  };

  const { days: totalDays, totalMs } = getTotalStats();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={goToPreviousMonth} style={styles.navButton}>
          <Svg width={24} height={24} viewBox="0 0 24 24">
            <Path d="M15 18l-6-6 6-6" stroke={theme.text} strokeWidth={2} fill="none" />
          </Svg>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={goToToday}>
          <Text style={[styles.monthTitle, { color: theme.text }]}>
            {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={goToNextMonth} style={styles.navButton}>
          <Svg width={24} height={24} viewBox="0 0 24 24">
            <Path d="M9 6l6 6-6 6" stroke={theme.text} strokeWidth={2} fill="none" />
          </Svg>
        </TouchableOpacity>
      </View>

      {/* Stats Summary */}
      <View style={styles.statsContainer}>
        <View style={[styles.statCard, { backgroundColor: theme.surface }]}>
          <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
            {t('focused')}
          </Text>
          <View style={styles.statRow}>
            <PawStamp size={20} color={theme.accent} />
            <Text style={[styles.statValue, { color: theme.text }]}>
              {totalDays} {totalDays === 1 ? t('day') : t('days')}
            </Text>
          </View>
        </View>
        
        <View style={[styles.statCard, { backgroundColor: theme.surface }]}>
          <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
            {t('time')}
          </Text>
          <Text style={[styles.statValue, { color: theme.text }]}>
            {formatDuration(totalMs)}
          </Text>
        </View>
      </View>

      {/* Day headers */}
      <View style={styles.dayHeaders}>
        {dayNames.map((day, index) => (
          <Text 
            key={index} 
            style={[styles.dayHeader, { color: theme.textSecondary }]}
          >
            {day}
          </Text>
        ))}
      </View>

      {/* Calendar grid */}
      <ScrollView style={styles.calendarScroll} showsVerticalScrollIndicator={false}>
        <View style={styles.calendarGrid}>
          {calendarDays.map((day, index) => {
            const sessionData = day.dateString ? getSessionsForDate(day.dateString) : { count: 0, totalMs: 0 };
            const isTodayDate = isToday(day.dateString);
            
            return (
              <View 
                key={day.dateString || `empty-${index}`} 
                style={[
                  styles.dayCell,
                  isTodayDate && [styles.todayCell, { borderColor: theme.accent }],
                ]}
              >
                {day.date && (
                  <>
                    <Text 
                      style={[
                        styles.dayNumber, 
                        { color: isTodayDate ? theme.accent : theme.text },
                      ]}
                    >
                      {day.date.getDate()}
                    </Text>
                    {sessionData.count > 0 && (
                      <View style={styles.pawContainer}>
                        <PawStamp size={18} color={theme.accent} />
                        {sessionData.count > 1 && (
                          <Text style={[styles.sessionCount, { color: theme.textSecondary }]}>
                            {sessionData.count}
                          </Text>
                        )}
                      </View>
                    )}
                  </>
                )}
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  navButton: {
    padding: 8,
  },
  monthTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    borderRadius: 12,
    padding: 12,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  dayHeaders: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 8,
  },
  dayHeader: {
    width: '14.28%',
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '500',
  },
  calendarScroll: {
    flex: 1,
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayCell: {
    width: '14.28%',
    aspectRatio: 1,
    padding: 4,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 6,
  },
  todayCell: {
    borderWidth: 1,
    borderRadius: 8,
  },
  dayNumber: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 2,
  },
  pawContainer: {
    alignItems: 'center',
  },
  sessionCount: {
    fontSize: 10,
    marginTop: -2,
  },
});

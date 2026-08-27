import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import { Audio } from 'expo-av';
import Svg, { Path } from 'react-native-svg';
import { useApp } from '../context/AppContext';
import { themes } from '../utils/theme';
import { IdleCat, FocusCat, BreakCat, DoneCat } from '../components/cats';
import { SessionDots } from '../components/SessionDots';

export const TimerScreen: React.FC = () => {
  const {
    settings,
    timerState,
    remainingMs,
    isRunning,
    pendingChime,
    t,
    startTimer,
    pauseTimer,
    skipBreak,
    acknowledgeComplete,
    clearPendingChime,
    updateSettings,
  } = useApp();

  const theme = themes[settings.theme];
  const soundRef = useRef<Audio.Sound | null>(null);
  const chimeRef = useRef<Audio.Sound | null>(null);
  const prevPhaseRef = useRef(timerState.phase);

  useEffect(() => {
    return () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync();
      }
      if (chimeRef.current) {
        chimeRef.current.unloadAsync();
      }
    };
  }, []);

  useEffect(() => {
    handleNoiseChange();
  }, [settings.noise, isRunning]);

  useEffect(() => {
    if (prevPhaseRef.current !== 'done' && timerState.phase === 'done') {
      playChime();
    }
    if ((prevPhaseRef.current === 'break' || prevPhaseRef.current === 'longBreak') && 
        timerState.phase === 'idle') {
      playChime();
    }
    prevPhaseRef.current = timerState.phase;
  }, [timerState.phase]);

  useEffect(() => {
    if (pendingChime) {
      playChime();
      clearPendingChime();
    }
  }, [pendingChime, clearPendingChime]);

  const handleNoiseChange = async () => {
    if (soundRef.current) {
      await soundRef.current.stopAsync();
      await soundRef.current.unloadAsync();
      soundRef.current = null;
    }

    if (settings.noise !== 'off' && isRunning) {
      try {
        const soundFiles: Record<string, any> = {
          rain: require('../../assets/sounds/rain.wav'),
          night: require('../../assets/sounds/night.wav'),
          purr: require('../../assets/sounds/purr.wav'),
        };
        
        const { sound } = await Audio.Sound.createAsync(
          soundFiles[settings.noise],
          { isLooping: true, volume: 0.5 }
        );
        soundRef.current = sound;
        await sound.playAsync();
      } catch (e) {
        console.log('Audio not available:', e);
      }
    }
  };

  const playChime = async () => {
    try {
      if (chimeRef.current) {
        await chimeRef.current.unloadAsync();
      }
      const { sound } = await Audio.Sound.createAsync(
        require('../../assets/sounds/chime.wav'),
        { volume: 0.3 }
      );
      chimeRef.current = sound;
      await sound.playAsync();
    } catch (e) {
      console.log('Chime not available:', e);
    }
  };

  const formatTime = (ms: number): string => {
    const totalSeconds = Math.ceil(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const getPhaseLabel = (): string => {
    switch (timerState.phase) {
      case 'focus':
        return t('focus');
      case 'break':
        return t('break');
      case 'longBreak':
        return t('longBreak');
      case 'done':
        return t('done');
      default:
        return t('focus');
    }
  };

  const renderCat = () => {
    const catSize = 180;
    switch (timerState.phase) {
      case 'focus':
        return <FocusCat width={catSize} height={catSize * 0.8} />;
      case 'break':
      case 'longBreak':
        return <BreakCat width={catSize} height={catSize * 0.7} />;
      case 'done':
        return <DoneCat width={catSize} height={catSize * 0.9} />;
      default:
        return <IdleCat width={catSize} height={catSize * 1.2} />;
    }
  };

  const handlePlayPause = () => {
    if (timerState.phase === 'done') {
      acknowledgeComplete();
    } else if (isRunning) {
      pauseTimer();
    } else {
      startTimer();
    }
  };

  const cycleNoise = () => {
    const noises: Array<'off' | 'rain' | 'night' | 'purr'> = ['off', 'rain', 'night', 'purr'];
    const currentIndex = noises.indexOf(settings.noise);
    const nextIndex = (currentIndex + 1) % noises.length;
    updateSettings({ noise: noises[nextIndex] });
  };

  const isBreak = timerState.phase === 'break' || timerState.phase === 'longBreak';
  const noiseActive = settings.noise !== 'off';

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Noise toggle - icon only, no word when off */}
      <TouchableOpacity style={styles.noiseButton} onPress={cycleNoise}>
        <Svg width={20} height={20} viewBox="0 0 24 24">
          <Path
            d="M12 3v18M8 8v8M4 10v4M16 8v8M20 10v4"
            stroke={noiseActive ? theme.textSecondary : theme.border}
            strokeWidth={2}
            strokeLinecap="round"
          />
          {!noiseActive && (
            <Path
              d="M3 3l18 18"
              stroke={theme.border}
              strokeWidth={2}
              strokeLinecap="round"
            />
          )}
        </Svg>
      </TouchableOpacity>

      {/* Phase indicator */}
      <View style={styles.phaseContainer}>
        <View style={[styles.phaseDot, { backgroundColor: theme.accent }]} />
        <Text style={[styles.phaseText, { color: theme.textSecondary }]}>
          {getPhaseLabel()}
        </Text>
      </View>

      {/* Timer display */}
      <Text style={[styles.timerText, { color: theme.text }]}>
        {formatTime(remainingMs)}
      </Text>

      {/* Session dots */}
      <SessionDots
        completed={timerState.completedSessions}
        activeColor={theme.accent}
        inactiveColor={theme.border}
      />

      {/* Cat */}
      <View style={styles.catContainer}>
        {renderCat()}
      </View>

      {/* Controls */}
      <View style={styles.controlsContainer}>
        {isBreak && (
          <TouchableOpacity
            style={[styles.skipButton, { borderColor: theme.border }]}
            onPress={skipBreak}
          >
            <Text style={[styles.skipText, { color: theme.textSecondary }]}>
              {t('skip')}
            </Text>
          </TouchableOpacity>
        )}
        
        <Pressable
          style={[styles.playButton, { backgroundColor: theme.surface }]}
          onPress={handlePlayPause}
        >
          {isRunning ? (
            <Svg width={32} height={32} viewBox="0 0 24 24">
              <Path d="M6 4h4v16H6zM14 4h4v16h-4z" fill={theme.text} />
            </Svg>
          ) : (
            <Svg width={32} height={32} viewBox="0 0 24 24">
              <Path d="M8 5v14l11-7z" fill={theme.text} />
            </Svg>
          )}
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 24,
  },
  noiseButton: {
    position: 'absolute',
    top: 60,
    right: 24,
    padding: 8,
  },
  phaseContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
    gap: 8,
  },
  phaseDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  phaseText: {
    fontSize: 16,
    fontWeight: '400',
  },
  timerText: {
    fontSize: 72,
    fontWeight: '200',
    letterSpacing: -2,
    marginTop: 8,
  },
  catContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  controlsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    marginBottom: 40,
  },
  playButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  skipButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 24,
    borderWidth: 1,
  },
  skipText: {
    fontSize: 14,
    fontWeight: '500',
  },
});

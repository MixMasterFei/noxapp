import React, { useEffect, useRef } from 'react';
import { View, Image, Animated, Easing, StyleSheet } from 'react-native';

interface IdleCatProps {
  width?: number;
  height?: number;
}

export const IdleCat: React.FC<IdleCatProps> = ({ width = 200, height = 240 }) => {
  const breatheAnim = useRef(new Animated.Value(1)).current;
  const translateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const breathe = Animated.loop(
      Animated.sequence([
        Animated.timing(breatheAnim, {
          toValue: 1.015,
          duration: 2000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(breatheAnim, {
          toValue: 1,
          duration: 2000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );

    const sway = Animated.loop(
      Animated.sequence([
        Animated.timing(translateAnim, {
          toValue: 2,
          duration: 3000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(translateAnim, {
          toValue: -2,
          duration: 3000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );

    breathe.start();
    sway.start();

    return () => {
      breathe.stop();
      sway.stop();
    };
  }, [breatheAnim, translateAnim]);

  return (
    <View style={[styles.container, { width, height }]}>
      <Animated.View
        style={[
          styles.catWrapper,
          {
            transform: [
              { scaleY: breatheAnim },
              { translateY: translateAnim },
            ],
          },
        ]}
      >
        <Image
          source={require('../../../assets/cats/cat-idle.png')}
          style={[styles.catImage, { width, height }]}
          resizeMode="contain"
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  catWrapper: {
    width: '100%',
    height: '100%',
  },
  catImage: {
    width: '100%',
    height: '100%',
  },
});

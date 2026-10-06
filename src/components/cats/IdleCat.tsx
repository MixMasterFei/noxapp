import React, { useEffect, useRef } from 'react';
import { View, Image, Animated, Easing, StyleSheet } from 'react-native';

interface IdleCatProps {
  width?: number;
  height?: number;
}

export const IdleCat: React.FC<IdleCatProps> = ({ width = 200, height = 240 }) => {
  const breatheAnim = useRef(new Animated.Value(1)).current;
  const blinkAnim = useRef(new Animated.Value(1)).current;
  const tailAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const breathe = Animated.loop(
      Animated.sequence([
        Animated.timing(breatheAnim, {
          toValue: 1.02,
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

    const blink = () => {
      const delay = 3000 + Math.random() * 4000;
      setTimeout(() => {
        Animated.sequence([
          Animated.timing(blinkAnim, {
            toValue: 0.1,
            duration: 80,
            useNativeDriver: true,
          }),
          Animated.timing(blinkAnim, {
            toValue: 1,
            duration: 80,
            useNativeDriver: true,
          }),
        ]).start(() => blink());
      }, delay);
    };

    const tailSway = Animated.loop(
      Animated.sequence([
        Animated.timing(tailAnim, {
          toValue: 1,
          duration: 3000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(tailAnim, {
          toValue: -1,
          duration: 3000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(tailAnim, {
          toValue: 0,
          duration: 3000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );

    breathe.start();
    tailSway.start();
    blink();

    return () => {
      breathe.stop();
      tailSway.stop();
    };
  }, []);

  const tailRotate = tailAnim.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: ['-3deg', '0deg', '3deg'],
  });

  return (
    <View style={[styles.container, { width, height }]}>
      <Animated.View
        style={[
          styles.catWrapper,
          {
            transform: [
              { scaleY: breatheAnim },
              { rotate: tailRotate },
            ],
          },
        ]}
      >
        <Image
          source={require('../../../assets/cats/cat-idle.jpg')}
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

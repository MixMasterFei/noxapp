import React, { useEffect, useRef } from 'react';
import { View, Image, Animated, Easing, StyleSheet } from 'react-native';

interface BreakCatProps {
  width?: number;
  height?: number;
}

export const BreakCat: React.FC<BreakCatProps> = ({ width = 200, height = 140 }) => {
  const breatheAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const breathe = Animated.loop(
      Animated.sequence([
        Animated.timing(breatheAnim, {
          toValue: 1.012,
          duration: 2500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(breatheAnim, {
          toValue: 1,
          duration: 2500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );

    breathe.start();

    return () => {
      breathe.stop();
    };
  }, [breatheAnim]);

  return (
    <View style={[styles.container, { width, height }]}>
      <Animated.View
        style={[
          styles.catWrapper,
          {
            transform: [
              { scale: breatheAnim },
            ],
          },
        ]}
      >
        <Image
          source={require('../../../assets/cats/cat-break.png')}
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

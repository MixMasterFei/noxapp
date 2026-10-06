import React, { useEffect, useRef } from 'react';
import { View, Image, Animated, Easing, StyleSheet } from 'react-native';

interface FocusCatProps {
  width?: number;
  height?: number;
}

export const FocusCat: React.FC<FocusCatProps> = ({ width = 200, height = 160 }) => {
  const bobAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const bob = Animated.loop(
      Animated.sequence([
        Animated.timing(bobAnim, {
          toValue: -3,
          duration: 800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(bobAnim, {
          toValue: 0,
          duration: 800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );

    bob.start();

    return () => {
      bob.stop();
    };
  }, [bobAnim]);

  return (
    <View style={[styles.container, { width, height }]}>
      <Animated.View
        style={[
          styles.catWrapper,
          {
            transform: [
              { translateY: bobAnim },
            ],
          },
        ]}
      >
        <Image
          source={require('../../../assets/cats/cat-focus.png')}
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

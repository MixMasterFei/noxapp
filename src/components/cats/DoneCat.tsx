import React, { useEffect, useRef, useState } from 'react';
import { View, Image, Animated, Easing, StyleSheet } from 'react-native';

interface DoneCatProps {
  width?: number;
  height?: number;
}

export const DoneCat: React.FC<DoneCatProps> = ({ width = 200, height = 180 }) => {
  const stretchAnim = useRef(new Animated.Value(0)).current;
  const breatheAnim = useRef(new Animated.Value(1)).current;
  const [stretchDone, setStretchDone] = useState(false);

  useEffect(() => {
    const stretch = Animated.sequence([
      Animated.timing(stretchAnim, {
        toValue: 1,
        duration: 500,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(stretchAnim, {
        toValue: 0.6,
        duration: 300,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
    ]);

    stretch.start(() => {
      setStretchDone(true);
    });

    return () => {
      stretch.stop();
    };
  }, [stretchAnim]);

  useEffect(() => {
    if (!stretchDone) return;
    
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
    
    breathe.start();
    
    return () => {
      breathe.stop();
    };
  }, [stretchDone, breatheAnim]);

  const stretchY = stretchAnim.interpolate({
    inputRange: [0, 0.6, 1],
    outputRange: [0, -4, -8],
  });

  return (
    <View style={[styles.container, { width, height }]}>
      <Animated.View
        style={[
          styles.catWrapper,
          {
            transform: [
              { translateY: stretchDone ? 0 : stretchY },
              { scaleY: stretchDone ? breatheAnim : 1 },
            ],
          },
        ]}
      >
        <Image
          source={require('../../../assets/cats/cat-done.png')}
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

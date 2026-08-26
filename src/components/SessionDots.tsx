import React from 'react';
import { View, StyleSheet } from 'react-native';

interface SessionDotsProps {
  completed: number;
  total?: number;
  activeColor?: string;
  inactiveColor?: string;
}

export const SessionDots: React.FC<SessionDotsProps> = ({
  completed,
  total = 4,
  activeColor = '#F5C518',
  inactiveColor = '#333333',
}) => {
  const filledCount = completed % total;
  const allFilled = completed > 0 && filledCount === 0;
  
  return (
    <View style={styles.container}>
      {Array.from({ length: total }).map((_, index) => {
        const isFilled = allFilled || index < filledCount;
        return (
          <View
            key={index}
            style={[
              styles.dot,
              { backgroundColor: isFilled ? activeColor : inactiveColor },
              isFilled && styles.activeDot,
            ]}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  activeDot: {
    transform: [{ scale: 1.1 }],
  },
});

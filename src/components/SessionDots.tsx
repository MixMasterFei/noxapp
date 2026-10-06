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
    gap: 10,
    marginTop: 4,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});

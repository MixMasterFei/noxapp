import React from 'react';
import Svg, { Circle, Ellipse } from 'react-native-svg';

interface PawStampProps {
  size?: number;
  color?: string;
}

export const PawStamp: React.FC<PawStampProps> = ({ 
  size = 24, 
  color = '#F5C518' 
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 40 40">
      {/* Main pad */}
      <Ellipse cx="20" cy="26" rx="10" ry="8" fill={color} />
      
      {/* Toe pads */}
      <Circle cx="10" cy="14" r="5" fill={color} />
      <Circle cx="20" cy="10" r="5" fill={color} />
      <Circle cx="30" cy="14" r="5" fill={color} />
      <Circle cx="14" cy="20" r="4" fill={color} />
      <Circle cx="26" cy="20" r="4" fill={color} />
    </Svg>
  );
};

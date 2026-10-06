import React from 'react';
import Svg, { Ellipse, Path } from 'react-native-svg';

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
      {/* Main pad - slightly organic shape */}
      <Path
        d="M20 18 C12 18 10 22 10 26 C10 31 14 34 20 34 C26 34 30 31 30 26 C30 22 28 18 20 18"
        fill={color}
      />
      
      {/* Toe beans - slightly varied sizes for hand-drawn feel */}
      <Ellipse cx="10" cy="13" rx="5" ry="4.5" fill={color} />
      <Ellipse cx="20" cy="9" rx="5.5" ry="5" fill={color} />
      <Ellipse cx="30" cy="13" rx="5" ry="4.5" fill={color} />
      <Ellipse cx="13" cy="20" rx="4" ry="3.5" fill={color} />
      <Ellipse cx="27" cy="20" rx="4" ry="3.5" fill={color} />
    </Svg>
  );
};

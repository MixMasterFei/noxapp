import React from 'react';
import Svg, { Path, Circle, Ellipse } from 'react-native-svg';

interface IdleCatProps {
  width?: number;
  height?: number;
}

export const IdleCat: React.FC<IdleCatProps> = ({ width = 200, height = 240 }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 200 240">
      {/* Body - sitting cat silhouette */}
      <Path
        d="M60 180 
           C40 180 30 160 35 140
           C30 120 35 100 50 90
           L55 60 L70 80
           L100 75
           L130 80 L145 60
           L150 90
           C165 100 170 120 165 140
           C170 160 160 180 140 180
           C140 200 130 210 100 210
           C70 210 60 200 60 180Z"
        fill="#1a1a1a"
      />
      
      {/* Head */}
      <Ellipse cx="100" cy="95" rx="50" ry="45" fill="#1a1a1a" />
      
      {/* Left ear outer */}
      <Path d="M55 60 L45 25 L75 55 Z" fill="#1a1a1a" />
      {/* Left ear inner */}
      <Path d="M57 55 L52 35 L70 52 Z" fill="#C4858B" />
      
      {/* Right ear outer */}
      <Path d="M145 60 L155 25 L125 55 Z" fill="#1a1a1a" />
      {/* Right ear inner */}
      <Path d="M143 55 L148 35 L130 52 Z" fill="#C4858B" />
      
      {/* Left eye */}
      <Ellipse cx="75" cy="90" rx="17" ry="18" fill="#F5C518" />
      <Circle cx="75" cy="90" r="7" fill="#1a1a1a" />
      <Circle cx="72" cy="86" r="3" fill="#F5C518" opacity="0.4" />
      
      {/* Right eye */}
      <Ellipse cx="125" cy="90" rx="17" ry="18" fill="#F5C518" />
      <Circle cx="125" cy="90" r="7" fill="#1a1a1a" />
      <Circle cx="122" cy="86" r="3" fill="#F5C518" opacity="0.4" />
      
      {/* Nose */}
      <Path d="M100 110 L95 118 L105 118 Z" fill="#6B6B6B" />
      
      {/* Whiskers left */}
      <Path d="M70 115 L30 105" stroke="#4a4a4a" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <Path d="M70 118 L30 118" stroke="#4a4a4a" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <Path d="M70 121 L30 131" stroke="#4a4a4a" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      
      {/* Whiskers right */}
      <Path d="M130 115 L170 105" stroke="#4a4a4a" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <Path d="M130 118 L170 118" stroke="#4a4a4a" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <Path d="M130 121 L170 131" stroke="#4a4a4a" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      
      {/* Tail curling up */}
      <Path
        d="M155 175 
           C175 170 185 150 180 130
           C178 115 170 105 160 100"
        stroke="#1a1a1a"
        strokeWidth="14"
        strokeLinecap="round"
        fill="none"
      />
      
      {/* Front paws */}
      <Ellipse cx="75" cy="200" rx="15" ry="10" fill="#1a1a1a" />
      <Ellipse cx="125" cy="200" rx="15" ry="10" fill="#1a1a1a" />
    </Svg>
  );
};

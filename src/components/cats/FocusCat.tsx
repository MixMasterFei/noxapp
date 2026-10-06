import React from 'react';
import Svg, { Path, Circle, Ellipse } from 'react-native-svg';

interface FocusCatProps {
  width?: number;
  height?: number;
}

export const FocusCat: React.FC<FocusCatProps> = ({ width = 200, height = 160 }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 200 160">
      {/* Body - pounce/play-bow silhouette */}
      <Path
        d="M30 100
           C20 95 15 85 20 75
           L25 60 L40 70
           L55 65
           L70 70 L75 55
           L80 75
           C95 70 110 72 120 80
           L130 75 L140 85
           C160 80 180 90 185 110
           C188 125 175 140 155 140
           L150 145 L145 140
           L100 140
           L55 140
           L50 145 L45 140
           C25 140 15 125 20 110
           C22 105 26 102 30 100Z"
        fill="#1a1a1a"
      />
      
      {/* Head - lower, ready to pounce */}
      <Ellipse cx="50" cy="75" rx="36" ry="34" fill="#1a1a1a" />
      
      {/* Left ear */}
      <Path d="M22 52 L12 18 L42 46 Z" fill="#1a1a1a" />
      <Path d="M24 48 L18 28 L38 44 Z" fill="#C4858B" />
      
      {/* Right ear */}
      <Path d="M78 52 L88 18 L58 46 Z" fill="#1a1a1a" />
      <Path d="M76 48 L82 28 L62 44 Z" fill="#C4858B" />
      
      {/* Eyes - yellow, wide and alert */}
      <Ellipse cx="36" cy="72" rx="11" ry="12" fill="#F5C518" />
      <Ellipse cx="64" cy="72" rx="11" ry="12" fill="#F5C518" />
      
      {/* Pupils - dilated, focused */}
      <Circle cx="38" cy="72" r="5" fill="#1a1a1a" />
      <Circle cx="66" cy="72" r="5" fill="#1a1a1a" />
      
      {/* Nose */}
      <Path d="M50 88 L46 94 L54 94 Z" fill="#6B6B6B" />
      
      {/* Whiskers */}
      <Path d="M35 92 L8 84" stroke="#4a4a4a" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <Path d="M35 95 L8 95" stroke="#4a4a4a" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <Path d="M35 98 L8 106" stroke="#4a4a4a" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      
      <Path d="M65 92 L92 84" stroke="#4a4a4a" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <Path d="M65 95 L92 95" stroke="#4a4a4a" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <Path d="M65 98 L92 106" stroke="#4a4a4a" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      
      {/* Tail - up and alert */}
      <Path
        d="M175 105
           C190 100 195 85 190 70
           C188 60 182 55 175 55"
        stroke="#1a1a1a"
        strokeWidth="12"
        strokeLinecap="round"
        fill="none"
      />
      
      {/* Back haunches */}
      <Path
        d="M150 115 C165 105 170 120 165 135"
        fill="#1a1a1a"
      />
    </Svg>
  );
};

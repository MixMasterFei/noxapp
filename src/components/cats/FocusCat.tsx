import React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';

interface FocusCatProps {
  width?: number;
  height?: number;
}

export const FocusCat: React.FC<FocusCatProps> = ({ width = 200, height = 160 }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 200 160">
      {/* Body - pounce/play-bow silhouette - flat black */}
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
      <Circle cx="50" cy="75" r="35" fill="#1a1a1a" />
      
      {/* Left ear */}
      <Path d="M25 50 L15 20 L40 45 Z" fill="#1a1a1a" />
      
      {/* Right ear */}
      <Path d="M75 50 L85 20 L60 45 Z" fill="#1a1a1a" />
      
      {/* Eyes - white circles (alert/focused) */}
      <Circle cx="38" cy="72" r="10" fill="#ffffff" />
      <Circle cx="62" cy="72" r="10" fill="#ffffff" />
      
      {/* Pupils - small and focused */}
      <Circle cx="40" cy="72" r="4" fill="#1a1a1a" />
      <Circle cx="64" cy="72" r="4" fill="#1a1a1a" />
      
      {/* Whiskers - white */}
      <Path d="M30 85 L5 78" stroke="#ffffff" strokeWidth="1.5" fill="none" />
      <Path d="M30 88 L5 88" stroke="#ffffff" strokeWidth="1.5" fill="none" />
      <Path d="M30 91 L5 98" stroke="#ffffff" strokeWidth="1.5" fill="none" />
      
      <Path d="M70 85 L95 78" stroke="#ffffff" strokeWidth="1.5" fill="none" />
      <Path d="M70 88 L95 88" stroke="#ffffff" strokeWidth="1.5" fill="none" />
      <Path d="M70 91 L95 98" stroke="#ffffff" strokeWidth="1.5" fill="none" />
      
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
      
      {/* Back haunches - ready to spring */}
      <Path
        d="M150 115 C165 105 170 120 165 135"
        fill="#1a1a1a"
      />
    </Svg>
  );
};

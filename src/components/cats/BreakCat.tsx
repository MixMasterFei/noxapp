import React from 'react';
import Svg, { Path, Ellipse } from 'react-native-svg';

interface BreakCatProps {
  width?: number;
  height?: number;
}

export const BreakCat: React.FC<BreakCatProps> = ({ width = 200, height = 140 }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 200 140">
      {/* Loaf body - compact, rounded rectangle-ish shape */}
      <Path
        d="M30 110
           C20 110 15 95 20 80
           C25 65 40 55 60 50
           L80 48
           L100 46
           L120 48
           L140 50
           C160 55 175 65 180 80
           C185 95 180 110 170 110
           C170 120 160 125 100 125
           C40 125 30 120 30 110Z"
        fill="#1a1a1a"
      />
      
      {/* Head tucked into body */}
      <Ellipse cx="55" cy="70" rx="35" ry="30" fill="#1a1a1a" />
      
      {/* Left ear */}
      <Path d="M30 50 L22 25 L45 45 Z" fill="#1a1a1a" />
      {/* Left ear inner */}
      <Path d="M32 47 L28 33 L42 44 Z" fill="#C4858B" />
      
      {/* Right ear */}
      <Path d="M80 50 L88 25 L65 45 Z" fill="#1a1a1a" />
      {/* Right ear inner */}
      <Path d="M78 47 L82 33 L68 44 Z" fill="#C4858B" />
      
      {/* Closed eyes - peaceful curves */}
      <Path
        d="M35 68 Q45 62 55 68"
        stroke="#4a4a4a"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      <Path
        d="M55 68 Q65 62 75 68"
        stroke="#4a4a4a"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      
      {/* Nose */}
      <Path d="M55 78 L51 84 L59 84 Z" fill="#6B6B6B" />
      
      {/* Whiskers */}
      <Path d="M40 82 L15 76" stroke="#4a4a4a" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <Path d="M40 85 L15 85" stroke="#4a4a4a" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <Path d="M40 88 L15 94" stroke="#4a4a4a" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      
      <Path d="M70 82 L95 76" stroke="#4a4a4a" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <Path d="M70 85 L95 85" stroke="#4a4a4a" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <Path d="M70 88 L95 94" stroke="#4a4a4a" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      
      {/* Tail wrapped around - tucked loaf style */}
      <Path
        d="M165 95
           C180 90 190 100 185 115
           C182 125 165 130 145 125"
        stroke="#1a1a1a"
        strokeWidth="12"
        strokeLinecap="round"
        fill="none"
      />
      
      {/* Paws tucked under - just hints */}
      <Ellipse cx="45" cy="115" rx="12" ry="6" fill="#2a2a2a" />
      <Ellipse cx="85" cy="115" rx="12" ry="6" fill="#2a2a2a" />
    </Svg>
  );
};

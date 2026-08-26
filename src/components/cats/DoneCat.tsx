import React from 'react';
import Svg, { Path, Ellipse } from 'react-native-svg';

interface DoneCatProps {
  width?: number;
  height?: number;
}

export const DoneCat: React.FC<DoneCatProps> = ({ width = 200, height = 180 }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 200 180">
      {/* Stretching body - elongated */}
      <Path
        d="M25 130
           C15 125 10 115 15 105
           C18 95 30 88 50 85
           L90 80
           L130 80
           L160 85
           C175 88 185 100 185 115
           C188 130 180 145 165 150
           L130 155
           L70 155
           L40 150
           C25 148 20 140 25 130Z"
        fill="#1a1a1a"
      />
      
      {/* Head - lifted, content */}
      <Ellipse cx="45" cy="75" rx="32" ry="28" fill="#1a1a1a" />
      
      {/* Left ear */}
      <Path d="M22 55 L12 28 L35 50 Z" fill="#1a1a1a" />
      <Path d="M24 52 L18 35 L32 49 Z" fill="#C4858B" />
      
      {/* Right ear */}
      <Path d="M68 55 L78 28 L55 50 Z" fill="#1a1a1a" />
      <Path d="M66 52 L72 35 L58 49 Z" fill="#C4858B" />
      
      {/* Happy squinty eyes */}
      <Path
        d="M28 72 Q38 66 48 72"
        stroke="#F5C518"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      <Path
        d="M42 72 Q52 66 62 72"
        stroke="#F5C518"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      
      {/* Nose */}
      <Path d="M45 82 L41 88 L49 88 Z" fill="#6B6B6B" />
      
      {/* Small happy mouth */}
      <Path
        d="M40 92 Q45 96 50 92"
        stroke="#4a4a4a"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
      
      {/* Whiskers */}
      <Path d="M30 88 L8 82" stroke="#4a4a4a" strokeWidth="1.5" fill="none" />
      <Path d="M30 91 L8 91" stroke="#4a4a4a" strokeWidth="1.5" fill="none" />
      <Path d="M30 94 L8 100" stroke="#4a4a4a" strokeWidth="1.5" fill="none" />
      
      <Path d="M60 88 L82 82" stroke="#4a4a4a" strokeWidth="1.5" fill="none" />
      <Path d="M60 91 L82 91" stroke="#4a4a4a" strokeWidth="1.5" fill="none" />
      <Path d="M60 94 L82 100" stroke="#4a4a4a" strokeWidth="1.5" fill="none" />
      
      {/* Front paws stretched out */}
      <Ellipse cx="30" cy="155" rx="18" ry="8" fill="#1a1a1a" />
      <Ellipse cx="60" cy="158" rx="15" ry="7" fill="#1a1a1a" />
      
      {/* Back paws */}
      <Ellipse cx="150" cy="155" rx="15" ry="8" fill="#1a1a1a" />
      <Ellipse cx="175" cy="152" rx="12" ry="7" fill="#1a1a1a" />
      
      {/* Tail - relaxed, slightly up */}
      <Path
        d="M178 115
           C195 110 200 125 195 140
           C192 150 180 155 170 150"
        stroke="#1a1a1a"
        strokeWidth="11"
        strokeLinecap="round"
        fill="none"
      />
    </Svg>
  );
};

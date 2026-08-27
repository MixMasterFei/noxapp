export const themes = {
  dark: {
    background: '#0D0D0D',
    surface: '#1A1A1A',
    surfaceSecondary: '#252525',
    text: '#F5F5F0',
    textSecondary: '#8A8A8A',
    accent: '#F5C518',
    accentSecondary: '#C4858B',
    border: '#333333',
    catBody: '#1a1a1a',
    catWhiskers: '#4a4a4a',
  },
  light: {
    background: '#F5F5F0',
    surface: '#FFFFFF',
    surfaceSecondary: '#EDEDE8',
    text: '#1A1A1A',
    textSecondary: '#6B6B6B',
    accent: '#F5C518',
    accentSecondary: '#C4858B',
    border: '#E0E0E0',
    catBody: '#1a1a1a',
    catWhiskers: '#4a4a4a',
  },
};

export type ThemeColors = typeof themes.dark;

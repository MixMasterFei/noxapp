# Nox - Pomodoro Timer 🐱

A minimalist Pomodoro timer with an adorable black cat companion.

## Features

- **Focus Timer**: 25-minute focus sessions with customizable durations
- **Breaks**: Short breaks (5 min) and long breaks (15 min) after 4 sessions
- **Cat Companion**: Watch your cat friend through different states:
  - **Idle**: Sitting cat with bright yellow eyes, ready to help you focus
  - **Focus**: Pounce pose - your cat is hunting productivity with you!
  - **Break**: Cozy loaf pose with closed eyes - rest time
  - **Done**: Happy stretching cat celebrating completed sessions
- **Paw Stamps**: Track completed focus sessions on a calendar with paw prints
- **Ambient Sounds**: Rain, Night, and Purr loops to help you concentrate
- **Dark/Light Theme**: Night ink mode (default) or cream light mode
- **Bilingual**: Full English and French language support
- **Local-first**: All data stored locally, no accounts required

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start the development server
npx expo start --web
```

### Running on Web

```bash
npx expo start --web
```

The app runs best in a mobile viewport (390×844) for the intended experience.

### Running on Mobile

```bash
# iOS (requires macOS)
npx expo start --ios

# Android
npx expo start --android
```

## Tech Stack

- **Expo** (SDK 57) - React Native development platform
- **React Native** - Cross-platform mobile framework
- **TypeScript** - Type-safe JavaScript
- **React Navigation** - Navigation library
- **AsyncStorage** - Local data persistence
- **react-native-svg** - SVG rendering for cat illustrations
- **expo-av** - Audio playback for ambient sounds

## Project Structure

```
src/
├── components/
│   ├── cats/           # Cat SVG illustrations
│   ├── PawStamp.tsx    # Paw print stamp component
│   └── SessionDots.tsx # Session progress indicator
├── context/
│   └── AppContext.tsx  # Global app state (timer, settings, sessions)
├── i18n/
│   └── translations.ts # EN/FR translations
├── navigation/
│   └── AppNavigator.tsx # Bottom tab navigation
├── screens/
│   ├── TimerScreen.tsx   # Main timer view
│   ├── CalendarScreen.tsx # Session history calendar
│   ├── ProfileScreen.tsx  # Settings
│   └── FirstRunScreen.tsx # Onboarding
└── utils/
    └── theme.ts        # Dark/light theme colors
```

## Design

### Visual Style

- **Night/Ink Mode** (default): Dark backgrounds with cream text
- **Light/Cream Mode**: Light backgrounds with dark text
- **Accent Color**: #F5C518 (yellow) for cat eyes and highlights
- **Secondary**: #C4858B (dusty pink) for cat ear interiors

### Cat Artwork

All cat illustrations are original SVG artwork created specifically for Nox. The character features:
- Solid black body with subtle texture
- Large expressive yellow eyes
- Pink inner ears
- Gray triangle nose
- Long whiskers
- Expressive tail

## License

MIT

export type Language = 'en' | 'fr';

export const translations = {
  en: {
    // Timer modes
    focus: 'Focus',
    break: 'Break',
    longBreak: 'Long break',
    
    // Controls
    pause: 'Pause',
    start: 'Start',
    skip: 'Skip',
    
    // First run
    firstRunTitle: 'Stay.',
    firstRunSubtitle: 'Focus.',
    getStarted: 'Get Started',
    
    // Settings
    settings: 'Settings',
    focusDuration: 'Focus duration',
    breakDuration: 'Break duration',
    longBreakDuration: 'Long break duration',
    minutes: 'min',
    
    // Sounds
    sounds: 'Sounds',
    rain: 'Rain',
    night: 'Night',
    purr: 'Purr',
    off: 'Off',
    
    // Theme
    theme: 'Theme',
    dark: 'Dark',
    light: 'Light',
    
    // Language
    language: 'Language',
    english: 'English',
    french: 'Français',
    
    // Navigation
    timer: 'Timer',
    calendar: 'Calendar',
    profile: 'Profile',
    
    // Calendar
    today: 'Today',
    sessions: 'sessions',
    session: 'session',
    noSessions: 'No sessions yet',
    
    // Days
    sun: 'Sun',
    mon: 'Mon',
    tue: 'Tue',
    wed: 'Wed',
    thu: 'Thu',
    fri: 'Fri',
    sat: 'Sat',
    
    // Months
    january: 'January',
    february: 'February',
    march: 'March',
    april: 'April',
    may: 'May',
    june: 'June',
    july: 'July',
    august: 'August',
    september: 'September',
    october: 'October',
    november: 'November',
    december: 'December',
  },
  fr: {
    // Timer modes
    focus: 'Focus',
    break: 'Pause',
    longBreak: 'Pause longue',
    
    // Controls
    pause: 'Pause',
    start: 'Démarrer',
    skip: 'Passer',
    
    // First run
    firstRunTitle: 'Reste.',
    firstRunSubtitle: 'Concentre-toi.',
    getStarted: 'Commencer',
    
    // Settings
    settings: 'Paramètres',
    focusDuration: 'Durée focus',
    breakDuration: 'Durée pause',
    longBreakDuration: 'Durée pause longue',
    minutes: 'min',
    
    // Sounds
    sounds: 'Sons',
    rain: 'Pluie',
    night: 'Nuit',
    purr: 'Ronron',
    off: 'Off',
    
    // Theme
    theme: 'Thème',
    dark: 'Sombre',
    light: 'Clair',
    
    // Language
    language: 'Langue',
    english: 'English',
    french: 'Français',
    
    // Navigation
    timer: 'Timer',
    calendar: 'Calendrier',
    profile: 'Profil',
    
    // Calendar
    today: "Aujourd'hui",
    sessions: 'sessions',
    session: 'session',
    noSessions: 'Pas encore de sessions',
    
    // Days
    sun: 'Dim',
    mon: 'Lun',
    tue: 'Mar',
    wed: 'Mer',
    thu: 'Jeu',
    fri: 'Ven',
    sat: 'Sam',
    
    // Months
    january: 'Janvier',
    february: 'Février',
    march: 'Mars',
    april: 'Avril',
    may: 'Mai',
    june: 'Juin',
    july: 'Juillet',
    august: 'Août',
    september: 'Septembre',
    october: 'Octobre',
    november: 'Novembre',
    december: 'Décembre',
  },
};

export type TranslationKey = keyof typeof translations.en;

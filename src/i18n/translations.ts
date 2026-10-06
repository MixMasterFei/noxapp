export type Language = 'en' | 'fr';

export const translations = {
  en: {
    // Timer modes
    focus: 'Focus',
    break: 'Break',
    longBreak: 'Long break',
    done: 'Done',
    
    // Controls
    pause: 'Pause',
    start: 'Start',
    skip: 'Skip',
    
    // First run
    firstRunTitle: 'Stay.',
    firstRunSubtitle: 'Focus.',
    
    // Profile (not Settings)
    profile: 'Profile',
    
    // Duration labels (no "duration" word)
    focusLabel: 'Focus',
    breakLabel: 'Break',
    longBreakLabel: 'Long break',
    minutes: 'min',
    
    // Sounds
    sounds: 'Sounds',
    rain: 'Rain',
    night: 'Night',
    purr: 'Purr',
    
    // Theme
    theme: 'Theme',
    auto: 'Auto',
    dark: 'Dark',
    light: 'Light',
    
    // Language
    language: 'Language',
    english: 'English',
    french: 'Français',
    
    // Navigation
    timer: 'Timer',
    calendar: 'Calendar',
    
    // Calendar stats
    focused: 'Focused',
    days: 'days',
    day: 'day',
    time: 'Time',
    
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
    done: 'Terminé',
    
    // Controls
    pause: 'Pause',
    start: 'Démarrer',
    skip: 'Passer',
    
    // First run
    firstRunTitle: 'Reste.',
    firstRunSubtitle: 'Concentre-toi.',
    
    // Profile (not Settings)
    profile: 'Profil',
    
    // Duration labels (no "duration" word)
    focusLabel: 'Focus',
    breakLabel: 'Pause',
    longBreakLabel: 'Pause longue',
    minutes: 'min',
    
    // Sounds
    sounds: 'Sons',
    rain: 'Pluie',
    night: 'Nuit',
    purr: 'Ronron',
    
    // Theme
    theme: 'Thème',
    auto: 'Auto',
    dark: 'Sombre',
    light: 'Clair',
    
    // Language
    language: 'Langue',
    english: 'English',
    french: 'Français',
    
    // Navigation
    timer: 'Timer',
    calendar: 'Calendrier',
    
    // Calendar stats
    focused: 'Jours',
    days: 'jours',
    day: 'jour',
    time: 'Temps',
    
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

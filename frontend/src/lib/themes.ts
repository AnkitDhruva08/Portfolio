export interface Theme {
  id: string;
  name: string;
  type: 'light' | 'dark';
  colors: {
    primary: string;
    primaryLight: string;
    primaryLighter: string;
    accent: string;
    text: string;
    textSecondary: string;
    background: string;
  };
}

export const themes: Theme[] = [
  // Dark Themes
  {
    id: 'midnight-sophistication',
    name: 'Midnight Sophistication',
    type: 'dark',
    colors: {
      primary: '#0A1128',
      primaryLight: '#1A2744',
      primaryLighter: '#14213D',
      accent: '#D4AF37',
      text: '#F5F1E8',
      textSecondary: '#708090',
      background: '#0A1128',
    },
  },
  {
    id: 'ocean-depths',
    name: 'Ocean Depths',
    type: 'dark',
    colors: {
      primary: '#0B2438',
      primaryLight: '#1C3D5A',
      primaryLighter: '#154360',
      accent: '#FF6B6B',
      text: '#E8F4F8',
      textSecondary: '#7FB3D5',
      background: '#0B2438',
    },
  },
  {
    id: 'forest-night',
    name: 'Forest Night',
    type: 'dark',
    colors: {
      primary: '#0D1F0D',
      primaryLight: '#1A3A1A',
      primaryLighter: '#1E4620',
      accent: '#FFB84D',
      text: '#F0F4E8',
      textSecondary: '#8FA88F',
      background: '#0D1F0D',
    },
  },
  {
    id: 'royal-purple',
    name: 'Royal Purple',
    type: 'dark',
    colors: {
      primary: '#1A0A2E',
      primaryLight: '#2D1B4E',
      primaryLighter: '#3A2654',
      accent: '#E8A87C',
      text: '#F4EEFC',
      textSecondary: '#A78FB5',
      background: '#1A0A2E',
    },
  },
  {
    id: 'charcoal-elite',
    name: 'Charcoal Elite',
    type: 'dark',
    colors: {
      primary: '#1A1A1D',
      primaryLight: '#2E2E32',
      primaryLighter: '#3A3A3F',
      accent: '#4ECDC4',
      text: '#F5F5F5',
      textSecondary: '#A0A0A8',
      background: '#1A1A1D',
    },
  },
  // Light Themes
  {
    id: 'cream-elegance',
    name: 'Cream Elegance',
    type: 'light',
    colors: {
      primary: '#F5F1E8',
      primaryLight: '#FFFFFF',
      primaryLighter: '#FAF8F3',
      accent: '#2C3E50',
      text: '#2C3E50',
      textSecondary: '#5D6D7E',
      background: '#F5F1E8',
    },
  },
  {
    id: 'sage-serenity',
    name: 'Sage Serenity',
    type: 'light',
    colors: {
      primary: '#E8F0E8',
      primaryLight: '#F5FAF5',
      primaryLighter: '#FFFFFF',
      accent: '#6B4423',
      text: '#2D4A2D',
      textSecondary: '#5A7A5A',
      background: '#E8F0E8',
    },
  },
  {
    id: 'blush-professional',
    name: 'Blush Professional',
    type: 'light',
    colors: {
      primary: '#FAF0F0',
      primaryLight: '#FFF8F8',
      primaryLighter: '#FFFFFF',
      accent: '#C7577A',
      text: '#3D2632',
      textSecondary: '#6B4D58',
      background: '#FAF0F0',
    },
  },
  {
    id: 'sky-blue',
    name: 'Sky Blue',
    type: 'light',
    colors: {
      primary: '#E8F4F8',
      primaryLight: '#F5FAFB',
      primaryLighter: '#FFFFFF',
      accent: '#E67E22',
      text: '#1F3A4A',
      textSecondary: '#5D7A8A',
      background: '#E8F4F8',
    },
  },
  {
    id: 'warm-beige',
    name: 'Warm Beige',
    type: 'light',
    colors: {
      primary: '#F5EEE6',
      primaryLight: '#FAF6F0',
      primaryLighter: '#FFFFFF',
      accent: '#8B2635',
      text: '#3D2F2F',
      textSecondary: '#6B5858',
      background: '#F5EEE6',
    },
  },
  // Additional Dark Themes
  {
    id: 'slate-noir',
    name: 'Slate Noir',
    type: 'dark',
    colors: {
      primary: '#0F1419',
      primaryLight: '#1C2128',
      primaryLighter: '#252C35',
      accent: '#F7B731',
      text: '#E6EDF3',
      textSecondary: '#8B949E',
      background: '#0F1419',
    },
  },
  {
    id: 'emerald-night',
    name: 'Emerald Night',
    type: 'dark',
    colors: {
      primary: '#0A1810',
      primaryLight: '#152820',
      primaryLighter: '#1E3A2A',
      accent: '#A78BFA',
      text: '#E8F5E9',
      textSecondary: '#81C784',
      background: '#0A1810',
    },
  },
  {
    id: 'mocha-luxe',
    name: 'Mocha Luxe',
    type: 'dark',
    colors: {
      primary: '#1A1212',
      primaryLight: '#2A1F1F',
      primaryLighter: '#3A2929',
      accent: '#E8B4A0',
      text: '#F5EEE8',
      textSecondary: '#C4A69A',
      background: '#1A1212',
    },
  },
  {
    id: 'indigo-depths',
    name: 'Indigo Depths',
    type: 'dark',
    colors: {
      primary: '#0F0F23',
      primaryLight: '#1A1A3E',
      primaryLighter: '#252556',
      accent: '#FFC857',
      text: '#F0F0FA',
      textSecondary: '#9999C3',
      background: '#0F0F23',
    },
  },
  {
    id: 'obsidian-elegance',
    name: 'Obsidian Elegance',
    type: 'dark',
    colors: {
      primary: '#0D0D0D',
      primaryLight: '#1A1A1A',
      primaryLighter: '#2A2A2A',
      accent: '#FF6B9D',
      text: '#FAFAFA',
      textSecondary: '#A8A8A8',
      background: '#0D0D0D',
    },
  },
  // Additional Light Themes
  {
    id: 'pearl-white',
    name: 'Pearl White',
    type: 'light',
    colors: {
      primary: '#FAFBFC',
      primaryLight: '#FFFFFF',
      primaryLighter: '#F6F8FA',
      accent: '#0969DA',
      text: '#1F2328',
      textSecondary: '#656D76',
      background: '#FAFBFC',
    },
  },
  {
    id: 'lavender-mist',
    name: 'Lavender Mist',
    type: 'light',
    colors: {
      primary: '#F3F0F8',
      primaryLight: '#FAF8FC',
      primaryLighter: '#FFFFFF',
      accent: '#7C3AED',
      text: '#2E1F3D',
      textSecondary: '#6B5A7A',
      background: '#F3F0F8',
    },
  },
  {
    id: 'mint-fresh',
    name: 'Mint Fresh',
    type: 'light',
    colors: {
      primary: '#F0F8F5',
      primaryLight: '#F7FCFA',
      primaryLighter: '#FFFFFF',
      accent: '#059669',
      text: '#1A3A2E',
      textSecondary: '#4A6B5E',
      background: '#F0F8F5',
    },
  },
  {
    id: 'sand-stone',
    name: 'Sand Stone',
    type: 'light',
    colors: {
      primary: '#F8F4EE',
      primaryLight: '#FBF9F5',
      primaryLighter: '#FFFFFF',
      accent: '#D97706',
      text: '#3E2723',
      textSecondary: '#6D4C41',
      background: '#F8F4EE',
    },
  },
  {
    id: 'ice-crystal',
    name: 'Ice Crystal',
    type: 'light',
    colors: {
      primary: '#F0F5FA',
      primaryLight: '#F7FAFC',
      primaryLighter: '#FFFFFF',
      accent: '#0891B2',
      text: '#0F172A',
      textSecondary: '#475569',
      background: '#F0F5FA',
    },
  },
];

export const getThemeById = (id: string): Theme => {
  return themes.find(theme => theme.id === id) || themes[0];
};

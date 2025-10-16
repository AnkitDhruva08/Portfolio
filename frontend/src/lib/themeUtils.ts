import { Theme } from './themes';

export function getButtonTextColor(theme: Theme): string {
  if (theme.type === 'dark') return theme.colors.primary;
  // For light themes with dark accents
  if (theme.colors.accent === '#2C3E50' || 
      theme.colors.accent === '#6B4423' || 
      theme.colors.accent === '#8B2635') {
    return '#FFFFFF';
  }
  return theme.colors.text;
}

export function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

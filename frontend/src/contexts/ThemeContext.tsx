import React, { createContext, useContext, useState, useEffect } from 'react';
import { Theme, themes, getThemeById } from '../lib/themes';

interface ThemeContextType {
  currentTheme: Theme;
  setTheme: (themeId: string) => void;
  themes: Theme[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('portfolio-theme');
        return saved ? getThemeById(saved) : themes[0];
      } catch {
        return themes[0];
      }
    }
    return themes[0];
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('portfolio-theme', currentTheme.id);
      } catch (error) {
        console.error('Failed to save theme to localStorage:', error);
      }
      
      // Apply theme colors to CSS variables
      if (document?.documentElement) {
        document.documentElement.style.setProperty('--theme-primary', currentTheme.colors.primary);
        document.documentElement.style.setProperty('--theme-primary-light', currentTheme.colors.primaryLight);
        document.documentElement.style.setProperty('--theme-primary-lighter', currentTheme.colors.primaryLighter);
        document.documentElement.style.setProperty('--theme-accent', currentTheme.colors.accent);
        document.documentElement.style.setProperty('--theme-text', currentTheme.colors.text);
        document.documentElement.style.setProperty('--theme-text-secondary', currentTheme.colors.textSecondary);
        document.documentElement.style.setProperty('--theme-background', currentTheme.colors.background);
      }
    }
  }, [currentTheme]);

  const setTheme = (themeId: string) => {
    const theme = getThemeById(themeId);
    setCurrentTheme(theme);
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
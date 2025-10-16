import { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Palette, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function ThemeSwitcher() {
  const { currentTheme, setTheme, themes } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const darkThemes = themes.filter(t => t.type === 'dark');
  const lightThemes = themes.filter(t => t.type === 'light');

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300"
        style={{
          backgroundColor: `${currentTheme.colors.accent}26`,
          border: `1px solid ${currentTheme.colors.accent}4D`,
          color: currentTheme.colors.accent,
        }}
        aria-label="Change theme"
      >
        <Palette className="w-5 h-5" />
        <span className="hidden lg:inline" style={{ fontSize: '13px', fontFamily: 'Montserrat', fontWeight: 600, letterSpacing: '0.5px' }}>
          Themes
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Theme Dropdown */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 mt-3 w-80 max-h-[80vh] rounded-2xl shadow-2xl z-50 overflow-hidden"
              style={{
                backgroundColor: currentTheme.colors.primaryLight,
                border: `1px solid ${currentTheme.colors.accent}26`,
                backdropFilter: 'blur(24px)',
              }}
            >
              <div className="p-6 max-h-[80vh] overflow-y-auto"
                style={{
                  scrollbarWidth: 'thin',
                  scrollbarColor: `${currentTheme.colors.accent}66 ${currentTheme.colors.primary}`,
                }}
              >
                <h3 
                  className="mb-4"
                  style={{
                    fontSize: '16px',
                    fontFamily: 'Cormorant Garamond',
                    fontWeight: 600,
                    color: currentTheme.colors.text,
                    letterSpacing: '0.5px',
                  }}
                >
                  Choose Your Theme
                </h3>

                {/* Dark Themes */}
                <div className="mb-6">
                  <p 
                    className="mb-3"
                    style={{
                      fontSize: '11px',
                      fontFamily: 'Montserrat',
                      fontWeight: 600,
                      color: currentTheme.colors.accent,
                      textTransform: 'uppercase',
                      letterSpacing: '2px',
                    }}
                  >
                    Dark Themes
                  </p>
                  <div className="space-y-2">
                    {darkThemes.map((theme) => (
                      <button
                        key={theme.id}
                        onClick={() => {
                          setTheme(theme.id);
                          setIsOpen(false);
                        }}
                        className="w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-300 group"
                        style={{
                          backgroundColor: currentTheme.id === theme.id 
                            ? `${currentTheme.colors.accent}1A` 
                            : 'transparent',
                          border: `1px solid ${currentTheme.id === theme.id 
                            ? currentTheme.colors.accent + '40' 
                            : 'transparent'}`,
                        }}
                      >
                        <div className="flex gap-1.5">
                          <div 
                            className="w-5 h-5 rounded-md"
                            style={{ backgroundColor: theme.colors.primary }}
                          />
                          <div 
                            className="w-5 h-5 rounded-md"
                            style={{ backgroundColor: theme.colors.accent }}
                          />
                        </div>
                        <span 
                          className="flex-1 text-left transition-colors duration-300"
                          style={{
                            fontSize: '14px',
                            fontFamily: 'Montserrat',
                            fontWeight: 500,
                            color: currentTheme.id === theme.id 
                              ? currentTheme.colors.text 
                              : currentTheme.colors.textSecondary,
                          }}
                        >
                          {theme.name}
                        </span>
                        {currentTheme.id === theme.id && (
                          <Check 
                            className="w-4 h-4" 
                            style={{ color: currentTheme.colors.accent }}
                          />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Light Themes */}
                <div>
                  <p 
                    className="mb-3"
                    style={{
                      fontSize: '11px',
                      fontFamily: 'Montserrat',
                      fontWeight: 600,
                      color: currentTheme.colors.accent,
                      textTransform: 'uppercase',
                      letterSpacing: '2px',
                    }}
                  >
                    Light Themes
                  </p>
                  <div className="space-y-2">
                    {lightThemes.map((theme) => (
                      <button
                        key={theme.id}
                        onClick={() => {
                          setTheme(theme.id);
                          setIsOpen(false);
                        }}
                        className="w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-300 group"
                        style={{
                          backgroundColor: currentTheme.id === theme.id 
                            ? `${currentTheme.colors.accent}1A` 
                            : 'transparent',
                          border: `1px solid ${currentTheme.id === theme.id 
                            ? currentTheme.colors.accent + '40' 
                            : 'transparent'}`,
                        }}
                      >
                        <div className="flex gap-1.5">
                          <div 
                            className="w-5 h-5 rounded-md border"
                            style={{ 
                              backgroundColor: theme.colors.primary,
                              borderColor: theme.colors.textSecondary + '30',
                            }}
                          />
                          <div 
                            className="w-5 h-5 rounded-md"
                            style={{ backgroundColor: theme.colors.accent }}
                          />
                        </div>
                        <span 
                          className="flex-1 text-left transition-colors duration-300"
                          style={{
                            fontSize: '14px',
                            fontFamily: 'Montserrat',
                            fontWeight: 500,
                            color: currentTheme.id === theme.id 
                              ? currentTheme.colors.text 
                              : currentTheme.colors.textSecondary,
                          }}
                        >
                          {theme.name}
                        </span>
                        {currentTheme.id === theme.id && (
                          <Check 
                            className="w-4 h-4" 
                            style={{ color: currentTheme.colors.accent }}
                          />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

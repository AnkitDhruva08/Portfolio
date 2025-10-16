import { useTheme } from "../contexts/ThemeContext";

export function ThemeShowcase() {
  const { currentTheme } = useTheme();
  
  return (
    <div 
      className="fixed bottom-4 left-4 p-4 rounded-lg shadow-lg z-40"
      style={{
        backgroundColor: currentTheme.colors.primaryLight,
        border: `2px solid ${currentTheme.colors.accent}`,
      }}
    >
      <div className="space-y-2">
        <p style={{ 
          fontSize: '12px', 
          fontWeight: 600,
          color: currentTheme.colors.accent,
          fontFamily: 'Montserrat'
        }}>
          Current Theme
        </p>
        <p style={{ 
          fontSize: '14px',
          fontWeight: 500,
          color: currentTheme.colors.text,
          fontFamily: 'Montserrat'
        }}>
          {currentTheme.name}
        </p>
        <div className="flex gap-2 mt-2">
          <div 
            className="w-6 h-6 rounded"
            style={{ backgroundColor: currentTheme.colors.primary }}
            title="Primary"
          />
          <div 
            className="w-6 h-6 rounded"
            style={{ backgroundColor: currentTheme.colors.accent }}
            title="Accent"
          />
          <div 
            className="w-6 h-6 rounded border"
            style={{ 
              backgroundColor: currentTheme.colors.text,
              borderColor: currentTheme.colors.textSecondary 
            }}
            title="Text"
          />
        </div>
      </div>
    </div>
  );
}

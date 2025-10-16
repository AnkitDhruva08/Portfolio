# Portfolio Theme System Guide

This portfolio includes a comprehensive theme system with 10 beautiful themes (5 dark and 5 light).

## Available Themes

### Dark Themes
1. **Midnight Sophistication** - Deep navy & warm gold (default)
2. **Ocean Depths** - Deep teal & coral
3. **Forest Night** - Dark green & amber
4. **Royal Purple** - Deep purple & rose gold
5. **Charcoal Elite** - Dark gray & electric blue

### Light Themes
1. **Cream Elegance** - Cream & navy
2. **Sage Serenity** - Soft green & brown
3. **Blush Professional** - Light pink & deep rose
4. **Sky Blue** - Light blue & orange
5. **Warm Beige** - Beige & burgundy

## How to Use

The theme switcher is located in the navigation bar (desktop) and mobile menu. Click the "Themes" button to see all available options.

## Theme Structure

Each theme includes:
- `primary`: Main background color
- `primaryLight`: Lighter shade for cards
- `primaryLighter`: Even lighter shade for elevated elements
- `accent`: Accent color (gold, coral, amber, etc.)
- `text`: Primary text color
- `textSecondary`: Secondary text color
- `background`: Overall background color

## Implementing Themes in New Components

To make a component theme-aware:

```tsx
import { useTheme } from "../contexts/ThemeContext";
import { getButtonTextColor } from "../lib/themeUtils";

export function YourComponent() {
  const { currentTheme } = useTheme();
  
  return (
    <div style={{ backgroundColor: currentTheme.colors.background }}>
      <h1 style={{ color: currentTheme.colors.text }}>Title</h1>
      <p style={{ color: currentTheme.colors.textSecondary }}>Description</p>
      <button 
        style={{
          backgroundColor: currentTheme.colors.accent,
          color: getButtonTextColor(currentTheme)
        }}
      >
        Click Me
      </button>
    </div>
  );
}
```

## Components Already Updated

✅ App.tsx (ThemeProvider wrapper)
✅ Navigation.tsx (with ThemeSwitcher)
✅ HeroSection.tsx
✅ BackToTop.tsx

## Components To Update

The following components still use hardcoded colors and should be updated to use `currentTheme.colors`:

- AboutSection.tsx
- WorkSection.tsx
- SkillsSection.tsx
- ExperienceSection.tsx
- ContactSection.tsx
- Footer.tsx

### Pattern to Follow

Replace hardcoded colors:
- `#0A1128` → `currentTheme.colors.primary`
- `#1A2744` → `currentTheme.colors.primaryLight`
- `#14213D` → `currentTheme.colors.primaryLighter`
- `#D4AF37` → `currentTheme.colors.accent`
- `#F5F1E8` → `currentTheme.colors.text`
- `#708090` → `currentTheme.colors.textSecondary`

For rgba/transparency, use template literals:
- `rgba(212, 175, 55, 0.15)` → `` `${currentTheme.colors.accent}26` ``
- `rgba(212, 175, 55, 0.5)` → `` `${currentTheme.colors.accent}80` ``

## Customization

To add a new theme, edit `/lib/themes.ts`:

```tsx
{
  id: 'your-theme-id',
  name: 'Your Theme Name',
  type: 'dark', // or 'light'
  colors: {
    primary: '#HEX',
    primaryLight: '#HEX',
    primaryLighter: '#HEX',
    accent: '#HEX',
    text: '#HEX',
    textSecondary: '#HEX',
    background: '#HEX',
  },
}
```

## Theme Persistence

The selected theme is automatically saved to `localStorage` and persists across page reloads.

## Utility Functions

- `getButtonTextColor(theme)` - Returns appropriate text color for buttons based on theme type
- `hexToRgba(hex, alpha)` - Converts hex color to rgba with specified alpha

Located in `/lib/themeUtils.ts`

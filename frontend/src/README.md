# Professional Portfolio with Multiple Themes

A stunning, fully responsive portfolio website with **10 beautiful themes** (5 dark + 5 light).

## 🎨 Features

- **10 Professional Themes** - Switch between dark and light themes instantly
- **Smooth Animations** - Motion-powered transitions and effects
- **Fully Responsive** - Optimized for desktop, tablet, and mobile
- **Theme Persistence** - Your theme choice is saved automatically
- **Modern Design** - Sophisticated layouts with elegant typography
- **Interactive Components** - Hover effects, animated particles, floating cards

## 🌈 Available Themes

### Dark Themes
1. **Midnight Sophistication** (Default) - Deep navy & warm gold
2. **Ocean Depths** - Deep teal & vibrant coral  
3. **Forest Night** - Dark forest green & warm amber
4. **Royal Purple** - Deep purple & rose gold
5. **Charcoal Elite** - Modern gray & electric blue

### Light Themes
6. **Cream Elegance** - Soft cream & professional navy
7. **Sage Serenity** - Gentle sage green & earthy brown
8. **Blush Professional** - Delicate blush pink & deep rose
9. **Sky Blue** - Fresh sky blue & energetic orange
10. **Warm Beige** - Cozy beige & rich burgundy

## 🚀 Quick Start

### Using the Theme Switcher

1. Look for the **"Themes"** button in the navigation bar (paint palette icon)
2. Click it to see all available themes
3. Select any theme - your choice is automatically saved!
4. The theme persists across page reloads

### Customization

To customize the portfolio:

1. **Personal Information**
   - Edit text in each section component (`/components/*Section.tsx`)
   - Update name, title, description, etc.

2. **Images**
   - Replace placeholder images with your own
   - Update image URLs in components

3. **Add New Themes**
   - Edit `/lib/themes.ts`
   - Add your custom color palette
   - Follow the existing theme structure

4. **Social Links**
   - Update href values in Navigation, Hero, and Footer components
   - Add your LinkedIn, GitHub, Twitter, Dribbble links

## 📁 Project Structure

```
├── components/
│   ├── Navigation.tsx          # Nav bar with theme switcher
│   ├── HeroSection.tsx         # Hero with animated particles
│   ├── AboutSection.tsx        # About section
│   ├── WorkSection.tsx         # Portfolio grid
│   ├── SkillsSection.tsx       # Skills showcase
│   ├── ExperienceSection.tsx   # Timeline
│   ├── ContactSection.tsx      # Contact form
│   ├── Footer.tsx              # Footer
│   ├── BackToTop.tsx           # Scroll to top button
│   ├── ThemeSwitcher.tsx       # Theme selector dropdown
│   └── ui/                     # ShadCN components
├── contexts/
│   └── ThemeContext.tsx        # Theme state management
├── lib/
│   ├── themes.ts               # Theme definitions
│   └── themeUtils.ts           # Theme helper functions
├── styles/
│   └── globals.css             # Global styles & fonts
└── App.tsx                     # Main app component
```

## 🎯 Sections

1. **Hero** - Eye-catching introduction with animated particles
2. **About** - Professional background and timeline
3. **Work** - Filterable project portfolio
4. **Skills** - Technical expertise with proficiency indicators
5. **Experience** - Professional timeline
6. **Contact** - Contact form and information
7. **Footer** - Links and newsletter signup

## 🛠️ Tech Stack

- **React** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Styling
- **Motion (Framer Motion)** - Animations
- **Lucide React** - Icons
- **ShadCN/UI** - Component library
- **Sonner** - Toast notifications

## 💡 Theme System Details

### How It Works

The theme system uses React Context to provide theme data to all components:

```tsx
import { useTheme } from "../contexts/ThemeContext";

function MyComponent() {
  const { currentTheme } = useTheme();
  
  return (
    <div style={{ backgroundColor: currentTheme.colors.primary }}>
      <h1 style={{ color: currentTheme.colors.text }}>Hello</h1>
    </div>
  );
}
```

### Color Properties

Each theme includes:
- `primary` - Main background color
- `primaryLight` - Lighter shade for cards/sections
- `primaryLighter` - Even lighter for elevated elements
- `accent` - Accent color (CTA buttons, highlights)
- `text` - Primary text color
- `textSecondary` - Secondary/muted text
- `background` - Overall page background

### Adding a New Theme

Edit `/lib/themes.ts`:

```tsx
{
  id: 'my-theme',
  name: 'My Custom Theme',
  type: 'dark', // or 'light'
  colors: {
    primary: '#123456',
    primaryLight: '#234567',
    primaryLighter: '#345678',
    accent: '#FF6B6B',
    text: '#FFFFFF',
    textSecondary: '#AAAAAA',
    background: '#123456',
  },
}
```

## 📝 Customization Guide

### Update Your Information

1. **Name & Title** - Search for "John Doe" and replace
2. **Images** - Replace Unsplash URLs with your images
3. **Projects** - Edit project data in `WorkSection.tsx`
4. **Skills** - Modify skills arrays in `SkillsSection.tsx`
5. **Experience** - Update timeline in `ExperienceSection.tsx`
6. **Contact Info** - Change email/phone in `ContactSection.tsx`

### Fonts

The portfolio uses:
- **Cormorant Garamond** - Elegant serif for headings
- **Montserrat** - Clean sans-serif for body text

Both are loaded via Google Fonts in `globals.css`.

## 🎨 Current Theme Implementation Status

**Fully Theme-Aware:**
- ✅ Navigation & Theme Switcher
- ✅ Hero Section
- ✅ Back to Top Button
- ✅ App Background

**Using Default Colors (Midnight Sophistication):**
- About, Work, Skills, Experience, Contact, Footer sections

> These sections still display beautifully! They use the Midnight Sophistication color palette. To make them fully theme-aware, update them to use the `useTheme()` hook as shown in `HeroSection.tsx`.

## 📱 Responsive Design

- **Desktop** (>768px) - Full layout with all features
- **Tablet** (768px-1024px) - Adjusted grid layouts
- **Mobile** (<768px) - Stacked layout with hamburger menu

## 🌟 Key Features

- **Animated Particles** - Floating gold particles in hero
- **Smooth Scrolling** - Seamless navigation between sections
- **Hover Effects** - Interactive elements throughout
- **Form Validation** - Contact form with success/error states
- **Filter System** - Portfolio filtering by category
- **Timeline Animation** - Animated experience timeline
- **Floating Stats** - Dynamic stat cards in hero
- **Theme Persistence** - Saves to localStorage

## 📄 License

Free to use for personal portfolios. Customize as needed!

## 🙏 Credits

- Design System: Midnight Sophistication style guide
- Icons: Lucide React
- Images: Unsplash
- Fonts: Google Fonts (Cormorant Garamond, Montserrat)

---

**Made with ❤️ using React, Tailwind, and Motion**

For questions or support, refer to `/THEME_GUIDE.md` for detailed theming documentation.

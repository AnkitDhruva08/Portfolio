import { Navigation } from "./components/Navigation";
import { HeroSection } from "./components/HeroSection";
import { AboutSection } from "./components/AboutSection";
import { WorkSection } from "./components/WorkSection";
import { SkillsSection } from "./components/SkillsSection";
import { ExperienceSection } from "./components/ExperienceSection";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";
import { BackToTop } from "./components/BackToTop";
import { Toaster } from "./components/ui/sonner";
import { ThemeProvider, useTheme } from "./contexts/ThemeContext";

function AppContent() {
  const { currentTheme } = useTheme();
  
  return (
    <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: currentTheme.colors.background }}>
      <Navigation />
      <HeroSection />
      <AboutSection />
      <WorkSection />
      <SkillsSection />
      <ExperienceSection />
      <ContactSection />
      <Footer />
      <BackToTop />
      <Toaster position="top-center" />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
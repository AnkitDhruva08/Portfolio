"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronUp } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import { getButtonTextColor } from "../lib/themeUtils";

export function BackToTop() {
  const { currentTheme } = useTheme();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className="fixed bottom-10 right-10 z-50 w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300"
          style={{
            backgroundColor: currentTheme.colors.accent,
            boxShadow: `0 6px 24px ${currentTheme.colors.accent}4D`,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = `0 8px 32px ${currentTheme.colors.accent}80`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = `0 6px 24px ${currentTheme.colors.accent}4D`;
          }}
        >
          <ChevronUp size={24} style={{ color: getButtonTextColor(currentTheme) }} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

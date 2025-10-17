"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { fetchPersonalInfo } from "./ui/utils";

export function Navigation() {
  const { currentTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [personalInfo, setPersonalInfo] = useState<{ name?: string }>({});

  // Load personal info from backend
  const loadPersonalInfo = async () => {
    try {
      const data = await fetchPersonalInfo();
      setPersonalInfo(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadPersonalInfo();
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Work", href: "#work" },
    { name: "Skills", href: "#skills" },
    { name: "Experience", href: "#experience" },
    { name: "Contact", href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  // Get initials from name if available
  const getInitials = (name: string | undefined) => {
    if (!name) return 
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4 }}
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          backgroundColor: `${currentTheme.colors.primary}EB`,
          backdropFilter: "blur(24px)",
          borderBottom: `1px solid ${currentTheme.colors.accent}26`,
          boxShadow: isScrolled
            ? `0 4px 20px ${currentTheme.colors.primary}4D`
            : "none",
        }}
      >
        <div className="max-w-[1400px] mx-auto px-8 md:px-20 h-16 md:h-[72px] flex items-center justify-between">
          {/* Logo / Name Initials */}
          <motion.div
            className="relative group cursor-pointer"
            whileHover={{ scale: 1.05 }}
          >
            <span
              className="font-['Cormorant_Garamond'] transition-all duration-300"
              style={{
                fontSize: "24px",
                fontWeight: 600,
                color: currentTheme.colors.text,
                textShadow: "0 0 20px rgba(212, 175, 55, 0)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.textShadow = `0 0 20px ${currentTheme.colors.accent}66`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.textShadow = "0 0 20px rgba(212, 175, 55, 0)";
              }}
            >
              {getInitials(personalInfo.name)}
            </span>
            <div
              className="absolute -bottom-1 left-0 w-5 h-0.5"
              style={{ backgroundColor: currentTheme.colors.accent }}
            />
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.href);
                  setActiveSection(link.name.toLowerCase());
                }}
                className="relative group"
              >
                <span
                  className="font-['Montserrat'] uppercase tracking-[1.5px] transition-colors duration-300"
                  style={{
                    fontSize: "14px",
                    color:
                      activeSection === link.name.toLowerCase()
                        ? currentTheme.colors.text
                        : currentTheme.colors.textSecondary,
                  }}
                >
                  {link.name}
                </span>
                <div
                  className="absolute -bottom-2 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-300"
                  style={{ backgroundColor: currentTheme.colors.accent }}
                />
              </a>
            ))}
          </div>

          {/* CTA & Theme Switcher - Desktop */}
          <div className="hidden md:flex items-center gap-4">
            <ThemeSwitcher />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleLinkClick("#contact")}
              className="font-['Montserrat'] px-7 py-3 rounded-md transition-all duration-300"
              style={{
                backgroundColor: currentTheme.colors.accent,
                color:
                  currentTheme.type === "dark"
                    ? currentTheme.colors.primary
                    : currentTheme.colors.accent === "#2C3E50"
                    ? "#F5F1E8"
                    : currentTheme.colors.primary,
                fontSize: "14px",
                fontWeight: 600,
              }}
            >
              Let's Talk
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X size={24} style={{ color: currentTheme.colors.accent }} />
            ) : (
              <Menu size={24} style={{ color: currentTheme.colors.accent }} />
            )}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 md:hidden"
            style={{
              backgroundColor: `${currentTheme.colors.primary}F5`,
              backdropFilter: "blur(24px)",
            }}
          >
            <div className="flex flex-col items-center justify-center h-full space-y-8">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(link.href);
                  }}
                  className="relative group"
                >
                  <span
                    className="font-['Montserrat'] uppercase tracking-[1.5px]"
                    style={{
                      fontSize: "18px",
                      color: currentTheme.colors.text,
                    }}
                  >
                    {link.name}
                  </span>
                  <div
                    className="absolute -bottom-2 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-300"
                    style={{ backgroundColor: currentTheme.colors.accent }}
                  />
                </motion.a>
              ))}

              <div className="pt-8">
                <ThemeSwitcher />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

"use client";

import { motion } from "motion/react";
import { Linkedin, Github, Twitter, Dribbble, Heart } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

export function Footer() {
  const { currentTheme } = useTheme();
  
  const quickLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Portfolio", href: "#work" },
    { name: "Skills", href: "#skills" },
    { name: "Experience", href: "#experience" },
    { name: "Contact", href: "#contact" },
  ];

  const socialLinks = [
    { icon: Linkedin, href: "#" },
    { icon: Github, href: "#" },
    { icon: Twitter, href: "#" },
    { icon: Dribbble, href: "#" },
  ];

  return (
    <footer
      className="relative py-20 border-t"
      style={{
        backgroundColor: currentTheme.colors.primary,
        borderTopColor: `${currentTheme.colors.accent}33`,
      }}
    >
      {/* Decorative accent line */}
      <div 
        className="absolute top-0 left-1/2 transform -translate-x-1/2 h-1 w-32 rounded-full"
        style={{
          background: `linear-gradient(90deg, transparent, ${currentTheme.colors.accent}, transparent)`,
        }}
      />
      
      <div className="max-w-[1400px] mx-auto px-8 md:px-20">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-[40%_30%_30%] gap-12 mb-16">
          {/* Left Column - Brand */}
          <div>
            <h2
              className="font-['Cormorant_Garamond'] mb-4"
              style={{
                fontSize: "32px",
                fontWeight: 600,
                color: currentTheme.colors.text,
              }}
            >
              John Doe
            </h2>
            <p
              className="font-['Montserrat'] max-w-xs mb-7"
              style={{
                fontSize: "15px",
                color: currentTheme.colors.textSecondary,
                lineHeight: 1.6,
              }}
            >
              Crafting digital experiences with precision, passion, and purpose.
            </p>

            {/* Social Icons */}
            <div className="flex gap-5 mb-8">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={index}
                    href={social.href}
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="transition-all duration-300"
                    style={{
                      color: `${currentTheme.colors.accent}99`,
                      filter: "drop-shadow(0 0 0px transparent)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = currentTheme.colors.accent;
                      e.currentTarget.style.filter = `drop-shadow(0 0 8px ${currentTheme.colors.accent}99)`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = `${currentTheme.colors.accent}99`;
                      e.currentTarget.style.filter = "drop-shadow(0 0 0px transparent)";
                    }}
                  >
                    <Icon size={20} />
                  </motion.a>
                );
              })}
            </div>

            <p
              className="font-['Montserrat']"
              style={{
                fontSize: "12px",
                fontWeight: 300,
                color: `${currentTheme.colors.textSecondary}99`,
              }}
            >
              © 2025 John Doe. All rights reserved.
            </p>
          </div>

          {/* Middle Column - Quick Links */}
          <div>
            <h3
              className="font-['Montserrat'] mb-5"
              style={{
                fontSize: "16px",
                fontWeight: 600,
                color: currentTheme.colors.text,
                letterSpacing: "0.5px",
              }}
            >
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="font-['Montserrat'] inline-flex items-center gap-2 group transition-all duration-300"
                    style={{
                      fontSize: "14px",
                      color: currentTheme.colors.textSecondary,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = currentTheme.colors.accent;
                      e.currentTarget.style.transform = "translateX(4px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = currentTheme.colors.textSecondary;
                      e.currentTarget.style.transform = "translateX(0)";
                    }}
                  >
                    <span
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ color: currentTheme.colors.accent }}
                    >
                      →
                    </span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column - Newsletter */}
          <div>
            <h3
              className="font-['Montserrat'] mb-5"
              style={{
                fontSize: "16px",
                fontWeight: 600,
                color: currentTheme.colors.text,
                letterSpacing: "0.5px",
              }}
            >
              Stay Updated
            </h3>
            <p
              className="font-['Montserrat'] mb-5"
              style={{
                fontSize: "13px",
                color: currentTheme.colors.textSecondary,
                lineHeight: 1.6,
              }}
            >
              Get occasional updates about my latest work and insights
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Thank you for subscribing!");
              }}
              className="flex mb-3"
            >
              <input
                type="email"
                placeholder="Your email"
                required
                className="flex-1 px-4 py-3 rounded-l-lg font-['Montserrat'] focus:outline-none"
                style={{
                  backgroundColor: currentTheme.colors.background,
                  border: `1px solid ${currentTheme.colors.accent}40`,
                  fontSize: "14px",
                  color: currentTheme.colors.text,
                }}
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-r-lg font-['Montserrat'] hover:brightness-110 transition-all duration-300"
                style={{
                  backgroundColor: currentTheme.colors.accent,
                  color: currentTheme.type === 'dark' ? currentTheme.colors.primary : currentTheme.colors.background,
                  fontSize: "14px",
                  fontWeight: 600,
                }}
              >
                Subscribe
              </button>
            </form>

            <p
              className="font-['Montserrat']"
              style={{
                fontSize: "11px",
                fontWeight: 300,
                color: `${currentTheme.colors.textSecondary}99`,
              }}
            >
              No spam. Unsubscribe anytime.
            </p>
          </div>
        </div>

        {/* Footer Bottom */}
        <div
          className="pt-6 flex flex-col md:flex-row justify-between items-center gap-4"
          style={{
            borderTop: `1px solid ${currentTheme.colors.accent}1A`,
          }}
        >
          <div className="flex flex-wrap gap-4 justify-center">
            {["Privacy Policy", "Terms of Service", "Cookies"].map((item, index) => (
              <a
                key={item}
                href="#"
                className="font-['Montserrat'] transition-colors duration-300"
                style={{
                  fontSize: "12px",
                  fontWeight: 300,
                  color: `${currentTheme.colors.textSecondary}99`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = currentTheme.colors.accent;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = `${currentTheme.colors.textSecondary}99`;
                }}
              >
                {index > 0 && <span className="mr-4">•</span>}
                {item}
              </a>
            ))}
          </div>

          <p
            className="font-['Montserrat'] flex items-center gap-2"
            style={{
              fontSize: "12px",
              fontWeight: 300,
              color: `${currentTheme.colors.textSecondary}99`,
            }}
          >
            Designed & Developed with{" "}
            <Heart size={14} fill={currentTheme.colors.accent} color={currentTheme.colors.accent} /> by John Doe
          </p>
        </div>
      </div>
    </footer>
  );
}
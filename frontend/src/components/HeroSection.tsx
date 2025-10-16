"use client";

import { motion } from "motion/react";
import { useTheme } from "../contexts/ThemeContext";

export function HeroSection() {
  const { currentTheme } = useTheme();

  const stats = [
    { number: "5+", label: "Years" },
    { number: "50+", label: "Projects" },
    { number: "30+", label: "Clients" },
  ];

  const getButtonTextColor = () => {
    if (currentTheme.type === 'dark') return currentTheme.colors.primary;
    // For light themes, use high contrast color
    return currentTheme.colors.text;
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: currentTheme.colors.background }}
    >
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(35)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 4 + 2 + "px",
              height: Math.random() * 4 + 2 + "px",
              backgroundColor: currentTheme.colors.accent,
              opacity: Math.random() * 0.4 + 0.2,
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
              filter: "blur(1px)",
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: Math.random() * 4 + 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="max-w-[1200px] mx-auto px-8 md:px-20 py-32 md:py-0 relative z-10">
        <div className="grid md:grid-cols-[60%_40%] gap-12 items-center">
          {/* Left Column - Text Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-block mb-6 px-5 py-2 rounded-full"
              style={{
                backgroundColor: `${currentTheme.colors.accent}26`,
                border: `1px solid ${currentTheme.colors.accent}4D`,
              }}
            >
              <span
                className="font-['Montserrat'] uppercase tracking-[2px]"
                style={{
                  fontSize: "11px",
                  color: currentTheme.colors.accent,
                }}
              >
                Available for Projects
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-['Cormorant_Garamond'] mb-8"
              style={{
                fontSize: "clamp(42px, 8vw, 68px)",
                fontWeight: 600,
                color: currentTheme.colors.text,
                lineHeight: 1.2,
                letterSpacing: "-0.4px",
              }}
            >
              Crafting Digital{" "}
              <span
                style={{
                  color: currentTheme.colors.accent,
                }}
              >
                Excellence
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="font-['Montserrat'] mb-7"
              style={{
                fontSize: "20px",
                fontWeight: 500,
                color: currentTheme.colors.text,
                letterSpacing: "0.5px",
              }}
            >
              John Doe - Senior Product Designer
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="font-['Montserrat'] max-w-[540px] mb-12"
              style={{
                fontSize: "17px",
                fontWeight: 400,
                color: currentTheme.colors.textSecondary,
                lineHeight: 1.75,
              }}
            >
              I transform complex problems into elegant, user-centered solutions that drive
              business growth and delight users at every touchpoint.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-wrap gap-4 mb-10"
            >
              <motion.button
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-9 py-4 rounded-lg font-['Montserrat'] transition-all duration-300"
                style={{
                  backgroundColor: currentTheme.colors.accent,
                  color: currentTheme.type === 'dark' ? '#0A1128' : '#FFFFFF',
                  fontSize: "15px",
                  fontWeight: 700,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = `0 8px 30px ${currentTheme.colors.accent}66`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                View My Work
              </motion.button>

              <motion.button
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-9 py-4 rounded-lg font-['Montserrat'] transition-all duration-300"
                style={{
                  backgroundColor: "transparent",
                  border: `2px solid ${currentTheme.colors.accent}80`,
                  color: currentTheme.colors.accent,
                  fontSize: "15px",
                  fontWeight: 700,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = currentTheme.colors.accent;
                  e.currentTarget.style.color = currentTheme.type === 'dark' ? '#0A1128' : '#FFFFFF';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = currentTheme.colors.accent;
                }}
              >
                Download Resume
              </motion.button>
            </motion.div>
          </div>

          {/* Right Column - Visual Element */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative hidden md:block"
          >
            <motion.div
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.5 }}
              className="relative rounded-2xl overflow-hidden"
              style={{
                border: `3px solid ${currentTheme.colors.accent}`,
                boxShadow: `0 20px 60px ${currentTheme.colors.accent}26`,
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1636545948913-c238e8a1b4bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMDNkJTIwZGFya3xlbnwxfHx8fDE3NTk5OTEwMTN8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Abstract 3D"
                className="w-full aspect-[3/4] object-cover"
              />
            </motion.div>

            {/* Floating Stats Cards */}
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 + index * 0.2 }}
                className="absolute px-5 py-4 rounded-xl glass-water liquid-shimmer"
                style={{
                  backdropFilter: "blur(16px) saturate(150%)",
                  border: `1px solid ${currentTheme.colors.accent}44`,
                  boxShadow: `0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)`,
                  top: index === 0 ? "10%" : index === 1 ? "45%" : "80%",
                  left: index === 0 ? "-20%" : index === 1 ? "90%" : "-15%",
                }}
              >
                <div
                  className="font-['Cormorant_Garamond'] mb-1"
                  style={{
                    fontSize: "32px",
                    color: currentTheme.colors.accent,
                    fontWeight: 600,
                  }}
                >
                  {stat.number}
                </div>
                <div
                  className="font-['Montserrat']"
                  style={{
                    fontSize: "12px",
                    color: currentTheme.colors.text,
                  }}
                >
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
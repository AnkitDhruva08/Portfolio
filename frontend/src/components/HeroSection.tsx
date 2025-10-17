"use client";
import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { useTheme } from "../contexts/ThemeContext";
import { fetchPersonalInfo, fetchProjects } from "./ui/utils";

export function HeroSection() {
  const { currentTheme } = useTheme();
  const [personalInfo, setPersonalInfo] = useState<any>(null);
  const [projects, setProjects] = useState<any[]>([]);

  const loadData = async () => {
    try {
      const info = await fetchPersonalInfo();
      console.log('info ==<<<>>', info)
      const projs = await fetchProjects();
      setPersonalInfo(info);
      setProjects(projs);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const stats = [
    {
      number: (personalInfo?.years_experience || 0) + "+",
      label: "Years Experience",
      icon: "⚡",
    },
    {
      number: (personalInfo?.projects_completed || 0) + "+",
      label: "Projects Completed",
      icon: "🚀",
    },
    {
      number: (personalInfo?.happy_clients || 0) + "+",
      label: "Happy Clients",
      icon: "⭐",
    },
  ];

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

      <div className="max-w-[1200px] mx-auto px-6 sm:px-8 lg:px-12 py-20 lg:py-0 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Text Content */}
          <div className="text-center lg:text-left">
            {/* Availability Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-block px-5 py-2 rounded-full mb-8"
              style={{
                backgroundColor: `${currentTheme.colors.accent}26`,
                border: `1px solid ${currentTheme.colors.accent}4D`,
              }}
            >
              <span
                className="font-['Montserrat'] uppercase tracking-wider text-sm font-semibold"
                style={{
                  color: currentTheme.colors.accent,
                }}
              >
                Open for New Roles & Freelance Projects
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-['Cormorant_Garamond'] mb-6 leading-tight"
              style={{
                fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
                fontWeight: 600,
                color: currentTheme.colors.text,
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
              }}
            >
              {personalInfo?.footer_tagline ||
                "Crafting scalable solutions with precision, passion, and purpose."}
            </motion.h1>

            {/* Name and Title */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="font-['Montserrat'] mb-6 text-xl lg:text-2xl"
              style={{
                fontWeight: 600,
                color: currentTheme.colors.accent,
                letterSpacing: "0.5px",
              }}
            >
              {personalInfo?.name || "Ankit Mishra"} -{" "}
              {personalInfo?.title || "Full Stack Python Developer"}
            </motion.p>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="font-['Montserrat'] max-w-2xl mx-auto lg:mx-0 mb-8 text-lg"
              style={{
                fontWeight: 400,
                color: currentTheme.colors.textSecondary,
                lineHeight: 1.7,
              }}
            >
              Transform complex problems into elegant, user-centered solutions
              that drive business growth and delight users at every touchpoint.
            </motion.p>

            {/* Action Buttons - In One Line */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-row gap-4 justify-center lg:justify-start mb-12"
            >
              <motion.button
                whileHover={{ y: -2, scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 rounded-lg font-['Montserrat'] transition-all duration-300 flex items-center gap-2 shadow-lg"
                style={{
                  backgroundColor: currentTheme.colors.accent,
                  color: currentTheme.type === "dark" ? "#0A1128" : "#FFFFFF",
                  fontSize: "16px",
                  fontWeight: 700,
                  minWidth: "160px",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = `0 8px 30px ${currentTheme.colors.accent}66`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 4px 15px rgba(0, 0, 0, 0.2)";
                }}
              >
                View My Work
                <motion.span
                  animate={{ x: [0, 3, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </motion.button>

              {personalInfo?.resume_pdf && (
  <a
    href={personalInfo.resume_pdf}
    download
    target="_blank"
    rel="noopener noreferrer"
  >
    <motion.button
      whileHover={{ y: -2, scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      className="px-8 py-4 rounded-lg font-['Montserrat'] transition-all duration-300 flex items-center gap-2 border-2"
      style={{
        backgroundColor: "transparent",
        borderColor: currentTheme.colors.accent,
        color: currentTheme.colors.accent,
        fontSize: "16px",
        fontWeight: 700,
        minWidth: "160px",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = currentTheme.colors.accent;
        e.currentTarget.style.color =
          currentTheme.type === "dark" ? "#0A1128" : "#FFFFFF";
        e.currentTarget.style.boxShadow = `0 8px 30px ${currentTheme.colors.accent}40`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "transparent";
        e.currentTarget.style.color = currentTheme.colors.accent;
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      Download Resume
      <motion.span
        animate={{ y: [0, 2, 0] }}
        transition={{ duration: 1, repeat: Infinity }}
      >
        ↓
      </motion.span>
    </motion.button>
  </a>
)}

            </motion.div>

            {/* Stats Cards - In One Line */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="flex justify-between items-center max-w-2xl mx-auto lg:mx-0 gap-6"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.08, y: -6 }}
                  className="relative flex flex-col items-center text-center p-6 rounded-3xl shadow-2xl border border-transparent overflow-hidden"
                  style={{
                    background: `radial-gradient(circle at left top, rgba(212, 175, 55, 0.314), transparent)`,
                    border: `1px solid ${currentTheme.colors.accent}30`,
                  }}
                >
                  {/* Icon with background */}
                  <div
                    className="flex items-center justify-center w-14 h-14 mb-4 rounded-full"
                    style={{
                      backgroundColor: `${currentTheme.colors.accent}40`,
                      color: currentTheme.colors.primary,
                    }}
                  >
                    {stat.icon}
                  </div>

                  {/* Number */}
                  <div
                    className="font-['Cormorant_Garamond'] mb-2"
                    style={{
                      color: currentTheme.colors.accent,
                      fontWeight: 700,
                      fontSize: "3rem", // Bigger numerical representation
                      lineHeight: 1.1,
                    }}
                  >
                    {stat.number}
                  </div>

                  {/* Label */}
                  <div
                    className="font-['Montserrat'] text-base lg:text-lg"
                    style={{
                      color: currentTheme.colors.text,
                      fontWeight: 500,
                      letterSpacing: "0.5px",
                    }}
                  >
                    {stat.label}
                  </div>

                  {/* Hover Glow Overlay */}
                  <div
                    className="absolute inset-0 rounded-3xl opacity-0 hover:opacity-30 transition-opacity duration-500"
                    style={{
                      background: `radial-gradient(circle at left top, ${currentTheme.colors.accent}50, transparent)`,
                    }}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right Column - Visual Element */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative hidden lg:block"
          >
            <motion.div
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.5 }}
              className="relative rounded-2xl overflow-hidden mx-auto"
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

              {/* Image Overlay Effect */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `linear-gradient(45deg, ${currentTheme.colors.accent}10, transparent 60%)`,
                }}
              />
            </motion.div>

            {/* Floating Elements for Visual Interest */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2, type: "spring" }}
              className="absolute -top-4 -right-4 w-20 h-20 rounded-full opacity-20"
              style={{
                backgroundColor: currentTheme.colors.accent,
                filter: "blur(15px)",
              }}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.4, type: "spring" }}
              className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full opacity-15"
              style={{
                backgroundColor: currentTheme.colors.accent,
                filter: "blur(20px)",
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

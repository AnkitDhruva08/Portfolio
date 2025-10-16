"use client";

import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { Code, Palette, Server, Smartphone, Layers, Database } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

export function SkillsSection() {
  const ref = useRef(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const { currentTheme } = useTheme();

  const skillCategories = [
    {
      icon: Code,
      title: "Frontend",
      skills: [
        { name: "React/Next.js", level: 5 },
        { name: "TypeScript", level: 5 },
        { name: "Tailwind CSS", level: 5 },
        { name: "Vue.js", level: 4 },
      ],
    },
    {
      icon: Palette,
      title: "Design",
      skills: [
        { name: "Figma", level: 5 },
        { name: "Adobe XD", level: 4 },
        { name: "Photoshop", level: 4 },
        { name: "Illustrator", level: 4 },
      ],
    },
    {
      icon: Server,
      title: "Backend",
      skills: [
        { name: "Node.js", level: 4 },
        { name: "Python", level: 3 },
        { name: "REST APIs", level: 4 },
        { name: "GraphQL", level: 3 },
      ],
    },
    {
      icon: Smartphone,
      title: "Mobile",
      skills: [
        { name: "React Native", level: 4 },
        { name: "Flutter", level: 3 },
        { name: "iOS Design", level: 4 },
        { name: "Android Design", level: 4 },
      ],
    },
    {
      icon: Layers,
      title: "UI/UX",
      skills: [
        { name: "User Research", level: 5 },
        { name: "Prototyping", level: 5 },
        { name: "Wireframing", level: 5 },
        { name: "Design Systems", level: 4 },
      ],
    },
    {
      icon: Database,
      title: "Tools",
      skills: [
        { name: "Git/GitHub", level: 5 },
        { name: "VS Code", level: 5 },
        { name: "Jira", level: 4 },
        { name: "Notion", level: 4 },
      ],
    },
  ];

  const tools = [
    "React", "Figma", "TypeScript", "Node.js", "Tailwind", "Next.js",
    "Adobe XD", "Git", "VS Code", "Photoshop", "Vue.js", "Firebase"
  ];

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative py-28 md:py-36"
      style={{
        background: `linear-gradient(to bottom, ${currentTheme.colors.background}, ${currentTheme.colors.primaryLighter})`,
      }}
    >
      <div ref={ref} className="max-w-[1200px] mx-auto px-8 md:px-20 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            className="font-['Montserrat'] uppercase tracking-[3px] mb-4"
            style={{
              fontSize: "12px",
              fontWeight: 600,
              color: currentTheme.colors.accent,
            }}
          >
            Expertise
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="font-['Cormorant_Garamond'] max-w-[720px] mx-auto mb-5"
            style={{
              fontSize: "clamp(36px, 6vw, 48px)",
              fontWeight: 600,
              color: currentTheme.colors.text,
              letterSpacing: "-0.3px",
              lineHeight: 1.3,
            }}
          >
            Skills & Technologies
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="font-['Montserrat'] max-w-[640px] mx-auto"
            style={{
              fontSize: "16px",
              color: currentTheme.colors.textSecondary,
            }}
          >
            Tools and technologies I work with to bring ideas to life
          </motion.p>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {skillCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 * index }}
                className="p-10 rounded-3xl transition-all duration-400 hover:-translate-y-2 group glass-water liquid-shimmer cursor-pointer"
                style={{
                  backdropFilter: "blur(14px) saturate(150%)",
                  border: `1px solid ${currentTheme.colors.accent}33`,
                  boxShadow: `0 6px 32px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.06)`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = `0 12px 48px ${currentTheme.colors.accent}33, inset 0 1px 0 rgba(255, 255, 255, 0.1)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = `0 6px 32px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.06)`;
                }}
                data-obstacle
              >
                <motion.div
                  whileHover={{ rotate: 5 }}
                  transition={{ duration: 0.3 }}
                  className="mb-6"
                >
                  <Icon size={56} color={currentTheme.colors.accent} strokeWidth={2} />
                </motion.div>

                <h3
                  className="font-['Cormorant_Garamond'] mb-5"
                  style={{
                    fontSize: "26px",
                    fontWeight: 600,
                    color: currentTheme.colors.text,
                  }}
                >
                  {category.title}
                </h3>

                <div className="space-y-3">
                  {category.skills.map((skill, i) => (
                    <div key={i} className="group/skill">
                      <div className="flex items-center justify-between mb-1">
                        <span
                          className="font-['Montserrat'] transition-colors"
                          style={{
                            fontSize: "15px",
                            color: currentTheme.colors.textSecondary,
                          }}
                        >
                          {skill.name}
                        </span>
                        <div className="flex gap-1">
                          {[...Array(5)].map((_, dotIndex) => (
                            <div
                              key={dotIndex}
                              className="w-2 h-2 rounded-full transition-all duration-300"
                              style={{
                                backgroundColor:
                                  dotIndex < skill.level
                                    ? currentTheme.colors.accent
                                    : `${currentTheme.colors.accent}33`,
                                boxShadow:
                                  dotIndex < skill.level
                                    ? `0 0 8px ${currentTheme.colors.accent}66`
                                    : "none",
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Tools Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <h3
            className="font-['Cormorant_Garamond'] mb-8"
            style={{
              fontSize: "32px",
              fontWeight: 600,
              color: currentTheme.colors.text,
            }}
          >
            Tools & Software
          </h3>

          <div className="flex flex-wrap justify-center gap-6 max-w-4xl mx-auto">
            {tools.map((tool, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.7 + index * 0.05 }}
                whileHover={{ scale: 1.1, y: -4 }}
                className="px-6 py-3 rounded-xl transition-all duration-300 cursor-pointer"
                style={{
                  backgroundColor: `${currentTheme.colors.accent}1A`,
                  border: `1px solid ${currentTheme.colors.accent}4D`,
                  boxShadow: `0 4px 12px rgba(0, 0, 0, 0.1)`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = `${currentTheme.colors.accent}33`;
                  e.currentTarget.style.borderColor = currentTheme.colors.accent;
                  e.currentTarget.style.boxShadow = `0 8px 24px ${currentTheme.colors.accent}44`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = `${currentTheme.colors.accent}1A`;
                  e.currentTarget.style.borderColor = `${currentTheme.colors.accent}4D`;
                  e.currentTarget.style.boxShadow = `0 4px 12px rgba(0, 0, 0, 0.1)`;
                }}
              >
                <span
                  className="font-['Montserrat']"
                  style={{
                    fontSize: "14px",
                    fontWeight: 500,
                    color: currentTheme.colors.accent,
                  }}
                >
                  {tool}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
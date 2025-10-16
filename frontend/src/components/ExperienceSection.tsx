"use client";

import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { Building2, GraduationCap } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

export function ExperienceSection() {
  const ref = useRef(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const { currentTheme } = useTheme();

  const experiences = [
    {
      company: "Tech Innovators Inc.",
      role: "Senior Product Designer",
      period: "Jan 2023 - Present",
      description:
        "Leading design initiatives for flagship products, mentoring junior designers, and establishing design systems.",
      achievements: [
        "Redesigned core product increasing user engagement by 45%",
        "Established company-wide design system used across 8 products",
        "Led team of 5 designers on major feature launches",
        "Reduced design-to-development handoff time by 60%",
      ],
      skills: ["Figma", "React", "Design Systems", "User Research"],
    },
    {
      company: "Creative Digital Studio",
      role: "Product Designer",
      period: "Jun 2021 - Dec 2022",
      description:
        "Designed user-centered solutions for diverse clients across e-commerce, SaaS, and mobile applications.",
      achievements: [
        "Delivered 25+ client projects with 100% satisfaction rate",
        "Improved client product conversion rates by average of 30%",
        "Conducted user research sessions with 200+ participants",
        "Won 'Best Digital Design' award at Design Summit 2022",
      ],
      skills: ["UI/UX", "Prototyping", "Adobe XD", "User Testing"],
    },
    {
      company: "StartUp Ventures",
      role: "UI/UX Designer",
      period: "Mar 2020 - May 2021",
      description:
        "Contributed to multiple product launches from concept to market, working closely with developers and stakeholders.",
      achievements: [
        "Designed MVP for 3 successful product launches",
        "Created interactive prototypes for investor presentations",
        "Collaborated with engineering on frontend implementation",
        "Established user feedback loops and analytics tracking",
      ],
      skills: ["Wireframing", "Prototyping", "HTML/CSS", "Analytics"],
    },
  ];

  const education = [
    {
      institution: "Design Academy",
      degree: "Master's in Interaction Design",
      year: "2019",
    },
    {
      institution: "University of Technology",
      degree: "Bachelor's in Computer Science",
      year: "2017",
    },
    {
      institution: "Google UX Certificate",
      degree: "UX Design Professional Certificate",
      year: "2020",
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative py-28 md:py-36"
      style={{
        backgroundColor: currentTheme.colors.primaryLight,
        backgroundImage: `radial-gradient(circle at 20% 50%, ${currentTheme.colors.accent}08 0%, transparent 50%)`,
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
            Journey
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
            Professional Experience
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
            Where I've grown and contributed to meaningful projects
          </motion.p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Center Line */}
          <div
            className="absolute left-1/2 top-0 bottom-0 w-0.5 hidden md:block"
            style={{ backgroundColor: currentTheme.colors.accent, transform: "translateX(-50%)" }}
          />

          {/* Experience Cards */}
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2 + index * 0.2 }}
                className={`relative md:w-[calc(50%-40px)] ${
                  index % 2 === 0 ? "md:mr-auto" : "md:ml-auto"
                }`}
                data-obstacle
              >
                {/* Timeline Dot - Perfectly Centered */}
                <div
                  className="absolute top-8 w-4 h-4 rounded-full hidden md:block"
                  style={{
                    backgroundColor: currentTheme.colors.accent,
                    boxShadow: `0 0 0 4px ${currentTheme.colors.primaryLight}, 0 0 12px ${currentTheme.colors.accent}99`,
                    [index % 2 === 0 ? "right" : "left"]: "-40px",
                    transform: index % 2 === 0 ? "translateX(50%)" : "translateX(-50%)",
                  }}
                />

                {/* Card */}
                <motion.div
                  whileHover={{ scale: 1.02, y: -4 }}
                  transition={{ duration: 0.3 }}
                  className="p-9 rounded-2xl cursor-pointer"
                  style={{
                    backdropFilter: "blur(14px) saturate(150%)",
                    border: `1px solid ${currentTheme.colors.accent}33`,
                    boxShadow: `0 8px 40px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.06)`,
                    background: `linear-gradient(135deg, ${currentTheme.colors.primary}40 0%, ${currentTheme.colors.primaryLight}60 100%)`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = `${currentTheme.colors.accent}99`;
                    e.currentTarget.style.boxShadow = `0 16px 64px ${currentTheme.colors.accent}33, inset 0 2px 0 rgba(255, 255, 255, 0.12)`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = `${currentTheme.colors.accent}33`;
                    e.currentTarget.style.boxShadow = `0 8px 40px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.06)`;
                  }}
                >
                  <div className="flex items-start gap-4 mb-5">
                    <div
                      className="p-3 rounded-lg"
                      style={{
                        backgroundColor: `${currentTheme.colors.accent}1A`,
                        border: `1px solid ${currentTheme.colors.accent}33`,
                      }}
                    >
                      <Building2 size={24} color={currentTheme.colors.accent} />
                    </div>
                    <div className="flex-1">
                      <div
                        className="font-['Montserrat'] mb-2"
                        style={{
                          fontSize: "12px",
                          fontWeight: 500,
                          color: currentTheme.colors.accent,
                          letterSpacing: "1px",
                        }}
                      >
                        {exp.period}
                      </div>
                      <h3
                        className="font-['Cormorant_Garamond'] mb-2"
                        style={{
                          fontSize: "24px",
                          fontWeight: 600,
                          color: currentTheme.colors.text,
                        }}
                      >
                        {exp.role}
                      </h3>
                      <p
                        className="font-['Montserrat']"
                        style={{
                          fontSize: "14px",
                          color: currentTheme.colors.textSecondary,
                        }}
                      >
                        {exp.company}
                      </p>
                    </div>
                  </div>

                  <p
                    className="font-['Montserrat'] mb-5"
                    style={{
                      fontSize: "15px",
                      color: currentTheme.colors.textSecondary,
                      lineHeight: 1.7,
                    }}
                  >
                    {exp.description}
                  </p>

                  <div className="mb-5">
                    <h4
                      className="font-['Montserrat'] mb-3"
                      style={{
                        fontSize: "13px",
                        fontWeight: 600,
                        color: currentTheme.colors.text,
                      }}
                    >
                      Key Achievements:
                    </h4>
                    <ul className="space-y-3">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <div
                            className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                            style={{ backgroundColor: currentTheme.colors.accent }}
                          />
                          <span
                            className="font-['Montserrat']"
                            style={{
                              fontSize: "14px",
                              color: currentTheme.colors.text,
                              lineHeight: 1.9,
                            }}
                          >
                            {achievement}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {exp.skills.map((skill, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-md font-['Montserrat']"
                        style={{
                          border: `1px solid ${currentTheme.colors.accent}`,
                          fontSize: "12px",
                          color: currentTheme.colors.accent,
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Education Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1 }}
          className="mt-24"
        >
          <h3
            className="font-['Cormorant_Garamond'] text-center mb-12"
            style={{
              fontSize: "32px",
              fontWeight: 600,
              color: currentTheme.colors.text,
            }}
          >
            Education & Certifications
          </h3>

          <div className="grid md:grid-cols-3 gap-6">
            {education.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1.2 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -8 }}
                className="p-6 rounded-xl text-center glass-water liquid-shimmer transition-all duration-500"
                style={{
                  backdropFilter: "blur(12px) saturate(150%)",
                  border: `1px solid ${currentTheme.colors.accent}33`,
                  boxShadow: `0 4px 16px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.06)`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = `${currentTheme.colors.accent}66`;
                  e.currentTarget.style.boxShadow = `0 12px 32px ${currentTheme.colors.accent}44, inset 0 1px 0 rgba(255, 255, 255, 0.1)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = `${currentTheme.colors.accent}33`;
                  e.currentTarget.style.boxShadow = `0 4px 16px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.06)`;
                }}
                data-obstacle
              >
                <div
                  className="inline-flex p-3 rounded-full mb-4"
                  style={{
                    backgroundColor: `${currentTheme.colors.accent}1A`,
                  }}
                >
                  <GraduationCap size={28} color={currentTheme.colors.accent} />
                </div>
                <h4
                  className="font-['Cormorant_Garamond'] mb-2"
                  style={{
                    fontSize: "20px",
                    fontWeight: 600,
                    color: currentTheme.colors.text,
                  }}
                >
                  {edu.degree}
                </h4>
                <p
                  className="font-['Montserrat'] mb-2"
                  style={{
                    fontSize: "14px",
                    color: currentTheme.colors.textSecondary,
                  }}
                >
                  {edu.institution}
                </p>
                <p
                  className="font-['Montserrat']"
                  style={{
                    fontSize: "13px",
                    color: currentTheme.colors.accent,
                    fontWeight: 500,
                  }}
                >
                  {edu.year}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
"use client";

import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef, useState } from "react";
import { useTheme } from "../contexts/ThemeContext";

export function WorkSection() {
  const ref = useRef(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [activeFilter, setActiveFilter] = useState("All");
  const { currentTheme } = useTheme();

  const filters = ["All", "Web Design", "Mobile Apps", "Branding", "UI/UX"];

  const projects = [
    {
      category: "Web Design",
      title: "E-Commerce Platform",
      description: "A modern e-commerce solution with seamless checkout experience",
      image: "https://images.unsplash.com/photo-1676792519027-7c42006d7b4a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3ZWIlMjBkZXNpZ258ZW58MXx8fHwxNzU5OTQwNjAwfDA&ixlib=rb-4.1.0&q=80&w=1080",
      tech: ["React", "Node.js", "Tailwind"],
      featured: true,
    },
    {
      category: "Mobile Apps",
      title: "Fitness Tracking App",
      description: "Mobile app for tracking workouts and nutrition goals",
      image: "https://images.unsplash.com/photo-1658953229625-aad99d7603b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBpbnRlcmZhY2V8ZW58MXx8fHwxNzU5ODcyNjEwfDA&ixlib=rb-4.1.0&q=80&w=1080",
      tech: ["React Native", "Firebase", "Redux"],
    },
    {
      category: "Branding",
      title: "Startup Brand Identity",
      description: "Complete brand identity design for tech startup",
      image: "https://images.unsplash.com/photo-1548094990-c16ca90f1f0d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmFuZGluZyUyMGRlc2lnbnxlbnwxfHx8fDE3NTk5NzcxNzN8MA&ixlib=rb-4.1.0&q=80&w=1080",
      tech: ["Illustrator", "Figma", "Photoshop"],
    },
    {
      category: "UI/UX",
      title: "SaaS Dashboard",
      description: "Analytics dashboard with real-time data visualization",
      image: "https://images.unsplash.com/photo-1629494893504-d41e26a02631?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1aSUyMGRlc2lnbiUyMG1vY2t1cHxlbnwxfHx8fDE3NTk5NzQ3MjB8MA&ixlib=rb-4.1.0&q=80&w=1080",
      tech: ["Vue.js", "D3.js", "TypeScript"],
    },
    {
      category: "Web Design",
      title: "Portfolio Website",
      description: "Creative portfolio for photographer showcasing their work",
      image: "https://images.unsplash.com/photo-1676792519027-7c42006d7b4a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3ZWIlMjBkZXNpZ258ZW58MXx8fHwxNzU5OTQwNjAwfDA&ixlib=rb-4.1.0&q=80&w=1080",
      tech: ["Next.js", "Sanity", "Tailwind"],
    },
  ];

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <section
      ref={ref}
      id="work"
      className="relative py-28 md:py-36"
      style={{ backgroundColor: currentTheme.colors.background }}
    >
      <div className="max-w-[1400px] mx-auto px-8 md:px-20">
        {/* Section Header */}
        <div className="text-center mb-16">
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
            Selected Work
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
            Projects That Showcase My Craft
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
            A selection of recent projects demonstrating my design and development capabilities
          </motion.p>
        </div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-2 mb-16"
        >
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className="px-6 py-3 rounded-lg font-['Montserrat'] transition-all duration-300 cursor-pointer"
              style={{
                fontSize: "14px",
                fontWeight: 500,
                backgroundColor:
                  activeFilter === filter ? `${currentTheme.colors.accent}26` : "transparent",
                border:
                  activeFilter === filter
                    ? `1px solid ${currentTheme.colors.accent}66`
                    : "1px solid transparent",
                color: activeFilter === filter ? currentTheme.colors.accent : currentTheme.colors.textSecondary,
              }}
            >
              {filter}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid - with Bouncing Ball */}
        <div ref={gridRef} className="relative" style={{ minHeight: "800px" }}>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 * index }}
                className={`group cursor-pointer ${project.featured ? "lg:col-span-2" : ""}`}
                data-project-card
              >
                <div
                  className="rounded-2xl overflow-hidden transition-all duration-400 hover:-translate-y-3 relative glass-water liquid-shimmer cursor-pointer"
                  style={{
                    backdropFilter: "blur(14px) saturate(150%)",
                    border: `1px solid ${currentTheme.colors.accent}33`,
                    boxShadow: `0 8px 40px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.08)`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = `0 16px 64px ${currentTheme.colors.accent}44, inset 0 1px 0 rgba(255, 255, 255, 0.12)`;
                    e.currentTarget.style.borderColor = `${currentTheme.colors.accent}66`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = `0 8px 40px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.08)`;
                    e.currentTarget.style.borderColor = `${currentTheme.colors.accent}33`;
                  }}
                >
                  {/* Project Image */}
                  <div className="relative overflow-hidden aspect-[16/10]">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-600"
                    />
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-center justify-center"
                      style={{ backgroundColor: `${currentTheme.colors.accent}26` }}
                    >
                      <span
                        className="font-['Montserrat'] px-6 py-3 rounded-lg"
                        style={{
                          backgroundColor: currentTheme.colors.accent,
                          color: currentTheme.type === 'dark' ? '#0A1128' : '#FFFFFF',
                          fontSize: "14px",
                          fontWeight: 700,
                        }}
                      >
                        View Project
                      </span>
                    </div>
                    {project.featured && (
                      <div
                        className="absolute top-4 right-4 px-3 py-1 rounded-full"
                        style={{
                          backgroundColor: currentTheme.colors.accent,
                          color: currentTheme.type === 'dark' ? currentTheme.colors.primary : currentTheme.colors.background,
                          fontSize: "11px",
                          fontWeight: 600,
                        }}
                      >
                        Featured
                      </div>
                    )}
                  </div>

                  {/* Project Content */}
                  <div className="p-8">
                    <div
                      className="inline-block px-3 py-1 rounded-full mb-4"
                      style={{
                        backgroundColor: `${currentTheme.colors.accent}1F`,
                        fontSize: "11px",
                        fontWeight: 600,
                        color: currentTheme.colors.accent,
                        textTransform: "uppercase",
                        letterSpacing: "1.5px",
                      }}
                    >
                      {project.category}
                    </div>

                    <h3
                      className="font-['Cormorant_Garamond'] mb-3 transition-colors duration-300"
                      style={{
                        fontSize: "28px",
                        fontWeight: 600,
                        color: currentTheme.colors.text,
                        lineHeight: 1.3,
                      }}
                    >
                      {project.title}
                    </h3>

                    <p
                      className="font-['Montserrat'] mb-5"
                      style={{
                        fontSize: "14px",
                        color: currentTheme.colors.textSecondary,
                        lineHeight: 1.7,
                      }}
                    >
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech.map((tech, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 rounded-md font-['Montserrat']"
                          style={{
                            border: `1px solid ${currentTheme.colors.textSecondary}4D`,
                            fontSize: "12px",
                            color: currentTheme.colors.textSecondary,
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <a
                      href="#"
                      className="inline-flex items-center gap-2 font-['Montserrat'] group/link"
                      style={{
                        fontSize: "13px",
                        fontWeight: 600,
                        color: currentTheme.colors.accent,
                      }}
                    >
                      View Case Study
                      <span className="group-hover/link:translate-x-1 transition-transform">
                        →
                      </span>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
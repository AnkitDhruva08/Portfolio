"use client";
import React, {useState, useRef, useEffect} from "react";
import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useTheme } from "../contexts/ThemeContext";
import { Server, Code, Plug, Database, Settings } from "lucide-react";
import { fetchPersonalInfo, fetchProjects, fetchCoreExpertise, fetchTimeline, fetchSkills, fetchProjectCategories } from "./ui/utils";

export function WorkSection() {
  const ref = useRef(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [activeFilter, setActiveFilter] = useState("All");
  const { currentTheme } = useTheme();
  const [projects, setProjects] = useState<any[]>([]);
  const [expertise, setExpertise] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);

  // function for load data
  const loadData = async () => {
    try {
      const projs = await fetchProjects();
      const expert = await fetchCoreExpertise();
      const categoriesData = await fetchProjectCategories();
      setProjects(projs);
      setExpertise(expert);
      setCategories(categoriesData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Generate filter options from categories (using name field)
  const filters = ["All", ...categories.map((category) => category.name)];

  // Filtered projects based on active category
  const filteredProjects =
    activeFilter === "All" 
      ? projects 
      : projects.filter((p) => p.category_name === activeFilter);
  

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

        {/* Filter Tabs - Now using categories */}
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
                      src={project.thumbnail}
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
                      {project.category_name} {/* Updated to use category_name */}
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
                      {project.technologies_list.map((tech, i) => (
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
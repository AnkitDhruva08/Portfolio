"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion } from "motion/react";
import { useInView } from "motion/react";
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  Twitter,
  Dribbble,
  Check,
  Download,
} from "lucide-react";
import { toast } from "sonner";
import { useTheme } from "../contexts/ThemeContext";
import { fetchPersonalInfo } from "./ui/utils";

export function ContactSection() {
  const ref = useRef(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { currentTheme } = useTheme();

  const [personalInfo, setPersonalInfo] = useState<any>(null);

  const loadData = async () => {
    try {
      const info = await fetchPersonalInfo();
      setPersonalInfo(info);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    toast.success("Message sent! I'll get back to you soon.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const socialLinks = [
    personalInfo?.linkedin_url && {
      icon: Linkedin,
      href: personalInfo?.linkedin_url,
      name: "LinkedIn",
    },
    personalInfo?.github_url && {
      icon: Github,
      href: personalInfo?.github_url,
      name: "GitHub",
    },
    personalInfo?.twitter_url && {
      icon: Twitter,
      href: personalInfo?.twitter_url,
      name: "Twitter",
    },
    personalInfo?.dribbble_url && {
      icon: Dribbble,
      href: personalInfo?.dribbble_url,
      name: "Dribbble",
    },
  ].filter(Boolean);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-28 md:py-40 overflow-hidden"
      style={{
        background: `linear-gradient(to bottom, ${currentTheme.colors.background}, ${currentTheme.colors.primary})`,
      }}
    >
      {/* Particle Effect */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 3 + 1 + "px",
              height: Math.random() * 3 + 1 + "px",
              backgroundColor: currentTheme.colors.accent,
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
            }}
          />
        ))}
      </div>

      {/* Radial Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none"
        style={{
          background:
            currentTheme.type === "dark"
              ? "radial-gradient(circle, rgba(255, 255, 255, 0.05) 0%, transparent 70%)"
              : "radial-gradient(circle, rgba(0, 0, 0, 0.02) 0%, transparent 70%)",
        }}
      />

      <div
        ref={ref}
        className="max-w-[1200px] mx-auto px-8 md:px-20 relative z-10"
      >
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
            Get In Touch
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
            Let's Create Something Amazing Together
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
            Have a project in mind? Let's discuss how I can help bring your
            vision to life
          </motion.p>
        </div>

        {/* Contact Layout */}
        <div className="grid md:grid-cols-[60%_40%] gap-16">
          {/* Left Column - Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
            data-obstacle
          >
            <form
              onSubmit={handleSubmit}
              className="p-12 rounded-3xl glass-water liquid-shimmer"
              style={{
                backdropFilter: "blur(16px) saturate(150%)",
                border: `1px solid ${currentTheme.colors.accent}33`,
                boxShadow: `0 8px 48px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.08)`,
              }}
            >
              <div className="space-y-5">
                <div>
                  <label
                    className="font-['Montserrat'] block mb-2"
                    style={{
                      fontSize: "13px",
                      fontWeight: 500,
                      color: currentTheme.colors.accent,
                      letterSpacing: "0.5px",
                    }}
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                    className="w-full px-5 py-4 rounded-xl font-['Montserrat'] transition-all duration-250 focus:outline-none focus:ring-2"
                    style={{
                      backgroundColor: `${currentTheme.colors.background}80`,
                      border: `1px solid ${currentTheme.colors.accent}40`,
                      fontSize: "15px",
                      color: currentTheme.colors.text,
                    }}
                  />
                </div>

                <div>
                  <label
                    className="font-['Montserrat'] block mb-2"
                    style={{
                      fontSize: "13px",
                      fontWeight: 500,
                      color: currentTheme.colors.accent,
                      letterSpacing: "0.5px",
                    }}
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="john@example.com"
                    className="w-full px-5 py-4 rounded-xl font-['Montserrat'] transition-all duration-250 focus:outline-none focus:ring-2"
                    style={{
                      backgroundColor: `${currentTheme.colors.background}80`,
                      border: `1px solid ${currentTheme.colors.accent}40`,
                      fontSize: "15px",
                      color: currentTheme.colors.text,
                    }}
                  />
                </div>

                <div>
                  <label
                    className="font-['Montserrat'] block mb-2"
                    style={{
                      fontSize: "13px",
                      fontWeight: 500,
                      color: currentTheme.colors.accent,
                      letterSpacing: "0.5px",
                    }}
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="Project Inquiry"
                    className="w-full px-5 py-4 rounded-xl font-['Montserrat'] transition-all duration-250 focus:outline-none focus:ring-2"
                    style={{
                      backgroundColor: `${currentTheme.colors.background}80`,
                      border: `1px solid ${currentTheme.colors.accent}40`,
                      fontSize: "15px",
                      color: currentTheme.colors.text,
                    }}
                  />
                </div>

                <div>
                  <label
                    className="font-['Montserrat'] block mb-2"
                    style={{
                      fontSize: "13px",
                      fontWeight: 500,
                      color: currentTheme.colors.accent,
                      letterSpacing: "0.5px",
                    }}
                  >
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    placeholder="Tell me about your project..."
                    className="w-full px-5 py-4 rounded-xl font-['Montserrat'] transition-all duration-250 focus:outline-none focus:ring-2 resize-vertical"
                    style={{
                      backgroundColor: `${currentTheme.colors.background}80`,
                      border: `1px solid ${currentTheme.colors.accent}40`,
                      fontSize: "15px",
                      color: currentTheme.colors.text,
                    }}
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-5 rounded-xl font-['Montserrat'] transition-all duration-300 disabled:opacity-50"
                  style={{
                    background: `linear-gradient(135deg, ${currentTheme.colors.accent} 0%, ${currentTheme.colors.accent}CC 100%)`,
                    color:
                      currentTheme.type === "dark"
                        ? currentTheme.colors.primary
                        : currentTheme.colors.background,
                    fontSize: "16px",
                    fontWeight: 600,
                  }}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </motion.button>
              </div>
            </form>
          </motion.div>

          {/* Right Column - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            {/* Email Card */}
            <div
              className="p-7 rounded-2xl hover:-translate-y-1 transition-transform duration-300 glass-water liquid-shimmer"
              style={{
                backdropFilter: "blur(12px) saturate(150%)",
                border: `1px solid ${currentTheme.colors.accent}33`,
                boxShadow: `inset 0 1px 0 rgba(255, 255, 255, 0.06)`,
              }}
              data-obstacle
            >
              <Mail
                size={32}
                color={currentTheme.colors.accent}
                className="mb-3"
              />
              <p
                className="font-['Montserrat'] mb-2"
                style={{
                  fontSize: "13px",
                  color: currentTheme.colors.textSecondary,
                }}
              >
                Email me at
              </p>
              <a
                href="mailto:hello@johndoe.com"
                className="font-['Montserrat'] transition-colors"
                style={{
                  fontSize: "16px",
                  fontWeight: 600,
                  color: currentTheme.colors.text,
                }}
              >
                {personalInfo?.email}
              </a>
            </div>

            {/* Phone Card */}
            <div
              className="p-7 rounded-2xl hover:-translate-y-1 transition-transform duration-300 glass-water liquid-shimmer"
              style={{
                backdropFilter: "blur(12px) saturate(150%)",
                border: `1px solid ${currentTheme.colors.accent}33`,
                boxShadow: `inset 0 1px 0 rgba(255, 255, 255, 0.06)`,
              }}
              data-obstacle
            >
              <Phone
                size={32}
                color={currentTheme.colors.accent}
                className="mb-3"
              />
              <p
                className="font-['Montserrat'] mb-2"
                style={{
                  fontSize: "13px",
                  color: currentTheme.colors.textSecondary,
                }}
              >
                Call me at
              </p>
              <a
                href="tel:+1234567890"
                className="font-['Montserrat'] transition-colors"
                style={{
                  fontSize: "16px",
                  fontWeight: 600,
                  color: currentTheme.colors.text,
                }}
              >
                {personalInfo?.phone}
              </a>
            </div>

            {/* Location Card */}
            <div
              className="p-7 rounded-2xl hover:-translate-y-1 transition-transform duration-300 glass-water liquid-shimmer"
              style={{
                backdropFilter: "blur(12px) saturate(150%)",
                border: `1px solid ${currentTheme.colors.accent}33`,
                boxShadow: `inset 0 1px 0 rgba(255, 255, 255, 0.06)`,
              }}
              data-obstacle
            >
              <MapPin
                size={32}
                color={currentTheme.colors.accent}
                className="mb-3"
              />
              <p
                className="font-['Montserrat'] mb-2"
                style={{
                  fontSize: "13px",
                  color: currentTheme.colors.textSecondary,
                }}
              >
                Based in
              </p>
              <p
                className="font-['Montserrat']"
                style={{
                  fontSize: "16px",
                  fontWeight: 600,
                  color: currentTheme.colors.text,
                }}
              >
                {personalInfo?.location}
              </p>
            </div>

            {/* Social Links */}
            <div className="pt-4">
              <p
                className="font-['Montserrat'] mb-4"
                style={{
                  fontSize: "15px",
                  fontWeight: 500,
                  color: currentTheme.colors.text,
                }}
              >
                Connect with me
              </p>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={index}
                      href={social.href}
                      whileHover={{ scale: 1.1, y: -2 }}
                      className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 group"
                      style={{
                        backgroundColor: `${currentTheme.colors.accent}1F`,
                        border: `1px solid ${currentTheme.colors.accent}4D`,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor =
                          currentTheme.colors.accent;
                        const icon = e.currentTarget.querySelector("svg");
                        if (icon) {
                          icon.style.stroke =
                            currentTheme.type === "dark"
                              ? currentTheme.colors.primary
                              : currentTheme.colors.background;
                          icon.style.color =
                            currentTheme.type === "dark"
                              ? currentTheme.colors.primary
                              : currentTheme.colors.background;
                        }
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = `${currentTheme.colors.accent}1F`;
                        const icon = e.currentTarget.querySelector("svg");
                        if (icon) {
                          icon.style.stroke = currentTheme.colors.accent;
                          icon.style.color = currentTheme.colors.accent;
                        }
                      }}
                    >
                      <Icon
                        size={20}
                        color={currentTheme.colors.accent}
                        style={{ transition: "all 0.3s" }}
                      />
                    </motion.a>
                  );
                })}
              </div>
            </div>

            {/* Availability Badge */}
            <div
              className="p-5 rounded-xl"
              style={{
                backgroundColor: `${currentTheme.colors.accent}33`,
                borderLeft: `3px solid ${currentTheme.colors.accent}`,
              }}
              data-obstacle
            >
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse-glow" />
                <p
                  className="font-['Montserrat']"
                  style={{
                    fontSize: "13px",
                    fontWeight: 500,
                    color: currentTheme.colors.text,
                  }}
                >
                  Currently available for freelance projects
                </p>
              </div>
            </div>

            {/* Download Resume Button */}
            {personalInfo?.resume_pdf && (
              <a
                href={personalInfo.resume_pdf}
                download
                target="_blank"
                rel="noopener noreferrer"
              >
                <motion.button
                  whileHover={{ y: -2 }}
                  className="w-full py-4 rounded-xl font-['Montserrat'] transition-all duration-300 flex items-center justify-center gap-2"
                  style={{
                    border: `2px solid ${currentTheme.colors.accent}`,
                    color: currentTheme.colors.accent,
                    fontSize: "14px",
                    fontWeight: 700,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor =
                      currentTheme.colors.accent;
                    e.currentTarget.style.color =
                      currentTheme.type === "dark" ? "#0A1128" : "#FFFFFF";
                    const icon = e.currentTarget.querySelector("svg");
                    if (icon) {
                      icon.style.color =
                        currentTheme.type === "dark" ? "#0A1128" : "#FFFFFF";
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = currentTheme.colors.accent;
                    const icon = e.currentTarget.querySelector("svg");
                    if (icon) {
                      icon.style.color = currentTheme.colors.accent;
                    }
                  }}
                >
                  <Download size={18} />
                  Download Resume PDF
                </motion.button>
              </a>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

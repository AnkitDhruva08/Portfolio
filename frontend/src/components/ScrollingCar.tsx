"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useVelocity, useTransform } from "motion/react";
import { useTheme } from "../contexts/ThemeContext";

interface TrailPoint {
  x: number;
  y: number;
  id: number;
}

export function ScrollingCar() {
  const { currentTheme } = useTheme();
  
  // Direct mouse position tracking (no spring delay)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Velocity for drift effect
  const velocityX = useVelocity(mouseX);
  const velocityY = useVelocity(mouseY);
  
  // Rotation based on velocity (drift effect)
  const rotateZ = useTransform(velocityX, [-2000, 0, 2000], [-20, 0, 20]);
  const skewY = useTransform(velocityY, [-2000, 0, 2000], [8, 0, -8]);
  
  // Trail state
  const [trail, setTrail] = useState<TrailPoint[]>([]);
  const trailIdRef = useRef(0);
  const lastTrailTimeRef = useRef(0);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Update position immediately for 1:1 cursor replacement
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      
      // Create trail points
      const currentTime = Date.now();
      if (currentTime - lastTrailTimeRef.current > 20) { // Trail point every 20ms
        setTrail(prev => {
          const newTrail = [
            ...prev,
            { x: e.clientX, y: e.clientY, id: trailIdRef.current++ }
          ].slice(-30); // Keep last 30 points
          return newTrail;
        });
        lastTrailTimeRef.current = currentTime;
      }
    };

    // Clean up old trail points gradually
    const cleanupInterval = setInterval(() => {
      setTrail(prev => {
        if (prev.length > 0) {
          return prev.slice(1); // Remove oldest point
        }
        return prev;
      });
    }, 80);

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearInterval(cleanupInterval);
    };
  }, [mouseX, mouseY]);

  return (
    <>
      {/* Trail Effect */}
      {trail.map((point, index) => {
        const opacity = (index + 1) / trail.length;
        const size = 3 + (index / trail.length) * 10;
        
        return (
          <motion.div
            key={point.id}
            className="fixed pointer-events-none rounded-full"
            style={{
              left: point.x,
              top: point.y,
              width: size,
              height: size,
              backgroundColor: currentTheme.colors.accent,
              opacity: opacity * 0.5,
              transform: 'translate(-50%, -50%)',
              boxShadow: `0 0 ${size * 2}px ${currentTheme.colors.accent}99`,
              zIndex: 48,
            }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.15 }}
          />
        );
      })}
      
      {/* Track Lines - connecting trail dots */}
      <svg
        className="fixed top-0 left-0 w-full h-full pointer-events-none"
        style={{ zIndex: 47 }}
      >
        {trail.length > 1 && (
          <motion.path
            d={trail.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')}
            stroke={currentTheme.colors.accent}
            strokeWidth="2.5"
            fill="none"
            opacity="0.25"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.25 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </svg>

      {/* Main Car Cursor */}
      <motion.div
        className="fixed pointer-events-none"
        style={{
          left: mouseX,
          top: mouseY,
          x: "-50%",
          y: "-50%",
          rotateZ,
          zIndex: 9999, // Highest z-index to always be on top
        }}
      >
        {/* Glow effect that intensifies with speed */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            width: "120px",
            height: "120px",
            left: "-25px",
            top: "-25px",
            background: `radial-gradient(circle, ${currentTheme.colors.accent}44 0%, transparent 70%)`,
            filter: "blur(12px)",
          }}
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Car SVG with drift effect */}
        <motion.svg
          width="70"
          height="70"
          viewBox="0 0 70 70"
          style={{
            filter: `drop-shadow(0 6px 16px ${currentTheme.colors.accent}AA)`,
            skewY,
          }}
        >
          {/* Speed lines (drift effect) - appear when moving fast */}
          <motion.g
            style={{
              opacity: useTransform(
                velocityX,
                [-1000, -100, 100, 1000],
                [0.8, 0, 0, 0.8]
              ),
            }}
          >
            <line
              x1="5"
              y1="28"
              x2="15"
              y2="28"
              stroke={currentTheme.colors.accent}
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.5"
            />
            <line
              x1="8"
              y1="35"
              x2="15"
              y2="35"
              stroke={currentTheme.colors.accent}
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.4"
            />
            <line
              x1="5"
              y1="42"
              x2="12"
              y2="42"
              stroke={currentTheme.colors.accent}
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.6"
            />
          </motion.g>

          {/* Car Body with subtle bounce */}
          <motion.g
            animate={{
              y: [0, -1, 0],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {/* Shadow */}
            <ellipse
              cx="35"
              cy="52"
              rx="20"
              ry="4"
              fill="#000000"
              opacity="0.25"
            />
            
            {/* Main Body */}
            <path
              d="M 20 40 L 23 30 L 28 24 L 42 24 L 47 30 L 50 40 Z"
              fill={currentTheme.colors.accent}
              opacity="0.95"
              stroke={currentTheme.colors.accent}
              strokeWidth="2"
              strokeLinejoin="round"
            />
            
            {/* Roof */}
            <path
              d="M 26 30 L 30 26 L 40 26 L 44 30 Z"
              fill={currentTheme.colors.accent}
              opacity="0.75"
            />
            
            {/* Front Window */}
            <path
              d="M 27 28 L 30 27 L 34 27 L 34 30 Z"
              fill={currentTheme.colors.background}
              opacity="0.7"
            />
            
            {/* Rear Window */}
            <path
              d="M 36 27 L 40 27 L 43 28 L 36 30 Z"
              fill={currentTheme.colors.background}
              opacity="0.7"
            />
            
            {/* Window divider */}
            <line
              x1="35"
              y1="27"
              x2="35"
              y2="30"
              stroke={currentTheme.colors.accent}
              strokeWidth="1"
              opacity="0.5"
            />
            
            {/* Body bottom */}
            <rect
              x="20"
              y="40"
              width="30"
              height="4"
              fill={currentTheme.colors.accent}
              opacity="0.85"
              rx="1.5"
            />
            
            {/* Front Wheel */}
            <motion.g
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{ originX: "26px", originY: "44px" }}
            >
              <circle
                cx="26"
                cy="44"
                r="5"
                fill="none"
                stroke={currentTheme.colors.accent}
                strokeWidth="2.5"
              />
              <circle
                cx="26"
                cy="44"
                r="2.5"
                fill={currentTheme.colors.accent}
                opacity="0.7"
              />
              {/* Wheel spokes */}
              <line x1="26" y1="39" x2="26" y2="49" stroke={currentTheme.colors.accent} strokeWidth="1" />
              <line x1="21" y1="44" x2="31" y2="44" stroke={currentTheme.colors.accent} strokeWidth="1" />
            </motion.g>
            
            {/* Rear Wheel */}
            <motion.g
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{ originX: "44px", originY: "44px" }}
            >
              <circle
                cx="44"
                cy="44"
                r="5"
                fill="none"
                stroke={currentTheme.colors.accent}
                strokeWidth="2.5"
              />
              <circle
                cx="44"
                cy="44"
                r="2.5"
                fill={currentTheme.colors.accent}
                opacity="0.7"
              />
              {/* Wheel spokes */}
              <line x1="44" y1="39" x2="44" y2="49" stroke={currentTheme.colors.accent} strokeWidth="1" />
              <line x1="39" y1="44" x2="49" y2="44" stroke={currentTheme.colors.accent} strokeWidth="1" />
            </motion.g>
            
            {/* Headlights */}
            <motion.circle
              cx="19"
              cy="37"
              r="2"
              fill="#ffffff"
              opacity="0.95"
              animate={{
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            
            {/* Taillight */}
            <circle
              cx="51"
              cy="37"
              r="1.5"
              fill="#ff4444"
              opacity="0.9"
            />
            
            {/* Body details */}
            <line
              x1="23"
              y1="33"
              x2="23"
              y2="40"
              stroke={currentTheme.colors.background}
              strokeWidth="1"
              opacity="0.3"
            />
            <line
              x1="47"
              y1="33"
              x2="47"
              y2="40"
              stroke={currentTheme.colors.background}
              strokeWidth="1"
              opacity="0.3"
            />
            
            {/* Door handle */}
            <rect
              x="32"
              y="35"
              width="6"
              height="1.5"
              rx="0.5"
              fill={currentTheme.colors.background}
              opacity="0.4"
            />
            
            {/* Side mirror */}
            <rect
              x="18"
              y="32"
              width="2"
              height="3"
              rx="0.5"
              fill={currentTheme.colors.accent}
              opacity="0.7"
            />
          </motion.g>

          {/* Drift smoke effect - appears when moving fast */}
          <motion.g
            style={{
              opacity: useTransform(
                velocityX,
                [-1000, -100, 100, 1000],
                [0.5, 0, 0, 0.5]
              ),
            }}
          >
            <circle cx="44" cy="48" r="4" fill={currentTheme.colors.accent} opacity="0.2" />
            <circle cx="26" cy="48" r="3.5" fill={currentTheme.colors.accent} opacity="0.15" />
          </motion.g>
        </motion.svg>

        {/* Speed indicator particles - appear when moving */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              backgroundColor: currentTheme.colors.accent,
              left: -25 - i * 10,
              top: 30 + (Math.random() - 0.5) * 25,
              opacity: useTransform(
                velocityX,
                [-1000, -100, 100, 1000],
                [0.7, 0, 0, 0.7]
              ),
            }}
            animate={{
              x: [-10, -35],
              scale: [1, 0.3],
            }}
            transition={{
              duration: 0.4,
              repeat: Infinity,
              delay: i * 0.08,
            }}
          />
        ))}

        {/* Cursor dot indicator (for precise clicking) */}
        <motion.div
          className="absolute w-1 h-1 rounded-full"
          style={{
            backgroundColor: currentTheme.colors.accent,
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            boxShadow: `0 0 8px ${currentTheme.colors.accent}`,
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>
    </>
  );
}

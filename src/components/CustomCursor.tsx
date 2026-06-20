"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice] = useState(() => {
    // Detect touch/non-hover devices on initial render
    if (typeof window === "undefined") return true;
    const canHover = typeof window.matchMedia === "function" && window.matchMedia("(hover: hover)").matches;
    const isTouch = typeof navigator !== "undefined" && navigator.maxTouchPoints > 0;
    return !canHover || isTouch;
  });

  // Position of the mouse
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring configurations for smooth trailing effect
  const ringX = useSpring(mouseX, { stiffness: 250, damping: 25 });
  const ringY = useSpring(mouseY, { stiffness: 250, damping: 25 });

  useEffect(() => {
    if (isTouchDevice) return;

    const moveMouse = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const isInteractive =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        !!target.closest("a") ||
        !!target.closest("button") ||
        !!target.closest(".glass-card") ||
        window.getComputedStyle(target).cursor === "pointer";

      setIsHovered(!!isInteractive);
    };

    window.addEventListener("mousemove", moveMouse);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveMouse);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, [isTouchDevice, mouseX, mouseY]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <>
      {/* Inner Dot */}
      <motion.div
        style={{
          left: mouseX,
          top: mouseY,
          x: "-50%",
          y: "-50%",
        }}
        className="fixed w-2 h-2 bg-indigo-400 rounded-full pointer-events-none z-50 mix-blend-difference transition-transform duration-200"
        animate={{
          scale: isHovered ? 2 : 1,
          backgroundColor: isHovered ? "#818cf8" : "#a5b4fc",
        }}
      />
      {/* Outer Ring */}
      <motion.div
        style={{
          left: ringX,
          top: ringY,
          x: "-50%",
          y: "-50%",
        }}
        className="fixed w-8 h-8 rounded-full border border-indigo-400/40 pointer-events-none z-50 transition-all duration-300"
        animate={{
          scale: isHovered ? 1.8 : 1,
          borderColor: isHovered ? "rgba(165, 180, 252, 0.8)" : "rgba(129, 140, 248, 0.4)",
          backgroundColor: isHovered ? "rgba(129, 140, 248, 0.05)" : "rgba(129, 140, 248, 0)",
        }}
      />
    </>
  );
}

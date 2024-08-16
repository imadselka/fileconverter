// components/AnimatedBorder.tsx
"use client";

import { motion } from "framer-motion";

interface AnimatedBorderProps {
  colors?: string[];
  duration?: number;
  borderWidth?: number;
  borderRadius?: string;
  className?: string;
}

const AnimatedBorder: React.FC<AnimatedBorderProps> = ({
  colors = [
    "rgba(255, 170, 64, 0.75)",
    "rgba(156, 64, 255, 0.75)",
    "rgba(255, 170, 64, 0.75)",
    "rgba(156, 64, 255, 0.75)",
    "rgba(255, 170, 64, 0.75)",
  ],
  duration = 5,
  borderWidth = 2,
  borderRadius = "1rem",
  className = "",
}) => {
  return (
    <motion.div
      className={`absolute inset-0 ${className}`}
      initial={{ borderColor: colors[0] }}
      animate={{ borderColor: colors }}
      transition={{
        duration: duration,
        ease: "linear",
        repeat: Infinity,
      }}
      style={{
        borderStyle: "solid",
        borderWidth: `${borderWidth}px`,
        borderRadius: borderRadius,
      }}
    />
  );
};

export default AnimatedBorder;

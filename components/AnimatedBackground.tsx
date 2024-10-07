"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const PARTICLE_COUNT = 30;

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
}

export default function AnimatedBackground() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-gray-200 opacity-20"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            x: ["-50%", "50%", "-50%"],
            y: ["-50%", "50%", "-50%"],
          }}
          transition={{
            duration: Math.random() * 10 + 20,
            repeat: Infinity,
            ease: "easeIn",
          }}
          whileHover={{ scale: 1.05 }}
        />
      ))}
    </div>
  );
}

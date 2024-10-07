"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect } from "react";

export default function NotFound() {
  useEffect(() => {
    const navbar = document.querySelector("nav");
    const footer = document.querySelector("footer");
    if (navbar) navbar.style.display = "none";
    if (footer) footer.style.display = "none";

    return () => {
      if (navbar) navbar.style.display = "";
      if (footer) footer.style.display = "";
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-9xl font-bold"
      >
        Lost your way?
      </motion.div>
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="mt-8 text-4xl font-semibold"
      >
        Error Code <span className="font-bold text-foreground">404</span>
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="mt-4 text-xl text-muted-foreground"
      >
        Oops! The page you&apos;re looking for doesn&apos;t exist.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 1 }}
        transition={{ delay: 0.8, type: "spring", duration: 0.8 }}
      >
        <Link
          href="/"
          className="mt-8 inline-block px-6 py-3 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          FileConverter Home
        </Link>
      </motion.div>
    </div>
  );
}

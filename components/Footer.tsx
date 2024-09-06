"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-6"
    >
      <div className="container mx-auto px-4">
        <motion.div
          className="flex flex-col justify-center items-center gap-2"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          <div className="mt-4 text-center">
            <motion.p className="text-sm" whileHover={{ scale: 1.05 }}>
              Made with ❤️ by{" "}
              <Link
                href="https://linktr.ee/ImadSelka"
                className="text-primary hover:underline"
              >
                Imad
              </Link>
            </motion.p>
          </div>
          <motion.div
            className="flex items-center space-x-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.3 }}
          >
            {[
              {
                href: "https://github.com/imadselka",
                icon: FaGithub,
                label: "GitHub",
              },
              {
                href: "https://x.com/imad_selka",
                icon: FaTwitter,
                label: "Twitter",
              },
              {
                href: "https://www.linkedin.com/in/imad-selka-120aa4251/",
                icon: FaLinkedin,
                label: "LinkedIn",
              },
            ].map((social, index) => (
              <motion.div
                key={social.label}
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <Link
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <social.icon className="text-xl hover:text-primary transition-colors" />
                  <span className="sr-only">{social.label}</span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;

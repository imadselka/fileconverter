"use client";

import { motion } from "framer-motion";
import { FilesIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { FaTools } from "react-icons/fa";
import { IoIosGitMerge } from "react-icons/io";
import Logo from "./logo";
import { ModeToggle } from "./ModeToggle";
import { Button } from "./ui/button";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 120 }}
      className="flex flex-wrap justify-between items-center w-full px-4 py-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <Link href="/" className="flex items-center space-x-2">
        <motion.div whileHover={{ scale: 1.1 }} className="flex items-center">
          <Logo />
          <span className="ml-2 text-2xl font-bold">FileConverter</span>
        </motion.div>
      </Link>

      <div className="block lg:hidden">
        <Button variant="ghost" onClick={() => setIsOpen(!isOpen)}>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </Button>
      </div>

      <motion.div
        className={`w-full lg:flex lg:items-center lg:w-auto ${
          isOpen ? "block" : "hidden"
        }`}
        initial={false}
        animate={isOpen ? { height: "auto" } : { height: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="text-sm flex flex-row justify-center items-center lg:flex-grow">
          <Link href="/" passHref>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="block mt-4 lg:inline-block lg:mt-0 mr-4"
            >
              <Button variant="ghost" className="gap-2">
                <FilesIcon />
                Convert Files
              </Button>
            </motion.div>
          </Link>
          <Link href="/merge" passHref>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="block mt-4 lg:inline-block lg:mt-0 mr-4"
            >
              <Button variant="ghost" className="gap-2">
                <IoIosGitMerge />
                Merge Files
              </Button>
            </motion.div>
          </Link>
          <Link href="/utilities" passHref>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="block mt-4 lg:inline-block lg:mt-0 mr-4"
            >
              <Button variant="ghost" className="gap-2">
                <FaTools />
                Other Utilities
              </Button>
            </motion.div>
          </Link>
        </div>
        <div>
          <ModeToggle />
        </div>
      </motion.div>
    </motion.nav>
  );
};

export default NavBar;

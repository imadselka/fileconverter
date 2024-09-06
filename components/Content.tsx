"use client";

import { motion } from "framer-motion";
import { FileUpload } from "./FileUpload";

const Content = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col gap-5 w-full max-w-4xl mx-auto px-4"
    >
      <motion.div
        className="flex flex-col justify-center items-center text-center"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.2, type: "linear", stiffness: 120 }}
        >
          Free File Converter
        </motion.h1>
        <motion.span
          className="text-lg md:text-xl"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Convert your files to any format you want, for free.
        </motion.span>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <FileUpload />
      </motion.div>
    </motion.div>
  );
};

export default Content;

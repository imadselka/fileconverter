"use client";

import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { PDFDocument } from "pdf-lib";
import { useState } from "react";
import {
  FaFileAlt,
  FaFilePdf,
  FaFileUpload,
  FaFileWord,
  FaTrash,
} from "react-icons/fa";

export default function MergePage() {
  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles((prevFiles) => [
        ...prevFiles,
        ...Array.from(e.target.files || []),
      ]);
    }
  };

  const handleDelete = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleMerge = async () => {
    if (files.length < 2) {
      alert("Please select at least two files to merge.");
      return;
    }

    const pdfFiles = files.filter((file) => file.type === "application/pdf");
    const otherFiles = files.filter((file) => file.type !== "application/pdf");

    if (pdfFiles.length > 0) {
      try {
        const mergedPdf = await PDFDocument.create();
        for (const pdfFile of pdfFiles) {
          const pdfBytes = await pdfFile.arrayBuffer();
          const pdf = await PDFDocument.load(pdfBytes);
          const copiedPages = await mergedPdf.copyPages(
            pdf,
            pdf.getPageIndices()
          );
          copiedPages.forEach((page) => mergedPdf.addPage(page));
        }
        const pdfBytes = await mergedPdf.save();
        const blob = new Blob([pdfBytes], { type: "application/pdf" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "merged.pdf";
        link.click();
      } catch (error) {
        console.error("Error merging PDFs:", error);
        alert("An error occurred while merging PDFs. Please try again.");
      }
    }

    if (otherFiles.length > 0) {
      alert(
        "Non-PDF files cannot be merged at this time. Please convert them to PDF first."
      );
    }
  };

  const getFileIcon = (file: File) => {
    switch (file.type) {
      case "application/pdf":
        return <FaFilePdf />;
      case "application/msword":
      case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        return <FaFileWord />;
      default:
        return <FaFileAlt />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <h1 className="text-4xl font-bold mb-8 text-center">Merge Documents</h1>
      <div className="max-w-md mx-auto">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mb-6"
        >
          <label
            htmlFor="file-upload"
            className="cursor-pointer bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-2 px-4 rounded inline-flex items-center w-full justify-center"
          >
            <FaFileUpload className="mr-2" />
            <span>Choose files to merge</span>
          </label>
          <input
            id="file-upload"
            type="file"
            multiple
            onChange={handleFileChange}
            className="hidden"
            accept=".pdf,.doc,.docx"
          />
        </motion.div>
        <AnimatePresence>
          {files.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="mb-6"
            >
              <h2 className="text-xl font-semibold mb-2">Selected Files:</h2>
              <ul className="space-y-2">
                {files.map((file, index) => (
                  <motion.li
                    key={`${file.name}-${index}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-2 rounded"
                  >
                    <div className="flex items-center">
                      {getFileIcon(file)}
                      <span className="ml-2 truncate">{file.name}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(index)}
                      className="text-destructive hover:text-destructive/90"
                    >
                      <FaTrash />
                      <span className="sr-only">Delete file</span>
                    </Button>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            onClick={handleMerge}
            className="w-full"
            disabled={files.length < 2}
          >
            Merge Files
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}

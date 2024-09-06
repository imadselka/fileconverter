"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Progress } from "@radix-ui/react-progress";
import { AnimatePresence, motion } from "framer-motion";
import { PDFDocument } from "pdf-lib";
import { useEffect, useState } from "react";
import {
  FaFileAlt,
  FaFilePdf,
  FaFileUpload,
  FaFileWord,
  FaTrash,
} from "react-icons/fa";

export default function MergePage() {
  const [files, setFiles] = useState<File[]>([]);
  const [mergeFormat, setMergeFormat] = useState<string>("pdf");
  const [isMerging, setIsMerging] = useState(false);
  const [progress, setProgress] = useState(0);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [estimatedEndTime, setEstimatedEndTime] = useState<Date | null>(null);
  const { toast } = useToast();

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
      toast({
        title: "Error",
        description: "Please select at least two files to merge.",
        variant: "destructive",
      });
      return;
    }

    setIsMerging(true);
    setProgress(0);
    setStartTime(new Date());
    setEstimatedEndTime(new Date(Date.now() + files.length * 1000)); // Estimate 1 second per file

    try {
      const mergedPdf = await PDFDocument.create();

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file.type === "application/pdf") {
          const pdfBytes = await file.arrayBuffer();
          const pdf = await PDFDocument.load(pdfBytes);
          const copiedPages = await mergedPdf.copyPages(
            pdf,
            pdf.getPageIndices()
          );
          copiedPages.forEach((page) => mergedPdf.addPage(page));
        }
        // For simplicity, we're only handling PDFs here. You'd need to add logic for other file types.

        setProgress(((i + 1) / files.length) * 100);
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate processing time
      }

      const pdfBytes = await mergedPdf.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "merged_fileconverter_imadselka.pdf";
      link.click();

      toast({
        title: "Success",
        description: "Files merged successfully!",
      });
    } catch (error) {
      console.error("Error merging files:", error);
      toast({
        title: "Error",
        description: "An error occurred while merging files. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsMerging(false);
      setProgress(0);
      setStartTime(null);
      setEstimatedEndTime(null);
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

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const formatTime = (milliseconds: number) => {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isMerging && startTime && estimatedEndTime) {
      timer = setInterval(() => {
        const now = new Date();
        const elapsedTime = now.getTime() - startTime.getTime();
        const totalTime = estimatedEndTime.getTime() - startTime.getTime();
        const newProgress = Math.min((elapsedTime / totalTime) * 100, 100);
        setProgress(newProgress);

        if (now >= estimatedEndTime) {
          clearInterval(timer);
        }
      }, 100);
    }
    return () => clearInterval(timer);
  }, [isMerging, startTime, estimatedEndTime]);

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
            accept=".pdf,.doc,.docx,.txt,.csv"
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
                    <div className="flex items-center space-x-2 flex-grow">
                      {getFileIcon(file)}
                      <span className="truncate flex-grow">{file.name}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-muted-foreground">
                        {formatFileSize(file.size)}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(index)}
                        className="text-destructive hover:text-destructive/90"
                      >
                        <FaTrash />
                        <span className="sr-only">Delete file</span>
                      </Button>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="mb-6">
          <Select onValueChange={setMergeFormat} value={mergeFormat}>
            <SelectTrigger>
              <SelectValue placeholder="Select output format" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pdf">PDF</SelectItem>
              <SelectItem value="docx">DOCX</SelectItem>
              <SelectItem value="txt">TXT</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            onClick={handleMerge}
            className="w-full"
            disabled={files.length < 2 || isMerging}
          >
            {isMerging ? "Merging Files..." : "Merge Files"}
          </Button>
        </motion.div>
        {isMerging && (
          <div className="mt-4 space-y-2">
            <Progress value={progress} className="w-full" />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Progress: {progress.toFixed(0)}%</span>
              <span>
                {startTime &&
                  estimatedEndTime &&
                  `Est. time remaining: ${formatTime(
                    Math.max(0, estimatedEndTime.getTime() - Date.now())
                  )}`}
              </span>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { FaFileAlt, FaFilePdf, FaFileWord, FaTrash } from "react-icons/fa";

interface FileListProps {
  files: File[];
  onDelete: (index: number) => void;
}

export default function FileList({ files, onDelete }: FileListProps) {
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

  return (
    <AnimatePresence>
      {files.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
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
                className="flex items-center justify-between w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-2 rounded"
              >
                <div className="flex justify-center items-center space-x-2 w-full flex-grow">
                  {getFileIcon(file)}
                  <span className="truncate flex-grow">{file.name}</span>
                </div>
                <div className="flex justify-center items-center space-x-2">
                  <span className="flex-row text-sm text-muted-foreground">
                    {formatFileSize(file.size)}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDelete(index)}
                    className="text-destructive hover:text-destructive/90"
                  >
                    <FaTrash />
                  </Button>
                </div>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

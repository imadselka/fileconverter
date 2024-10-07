import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { FaFileUpload } from "react-icons/fa";

interface FileUploaderProps {
  onFileChange: (files: File[]) => void;
}

export default function FileUploader({ onFileChange }: FileUploaderProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      onFileChange(Array.from(e.target.files));
    }
  };

  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Label
        htmlFor="file-upload"
        className="cursor-pointer bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-2 px-4 rounded inline-flex items-center w-full justify-center"
      >
        <FaFileUpload className="mr-2" />
        <span>Choose files to merge</span>
      </Label>
      <Input
        id="file-upload"
        type="file"
        multiple
        onChange={handleFileChange}
        className="hidden"
        accept=".pdf,.doc,.docx,.txt"
      />
    </motion.div>
  );
}

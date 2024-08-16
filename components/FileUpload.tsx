"use client";
import { useRef, useState } from "react";
import { BiCloudUpload } from "react-icons/bi";
import AfterFileUploaded from "./AfterFileUploaded";
import AnimatedBorder from "./AnimatedBorder";

const FileUpload = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedFile, setUploadedFile] = useState<{
    name: string;
    size: string;
  } | null>(null);

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Convert file size to a readable format
      const fileSize = (file.size / (1024 * 1024)).toFixed(2) + " MB";

      // Set the uploaded file's information
      setUploadedFile({ name: file.name, size: fileSize });
    }
  };

  return (
    <div className="relative flex items-center justify-center">
      {!uploadedFile ? (
        <div
          className="relative rounded-2xl bg-white/20 dark:bg-black/30 p-1 shadow-lg shadow-gray-500/20 dark:shadow-black/30 backdrop-blur-lg hover:cursor-pointer"
          onClick={handleClick}
        >
          <div className="relative flex flex-col items-center justify-center gap-6 rounded-2xl bg-gradient-to-br from-gray-200/60 to-gray-500/40 dark:from-gray-400/40 dark:to-gray-600/20 p-10 md:p-20">
            <BiCloudUpload
              size={100}
              className="text-gray-700 dark:text-gray-200"
            />
            <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 text-center">
              Click or Drop Your Files Here
            </h1>
            <AnimatedBorder />
          </div>
        </div>
      ) : (
        <AfterFileUploaded
          fileName={uploadedFile.name}
          fileSize={uploadedFile.size}
        />
      )}

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};

export default FileUpload;

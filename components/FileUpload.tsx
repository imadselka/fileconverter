import { Input } from "@/components/ui/input";
import { useRef, useState } from "react";
import { BiCloudUpload } from "react-icons/bi";
import AfterFileUploaded from "./AfterFileUploaded";

export const FileUpload = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      event.target.value = ""; // Clear the input field to allow the same file to be re-uploaded
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files?.[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  return (
    <div className="relative flex items-center justify-center w-full px-4 md:px-0">
      {!uploadedFile ? (
        <div
          className={`relative rounded-2xl bg-white/20 dark:bg-black/30 p-1 shadow-lg shadow-gray-500/20 dark:shadow-black/30 backdrop-blur-lg hover:cursor-pointer w-full max-w-md ${
            isDragging ? "border-4 border-dashed border-blue-500" : ""
          }`}
          onClick={handleClick}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="relative flex flex-col items-center justify-center gap-6 rounded-2xl bg-gradient-to-br from-gray-200/60 to-gray-500/40 dark:from-gray-400/40 dark:to-gray-600/20 p-10 md:p-20">
            <BiCloudUpload
              size={100}
              className="text-gray-700 dark:text-gray-200"
            />
            <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 text-center">
              {isDragging
                ? "Drop Here to Upload"
                : "Click or Drop Your Files Here"}
            </h1>
          </div>
        </div>
      ) : (
        <AfterFileUploaded
          fileUpload={uploadedFile}
          resetUpload={() => setUploadedFile(null)}
        />
      )}

      <Input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};

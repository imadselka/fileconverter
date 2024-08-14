"use client";
import { useRef } from "react";
import AfterFileUploaded from "./AfterFileUploaded";

const FileUpload = () => {
  // Reference to the hidden file input element
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Function to trigger the file input click
  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Handle file selection
  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      console.log("Selected file:", file);
    }
  };

  return (
    <>
      {/* <div className="relative flex items-center justify-center">
        <div
          className="relative rounded-2xl bg-white/20 dark:bg-black/30 p-1 shadow-lg shadow-gray-500/20 dark:shadow-black/30 backdrop-blur-lg hover:cursor-pointer"
          onClick={handleClick}
          ref={fileInputRef}
        >
          <div className="relative flex flex-col items-center justify-center gap-6 rounded-2xl bg-gradient-to-br from-gray-200/60 to-gray-500/40 dark:from-gray-400/40 dark:to-gray-600/20 p-10 md:p-20">
            <BiCloudUpload
              size={100}
              className="text-gray-700 dark:text-gray-200"
            />
            <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 text-center">
              Click or Drop Your Files Here
            </h1>
            <BorderBeam size={250} duration={12} delay={9} />
          </div>
        </div>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />
      </div> */}
      <AfterFileUploaded fileName="" fileSize="" />
    </>
  );
};

export default FileUpload;

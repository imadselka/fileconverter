"use client";
import { BiCloudUpload } from "react-icons/bi";

const FileUpload = () => {
  return (
    <div className="flex items-center justify-center min-h-scree">
      <div className="flex flex-col justify-center items-center gap-10 p-20 w-[600px] border-2 border-dashed border-dark rounded-xl dark:border-gray-400 dark:border-dashed">
        <BiCloudUpload size={150} />
        <h1 className="text-xl font-semibold">
          Click, or drop your files here
        </h1>
      </div>
    </div>
  );
};

export default FileUpload;

"use client";

import { FileUpload } from "./FileUpload";
import OtherUtilities from "./OtherUtilities";

const Content = () => {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-[70px]">Free File Converter</h1>
        <span>Convert your files to any format you want, for free.</span>
      </div>
      <FileUpload />
      <OtherUtilities />
    </div>
  );
};

export default Content;

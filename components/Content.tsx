"use client";

import { useRouter } from "next/navigation";
import { FileUpload } from "./FileUpload";
import { Button } from "./ui/button";

const Content = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-[70px]">Free File Converter</h1>
        <span>Convert your files to any format you want, for free.</span>
      </div>
      <FileUpload />
      <Button
        variant="outline"
        className="text-2xl w-[50%] mx-auto"
        onClick={() => router.push("/utilities")}
      >
        Need Other Utilities?
      </Button>
    </div>
  );
};

export default Content;

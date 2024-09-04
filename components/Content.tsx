"use client";

import Link from "next/link";
import { TbListSearch } from "react-icons/tb";
import { FileUpload } from "./FileUpload";
import { Button } from "./ui/button";

const Content = () => {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-[70px]">Free File Converter</h1>
        <span>Convert your files to any format you want, for free.</span>
      </div>
      <FileUpload />
      <Button variant="outline" className="text-2xl w-[60%] mx-auto">
        <Link href="/utilities" shallow>
          <div className="flex flex-row justify-center items-center gap-2">
            <TbListSearch />
            Looking for Other Utilities?
          </div>
        </Link>
      </Button>
    </div>
  );
};

export default Content;

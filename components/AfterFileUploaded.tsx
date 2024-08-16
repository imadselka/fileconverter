import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getExtensionsByType } from "@/constants/fileExtensions"; // Adjust path as necessary
import { AlertTriangleIcon, CheckCircle2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import AnimatedBorder from "./AnimatedBorder";

interface AfterFileUploadedProps {
  fileName: string;
  fileSize: string;
}

const AfterFileUploaded = ({ fileName, fileSize }: AfterFileUploadedProps) => {
  const [fileType, setFileType] = useState<string>("document");
  const [extensions, setExtensions] = useState<string[]>([]);
  const [conversionStatus, setConversionStatus] = useState<
    "pending" | "success" | "failed"
  >("pending");

  useEffect(() => {
    const fileExtension = fileName.split(".").pop()?.toLowerCase();
    const fileExtType = fileExtension
      ? getExtensionsByType("image").includes(fileExtension)
        ? "image"
        : getExtensionsByType("document").includes(fileExtension)
        ? "document"
        : getExtensionsByType("audio").includes(fileExtension)
        ? "audio"
        : getExtensionsByType("video").includes(fileExtension)
        ? "video"
        : "document"
      : "document";

    setFileType(fileExtType);
    setExtensions(getExtensionsByType(fileExtType));
  }, [fileName]);

  const truncateFileName = (name: string) => {
    if (name.length <= 14) return name;
    return `${name.slice(0, 10)}...${name.slice(-4)}`;
  };

  const handleConversion = () => {
    console.log("Converting file...");
    setConversionStatus("pending");

    setTimeout(() => {
      const success = Math.random() > 0.3;
      if (success) {
        setConversionStatus("success");
      } else {
        setConversionStatus("failed");
      }
    }, 2000);
  };

  const handleDownload = () => {
    console.log("Downloading file...");
  };

  return (
    <div className="relative flex flex-col items-start gap-4 rounded-2xl bg-gradient-to-br from-gray-200/60 to-gray-500/40 dark:from-gray-400/40 dark:to-gray-600/20 p-6 w-[700px] h-auto">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-2 w-full overflow-hidden">
          <span className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate max-w-[350px]">
            {truncateFileName(fileName)}
          </span>
          <span className="text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
            {fileSize}
          </span>
          {conversionStatus === "success" && (
            <div className="flex flex-row items-center gap-2 border border-green-700 rounded-xl px-2">
              <span className="text-sm text-green-700">Done</span>
              <CheckCircle2Icon
                size={20}
                color="green"
                className="flex-shrink-0"
              />
            </div>
          )}
          {conversionStatus === "failed" && (
            <div className="flex flex-row items-center gap-2 border border-red-700 rounded-xl px-2">
              <span className="text-sm text-red-700">Conversion Failed</span>
              <AlertTriangleIcon
                size={20}
                color="red"
                className="flex-shrink-0"
              />
            </div>
          )}
        </div>
        <div className="relative z-10">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="text-sm">
                {conversionStatus === "success"
                  ? "Convert Another File"
                  : "Choose Format"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 z-20">
              <DropdownMenuLabel>Convert To</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup>
                {extensions.map((ext) => (
                  <DropdownMenuRadioItem key={ext} value={ext}>
                    {ext.toUpperCase()}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="flex flex-col items-end w-full">
        {conversionStatus === "pending" ? (
          <Button onClick={handleConversion}>Convert</Button>
        ) : conversionStatus === "success" ? (
          <>
            <Button className="bg-green-600 text-white">Done</Button>
            <Button onClick={handleDownload} className="mt-2">
              Download
            </Button>
          </>
        ) : (
          <Button
            variant="outline"
            onClick={handleConversion}
            className="text-red-700 border-red-700"
          >
            Retry Conversion
          </Button>
        )}
      </div>

      <AnimatedBorder />
    </div>
  );
};

export default AfterFileUploaded;

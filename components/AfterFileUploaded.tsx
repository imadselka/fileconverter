"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import { getExtensionsByType } from "@/constants/fileExtensions";
import { Action } from "@/types/Action";
import bytesToSize from "@/utils/bytesToSize";
import compressFileName from "@/utils/compressFileName";
import convertFile from "@/utils/convert";
import fileToIcon from "@/utils/fileToIcon";
import loadFfmpeg from "@/utils/loadffmpeg";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { useEffect, useRef, useState } from "react";
import { BiError } from "react-icons/bi";
import { FiUploadCloud } from "react-icons/fi";
import { HiOutlineDownload } from "react-icons/hi";
import { ImSpinner3 } from "react-icons/im";
import { MdClose } from "react-icons/md";

type AfterFileUploadType = {
  fileUpload: File | null;
};

export default function AfterFileUploaded({ fileUpload }: AfterFileUploadType) {
  const { toast } = useToast();
  const [isHover, setIsHover] = useState<boolean>(false);
  const [actions, setActions] = useState<Action[]>([]);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isConverting, setIsConverting] = useState<boolean>(false);
  const [isDone, setIsDone] = useState<boolean>(false);
  const ffmpegRef = useRef<FFmpeg | null>(null);

  // Reset state
  const reset = () => {
    setIsDone(false);
    setActions([]);
    setIsReady(false);
    setIsConverting(false);
  };

  // Convert files
  const convert = async (): Promise<void> => {
    console.log(
      "File Types: ",
      actions.map((action) => action.file_type)
    ); // Debugging
    const tmpActions = actions.map((action) => ({
      ...action,
      is_converting: true,
    }));
    setActions(tmpActions);
    setIsConverting(true);

    for (let action of tmpActions) {
      try {
        const { url, output } = await convertFile(ffmpegRef.current!, action);
        setActions((prevActions) =>
          prevActions.map((elt) =>
            elt.file_name === action.file_name
              ? {
                  ...elt,
                  is_converted: true,
                  is_converting: false,
                  url,
                  output,
                }
              : elt
          )
        );
      } catch (err) {
        setActions((prevActions) =>
          prevActions.map((elt) =>
            elt.file_name === action.file_name
              ? {
                  ...elt,
                  is_converted: false,
                  is_converting: false,
                  is_error: true,
                }
              : elt
          )
        );
        toast({
          variant: "destructive",
          title: "Conversion Failed",
          description: `Failed to convert ${action.file_name}. Please try again.`,
          duration: 5000,
        });
      }
    }

    setIsDone(true);
    setIsConverting(false);
  };

  // Initialize action for the uploaded file
  useEffect(() => {
    if (fileUpload) {
      const action: Action = {
        file_name: fileUpload.name,
        file_size: fileUpload.size,
        from: fileUpload.name.split(".").pop() || "",
        to: String(null),
        file_type: fileUpload.type,
        file: fileUpload,
        is_converted: false,
        is_converting: false,
        is_error: false,
      };
      setActions([action]);
    }
  }, [fileUpload]);

  // Check if conversion is ready
  useEffect(() => {
    const ready = actions.every((action) => action.to !== null);
    setIsReady(ready);
  }, [actions]);

  // Load FFmpeg
  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const ffmpegResponse: FFmpeg = await loadFfmpeg();
    ffmpegRef.current = ffmpegResponse;
    setIsLoaded(true);
  };

  const updateAction = (file_name: string, to: string | null) => {
    setActions((prevActions) =>
      prevActions.map((action) =>
        action.file_name === file_name ? { ...action, to } : action
      )
    );
  };

  const deleteAction = (action: Action): void => {
    setActions((prevActions) =>
      prevActions.filter((a) => a.file_name !== action.file_name)
    );
  };

  const downloadAll = (): void => {
    for (let action of actions) {
      if (!action.is_error) download(action);
    }
  };

  const download = (action: Action) => {
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = action.url!;
    a.download = action.output!;
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(action.url!);
    document.body.removeChild(a);
  };

  if (actions.length) {
    return (
      <div className="space-y-6">
        {actions.map((action, i) => (
          <div
            key={i}
            className="relative flex flex-wrap items-center justify-between w-full px-4 py-4 space-y-2 border cursor-pointer lg:py-0 rounded-xl h-fit lg:h-20 lg:px-10 lg:flex-nowrap"
          >
            {!isLoaded && (
              <Skeleton className="absolute w-full h-full -ml-10 cursor-progress rounded-xl" />
            )}
            <div className="flex flex-row justify-center items-center gap-4">
              <span className="text-2xl text-orange-600">
                {fileToIcon(action.file_type)}
              </span>
              <div className="flex flex-row items-center gap-1 w-96">
                <span className="font-medium truncate w-60 sm:w-full">
                  {compressFileName(action.file_name)}
                </span>
              </div>
              <div className="flex justify-center items-center">
                <Badge variant={"secondary"} className="m-2 h-10 ">
                  <span className="m-2">{bytesToSize(action.file_size)}</span>
                </Badge>
              </div>
            </div>
            <div className="flex items-center p-2 gap-6 lg:gap-20">
              <Select
                disabled={!isLoaded || action.is_converting || isConverting}
                onValueChange={(to) => updateAction(action.file_name, to)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Convert to..." />
                </SelectTrigger>
                <SelectContent>
                  {getExtensionsByType(action.file_type).map((ext: string) => (
                    <SelectItem key={ext} value={ext}>
                      {ext}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="hidden lg:block">
                {!isConverting && !action.is_converted && (
                  <Button
                    disabled={!isReady || isConverting}
                    onClick={convert}
                    className="gap-1"
                  >
                    <FiUploadCloud size={16} />
                    <span className="font-semibold">Convert</span>
                  </Button>
                )}
              </div>
              <div className="flex gap-2 lg:gap-6">
                {!isConverting && !action.is_converted && (
                  <button
                    type="button"
                    className="p-2 text-xl text-gray-500 rounded-lg hover:bg-gray-300/30"
                    onClick={() => deleteAction(action)}
                  >
                    <MdClose />
                  </button>
                )}
                {isConverting && !action.is_converted && (
                  <button
                    disabled
                    className="p-2 text-xl text-blue-500 bg-blue-200 rounded-lg cursor-progress"
                  >
                    <ImSpinner3 className="animate-spin" />
                  </button>
                )}
                {isDone && !action.is_error && action.is_converted && (
                  <button
                    type="button"
                    onClick={() => download(action)}
                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-300/30"
                  >
                    Download
                    <HiOutlineDownload />
                  </button>
                )}
                {isDone && action.is_error && (
                  <button
                    type="button"
                    className="p-2 text-xl text-red-600 bg-red-300 rounded-lg"
                  >
                    <BiError />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
  return null;
}

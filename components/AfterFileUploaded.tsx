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
import { convertDocument } from "@/utils/cloudConvertService";
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
  resetUpload: () => void;
};
export default function AfterFileUploaded({
  fileUpload,
  resetUpload,
}: AfterFileUploadType) {
  const { toast } = useToast();
  const [isHover, setIsHover] = useState<boolean>(false);
  const [actions, setActions] = useState<Action[]>([]);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isConverting, setIsConverting] = useState<boolean>(false);
  const [isDone, setIsDone] = useState<boolean>(false);
  const ffmpegRef = useRef<FFmpeg | null>(null);

  useEffect(() => {
    if (fileUpload) {
      initializeAction(fileUpload);
    }
  }, [fileUpload]);

  useEffect(() => {
    const ready = actions.every((action) => action.to !== null);
    setIsReady(ready);
  }, [actions]);

  useEffect(() => {
    loadFfmpegInstance();
  }, []);

  const initializeAction = (file: File) => {
    const action: Action = {
      file_name: file.name,
      file_size: file.size,
      from: file.name.split(".").pop() || "",
      to: String(null),
      file_type: file.type,
      file: file,
      is_converted: false,
      is_converting: false,
      is_error: false,
    };
    setActions([action]);
  };

  const loadFfmpegInstance = async () => {
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
    if (actions.length <= 1) {
      resetUpload(); // Reset the upload when the last or only action is deleted
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

  const downloadAll = (): void => {
    for (let action of actions) {
      if (!action.is_error) download(action);
    }
  };

  const convert = async (): Promise<void> => {
    setIsConverting(true);
    const tmpActions = actions.map((action) => ({
      ...action,
      is_converting: true,
    }));
    setActions(tmpActions);

    for (let action of tmpActions) {
      try {
        if (
          ["pdf", "doc", "docx", "xls", "xlsx", "ppt", "pptx", "csv"].includes(
            action.from
          )
        ) {
          const { url, output } = await convertDocument(
            action.file!,
            action.to!
          );
          updateConvertedAction(action.file_name, url, output);
        } else {
          const { url, output } = await convertFile(ffmpegRef.current!, action);
          updateConvertedAction(action.file_name, url, output);
        }
      } catch (err) {
        handleConversionError(action.file_name);
      }
    }

    setIsDone(true);
    setIsConverting(false);
  };
  const updateConvertedAction = (
    file_name: string,
    url: string,
    output: string
  ) => {
    setActions((prevActions) =>
      prevActions.map((elt) =>
        elt.file_name === file_name
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
  };

  const handleConversionError = (file_name: string) => {
    setActions((prevActions) =>
      prevActions.map((elt) =>
        elt.file_name === file_name
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
      description: `Failed to convert ${file_name}. Please try again.`,
      duration: 5000,
    });
  };

  if (!actions.length) return null;

  return (
    <div className="space-y-6">
      {actions.map((action, i) => (
        <ActionCard
          key={i}
          action={action}
          isLoaded={isLoaded}
          isConverting={isConverting}
          isDone={isDone}
          updateAction={updateAction}
          deleteAction={deleteAction}
          convert={convert}
          download={download}
        />
      ))}
    </div>
  );
}
const ActionCard = ({
  action,
  isLoaded,
  isConverting,
  isDone,
  updateAction,
  deleteAction,
  convert,
  download,
}: {
  action: Action;
  isLoaded: boolean;
  isConverting: boolean;
  isDone: boolean;
  updateAction: (file_name: string, to: string | null) => void;
  deleteAction: (action: Action) => void;
  convert: () => void;
  download: (action: Action) => void;
}) => {
  return (
    <div className="relative flex flex-wrap items-center justify-between w-full px-4 py-4 space-y-2 border cursor-pointer lg:py-0 rounded-xl h-fit lg:h-20 lg:px-10 lg:flex-nowrap">
      {!isLoaded && (
        <Skeleton className="absolute w-full h-full -ml-10 cursor-progress rounded-xl" />
      )}
      <div className="flex flex-row justify-center items-center gap-4">
        <span className="text-2xl text-orange-800 dark:text-orange-400">
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
        ...
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
            <Button disabled={isConverting} onClick={convert} className="gap-1">
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
  );
};

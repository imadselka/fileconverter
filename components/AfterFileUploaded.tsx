import { BiCheckCircle } from "react-icons/bi";
import { Button } from "./ui/button";

interface AfterFileUploadedProps {
  fileName: string;
  fileSize: string;
  Download: () => void;
}

const AfterFileUploaded = ({
  fileName,
  fileSize,
  Download,
}: AfterFileUploadedProps) => {
  const onDownloadFile = () => {
    console.log("Downloading file...");
  };
  return (
    <>
      <div className="flex justify-center items-center w-[300px] h-[100px]">
        <div className="rounded-2xl bg-gradient-to-br from-gray-200/60 to-gray-500/40 dark:from-gray-400/40 dark:to-gray-600/20 p-10 md:p-20">
          <div className="flex flex-row">
            <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 text-center">
              File name
            </h1>
            <span>size</span>
            <span>
              <BiCheckCircle size={25} className="text-green-500" />
            </span>
            <Button onClick={onDownloadFile}>Download</Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AfterFileUploaded;

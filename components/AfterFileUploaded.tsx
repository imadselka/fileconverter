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
import { CheckCircle2Icon } from "lucide-react";
import Container from "./global/container";
import Wrapper from "./global/wrapper";
import { BorderBeam } from "./ui/border-beam";

interface AfterFileUploadedProps {
  fileName: string;
  fileSize: string;
}

const AfterFileUploaded = ({ fileName, fileSize }: AfterFileUploadedProps) => {
  const onDownloadFile = () => {
    console.log("Downloading file...");
  };

  return (
    <Wrapper className="flex items-center justify-center">
      <Container>
        <div className="relative flex flex-col items-center justify-center gap-6 rounded-2xl bg-gradient-to-br from-gray-200/60 to-gray-500/40 dark:from-gray-400/40 dark:to-gray-600/20 p-10 md:p-20">
          <div className="relative flex justify-between items-center w-full">
            <span className="text-2xl font-semibold text-gray-800 dark:text-gray-200 text-center">
              {fileName}
            </span>
            <span className="text-gray-600 dark:text-gray-400 text-center">
              {fileSize}
            </span>
            <CheckCircle2Icon size={30} color="green" />
            <div className="relative z-20">
              <span>To</span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">Open</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 z-50">
                  <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuRadioGroup>
                    <DropdownMenuRadioItem value="top">
                      Top
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="bottom">
                      Bottom
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="right">
                      Right
                    </DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <BorderBeam size={250} duration={12} delay={9} />
        </div>
      </Container>
    </Wrapper>
  );
};

export default AfterFileUploaded;

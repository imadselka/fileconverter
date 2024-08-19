// utils/fileToIcon.tsx
import { FaFileAudio, FaFileImage, FaFileVideo } from "react-icons/fa";

export default function fileToIcon(type: string) {
  if (type.startsWith("image")) return <FaFileImage />;
  if (type.startsWith("video")) return <FaFileVideo />;
  if (type.startsWith("audio")) return <FaFileAudio />;
  return <FaFileImage />;
}

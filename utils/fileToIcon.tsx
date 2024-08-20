// utils/fileToIcon.tsx
import { FaFileAudio, FaFileImage, FaVideo } from "react-icons/fa";

export default function fileToIcon(type: string) {
  if (type.startsWith("image")) return <FaFileImage />;
  if (type.startsWith("video")) return <FaVideo />;
  if (type.startsWith("audio")) return <FaFileAudio />;
  return <FaFileImage />;
}

import { Action } from "@/types/Action";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile } from "@ffmpeg/util";

// Function to get the file extension from a file name
function getFileExtension(file_name: string): string {
  const match = file_name.match(/\.(\w+)$/);
  return match ? match[1] : "";
}

// Function to remove the file extension from a file name
function removeFileExtension(file_name: string): string {
  return file_name.replace(/\.[^/.]+$/, "");
}

export default async function convert(
  ffmpeg: FFmpeg,
  action: Action
): Promise<any> {
  const { file, to, file_name, file_type } = action;
  const input = getFileExtension(file_name);
  const output = removeFileExtension(file_name) + "." + to;

  if (!input) {
    throw new Error("Invalid file extension");
  }

  // Write file to FFmpeg
  await ffmpeg.writeFile(input, await fetchFile(file));

  // Define FFmpeg command with optimizations
  const ffmpeg_cmd =
    to === "3gp"
      ? [
          "-i",
          input,
          "-r",
          "20",
          "-s",
          "352x288",
          "-b:v",
          "400k",
          "-c:a",
          "aac",
          "-ac",
          "1",
          "-ar",
          "8000",
          "-b:a",
          "24k",
          output,
        ]
      : [
          "-i",
          input,
          "-c:v",
          "libx264",
          "-preset",
          "ultrafast",
          "-crf",
          "23",
          "-c:a",
          "aac",
          "-b:a",
          "192k",
          output,
        ];

  // Execute FFmpeg command
  await ffmpeg.exec(ffmpeg_cmd);

  // Read output file and create URL
  const data = await ffmpeg.readFile(output);
  const blob = new Blob([data], { type: file_type.split("/")[0] });
  const url = URL.createObjectURL(blob);
  return { url, output };
}

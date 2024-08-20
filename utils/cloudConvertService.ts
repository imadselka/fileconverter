import axios from "axios";

export async function convertDocument(
  file: File,
  targetFormat: string
): Promise<{ url: string; output: string }> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("targetFormat", targetFormat);

  const response = await axios.post("/api/convert", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  if (response.status !== 200) {
    throw new Error("Failed to convert document");
  }

  return response.data;
}

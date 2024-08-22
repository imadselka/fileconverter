import axios from "axios";

const getApiKey = (): string => {
  const apiKey = process.env.CLOUD_CONVERT_API_KEY;
  if (!apiKey) {
    throw new Error("CloudConvert API key is not set");
  }
  return apiKey;
};

export const convertDocument = async (
  file: File,
  targetFormat: string
): Promise<{ url: string; output: string }> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("target_format", targetFormat);

  try {
    const response = await axios.post(
      "https://api.cloudconvert.com/v2/jobs",
      {
        tasks: {
          "import-my-file": {
            operation: "import/upload",
          },
          "convert-my-file": {
            operation: "convert",
            input: "import-my-file",
            output_format: targetFormat,
          },
          "export-my-file": {
            operation: "export/url",
            input: "convert-my-file",
          },
        },
      },
      {
        headers: {
          Authorization: `Bearer ${getApiKey()}`,
          "Content-Type": "application/json",
        },
      }
    );

    const jobId = response.data.id;
    // Handle the jobId as needed
    return { url: response.data.url, output: response.data.output };
  } catch (error) {
    console.error("Error converting document:", error);
    throw error;
  }
};

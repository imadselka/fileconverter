import axios from "axios";

const API_URL = "https://api.cloudconvert.com/v2/jobs";
const API_KEY = process.env.NEXT_APP_CLOUDCONVET_API_KEY;
console.log("API_KEY", API_KEY);
if (!API_KEY) {
  console.log("CloudConvert API key not found.");
}

export const convertDocument = async (
  file: File,
  targetFormat: string
): Promise<{ url: string; output: string }> => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    // Create the conversion job
    const jobResponse = await axios.post(
      API_URL,
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
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const jobId = jobResponse.data.data.id;

    // Upload the file
    const uploadTask = jobResponse.data.data.tasks.find(
      (task: any) => task.operation === "import/upload"
    );
    if (!uploadTask || !uploadTask.result || !uploadTask.result.form) {
      throw new Error("Upload task not found or incomplete.");
    }

    const uploadUrl = uploadTask.result.form.url;
    await axios.post(uploadUrl, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    // Wait for the conversion to complete
    let conversionResponse;
    while (true) {
      conversionResponse = await axios.get(`${API_URL}/${jobId}`, {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      });

      const status = conversionResponse.data.data.status;
      if (status === "finished") break;
      if (status === "error") {
        console.error("Conversion error:", conversionResponse.data);
        throw new Error(`Conversion failed with status: ${status}`);
      }

      await new Promise((resolve) => setTimeout(resolve, 2000));
    }

    // Get the export task
    const exportTask = conversionResponse.data.data.tasks.find(
      (task: any) => task.operation === "export/url"
    );

    if (
      !exportTask ||
      !exportTask.result ||
      !exportTask.result.files ||
      !exportTask.result.files[0]
    ) {
      throw new Error("Export task not found or incomplete.");
    }

    const fileUrl = exportTask.result.files[0].url;
    const outputFileName =
      file.name.replace(/\.[^/.]+$/, "") + "." + targetFormat;

    return { url: fileUrl, output: outputFileName };
  } catch (error) {
    console.error("Error converting document:", error);
    throw error;
  }
};

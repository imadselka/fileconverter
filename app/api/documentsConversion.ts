import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

const API_KEY = process.env.CLOUD_CONVERT_API_KEY || "";
const API_URL = "https://api.cloudconvert.com/v2/jobs";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { file, targetFormat } = req.body;

    if (!API_KEY) {
      return res
        .status(500)
        .json({ error: "CloudConvert API key is not set." });
    }

    try {
      // Create a job
      const createJobResponse = await axios.post(
        API_URL,
        {
          tasks: {
            "import-my-file": {
              operation: "import/url",
              url: file,
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
          headers: { Authorization: `Bearer ${API_KEY}` },
        }
      );

      const jobId = createJobResponse.data.data.id;

      // Wait for the job to complete
      let jobStatus;
      do {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const jobStatusResponse = await axios.get(`${API_URL}/${jobId}`, {
          headers: { Authorization: `Bearer ${API_KEY}` },
        });
        jobStatus = jobStatusResponse.data.data.status;
      } while (jobStatus !== "finished" && jobStatus !== "error");

      if (jobStatus === "error") {
        throw new Error("Job failed");
      }

      // Get the exported file URL
      const exportTask = createJobResponse.data.data.tasks.find(
        (task: any) => task.name === "export-my-file"
      );
      const exportedFileUrl = exportTask.result.files[0].url;

      // Send response with conversion result
      res
        .status(200)
        .json({ url: exportedFileUrl, output: `converted.${targetFormat}` });
    } catch (error) {
      console.error("Error during document conversion:", error);
      res.status(500).json({ error: "Conversion failed" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

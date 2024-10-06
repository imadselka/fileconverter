import CloudConvert from "cloudconvert";
import formidable from "formidable";
import { promises as fs } from "fs";
import { NextResponse } from "next/server";

const cloudConvert = new CloudConvert(process.env.CLOUDCONVERT_API_KEY || "");

// Ensure formidable doesn't parse automatically
export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: Request) {
  const form = new formidable.IncomingForm();

  return new Promise((resolve, reject) => {
    form.parse(req, async (err, fields, files) => {
      if (err) return reject(err);

      const { file } = files;
      const { inputFormat, outputFormat } = fields;

      if (!file || Array.isArray(file)) {
        return resolve(NextResponse.error());
      }

      const fileBuffer = await fs.readFile(file.filepath);
      const job = await cloudConvert.jobs.create({
        tasks: {
          "import/file": {
            operation: "import/upload",
          },
          "convert/file": {
            operation: "convert",
            input: "import/file",
            input_format: inputFormat,
            output_format: outputFormat,
          },
          "export/url": {
            operation: "export/url",
            input: "convert/file",
          },
        },
      });

      const uploadTask = job.tasks.filter(
        (task) => task.name === "import/file"
      )[0];
      await fetch(uploadTask.result.form.url, {
        method: "PUT",
        body: fileBuffer,
      });

      await cloudConvert.jobs.wait(job.id);
      const exportTask = job.tasks.filter(
        (task) => task.name === "export/url"
      )[0];
      const fileUrl = exportTask.result.files?.[0].url || "";

      resolve(NextResponse.json({ url: fileUrl }));
    });
  });
}

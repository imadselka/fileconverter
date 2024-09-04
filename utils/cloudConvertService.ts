import axios from "axios";

const API_URL = "https://api.cloudconvert.com/v2/jobs";
const API_KEY =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiZDMyMjljZjQ5NTBlZmUxZjc3N2Y1ZjcyNTg1ZDEyNDI0YWEzMmY0Yzg2NWMyNWRlYjIyMjE3N2ZhOWFmODMzZDJmNDAxN2U3ZjllYTUxY2QiLCJpYXQiOjE3MjQ0MDk3NDcuNzg2MDQ3LCJuYmYiOjE3MjQ0MDk3NDcuNzg2MDQ4LCJleHAiOjQ4ODAwODMzNDcuNzgzNDIyLCJzdWIiOiI2OTMzODA0NiIsInNjb3BlcyI6WyJ1c2VyLnJlYWQiLCJ1c2VyLndyaXRlIiwidGFzay5yZWFkIiwidGFzay53cml0ZSIsIndlYmhvb2sucmVhZCIsIndlYmhvb2sud3JpdGUiLCJwcmVzZXQucmVhZCIsInByZXNldC53cml0ZSJdfQ.WYCO-2qhtMr5Uj_AVj_9Odw6GrVmK8Y3e1PfJMIqgXQ7z6gBqgEE29BjGBkOJQp4vvq3jnG2s78571KN1hSOdGB4JyGZXtoViHmLIeNLuX4lpDcWwwaIa6ZJdrhI7OqbkQ5Q-NLrPJ_Gwfv3yPfTA44ADE6fH5BYMv1EqCmIk3H0h1YnfDSAZIFPhtiydsc7zk0CWHU8z1nF3qZUG9yPgN1Vv-w1hQDKAgF4k_3vWKOgqeZMbYgxx7d-EAlGyoyD22-EhWecavmr8S0cDi7UYxxwg34hGmJblJ6zKipxlDB0jBUpcSg1Yc8_9Vx12-ZE_mv1s9m2HTsv_Zx3rV3b1-vzsv4A05A3Vod0Rm9XUyN7RPCFb3zDz5rMWbFgFwnyImnM5JDLkVCiNH_kjFb8zxsrQnSouLhHunwcf8s9q1kTC2xfdkA_6HVNHJrwcagOEqQakswqsjPnADu0lHFnXVoHT_PooCtTdoRVv9yiPA1lV7tvuyS-CLNbzVOnyUXfD309tgPxKemSf1rSq80Ekp2q-_KS5XWc0iiUPcSWxu02z3PN4DNPe8M3felAvo2rTIhbF0zps2PN1KbG01Xi5x0Us-rlAUNSCNEGjYzPyxNJ9a1AsMNWy_eOOO9VCiEcu9-UO3G-4k7ROyYNQ9Q3NJSAZub8AOiQcbC05hNuzQ0";
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

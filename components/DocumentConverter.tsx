"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

const DocumentConverter = () => {
  const [file, setFile] = useState<File | null>(null);
  const [outputFormat, setOutputFormat] = useState<string>("pdf");
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      setFile(files[0]);
    }
  };

  const handleConvert = async () => {
    if (!file) return;

    const fileBuffer = await file.arrayBuffer();
    const base64File = Buffer.from(fileBuffer).toString("base64");
    const inputFormat = file.name.split(".").pop() || "";

    const response = await fetch("/api/convert", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        file: base64File,
        inputFormat,
        outputFormat,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      setDownloadUrl(data.url);
    } else {
      console.error("Conversion error");
    }
  };

  return (
    <div className="space-y-4">
      <input type="file" onChange={handleFileChange} />
      <select
        value={outputFormat}
        onChange={(e) => setOutputFormat(e.target.value)}
      >
        <option value="pdf">PDF</option>
        <option value="docx">DOCX</option>
        <option value="xlsx">XLSX</option>
        {/* Add more formats as needed */}
      </select>
      <Button onClick={handleConvert}>Convert</Button>
      {downloadUrl && (
        <a href={downloadUrl} download>
          Download Converted File
        </a>
      )}
    </div>
  );
};

export default DocumentConverter;

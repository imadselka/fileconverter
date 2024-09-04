"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";

export default function Page() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const { toast } = useToast();

  // Function to convert CSV to JSON
  const convertCsvToJson = (csv: string) => {
    if (!csv) return "";

    const lines = csv.trim().split("\n");
    const headers = lines[0].split(",");
    const result = lines.slice(1).map((line) => {
      const obj: { [key: string]: string } = {};
      const currentLine = line.split(",");
      headers.forEach((header, i) => {
        obj[header.trim()] = currentLine[i]?.trim() || "";
      });
      return obj;
    });
    return JSON.stringify(result, null, 2);
  };

  // useEffect to automatically convert input to JSON when input changes
  useEffect(() => {
    setOutput(convertCsvToJson(input));
  }, [input]);

  // Function to copy content to clipboard
  const CopyContent = () => {
    navigator.clipboard.writeText(output);
    toast({
      title: "Copied",
      description: "Content copied to clipboard",
      duration: 3000,
    });
  };

  return (
    <Card className="max-w-2xl mx-auto mt-10 p-4">
      <CardHeader>
        <CardTitle>CSV to JSON Converter</CardTitle>
        <CardDescription>
          Convert CSV data to JSON format in real-time
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <textarea
            className="w-full h-40 p-2 border rounded"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your CSV here..."
          />
          <div className="flex flex-row justify-start items-center gap-5">
            <Button variant="outline" onClick={CopyContent}>
              Copy
            </Button>
          </div>
          <pre className="w-full h-40 p-2 border rounded overflow-auto">
            {output || "Your JSON output will appear here..."}
          </pre>
        </div>
      </CardContent>
    </Card>
  );
}

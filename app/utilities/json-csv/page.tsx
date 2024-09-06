"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useCallback, useEffect, useState } from "react";

export default function CsvJsonConverter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [tab, setTab] = useState("csvToJson");
  const { toast } = useToast();

  const convertCsvToJson = useCallback(() => {
    try {
      const lines = input.trim().split("\n");
      const headers = lines[0].split(",");
      const result = lines.slice(1).map((line) => {
        const obj: { [key: string]: string } = {};
        const currentLine = line.split(",");
        headers.forEach((header, i) => {
          obj[header.trim()] = currentLine[i]?.trim() || "";
        });
        return obj;
      });
      setOutput(JSON.stringify(result, null, 2));
    } catch (error) {
      setOutput("Invalid CSV input");
    }
  }, [input]);

  const convertJsonToCsv = useCallback(() => {
    try {
      const obj = JSON.parse(input);
      const headers = Object.keys(obj[0]);
      const csvRows = [
        headers.join(","),
        ...obj.map((row: any) =>
          headers.map((fieldName) => JSON.stringify(row[fieldName])).join(",")
        ),
      ];
      setOutput(csvRows.join("\n"));
    } catch (error) {
      setOutput("Invalid JSON input");
    }
  }, [input]);

  useEffect(() => {
    if (input) {
      if (tab === "csvToJson") {
        convertCsvToJson();
      } else {
        convertJsonToCsv();
      }
    }
  }, [input, convertCsvToJson, convertJsonToCsv, tab]);

  const copyContent = useCallback(() => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    toast({
      title: "Copied",
      description: "Content copied to clipboard",
      duration: 3000,
    });
  }, [output, toast]);

  const handleTabChange = useCallback((value: string) => {
    setTab(value);
    setOutput(""); // Clear output on tab change
  }, []);

  return (
    <div className="flex justify-center items-center">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>CSV/JSON Converter</CardTitle>
          <CardDescription>
            Convert between CSV and JSON formats in real-time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs
            defaultValue="csvToJson"
            className="w-full"
            onValueChange={handleTabChange}
          >
            <TabsList className="grid grid-cols-2">
              <TabsTrigger value="csvToJson">CSV to JSON</TabsTrigger>
              <TabsTrigger value="jsonToCsv">JSON to CSV</TabsTrigger>
            </TabsList>
            <TabsContent value="csvToJson">
              <div className="space-y-4">
                <Textarea
                  placeholder="Paste your CSV here..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="min-h-[150px] w-full"
                />
                <div className="flex justify-between">
                  <Button onClick={copyContent} variant="outline">
                    Copy Output
                  </Button>
                </div>
                <Textarea
                  readOnly
                  value={output}
                  className="min-h-[150px] w-full"
                  placeholder="Your JSON output will appear here..."
                />
              </div>
            </TabsContent>
            <TabsContent value="jsonToCsv">
              <div className="space-y-4">
                <Textarea
                  placeholder="Paste your JSON here..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="min-h-[150px] w-full"
                />
                <div className="flex justify-between">
                  <Button onClick={copyContent} variant="outline">
                    Copy
                  </Button>
                </div>
                <Textarea
                  readOnly
                  value={output}
                  className="min-h-[150px] w-full"
                  placeholder="Your CSV output will appear here..."
                />
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

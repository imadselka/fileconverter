"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useCallback, useEffect, useState } from "react";

export default function JsonFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const { toast } = useToast();

  const formatJson = useCallback(() => {
    try {
      const formatted = JSON.stringify(JSON.parse(input), null, 2);
      setOutput(formatted);
    } catch (error) {
      setOutput("Invalid JSON format");
    }
  }, [input]);

  useEffect(() => {
    if (input) formatJson(); // Trigger real-time formatting
  }, [input, formatJson]);

  const copyContent = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    toast({
      title: "Copied",
      description: "Formatted JSON copied to clipboard",
      duration: 3000,
    });
  };

  return (
    <div className="flex justify-center items-center">
      <Card className="w-full max-w-lg ">
        <CardHeader>
          <CardTitle>JSON Formatter</CardTitle>
          <CardDescription>
            Format and prettify JSON data in real-time
          </CardDescription>
        </CardHeader>
        <CardContent>
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
              placeholder="Formatted JSON will appear here..."
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

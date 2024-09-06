"use client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import yaml from "js-yaml";
import { useEffect, useState } from "react";

export default function JsonToYaml() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    try {
      const obj = JSON.parse(input);
      setOutput(yaml.dump(obj));
    } catch (error) {
      setOutput("Invalid JSON format");
    }
  }, [input]);

  const copyContent = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    toast({
      title: "Copied",
      description: "Content copied to clipboard",
      duration: 3000,
    });
  };

  return (
    <div className=" space-y-4">
      <textarea
        className="w-full h-40 p-2 border rounded"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Paste your JSON here..."
      />
      <Button variant="outline" onClick={copyContent}>
        Copy
      </Button>
      <pre className="w-full h-40 p-2 border rounded overflow-auto">
        {output || "Your YAML output will appear here..."}
      </pre>
    </div>
  );
}

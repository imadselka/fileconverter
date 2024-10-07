"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export default function URLEncoderDecoder() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState("encode");

  const handleEncode = () => {
    try {
      const encoded = encodeURIComponent(input);
      setOutput(encoded);
    } catch (error) {
      setOutput("Error: Invalid input for encoding");
    }
  };

  const handleDecode = () => {
    try {
      const decoded = decodeURIComponent(input);
      setOutput(decoded);
    } catch (error) {
      setOutput("Error: Invalid input for decoding");
    }
  };

  const handleProcess = () => {
    if (mode === "encode") {
      handleEncode();
    } else {
      handleDecode();
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>URL Encoder/Decoder</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs value={mode} onValueChange={setMode}>
          <TabsList>
            <TabsTrigger value="encode">Encode</TabsTrigger>
            <TabsTrigger value="decode">Decode</TabsTrigger>
          </TabsList>
        </Tabs>
        <Textarea
          placeholder={mode === "encode" ? "Text to encode" : "URL to decode"}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button onClick={handleProcess}>
          {mode === "encode" ? "Encode" : "Decode"}
        </Button>
        <Textarea
          placeholder={mode === "encode" ? "Encoded URL" : "Decoded text"}
          value={output}
          readOnly
        />
        <Button onClick={() => navigator.clipboard.writeText(output)}>
          Copy
        </Button>
      </CardContent>
    </Card>
  );
}

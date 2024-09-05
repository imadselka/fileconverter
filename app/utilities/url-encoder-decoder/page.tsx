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

export default function UrlEncoderDecoder() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const { toast } = useToast();

  const encode = useCallback(
    () => setOutput(encodeURIComponent(input)),
    [input]
  );
  const decode = useCallback(
    () => setOutput(decodeURIComponent(input)),
    [input]
  );

  useEffect(() => {
    if (input) encode(); // Trigger real-time encoding
  }, [input, encode]);

  const copyContent = useCallback(() => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    toast({
      title: "Copied",
      description: "Content copied to clipboard",
      duration: 3000,
    });
  }, [output, toast]);
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-full max-w-lg p-4">
        <CardHeader>
          <CardTitle>URL Encoder/Decoder</CardTitle>
          <CardDescription>
            Encode or decode URL components in real-time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="encode" className="w-full">
            <TabsList className="grid grid-cols-2">
              <TabsTrigger value="encode">Encode</TabsTrigger>
              <TabsTrigger value="decode" onClick={decode}>
                Decode
              </TabsTrigger>
            </TabsList>
            <TabsContent value="encode">
              <div className="space-y-4">
                <Textarea
                  placeholder="Enter text to encode..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="min-h-[100px] w-full"
                />
                <div className="flex justify-between">
                  <Button onClick={copyContent} variant="outline">
                    Copy
                  </Button>
                </div>
                <Textarea
                  readOnly
                  value={output}
                  className="min-h-[100px] w-full"
                  placeholder="Encoded URL will appear here..."
                />
              </div>
            </TabsContent>
            <TabsContent value="decode">
              <div className="space-y-4">
                <Textarea
                  placeholder="Enter URL to decode..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="min-h-[100px] w-full"
                />
                <div className="flex justify-between">
                  <Button onClick={copyContent} variant="outline">
                    Copy
                  </Button>
                </div>
                <Textarea
                  readOnly
                  value={output}
                  className="min-h-[100px] w-full"
                  placeholder="Decoded text will appear here..."
                />
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

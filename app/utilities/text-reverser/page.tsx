"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export default function TextReverser() {
  const [input, setInput] = useState("");
  const [reversed, setReversed] = useState("");

  const reverseText = () => {
    setReversed(input.split("").reverse().join(""));
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Text Reverser</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter text to reverse"
          rows={5}
        />
        <Button onClick={reverseText}>Reverse Text</Button>
        {reversed && <Textarea value={reversed} readOnly rows={5} />}
      </CardContent>
    </Card>
  );
}

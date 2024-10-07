"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { diffChars } from "diff";
import { useState } from "react";

export default function TextDiffChecker() {
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [diff, setDiff] = useState<any[]>([]);

  const compareDiff = () => {
    const differences = diffChars(text1, text2);
    setDiff(differences);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Text Diff Checker</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Textarea
            value={text1}
            onChange={(e) => setText1(e.target.value)}
            placeholder="Enter first text"
            rows={10}
          />
          <Textarea
            value={text2}
            onChange={(e) => setText2(e.target.value)}
            placeholder="Enter second text"
            rows={10}
          />
        </div>
        <Button onClick={compareDiff}>Compare Texts</Button>
        {diff.length > 0 && (
          <div className="mt-4 p-4 border rounded">
            {diff.map((part, index) => (
              <span
                key={index}
                className={
                  part.added ? "bg-green-200" : part.removed ? "bg-red-200" : ""
                }
              >
                {part.value}
              </span>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

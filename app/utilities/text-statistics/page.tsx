"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";

interface TextStats {
  characters: number;
  words: number;
  sentences: number;
  paragraphs: number;
}

export default function TextStatisticsCounter() {
  const [text, setText] = useState("");
  const [stats, setStats] = useState<TextStats>({
    characters: 0,
    words: 0,
    sentences: 0,
    paragraphs: 0,
  });

  useEffect(() => {
    const words = text
      .trim()
      .split(/\s+/)
      .filter((word) => word !== "").length;
    const sentences = text
      .split(/[.!?]+/)
      .filter((sentence) => sentence.trim() !== "").length;
    const paragraphs = text
      .split("\n")
      .filter((para) => para.trim() !== "").length;

    setStats({
      characters: text.length,
      words,
      sentences,
      paragraphs,
    });
  }, [text]);

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Text Statistics Counter</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={10}
          placeholder="Enter your text here..."
        />
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="font-semibold">Characters:</p>
            <p>{stats.characters}</p>
          </div>
          <div>
            <p className="font-semibold">Words:</p>
            <p>{stats.words}</p>
          </div>
          <div>
            <p className="font-semibold">Sentences:</p>
            <p>{stats.sentences}</p>
          </div>
          <div>
            <p className="font-semibold">Paragraphs:</p>
            <p>{stats.paragraphs}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

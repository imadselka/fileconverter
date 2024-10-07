"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

type CaseType = "uppercase" | "lowercase" | "titlecase" | "sentencecase";

export default function TextCaseConverter() {
  const [text, setText] = useState("");
  const [caseType, setCaseType] = useState<CaseType>("uppercase");

  const convertCase = () => {
    switch (caseType) {
      case "uppercase":
        setText(text.toUpperCase());
        break;
      case "lowercase":
        setText(text.toLowerCase());
        break;
      case "titlecase":
        setText(
          text.replace(
            /\w\S*/g,
            (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
          )
        );
        break;
      case "sentencecase":
        setText(text.charAt(0).toUpperCase() + text.slice(1).toLowerCase());
        break;
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Text Case Converter</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={10}
          placeholder="Enter your text here..."
        />
        <div className="flex space-x-4">
          <Select
            value={caseType}
            onValueChange={(value) => setCaseType(value as CaseType)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select case" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="uppercase">UPPERCASE</SelectItem>
              <SelectItem value="lowercase">lowercase</SelectItem>
              <SelectItem value="titlecase">Title Case</SelectItem>
              <SelectItem value="sentencecase">Sentence case</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={convertCase}>Convert</Button>
        </div>
      </CardContent>
    </Card>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRightLeft } from "lucide-react";
import { useState } from "react";

const morseCodeMap: { [key: string]: string } = {
  A: ".-",
  B: "-...",
  C: "-.-.",
  D: "-..",
  E: ".",
  F: "..-.",
  G: "--.",
  H: "....",
  I: "..",
  J: ".---",
  K: "-.-",
  L: ".-..",
  M: "--",
  N: "-.",
  O: "---",
  P: ".--.",
  Q: "--.-",
  R: ".-.",
  S: "...",
  T: "-",
  U: "..-",
  V: "...-",
  W: ".--",
  X: "-..-",
  Y: "-.--",
  Z: "--..",
  "0": "-----",
  "1": ".----",
  "2": "..---",
  "3": "...--",
  "4": "....-",
  "5": ".....",
  "6": "-....",
  "7": "--...",
  "8": "---..",
  "9": "----.",
  " ": "/",
};

export default function MorseCodeTranslator() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"textToMorse" | "morseToText">(
    "textToMorse"
  );

  const textToMorse = (text: string) => {
    return text
      .toUpperCase()
      .split("")
      .map((char) => morseCodeMap[char] || char)
      .join(" ");
  };

  const morseToText = (morse: string) => {
    const reverseMorseCodeMap = Object.fromEntries(
      Object.entries(morseCodeMap).map(([key, value]) => [value, key])
    );
    return morse
      .split(" ")
      .map((code) => reverseMorseCodeMap[code] || code)
      .join("");
  };

  const handleTranslate = () => {
    if (mode === "textToMorse") {
      setOutput(textToMorse(input));
    } else {
      setOutput(morseToText(input));
    }
  };

  const toggleMode = () => {
    setMode(mode === "textToMorse" ? "morseToText" : "textToMorse");
    setInput("");
    setOutput("");
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ArrowRightLeft className="h-6 w-6" />
          Morse Code Translator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <span>{mode === "textToMorse" ? "Text" : "Morse Code"}</span>
          <Button onClick={toggleMode}>Switch Mode</Button>
          <span>{mode === "textToMorse" ? "Morse Code" : "Text"}</span>
        </div>
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Enter ${
            mode === "textToMorse" ? "text" : "Morse code"
          } here`}
          className="h-32"
        />
        <Button onClick={handleTranslate} className="w-full">
          Translate
        </Button>
        <Textarea
          value={output}
          readOnly
          placeholder="Translation will appear here"
          className="h-32"
        />
      </CardContent>
    </Card>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { quotes } from "@/constants/quotes";
import { Download, QuoteIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useRef, useState } from "react";

export default function InspirationalQuoteGenerator() {
  const [quote, setQuote] = useState(quotes[0]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generateQuote = () => {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(randomQuote);
  };

  const theme = useTheme();
  const downloadQuote = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        canvas.width = 800;
        canvas.height = 400;

        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "white";
        ctx.font = "bold 32px Arial";
        ctx.textAlign = "center";
        const words = quote.text.split(" ");
        let line = "";
        let y = 150;
        for (let i = 0; i < words.length; i++) {
          const testLine = line + words[i] + " ";
          const metrics = ctx.measureText(testLine);
          if (metrics.width > canvas.width - 100 && i > 0) {
            ctx.fillText(line, canvas.width / 2, y);
            line = words[i] + " ";
            y += 40;
          } else {
            line = testLine;
          }
        }
        ctx.fillText(line, canvas.width / 2, y);
        ctx.font = "italic 24px Arial";
        ctx.fillText(`- ${quote.author}`, canvas.width / 2, y + 60);
        const image = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = image;
        link.download = "inspirational-quote.png";
        link.click();
      }
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <QuoteIcon className="h-6 w-6" />
          Inspirational Quote Generator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {theme.theme === "dark" ? (
          <div className="p-8 rounded-lg text-white text-center">
            <p className="text-2xl font-bold mb-4">{quote.text}</p>
            <p className="text-xl italic">- {quote.author}</p>
          </div>
        ) : (
          <div className="p-8 rounded-lg text-black text-center ">
            <p className="text-2xl font-bold mb-4">{quote.text}</p>
            <p className="text-xl italic">- {quote.author}</p>
          </div>
        )}
        <div className="flex justify-between">
          <Button variant="ghost" onClick={generateQuote}>
            Generate New Quote
          </Button>
          <Button variant="outline" onClick={downloadQuote}>
            <Download className="mr-2 h-4 w-4" />
            Download Quote
          </Button>
        </div>
        <canvas ref={canvasRef} className="hidden" />
      </CardContent>
    </Card>
  );
}

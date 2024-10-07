"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";

function generatePalette(baseColor: string): string[] {
  const hex = baseColor.replace("#", "");
  const rgb = parseInt(hex, 16);
  const r = (rgb >> 16) & 0xff;
  const g = (rgb >> 8) & 0xff;
  const b = rgb & 0xff;

  const palette = [];
  for (let i = 0; i < 5; i++) {
    const factor = 0.8 + i * 0.1;
    const newR = Math.round(r * factor);
    const newG = Math.round(g * factor);
    const newB = Math.round(b * factor);
    palette.push(
      `#${((newR << 16) | (newG << 8) | newB).toString(16).padStart(6, "0")}`
    );
  }

  return palette;
}

export default function ColorPaletteGenerator() {
  const [baseColor, setBaseColor] = useState("#3498db");
  const [palette, setPalette] = useState<string[]>([]);

  const handleGeneratePalette = () => {
    setPalette(generatePalette(baseColor));
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Color Palette Generator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex space-x-4">
          <Input
            type="color"
            value={baseColor}
            onChange={(e) => setBaseColor(e.target.value)}
            className="w-16 h-16"
          />
          <Input
            type="text"
            value={baseColor}
            onChange={(e) => setBaseColor(e.target.value)}
            placeholder="#RRGGBB"
          />
          <Button onClick={handleGeneratePalette}>Generate Palette</Button>
        </div>
        {palette.length > 0 && (
          <div className="flex space-x-2">
            {palette.map((color, index) => (
              <div key={index} className="text-center">
                <div
                  className="w-20 h-20 rounded"
                  style={{ backgroundColor: color }}
                ></div>
                <p className="mt-1">{color}</p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";

function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

function rgbToHsl(r: number, g: number, b: number) {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h,
    s,
    l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h! /= 6;
  }

  return {
    h: Math.round(h! * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

export default function ColorConverter() {
  const [hex, setHex] = useState("#000000");
  const [rgb, setRgb] = useState({ r: 0, g: 0, b: 0 });
  const [hsl, setHsl] = useState({ h: 0, s: 0, l: 0 });

  const convertColor = () => {
    const rgbColor = hexToRgb(hex);
    if (rgbColor) {
      setRgb(rgbColor);
      const hslColor = rgbToHsl(rgbColor.r, rgbColor.g, rgbColor.b);
      setHsl(hslColor);
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Color Converter</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex space-x-4">
          <Input
            type="text"
            placeholder="HEX (e.g., #FF0000)"
            value={hex}
            onChange={(e) => setHex(e.target.value)}
          />
          <Button onClick={convertColor}>Convert</Button>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="font-bold">RGB</p>
            <p>{`R: ${rgb.r}, G: ${rgb.g}, B: ${rgb.b}`}</p>
          </div>
          <div>
            <p className="font-bold">HSL</p>
            <p>{`H: ${hsl.h}, S: ${hsl.s}%, L: ${hsl.l}%`}</p>
          </div>
          <div>
            <p className="font-bold">Preview</p>
            <div
              className="w-16 h-16 border border-gray-300"
              style={{ backgroundColor: hex }}
            ></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

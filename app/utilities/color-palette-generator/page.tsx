"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, Palette, Upload } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

export default function ColorPaletteGenerator() {
  const [palette, setPalette] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const generatePalette = (imageFile: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0, img.width, img.height);

        const imageData = ctx?.getImageData(
          0,
          0,
          canvas.width,
          canvas.height
        ).data;
        const colorMap: { [key: string]: number } = {};

        if (imageData) {
          for (let i = 0; i < imageData.length; i += 4) {
            const color = `#${(
              (1 << 24) +
              (imageData[i] << 16) +
              (imageData[i + 1] << 8) +
              imageData[i + 2]
            )
              .toString(16)
              .slice(1)}`;
            colorMap[color] = (colorMap[color] || 0) + 1;
          }
        }

        const sortedColors = Object.entries(colorMap).sort(
          (a, b) => b[1] - a[1]
        );
        const topColors = sortedColors.slice(0, 5).map(([color]) => color);
        setPalette(topColors);
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(imageFile);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      generatePalette(file);
    }
  };

  const copyColor = (color: string) => {
    navigator.clipboard.writeText(color);
    toast.success(`Copied ${color} to clipboard`);
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Palette className="h-6 w-6" />
          Color Palette Generator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-center">
          <Button onClick={() => fileInputRef.current?.click()}>
            <Upload className="mr-2 h-4 w-4" /> Upload Image
          </Button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
        </div>
        {palette.length > 0 && (
          <div className="grid grid-cols-5 gap-2">
            {palette.map((color, index) => (
              <div key={index} className="flex flex-col items-center">
                <div
                  className="w-16 h-16 rounded-full cursor-pointer"
                  style={{ backgroundColor: color }}
                  onClick={() => copyColor(color)}
                />
                <span className="mt-2 text-sm">{color}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => copyColor(color)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

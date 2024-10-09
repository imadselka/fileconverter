"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Download, Eraser, Palette } from "lucide-react";
import { useRef, useState } from "react";

export default function PixelArtCreator() {
  const [gridSize, setGridSize] = useState(16);
  const [color, setColor] = useState("#000000");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isErasing, setIsErasing] = useState(false);

  const initializeCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        drawGrid();
      }
    }
  };

  const drawGrid = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const cellSize = canvas.width / gridSize;
        ctx.strokeStyle = "#e0e0e0";
        ctx.lineWidth = 1;

        for (let i = 0; i <= gridSize; i++) {
          const pos = i * cellSize;
          ctx.beginPath();
          ctx.moveTo(pos, 0);
          ctx.lineTo(pos, canvas.height);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(0, pos);
          ctx.lineTo(canvas.width, pos);
          ctx.stroke();
        }
      }
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    draw(e);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (isDrawing) {
      draw(e);
    }
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (canvas) {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cellSize = canvas.width / gridSize;
      const cellX = Math.floor(x / cellSize);
      const cellY = Math.floor(y / cellSize);

      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.fillStyle = isErasing ? "white" : color;
        ctx.fillRect(cellX * cellSize, cellY * cellSize, cellSize, cellSize);
        drawGrid();
      }
    }
  };

  const downloadImage = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const image = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = image;
      link.download = "pixel-art.png";
      link.click();
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        drawGrid();
      }
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Palette className="h-6 w-6" />
          Pixel Art Creator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex space-x-4 items-center">
          <Input
            type="number"
            value={gridSize}
            onChange={(e) => setGridSize(Number(e.target.value))}
            min="1"
            max="64"
            className="w-20"
          />
          <Input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-20"
          />
          <Button onClick={() => setIsErasing(!isErasing)}>
            <Eraser className="mr-2 h-4 w-4" />
            {isErasing ? "Drawing" : "Erasing"}
          </Button>
          <Button onClick={clearCanvas}>Clear</Button>
          <Button onClick={downloadImage}>
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
        </div>
        <canvas
          ref={canvasRef}
          width={400}
          height={400}
          className="border border-gray-300"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        />
      </CardContent>
    </Card>
  );
}

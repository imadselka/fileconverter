"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRef, useState } from "react";

export default function ImageResizer() {
  const [image, setImage] = useState<File | null>(null);
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [preserveAspectRatio, setPreserveAspectRatio] = useState(true);
  const [format, setFormat] = useState("PNG");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setImage(e.dataTransfer.files[0]);
    }
  };

  const handleResize = () => {
    // Implement image resizing logic here
    console.log("Resizing image...");
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Image Resizer</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div
          className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
        >
          <p>Drag and drop your image here, or click to select</p>
          <p>Max size 40MB</p>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            accept="image/*"
            className="hidden"
          />
        </div>
        <div className="flex space-x-4">
          <Input
            type="number"
            placeholder="Width (px)"
            value={width}
            onChange={(e) => setWidth(e.target.value)}
          />
          <Input
            type="number"
            placeholder="Height (px)"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="preserveAspectRatio"
            checked={preserveAspectRatio}
            onCheckedChange={(checked) =>
              setPreserveAspectRatio(checked as boolean)
            }
          />
          <label htmlFor="preserveAspectRatio">Preserve Aspect Ratio</label>
        </div>
        <Select value={format} onValueChange={setFormat}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select format" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="PNG">PNG</SelectItem>
            <SelectItem value="JPEG">JPEG</SelectItem>
            <SelectItem value="WEBP">WEBP</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={handleResize}>Resize</Button>
        <Button>Download Image</Button>
      </CardContent>
    </Card>
  );
}

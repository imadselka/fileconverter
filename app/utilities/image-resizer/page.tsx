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
import { Image as ImageIcon, Upload } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export default function ImageResizer() {
  const [image, setImage] = useState<File | null>(null);
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [preserveAspectRatio, setPreserveAspectRatio] = useState(true);
  const [format, setFormat] = useState("PNG");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));

      const img = new window.Image();
      img.onload = () => {
        setWidth(img.width.toString());
        setHeight(img.height.toString());
      };
      img.src = URL.createObjectURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));

      // Set the default width and height based on the image's original dimensions
      const img = new window.Image();
      img.onload = () => {
        setWidth(img.width.toString());
        setHeight(img.height.toString());
      };
      img.src = URL.createObjectURL(file);
    }
  };

  const handleResize = () => {
    if (!image) return;

    const img = new window.Image();
    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      let w = parseInt(width) || img.width;
      let h = parseInt(height) || img.height;

      if (preserveAspectRatio) {
        const aspectRatio = img.width / img.height;
        if (w && !h) {
          h = Math.round(w / aspectRatio);
        } else if (h && !w) {
          w = Math.round(h * aspectRatio);
        }
      }

      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d");
      ctx?.clearRect(0, 0, w, h);
      ctx?.drawImage(img, 0, 0, w, h);
    };
    img.src = URL.createObjectURL(image);
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.toBlob(
      (blob) => {
        if (blob) {
          const resizedImage = new File(
            [blob],
            image?.name || "resized-image",
            {
              type: `image/${format.toLowerCase()}`,
            }
          );
          const url = URL.createObjectURL(resizedImage);

          const a = document.createElement("a");
          a.href = url;
          a.download = `resized_${image?.name}.${format.toLowerCase()}`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);

          toast.success("Image resized and download started");
        }
      },
      `image/${format.toLowerCase()}`,
      0.9
    );
  };

  useEffect(() => {
    if (width || height) {
      handleResize();
    }
  }, [width, height, preserveAspectRatio]);

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ImageIcon className="h-6 w-6" />
          Image Resizer
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div
          className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
        >
          {previewUrl ? (
            <canvas ref={canvasRef} className="max-w-full h-auto mx-auto" />
          ) : (
            <>
              <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <p>Drag and drop your image here, or click to select</p>
              <p className="text-sm text-gray-500">Max size 40MB</p>
            </>
          )}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            accept="image/*"
            className="hidden"
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <Input
            type="number"
            min="1"
            placeholder="Width (px)"
            value={width}
            onChange={(e) => setWidth(e.target.value)}
          />
          <Input
            type="number"
            min="1"
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
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Select format" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="PNG">PNG</SelectItem>
            <SelectItem value="JPEG">JPEG</SelectItem>
            <SelectItem value="WEBP">WEBP</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={handleDownload} className="w-full">
          Download Resized Image
        </Button>
      </CardContent>
    </Card>
  );
}

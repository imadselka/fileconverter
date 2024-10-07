"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { useRef, useState } from "react";

export default function ImageToBase64Converter() {
  const [base64, setBase64] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const convertToBase64 = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      setBase64(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      convertToBase64(event.target.files[0]);
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Image to Base64 Converter</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          ref={fileInputRef}
          className="hidden"
        />
        <Button onClick={() => fileInputRef.current?.click()}>
          Select Image
        </Button>
        {base64 && (
          <div className="space-y-4">
            <Image src={base64} alt="Converted" className="max-w-full h-auto" />
            <Textarea value={base64} readOnly rows={5} />
            <Button onClick={() => navigator.clipboard.writeText(base64)}>
              Copy Base64
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

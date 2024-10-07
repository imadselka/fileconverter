"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

const units = ["Bytes", "KB", "MB", "GB", "TB"];

export default function FileSizeConverter() {
  const [size, setSize] = useState("");
  const [fromUnit, setFromUnit] = useState("MB");
  const [toUnit, setToUnit] = useState("GB");
  const [result, setResult] = useState("");

  const convertSize = () => {
    const sizeNum = parseFloat(size);
    if (isNaN(sizeNum)) {
      setResult("Invalid input");
      return;
    }

    const fromIndex = units.indexOf(fromUnit);
    const toIndex = units.indexOf(toUnit);
    const difference = fromIndex - toIndex;

    const convertedSize = sizeNum * Math.pow(1024, difference);
    setResult(`${convertedSize.toFixed(2)} ${toUnit}`);
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>File Size Converter</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex space-x-4">
          <Input
            type="number"
            value={size}
            onChange={(e) => setSize(e.target.value)}
            placeholder="Enter size"
          />
          <Select value={fromUnit} onValueChange={setFromUnit}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="From" />
            </SelectTrigger>
            <SelectContent>
              {units.map((unit) => (
                <SelectItem key={unit} value={unit}>
                  {unit}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={toUnit} onValueChange={setToUnit}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="To" />
            </SelectTrigger>
            <SelectContent>
              {units.map((unit) => (
                <SelectItem key={unit} value={unit}>
                  {unit}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button onClick={convertSize}>Convert</Button>
        {result && (
          <div className="mt-4">
            <p className="font-semibold">Result:</p>
            <p>{result}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

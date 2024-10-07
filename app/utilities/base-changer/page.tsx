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

const bases = [
  { value: "2", label: "Binary (2)" },
  { value: "8", label: "Octal (8)" },
  { value: "10", label: "Decimal (10)" },
  { value: "16", label: "Hexadecimal (16)" },
];

export default function NumberBaseChanger() {
  const [number, setNumber] = useState("");
  const [fromBase, setFromBase] = useState("10");
  const [toBase, setToBase] = useState("2");
  const [result, setResult] = useState("");

  const changeBase = () => {
    try {
      const decimal = parseInt(number, parseInt(fromBase));
      const converted = decimal.toString(parseInt(toBase));
      setResult(converted.toUpperCase());
    } catch (error) {
      console.error("Error changing base:", error);
      setResult("Invalid input");
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Number Base Changer</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          placeholder="Enter number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />
        <div className="flex space-x-4">
          <Select value={fromBase} onValueChange={setFromBase}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="From Base" />
            </SelectTrigger>
            <SelectContent>
              {bases.map((base) => (
                <SelectItem key={base.value} value={base.value}>
                  {base.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={toBase} onValueChange={setToBase}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="To Base" />
            </SelectTrigger>
            <SelectContent>
              {bases.map((base) => (
                <SelectItem key={base.value} value={base.value}>
                  {base.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button onClick={changeBase}>Convert</Button>
        <Input value={result} readOnly />
        <Button onClick={() => navigator.clipboard.writeText(result)}>
          Copy Result
        </Button>
      </CardContent>
    </Card>
  );
}

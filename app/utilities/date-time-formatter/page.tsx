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

const formatOptions = [
  { value: "short", label: "Short" },
  { value: "medium", label: "Medium" },
  { value: "long", label: "Long" },
  { value: "full", label: "Full" },
];

export default function DateTimeFormatter() {
  const [date, setDate] = useState("");
  const [format, setFormat] = useState("medium");
  const [locale, setLocale] = useState("en-US");
  const [formattedDate, setFormattedDate] = useState("");

  const formatDate = () => {
    try {
      const dateObj = new Date(date);
      const formatted = new Intl.DateTimeFormat(locale, {
        dateStyle: format as any,
        timeStyle: format as any,
      }).format(dateObj);
      setFormattedDate(formatted);
    } catch (error) {
      setFormattedDate("Invalid date or format");
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Date and Time Formatter</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          type="datetime-local"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <Select value={format} onValueChange={setFormat}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select format" />
          </SelectTrigger>
          <SelectContent>
            {formatOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input
          type="text"
          value={locale}
          onChange={(e) => setLocale(e.target.value)}
          placeholder="Locale (e.g., en-US, fr-FR)"
        />
        <Button onClick={formatDate}>Format Date</Button>
        {formattedDate && (
          <div className="mt-4">
            <p className="font-semibold">Formatted Date:</p>
            <p>{formattedDate}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

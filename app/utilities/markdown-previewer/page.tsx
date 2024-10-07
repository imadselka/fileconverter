"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import ReactMarkdown from "react-markdown";

export default function MarkdownPreviewer() {
  const [markdown, setMarkdown] = useState(
    "# Hello, Markdown!\n\nThis is a **bold** text and this is *italic*."
  );

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Markdown Previewer</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Input</h3>
            <Textarea
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              rows={20}
              className="w-full"
              placeholder="Enter your Markdown here..."
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Preview</h3>
            <div className="border rounded-md p-4 prose dark:prose-invert max-w-none">
              <ReactMarkdown>{markdown}</ReactMarkdown>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";

const regexComponents = [
  { label: "Any character", value: "." },
  { label: "Digit", value: "\\d" },
  { label: "Word character", value: "\\w" },
  { label: "Whitespace", value: "\\s" },
  { label: "Start of string", value: "^" },
  { label: "End of string", value: "$" },
  { label: "Zero or more", value: "*" },
  { label: "One or more", value: "+" },
  { label: "Zero or one", value: "?" },
  { label: "Or", value: "|" },
  { label: "Group", value: "()" },
  { label: "Character set", value: "[]" },
];

export default function RegexBuilder() {
  const [regexParts, setRegexParts] = useState<string[]>([]);
  const [customInput, setCustomInput] = useState("");
  const [flags, setFlags] = useState("g");
  const [testString, setTestString] = useState("");
  const [regexOutput, setRegexOutput] = useState("");
  const [matchOutput, setMatchOutput] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    const regex = regexParts.join("");
    setRegexOutput(regex ? `/${regex}/${flags}` : "");
    testRegex(regex);
  }, [regexParts, flags, testString]);

  const addRegexPart = (part: string) => {
    setRegexParts([...regexParts, part]);
  };

  const addCustomPart = () => {
    if (customInput) {
      addRegexPart(customInput);
      setCustomInput("");
    }
  };

  const removeLastPart = () => {
    setRegexParts(regexParts.slice(0, -1));
  };

  const testRegex = (regex: string) => {
    try {
      const regexObj = new RegExp(regex, flags);
      const matches = Array.from(
        testString.matchAll(regexObj),
        (match) => match[0]
      );
      setMatchOutput(matches.length ? matches.join("\n") : "No matches found");
    } catch (error) {
      setMatchOutput("Invalid regex");
    }
  };

  const copyRegex = () => {
    if (!regexOutput) return;
    navigator.clipboard.writeText(regexOutput);
    toast({
      title: "Copied",
      description: "Regex copied to clipboard",
      duration: 3000,
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="flex flex-col justify-center items-center w-full max-w-4xl lg:max-w-5xl h-full p-4">
        <CardHeader className="text-center">
          <CardTitle className="text-xl md:text-2xl">
            Regex Builder and Tester
          </CardTitle>
          <CardDescription>Build and test regular expressions</CardDescription>
        </CardHeader>
        <CardContent className="w-full">
          <Tabs defaultValue="builder" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="builder">Builder</TabsTrigger>
              <TabsTrigger value="tester">Tester</TabsTrigger>
            </TabsList>
            <TabsContent value="builder">
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 justify-center">
                  {regexComponents.map((component) => (
                    <Button
                      key={component.value}
                      variant="outline"
                      onClick={() => addRegexPart(component.value)}
                    >
                      {component.label}
                    </Button>
                  ))}
                </div>
                <div className="flex space-x-2 justify-center">
                  <Input
                    value={customInput}
                    onChange={(e) => setCustomInput(e.target.value)}
                    placeholder="Custom regex part"
                    className="max-w-xs"
                  />
                  <Button onClick={addCustomPart}>Add Custom</Button>
                </div>
                <div className="flex items-center space-x-2 justify-center">
                  <Label htmlFor="flags">Flags:</Label>
                  <Input
                    id="flags"
                    value={flags}
                    onChange={(e) => setFlags(e.target.value)}
                    className="w-20"
                  />
                </div>
                <div className="flex flex-wrap gap-2 justify-center">
                  {regexParts.map((part, index) => (
                    <Badge key={index} variant="secondary">
                      {part}
                    </Badge>
                  ))}
                </div>
                <div className="flex justify-between">
                  <Button variant="outline" onClick={removeLastPart}>
                    Remove Last
                  </Button>
                  <Button onClick={copyRegex}>Copy</Button>
                </div>
                <Textarea
                  readOnly
                  value={regexOutput}
                  className="min-h-[50px]"
                  placeholder="Your regex will appear here..."
                />
              </div>
            </TabsContent>
            <TabsContent value="tester">
              <div className="space-y-4 flex flex-col items-center">
                <Textarea
                  value={testString}
                  onChange={(e) => setTestString(e.target.value)}
                  placeholder="Enter test string here..."
                  className="min-h-[150px] w-full md:min-h-[200px]"
                />
                <Textarea
                  readOnly
                  value={matchOutput}
                  className="min-h-[150px] w-full md:min-h-[200px]"
                  placeholder="Matches will appear here..."
                />
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

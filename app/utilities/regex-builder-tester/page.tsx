"use client";
import RegexBuilder from "@/components/RegexBuilder";
import RegexTester from "@/components/RegexTester";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";

export default function Page() {
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
        </CardHeader>
        <CardContent className="w-full">
          <Tabs defaultValue="builder" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="builder">Builder</TabsTrigger>
              <TabsTrigger value="tester">Tester</TabsTrigger>
            </TabsList>
            <TabsContent value="builder">
              <RegexBuilder
                regexParts={regexParts}
                setRegexParts={setRegexParts}
                customInput={customInput}
                setCustomInput={setCustomInput}
                flags={flags}
                setFlags={setFlags}
                copyRegex={copyRegex}
              />
              <Textarea
                readOnly
                value={regexOutput}
                className="min-h-[50px]"
                placeholder="Your regex will appear here..."
              />
            </TabsContent>
            <TabsContent value="tester">
              <RegexTester
                testString={testString}
                setTestString={setTestString}
                matchOutput={matchOutput}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

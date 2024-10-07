"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";

export default function PasswordGenerator() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(12);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);

  const generatePassword = () => {
    let charset = "";
    if (includeUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeLowercase) charset += "abcdefghijklmnopqrstuvwxyz";
    if (includeNumbers) charset += "0123456789";
    if (includeSymbols) charset += "!@#$%^&*()_+{}[]|:;<>,.?/~";

    let generatedPassword = "";
    for (let i = 0; i < length; i++) {
      generatedPassword += charset.charAt(
        Math.floor(Math.random() * charset.length)
      );
    }
    setPassword(generatedPassword);
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Password Generator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex space-x-4">
          <Input value={password} readOnly />
          <Button onClick={() => navigator.clipboard.writeText(password)}>
            Copy
          </Button>
        </div>
        <div className="space-y-2">
          <p>Password Length: {length}</p>
          <Slider
            value={[length]}
            onValueChange={(value) => setLength(value[0])}
            min={8}
            max={32}
            step={1}
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="uppercase"
              checked={includeUppercase}
              onCheckedChange={(checked) =>
                setIncludeUppercase(checked as boolean)
              }
            />
            <label htmlFor="uppercase">Include Uppercase</label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="lowercase"
              checked={includeLowercase}
              onCheckedChange={(checked) =>
                setIncludeLowercase(checked as boolean)
              }
            />
            <label htmlFor="lowercase">Include Lowercase</label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="numbers"
              checked={includeNumbers}
              onCheckedChange={(checked) =>
                setIncludeNumbers(checked as boolean)
              }
            />
            <label htmlFor="numbers">Include Numbers</label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="symbols"
              checked={includeSymbols}
              onCheckedChange={(checked) =>
                setIncludeSymbols(checked as boolean)
              }
            />
            <label htmlFor="symbols">Include Symbols</label>
          </div>
        </div>
        <Button onClick={generatePassword}>Generate Password</Button>
      </CardContent>
    </Card>
  );
}

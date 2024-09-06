"use client";

import JsonToYaml from "@/components/JsonToYaml";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import YamlToJson from "@/components/YamlToJson";
import { useState } from "react";

export default function Page() {
  const [activeTool, setActiveTool] = useState<"jsonToYaml" | "yamlToJson">(
    "jsonToYaml"
  );

  return (
    <Card className="max-w-xl max-h-screen mx-auto mt-2 p-4">
      {" "}
      <CardHeader>
        {" "}
        <CardTitle>JSON/YAML Converter</CardTitle>{" "}
        <CardDescription>
          {" "}
          Switch between JSON-to-YAML and YAML-to-JSON converters{" "}
        </CardDescription>{" "}
      </CardHeader>{" "}
      <CardContent>
        {" "}
        <div className="flex flex-row justify-start items-center gap-5 mb-4">
          {" "}
          <Button
            variant={activeTool === "jsonToYaml" ? "outline" : "ghost"}
            onClick={() => setActiveTool("jsonToYaml")}
          >
            {" "}
            JSON to YAML{" "}
          </Button>{" "}
          <Button
            variant={activeTool === "yamlToJson" ? "outline" : "ghost"}
            onClick={() => setActiveTool("yamlToJson")}
          >
            {" "}
            YAML to JSON{" "}
          </Button>{" "}
        </div>
        {activeTool === "jsonToYaml" && <JsonToYaml />}
        {activeTool === "yamlToJson" && <YamlToJson />}
      </CardContent>
    </Card>
  );
}

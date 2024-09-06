import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

interface Props {
  regexParts: string[];
  setRegexParts: (parts: string[]) => void;
  customInput: string;
  setCustomInput: (input: string) => void;
  flags: string;
  setFlags: (flags: string) => void;
  copyRegex: () => void;
}

const RegexBuilder: React.FC<Props> = ({
  regexParts,
  setRegexParts,
  customInput,
  setCustomInput,
  flags,
  setFlags,
  copyRegex,
}) => {
  const { toast } = useToast();

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

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 justify-center">
        {[
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
        ].map((component) => (
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
    </div>
  );
};

export default RegexBuilder;

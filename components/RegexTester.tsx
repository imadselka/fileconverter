import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface Props {
  regexPattern: string;
  setRegexPattern: (input: string) => void;
  testString: string;
  setTestString: (input: string) => void;
  matchOutput: string;
}

const RegexTester: React.FC<Props> = ({
  regexPattern,
  setRegexPattern,
  testString,
  setTestString,
  matchOutput,
}) => {
  return (
    <div className="">
      <div>
        <Label htmlFor="regex-pattern">Regex Pattern</Label>
        <Textarea
          id="regex-pattern"
          value={regexPattern}
          onChange={(e) => setRegexPattern(e.target.value)}
          placeholder="Enter regex pattern here (e.g., /pattern/g)"
          className="min-h-[50px]"
        />
      </div>
      <div>
        <Label htmlFor="test-string">Test String</Label>
        <Textarea
          id="test-string"
          value={testString}
          onChange={(e) => setTestString(e.target.value)}
          placeholder="Enter test string here..."
          className="min-h-[80px]"
        />
      </div>
      <div>
        <Label htmlFor="match-output">Result</Label>
        <Textarea
          id="match-output"
          readOnly
          value={matchOutput}
          className="min-h-[50px]"
          placeholder="Matches will appear here..."
        />
      </div>
    </div>
  );
};

export default RegexTester;

import { Textarea } from "@/components/ui/textarea";

interface Props {
  testString: string;
  setTestString: (input: string) => void;
  matchOutput: string;
}

const RegexTester: React.FC<Props> = ({
  testString,
  setTestString,
  matchOutput,
}) => {
  return (
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
  );
};

export default RegexTester;

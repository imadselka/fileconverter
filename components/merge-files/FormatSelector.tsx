import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FormatSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function FormatSelector({
  value,
  onChange,
}: FormatSelectorProps) {
  return (
    <Select onValueChange={onChange} value={value}>
      <SelectTrigger>
        <SelectValue placeholder="Select output format" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="pdf">PDF</SelectItem>
        <SelectItem value="docx">DOCX</SelectItem>
        <SelectItem value="txt">DOC</SelectItem>
        <SelectItem value="txt">TXT</SelectItem>
      </SelectContent>
    </Select>
  );
}

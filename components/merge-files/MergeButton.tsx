import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface MergeButtonProps {
  onClick: () => void;
  disabled: boolean;
  isMerging: boolean;
}

export default function MergeButton({
  onClick,
  disabled,
  isMerging,
}: MergeButtonProps) {
  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Button
        onClick={onClick}
        className="w-full"
        variant="outline"
        disabled={disabled}
      >
        {isMerging ? "Merging Files..." : "Merge and Download"}
      </Button>
    </motion.div>
  );
}

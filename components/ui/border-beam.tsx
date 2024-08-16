import { motion } from "framer-motion";

interface BorderBeamProps {
  className?: string;
  size?: number;
  duration?: number;
  borderWidth?: number;
  colorFrom?: string;
  colorTo?: string;
  delay?: number;
}

export const BorderBeam = ({
  className,
  size = 200,
  duration = 10,
  borderWidth = 2,
  colorFrom = "#ffaa40",
  colorTo = "#9c40ff",
  delay = 0,
}: BorderBeamProps) => {
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden rounded-lg ${className}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderWidth: `${borderWidth}px`,
      }}
    >
      <motion.div
        className="absolute top-0 left-0 w-full h-full rounded-[inherit] pointer-events-none"
        style={{
          borderWidth: `${borderWidth}px`,
          borderStyle: "solid",
          borderImage: `linear-gradient(to right, ${colorFrom}, ${colorTo}) 1`,
        }}
        initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
        animate={{
          clipPath: [
            "inset(0% 0% 100% 0%)",
            "inset(0% 0% 0% 0%)",
            "inset(100% 0% 0% 0%)",
            "inset(100% 0% 0% 100%)",
            "inset(0% 0% 100% 100%)",
          ],
        }}
        transition={{
          duration: duration,
          ease: "linear",
          repeat: Infinity,
          repeatDelay: delay,
        }}
      />
    </div>
  );
};

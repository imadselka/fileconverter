import { cn } from "@/lib/utils";

interface BorderBeamProps {
  className?: string;
  size?: number;
  duration?: number;
  borderWidth?: number;
  anchor?: number;
  colorFrom?: string;
  colorTo?: string;
  delay?: number;
}

export const BorderBeam = ({
  className,
  size = 100,
  duration = 15,
  anchor = 100,
  borderWidth = 2,
  colorFrom = "#ffaa40",
  colorTo = "#9c40ff",
  delay = 0,
}: BorderBeamProps) => {
  return (
    <div
      style={
        {
          "--size": `${size}px`,
          "--duration": `${duration}s`,
          "--anchor": `${anchor}%`,
          "--border-width": `${borderWidth}px`,
          "--color-from": colorFrom,
          "--color-to": colorTo,
          "--delay": `-${delay}s`,
        } as React.CSSProperties
      }
      className={cn(
        "absolute inset-0 rounded-inherit",
        "mask-[linear-gradient(transparent,transparent),linear-gradient(white,white)]",
        "mask-clip-[padding-box,border-box] mask-composite-intersect",
        "after:absolute after:aspect-square after:w-[100px] after:h-[10px] after:animate-border-beam",
        "after:[animation-delay:var(--delay)] after:[background:linear-gradient(to_left,var(--color-from),var(--color-to),transparent)]",
        "after:[offset-anchor:var(--anchor)_50%] after:[offset-path:rect(0_auto_auto_0_round_calc(var(--size)))]",
        "z-10", // Ensure BorderBeam has a lower z-index
        className
      )}
    />
  );
};

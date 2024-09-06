import { useTheme } from "next-themes";

const Logo = ({ className = "", size = 32 }) => {
  const { theme } = useTheme();

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect width="32" height="32" rx="6" className="fill-primary" />
      <path
        d="M8 8L24 24M8 24L24 8"
        className="stroke-primary-foreground"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M16 6V26M6 16H26"
        className="stroke-primary-foreground"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default Logo;

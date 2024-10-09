import {
  AlignLeft,
  BarChart2,
  Calendar,
  Database,
  DiffIcon,
  File,
  FileCode,
  FileImage,
  FileJson,
  FileText,
  FileType,
  FlipVertical,
  GitFork,
  HardDrive,
  Hash,
  Home,
  Image,
  Key,
  KeyRound,
  Link,
  Palette,
  TimerIcon,
  Type,
  User2,
  UserPlus,
} from "lucide-react";
import { BiColor } from "react-icons/bi";
import { FaMarkdown, FaQuoteLeft } from "react-icons/fa";
import { HiCurrencyDollar } from "react-icons/hi";
import { RiSketching } from "react-icons/ri";

export const utilities = [
  {
    title: "JSON to CSV / CSV to JSON",
    description: "Convert between JSON and CSV formats.",
    link: "utilities/json-csv",
    shortcut: "Alt+J",
    icon: FileJson,
  },
  {
    title: "JSON Formatter",
    description: "Format and beautify your JSON data.",
    link: "utilities/json-formatter",
    shortcut: "Alt+F",
    icon: AlignLeft,
  },
  {
    title: "JSON to YAML / YAML to JSON",
    description: "Convert between JSON and YAML formats.",
    link: "utilities/json-yaml",
    shortcut: "Alt+Y",
    icon: File,
  },
  {
    title: "URL Encoder/Decoder",
    description: "Encode or decode URLs safely.",
    link: "utilities/url-encoder-decoder",
    shortcut: "Alt+U",
    icon: Link,
  },
  {
    title: "Regex Builder & Tester",
    description: "Build and test regular expressions.",
    link: "utilities/regex-builder-tester",
    shortcut: "Alt+R",
    icon: FileCode,
  },
  {
    title: "Image Resizer",
    description: "Resize images to a specific width and height.",
    link: "utilities/image-resizer",
    shortcut: "Alt+I",
    icon: Image,
  },
  {
    title: "Text Case Converter",
    description: "Convert text between different cases.",
    link: "utilities/text-case-converter",
    shortcut: "Alt+T",
    icon: Type,
  },
  {
    title: "Text Diff Checker",
    description: "Compare two texts and highlight differences.",
    link: "utilities/text-diff",
    shortcut: "Alt+X",
    icon: DiffIcon,
  },
  {
    title: "Text Statistics Counter",
    description: "Count words, characters, and more in text.",
    link: "utilities/text-statistics",
    shortcut: "Alt+Z",
    icon: BarChart2,
  },
  {
    title: "Base64 Encoder/Decoder",
    description: "Encode and decode Base64 data.",
    link: "utilities/base64",
    shortcut: "Alt+B",
    icon: FileText,
  },
  {
    title: "Image to Base64 Converter",
    description: "Convert images to Base64 encoded strings.",
    link: "utilities/image-to-base64",
    shortcut: "Alt+M",
    icon: FileImage,
  },
  {
    title: "JWT Parser",
    description: "Parse and verify JSON Web Tokens.",
    link: "utilities/jwt-parser",
    shortcut: "Alt+W",
    icon: Key,
  },
  {
    title: "Markdown Previewer",
    description: "Preview Markdown formatted text in real-time.",
    link: "utilities/markdown-previewer",
    shortcut: "Alt+K",
    icon: FileType,
  },
  {
    title: "Password Generator",
    description: "Generate secure, random passwords.",
    link: "utilities/password-generator",
    shortcut: "Alt+P",
    icon: KeyRound,
  },
  {
    title: "SQL Query Builder",
    description: "Build SQL queries with a user-friendly interface.",
    link: "utilities/sql-query-builder",
    shortcut: "Alt+Q",
    icon: Database,
  },
  {
    title: "Date and Time Formatter",
    description: "Format dates and times in various styles.",
    link: "utilities/date-time-formatter",
    shortcut: "Alt+D",
    icon: Calendar,
  },
  {
    title: "Currency Converter",
    description: "Convert between different currencies.",
    link: "utilities/currency-converter",
    shortcut: "Alt+C",
    icon: HiCurrencyDollar,
  },
  {
    title: "File Size Converter",
    description: "Convert between different file size units.",
    link: "utilities/file-size-converter",
    shortcut: "Alt+S",
    icon: HardDrive,
  },
  {
    title: "Random User Generator",
    description: "Generate random user data for testing.",
    link: "utilities/generate-random-user",
    shortcut: "Alt+G",
    icon: UserPlus,
  },
  {
    title: "Text Hashing Tool",
    description: "Generate hash values for text using various algorithms.",
    link: "utilities/hash",
    shortcut: "Alt+H",
    icon: Hash,
  },
  {
    title: "Color Converter",
    description: "Convert between different color formats.",
    link: "utilities/color-converter",
    shortcut: "Alt+O",
    icon: Palette,
  },
  {
    title: "Color Palette Generator",
    description: "Generate color palettes from images.",
    link: "utilities/color-palette-generator",
    shortcut: "Alt+L",
    icon: BiColor,
  },
  {
    title: "Text Reverser",
    description: "Reverse the order of characters in text.",
    link: "utilities/text-reverser",
    shortcut: "Alt+V",
    icon: FlipVertical,
  },
  {
    title: "Pomodoro Timer",
    description: "A simple timer for the Pomodoro Technique.",
    link: "utilities/pomodoro-timer",
    shortcut: "Alt+E",
    icon: TimerIcon,
  },
  {
    title: "Markdown Note Editor",
    description: "A simple markdown note editor.",
    link: "utilities/markdown-note-editor",
    shortcut: "Alt+N",
    icon: FaMarkdown,
  },
  {
    title: "Pixel Art Creator",
    description: "Create pixel art with a grid-based canvas.",
    link: "utilities/pixel-art-creator",
    shortcut: "Alt+A",
    icon: RiSketching,
  },
  {
    title: "Morse Code Translator",
    description: "Translate text to and from Morse code.",
    link: "utilities/morse-code-translator",
    shortcut: "Alt+R",
    icon: FaQuoteLeft,
  },
  {
    title: "Inspiration Quote Generator",
    description: "Generate inspirational quotes with custom backgrounds.",
    link: "utilities/inspiration-quote-generator",
    shortcut: "Alt+Q",
    icon: FaQuoteLeft,
  },
];

export const links = [
  {
    icon: GitFork,
    title: "Contribute on GitHub",
    href: "https://github.com/imadselka/fileconverter",
    shortcut: "Alt+G",
  },
  {
    icon: User2,
    title: "Follow me on social media",
    href: "https://linktr.ee/ImadSelka",
    shortcut: "Alt+S",
  },
  { icon: Home, title: "Home", href: "/", shortcut: "Alt+H" },
];

// utils/compressFileName.ts
export default function compressFileName(
  name: string,
  min: number = 10,
  max: number = 30
): string {
  const extIndex = name.lastIndexOf(".");

  if (extIndex === -1 || name.length <= max) {
    return name;
  }

  const baseName = name.slice(0, extIndex); // Extract the base name without extension
  const ext = name.slice(extIndex); // Extract the extension

  if (baseName.length <= min) {
    return name;
  }

  const start = baseName.slice(0, min); // First part of the base name
  const end = baseName.slice(-min); // Last part of the base name

  return `${start}...${end}${ext}`;
}

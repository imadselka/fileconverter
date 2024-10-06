import { motion } from "framer-motion";
import React, { useCallback, useState } from "react";

interface ResizableImageProps {
  element: {
    id: string;
    type: "image";
    src: string;
    width: number;
    height: number;
    x: number;
    y: number;
    rotation: number;
    zIndex: number;
  };
  onUpdate: (updates: Partial<ResizableImageProps["element"]>) => void;
  isDarkMode: boolean;
}

const ResizableImage: React.FC<ResizableImageProps> = ({
  element,
  onUpdate,
  isDarkMode,
}) => {
  const [isResizing, setIsResizing] = useState(false);

  const handleDrag = useCallback(
    (event: any, info: { point: { x: number; y: number } }) => {
      onUpdate({ x: info.point.x, y: info.point.y });
    },
    [onUpdate]
  );

  const handleResize = useCallback(
    (event: MouseEvent, corner: string) => {
      if (!isResizing) return;

      const deltaX = event.movementX;
      const deltaY = event.movementY;

      let newWidth = element.width;
      let newHeight = element.height;
      let newX = element.x;
      let newY = element.y;

      switch (corner) {
        case "topLeft":
          newWidth -= deltaX;
          newHeight -= deltaY;
          newX += deltaX;
          newY += deltaY;
          break;
        case "topRight":
          newWidth += deltaX;
          newHeight -= deltaY;
          newY += deltaY;
          break;
        case "bottomLeft":
          newWidth -= deltaX;
          newHeight += deltaY;
          newX += deltaX;
          break;
        case "bottomRight":
          newWidth += deltaX;
          newHeight += deltaY;
          break;
      }

      onUpdate({ width: newWidth, height: newHeight, x: newX, y: newY });
    },
    [isResizing, element, onUpdate]
  );

  const handleRotate = useCallback(
    (event: MouseEvent) => {
      const rect = (event.target as HTMLElement).getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const angle = Math.atan2(
        event.clientY - centerY,
        event.clientX - centerX
      );
      const rotation = angle * (180 / Math.PI);
      onUpdate({ rotation });
    },
    [onUpdate]
  );

  return (
    <motion.div
      drag
      dragMomentum={false}
      onDrag={handleDrag}
      style={{
        position: "absolute",
        left: element.x,
        top: element.y,
        width: element.width,
        height: element.height,
        transform: `rotate(${element.rotation}deg)`,
        zIndex: element.zIndex,
      }}
    >
      <img
        src={element.src}
        alt="image"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
        }}
      />
      <div
        className={`absolute top-0 left-0 w-full h-full border-2 ${
          isDarkMode ? "border-white" : "border-black"
        } pointer-events-none`}
      />
      {["topLeft", "topRight", "bottomLeft", "bottomRight"].map((corner) => (
        <div
          key={corner}
          className={`absolute w-3 h-3 ${
            isDarkMode ? "bg-white" : "bg-black"
          } rounded-full cursor-nwse-resize`}
          style={{
            top: corner.startsWith("top") ? -4 : "auto",
            bottom: corner.startsWith("bottom") ? -4 : "auto",
            left: corner.endsWith("Left") ? -4 : "auto",
            right: corner.endsWith("Right") ? -4 : "auto",
          }}
          onMouseDown={() => setIsResizing(true)}
          onMouseUp={() => setIsResizing(false)}
          onMouseMove={(e) => handleResize(e.nativeEvent, corner)}
        />
      ))}
      <div
        className={`absolute top-0 left-1/2 w-3 h-3 ${
          isDarkMode ? "bg-white" : "bg-black"
        } rounded-full cursor-move -translate-x-1/2 -translate-y-1/2`}
        style={{ transform: "translateY(-100%)" }}
        onMouseDown={() => setIsResizing(true)}
        onMouseUp={() => setIsResizing(false)}
        onMouseMove={(e) => handleRotate(e.nativeEvent)}
      />
    </motion.div>
  );
};

export default ResizableImage;

"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FaBars, FaMoon, FaSun } from "react-icons/fa";
import ExportModal from "./ExportModa";
import ResizableImage from "./ResizableImage";
import TextBox from "./TextBox";
import Toolbar from "./Toolbar";

interface Element {
  id: string;
  type: "image" | "text";
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  zIndex: number;
}

interface ImageElement extends Element {
  type: "image";
  src: string;
}

interface TextElement extends Element {
  type: "text";
  text: string;
  fontSize: number;
  fontFamily: string;
  color: string;
}

type CanvasElement = ImageElement | TextElement;

export default function ImageManipulator() {
  const [elements, setElements] = useState<CanvasElement[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const canvasRef = useRef<HTMLDivElement>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          setElements((prevElements) => [
            ...prevElements,
            {
              id: Date.now().toString(),
              type: "image",
              src: e.target?.result as string,
              width: img.width,
              height: img.height,
              x: 0,
              y: 0,
              rotation: 0,
              zIndex: prevElements.length,
            },
          ]);
        };
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleAddText = () => {
    setElements((prevElements) => [
      ...prevElements,
      {
        id: Date.now().toString(),
        type: "text",
        text: "New Text",
        x: 0,
        y: 0,
        width: 100,
        height: 24,
        fontSize: 16,
        fontFamily: "Arial",
        color: isDarkMode ? "#FFFFFF" : "#000000",
        rotation: 0,
        zIndex: prevElements.length,
      },
    ]);
  };

  const handleUndo = () => {
    // Implement undo logic
  };

  const handleRedo = () => {
    // Implement redo logic
  };

  const handleZoomIn = () => {
    setZoom((prevZoom) => Math.min(prevZoom + 0.1, 2));
  };

  const handleZoomOut = () => {
    setZoom((prevZoom) => Math.max(prevZoom - 0.1, 0.5));
  };

  const handleResetZoom = () => {
    setZoom(1);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const updateElement = (id: string, updates: Partial<CanvasElement>) => {
    setElements((prevElements) =>
      prevElements.map((el) => {
        if (el.id === id) {
          if (el.type === "image" && updates.type === "image") {
            return { ...el, ...updates } as ImageElement;
          } else if (el.type === "text" && updates.type === "text") {
            return { ...el, ...updates } as TextElement;
          }
        }
        return el;
      })
    );
  };

  return (
    <div
      className={`flex h-screen ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }`}
    >
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 250 }}
            exit={{ width: 0 }}
            className={`${
              isDarkMode ? "bg-gray-800" : "bg-white"
            } shadow-lg p-4`}
          >
            <Toolbar
              onAddImage={() => document.getElementById("fileInput")?.click()}
              onAddText={handleAddText}
              onExport={() => setIsExportModalOpen(true)}
              onUndo={handleUndo}
              onRedo={handleRedo}
              onZoomIn={handleZoomIn}
              onZoomOut={handleZoomOut}
              onResetZoom={handleResetZoom}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex-1 p-4">
        <div className="flex justify-between mb-4">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className={`${
              isDarkMode
                ? "bg-gray-700 hover:bg-gray-600"
                : "bg-gray-200 hover:bg-gray-300"
            } text-current font-bold py-2 px-4 rounded`}
          >
            <FaBars />
          </button>
          <button
            onClick={toggleDarkMode}
            className={`${
              isDarkMode
                ? "bg-gray-700 hover:bg-gray-600"
                : "bg-gray-200 hover:bg-gray-300"
            } text-current font-bold py-2 px-4 rounded`}
          >
            {isDarkMode ? <FaSun /> : <FaMoon />}
          </button>
        </div>

        <div
          ref={canvasRef}
          className={`relative w-full h-[calc(100vh-6rem)] ${
            isDarkMode ? "border-gray-600" : "border-gray-300"
          } border-2 overflow-hidden`}
          style={{ transform: `scale(${zoom})`, transformOrigin: "top left" }}
        >
          {elements.map((element) => {
            if (element.type === "image") {
              return (
                <ResizableImage
                  key={element.id}
                  element={element}
                  onUpdate={(updates) => updateElement(element.id, updates)}
                  isDarkMode={isDarkMode}
                />
              );
            } else if (element.type === "text") {
              return (
                <TextBox
                  key={element.id}
                  element={element}
                  onUpdate={(updates) => updateElement(element.id, updates)}
                  isDarkMode={isDarkMode}
                />
              );
            }
            return null;
          })}
        </div>

        <div
          {...getRootProps()}
          className={`mt-4 ${
            isDarkMode
              ? "border-gray-600 text-gray-300"
              : "border-gray-300 text-gray-700"
          } border-2 border-dashed p-4 cursor-pointer rounded`}
        >
          <input {...getInputProps()} id="fileInput" />
          <p>
            {isDragActive
              ? "Drop the files here..."
              : "Drag 'n' drop some files here, or click to select files"}
          </p>
        </div>
      </div>

      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        canvasRef={canvasRef}
        isDarkMode={isDarkMode}
      />
    </div>
  );
}

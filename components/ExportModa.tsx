import { AnimatePresence, motion } from "framer-motion";
import html2canvas from "html2canvas";
import React, { useState } from "react";

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  canvasRef: React.RefObject<HTMLDivElement>;
  isDarkMode: boolean;
}

const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  canvasRef,
  isDarkMode,
}) => {
  const [fileName, setFileName] = useState("combined_image");
  const [fileFormat, setFileFormat] = useState("png");
  const [quality, setQuality] = useState(1);

  const handleExport = async () => {
    if (canvasRef.current) {
      const canvas = await html2canvas(canvasRef.current, {
        scale: quality,
      });
      const link = document.createElement("a");
      link.download = `${fileName}.${fileFormat}`;
      link.href = canvas.toDataURL(`image/${fileFormat}`, quality);
      link.click();
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
        >
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            className={`${
              isDarkMode ? "bg-gray-800 text-white" : "bg-white text-black"
            } p-6 rounded-lg`}
          >
            <h2 className="text-2xl font-bold mb-4">Export Image</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="fileName" className="block mb-1">
                  File Name:
                </label>
                <input
                  type="text"
                  id="fileName"
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                  className={`w-full border rounded px-2 py-1 ${
                    isDarkMode
                      ? "bg-gray-700 border-gray-600"
                      : "bg-white border-gray-300"
                  }`}
                />
              </div>
              <div>
                <label htmlFor="fileFormat" className="block mb-1">
                  File Format:
                </label>
                <select
                  id="fileFormat"
                  value={fileFormat}
                  onChange={(e) => setFileFormat(e.target.value)}
                  className={`w-full border rounded px-2 py-1 ${
                    isDarkMode
                      ? "bg-gray-700 border-gray-600"
                      : "bg-white border-gray-300"
                  }`}
                >
                  <option value="png">PNG</option>
                  <option value="jpeg">JPEG</option>
                  <option value="svg">SVG</option>
                </select>
              </div>
              <div>
                <label htmlFor="quality" className="block mb-1">
                  Quality:
                </label>
                <input
                  type="range"
                  id="quality"
                  min="0.1"
                  max="1"
                  step="0.1"
                  value={quality}
                  onChange={(e) => setQuality(parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={onClose}
                  className={`${
                    isDarkMode
                      ? "bg-gray-600 hover:bg-gray-500"
                      : "bg-gray-300 hover:bg-gray-400"
                  } text-current font-bold py-2 px-4 rounded`}
                >
                  Cancel
                </button>
                <button
                  onClick={handleExport}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                >
                  Export
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ExportModal;

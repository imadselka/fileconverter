import React from "react";
import {
  FaExpand,
  FaFileExport,
  FaFileUpload,
  FaFont,
  FaRedo,
  FaSearchMinus,
  FaSearchPlus,
  FaUndo,
} from "react-icons/fa";

interface ToolbarProps {
  onAddImage: () => void;
  onAddText: () => void;
  onExport: () => void;
  onUndo: () => void;
  onRedo: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetZoom: () => void;
}

const Toolbar: React.FC<ToolbarProps> = ({
  onAddImage,
  onAddText,
  onExport,
  onUndo,
  onRedo,
  onZoomIn,
  onZoomOut,
  onResetZoom,
}) => {
  return (
    <div className="flex flex-col space-y-4">
      <button
        onClick={onAddImage}
        className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
      >
        <FaFileUpload />
        <span>Add Image</span>
      </button>
      <button
        onClick={onAddText}
        className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
      >
        <FaFont />
        <span>Add Text</span>
      </button>
      <button
        onClick={onExport}
        className="flex items-center space-x-2 bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded"
      >
        <FaFileExport />
        <span>Export</span>
      </button>
      <div className="flex space-x-2">
        <button
          onClick={onUndo}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
        >
          <FaUndo />
        </button>
        <button
          onClick={onRedo}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
        >
          <FaRedo />
        </button>
      </div>
      <div className="flex space-x-2">
        <button
          onClick={onZoomIn}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
        >
          <FaSearchPlus />
        </button>
        <button
          onClick={onZoomOut}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
        >
          <FaSearchMinus />
        </button>
        <button
          onClick={onResetZoom}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
        >
          <FaExpand />
        </button>
      </div>
    </div>
  );
};

export default Toolbar;

import React, { createContext, Dispatch, useReducer } from "react";

interface ImageElement {
  id: string;
  src: string;
  width: number;
  height: number;
  x: number;
  y: number;
  rotation: number;
  opacity: number;
  zIndex: number;
}

interface TextElement {
  id: string;
  text: string;
  x: number;
  y: number;
  fontSize: number;
  fontFamily: string;
  color: string;
  rotation: number;
  zIndex: number;
}

type Element = ImageElement | TextElement;

interface CanvasState {
  elements: Element[];
  history: Element[][];
  currentStep: number;
}

type Action =
  | { type: "ADD_IMAGE"; payload: ImageElement }
  | { type: "ADD_TEXT"; payload: TextElement }
  | {
      type: "UPDATE_ELEMENT";
      payload: { id: string; updates: Partial<Element> };
    }
  | { type: "UNDO" }
  | { type: "REDO" };

const initialState: CanvasState = {
  elements: [],
  history: [],
  currentStep: -1,
};

const canvasReducer = (state: CanvasState, action: Action): CanvasState => {
  switch (action.type) {
    case "ADD_IMAGE":
    case "ADD_TEXT":
      const newElements = [...state.elements, action.payload];
      return {
        ...state,
        elements: newElements,
        history: [
          ...state.history.slice(0, state.currentStep + 1),
          newElements,
        ],
        currentStep: state.currentStep + 1,
      };
    case "UPDATE_ELEMENT":
      const updatedElements = state.elements.map((el) =>
        el.id === action.payload.id ? { ...el, ...action.payload.updates } : el
      );
      return {
        ...state,
        elements: updatedElements,
        history: [
          ...state.history.slice(0, state.currentStep + 1),
          updatedElements,
        ],
        currentStep: state.currentStep + 1,
      };
    case "UNDO":
      if (state.currentStep > 0) {
        return {
          ...state,
          elements: state.history[state.currentStep - 1],
          currentStep: state.currentStep - 1,
        };
      }
      return state;
    case "REDO":
      if (state.currentStep < state.history.length - 1) {
        return {
          ...state,
          elements: state.history[state.currentStep + 1],
          currentStep: state.currentStep + 1,
        };
      }
      return state;
    default:
      return state;
  }
};

export const CanvasContext = createContext<{
  state: CanvasState;
  dispatch: Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null,
});

export const CanvasProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(canvasReducer, initialState);

  return (
    <CanvasContext.Provider value={{ state, dispatch }}>
      {children}
    </CanvasContext.Provider>
  );
};

import { createContext, useContext, useEffect } from "react";
import useCanvasProperties from "./useCanvasProperties";
import useCanvasStates from "./useCanvasStates";
import useHandlePointer from "./useHandlePointer";
import useHandleTouch from "./useHandleTouch";
import usePen from "./usePen";
import usePosition from "./usePosition";
import useTouch from "./useTouch";
import getStroke from "perfect-freehand";
import useIsMovingCanvas from "./useIsMovingCanvas";
import { CanvasContextTypes } from "../types/CanvasContextTypes";

export type svgPathType = {path: string, color: string}

export type pointType = (number[] | { x: number; y: number; pressure?: number | undefined; })[]

const getSvgPathFromStroke = (stroke) => {
  if (!stroke.length) return ""

  const d = stroke.reduce(
    (acc, [x0, y0], i, arr) => {
      const [x1, y1] = arr[(i + 1) % arr.length]
      acc.push(x0, y0, (x0 + x1) / 2, (y0 + y1) / 2)
      return acc
    },
    ["M", ...stroke[0], "Q"]
  )

  d.push("Z")
  return d.join(" ")
}

export const CanvasContext = createContext<CanvasContextTypes | undefined>(undefined);

export const useCanvasContext: () => CanvasContextTypes = () => {
  const canvasContext = useContext(CanvasContext);
  if (canvasContext === undefined) {
    throw new Error("useCanvasContext must be used with a CanvasContext.Provider");
  }
  return canvasContext;
}

export const useCanvasStateVars = () => {

  // --- State variables ---
  const { points, setPoints, states, setStates, index, setIndex, allPathData, setAllPathData, setPathData, isDrawing, setIsDrawing, undo, redo } = useCanvasStates();
  const { left, setLeft, top, setTop } = usePosition();
  const { touchX, setTouchX, touchY, setTouchY } = useTouch();
  const { width, setWidth, height, setHeight } = useCanvasProperties();
  const { color, setColor, penSize, setPenSize } = usePen();
  const { isMovingCanvas, setIsMovingCanvas } = useIsMovingCanvas();

  // --- Handlers ---
  const { handleTouchStartGeneral, handleTouchMoveGeneral, handleTouchEndGeneral } = useHandleTouch();
  const { handlePointerDownGeneral, handlePointerMoveGeneral, handlePointerUpGeneral } = useHandlePointer();

  // --- Error handling ---
  const canvasContext = useContext(CanvasContext);
  // if (canvasContext === undefined) {
  //   throw new Error("useCanvasContext must be used with a CanvasContext.Provider");
  // }

  const options = {
    size: penSize,
    smoothing: 0.01,
    thinning: 0.5,
    streamline: 0.5,
    easing: (t) => t,
    start: {
      taper: 0,
      cap: true,
    },
    end: {
      taper: 0,
      cap: true,
    },
  };
  
  useEffect(() => {
    
  });

  const handleTouchStart = (e) => {
    handleTouchStartGeneral(e, left, top, setTouchX, setTouchY, setIsMovingCanvas);
  }

  const handleTouchMove  = (e) => {
    handleTouchMoveGeneral(e, left, top, setLeft, setTop, touchX, touchY, setIsMovingCanvas);
  }

  const handleTouchEnd = (e) => {
    handleTouchEndGeneral(e, top, setTop, setIsMovingCanvas);
  }

  function handlePointerDown(e) {
    handlePointerDownGeneral(e, setPoints, left, top, setIsDrawing);
  }

  function handlePointerMove(e) {
    handlePointerMoveGeneral(e, points, setPoints, left, top, setIsDrawing);
  }

  function handlePointerUp(e) {
    handlePointerUpGeneral(e, allPathData, setAllPathData, pathData, color, states, setStates, setIsDrawing, index, setIndex);
  }

  const stroke = getStroke(points, options);
  const pathData = (getSvgPathFromStroke(stroke));
  
  return {
    canvasStates: {
      points, setPoints, states, setStates, index, setIndex, allPathData, setAllPathData, pathData, setPathData, isDrawing, setIsDrawing, undo, redo
    },
    position: {
      left, setLeft, top, setTop
    },
    touch: {
      touchX, setTouchX, touchY, setTouchY
    },
    canvasProperties: {
      width, setWidth, height, setHeight
    },
    penSize: {
      color, setColor, penSize, setPenSize
    },
    handleTouch: {
      handleTouchStart, handleTouchMove, handleTouchEnd
    },
    handlePointer: {
      handlePointerDown, handlePointerMove, handlePointerUp
    },
    movingCanvas: {
      isMovingCanvas, setIsMovingCanvas
    }
  };
};
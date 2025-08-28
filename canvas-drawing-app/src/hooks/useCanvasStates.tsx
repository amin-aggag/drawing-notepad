import { useState } from "react";
import { pointType, svgPathType } from "../types/CanvasContextTypes";

export default function useCanvasStates() {
  const [points, setPoints] = useState<pointType>([]);
  const [states, setStates] = useState<svgPathType[][]>([[]]);
  const [index, setIndex] = useState<number>(0);
  const [allPathData, setAllPathData]= useState<svgPathType[]>([]);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [pathData, setPathData] = useState();

  function undo() {
    if (
      index > 0 &&
      index <= (states.length - 1) 
    ) {
      setAllPathData([...states[index - 1]]);
      setIndex(index - 1);
    }
  }

  function redo() {
    if (
      index > -1 &&
      index < (states.length - 1) 
    ) {
      setAllPathData([...states[index + 1]]);
      setIndex(index + 1);
    }
  }

  return { points, setPoints, states, setStates, 
    index, setIndex, allPathData, setAllPathData, 
    isDrawing, setIsDrawing, pathData, setPathData, 
    undo, redo }; 
}
import * as React from "react";

export type svgPathType = {path: string, color: string}

export type pointType = (number[] | { x: number; y: number; pressure?: number | undefined; })[]

export default function useCanvasStates() {
  const [points, setPoints] = React.useState<pointType>([]);
  const [states, setStates] = React.useState<Array<svgPathType[]>>([[]]);
  const [index, setIndex] = React.useState<number>(0);
  const [allPathData, setAllPathData]= React.useState<svgPathType[]>([]);
  const [isDrawing, setIsDrawing] = React.useState<boolean>(false);
  const [pathData, setPathData] = React.useState();

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

  return { points, setPoints, states, setStates, index, setIndex, allPathData, setAllPathData, isDrawing, setIsDrawing, pathData, setPathData, undo, redo }; 
}
import * as React from "react";

export type svgPathType = {path: string, color: string}

export type pointType = (number[] | { x: number; y: number; pressure?: number | undefined; })[]

export default function useCanvasStates() {
  const [points, setPoints] = React.useState<pointType>([]);
  const [states, setStates] = React.useState<Array<svgPathType[]>>([[]]);
  // Index starts at 0 instead of -1 like before because there is already a first element inside of the state: the state with no drawings
  const [index, setIndex] = React.useState<number>(0);
  const [allPathData, setAllPathData]= React.useState<svgPathType[]>([]);
  const [isDrawing, setIsDrawing] = React.useState<boolean>(false);
  const [pathData, setPathData] = React.useState();
  const [stroke, setStroke] = React.useState<pointType>([]);

  function undo() {
    if (
      index > 0 &&
      index <= (states.length - 1) 
    ) {
      // console.log("isDrawing is now: ", isDrawing);
      // console.log("[...states[index - 1]] = ", [...states[index - 1]]);
      setAllPathData([...states[index - 1]]);
      setIndex(index - 1);
      // console.log("Index is now: ", index - 1);
    }
  }

  function redo() {
    // if (allPathData.length <= states[states.length - 1].length)
    if (
      index > -1 &&
      index < (states.length - 1) 
    ) {
      // console.log("isDrawing is now: ", isDrawing);
      setAllPathData([...states[index + 1]]);
      // console.log("[...states[index + 1]] = ", [...states[index + 1]]);
      setIndex(index + 1);
      // console.log("Index is now: ", index + 1);
    }
  }

  return { points, setPoints, states, setStates, index, setIndex, allPathData, setAllPathData, isDrawing, setIsDrawing, pathData, setPathData, stroke, setStroke, undo, redo }; 
}
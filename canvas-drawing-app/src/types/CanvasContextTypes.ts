import { PointerEventHandler, TouchEventHandler } from "react";

export type svgPathType = {
  path: string,
  color: string
}

export type pointType = (
  number[] | { 
    x: number;
    y: number;
    pressure?: number | undefined;
  }
)[]

type canvasStates = {
  points: pointType, 
  setPoints: React.Dispatch<React.SetStateAction<pointType>>, 
  states: svgPathType[][], 
  setStates: React.Dispatch<React.SetStateAction<svgPathType[][]>>, 
  index: number, 
  setIndex: React.Dispatch<React.SetStateAction<number>>, 
  allPathData: svgPathType[], 
  setAllPathData: React.Dispatch<React.SetStateAction<svgPathType[]>>,
  pathData: any,
  setPathData: React.Dispatch<React.SetStateAction<any>>,
  isDrawing: boolean,
  setIsDrawing: React.Dispatch<React.SetStateAction<boolean>>,
  undo: () => void,
  redo: () => void
}

type position = {
  left: number,
  setLeft: React.Dispatch<React.SetStateAction<number>>,
  top: number,
  setTop: React.Dispatch<React.SetStateAction<number>>
}

type touch = {
  touchX: number,
  setTouchX: React.Dispatch<React.SetStateAction<number>>,
  touchY: number,
  setTouchY: React.Dispatch<React.SetStateAction<number>>
}

type canvasProperties = {
  width: number,
  setWidth: React.Dispatch<React.SetStateAction<number>>,
  height: number,
  setHeight: React.Dispatch<React.SetStateAction<number>>
}

type penSize = {
  color: string,
  setColor: React.Dispatch<React.SetStateAction<string>>,
  penSize: number,
  setPenSize: React.Dispatch<React.SetStateAction<number>>
}

type handleTouch = {
  handleTouchStart: TouchEventHandler<SVGSVGElement>,
  handleTouchMove: TouchEventHandler<SVGSVGElement>,
  handleTouchEnd: TouchEventHandler<SVGSVGElement>
}
  
type handlePointer = {
  handlePointerDown: PointerEventHandler<SVGSVGElement>,
  handlePointerMove: PointerEventHandler<SVGSVGElement>,
  handlePointerUp: PointerEventHandler<SVGSVGElement>
}

type movingCanvas = {
  isMovingCanvas: boolean,
  setIsMovingCanvas: React.Dispatch<React.SetStateAction<boolean>>
}

type canvasWheel = {
  handleWheel: (e: WheelEvent) => void
}

export type CanvasContextTypes = {
  canvasStates: canvasStates,
  position: position,
  touch: touch,
  canvasProperties: canvasProperties,
  penSize: penSize,
  handleTouch: handleTouch,
  handlePointer: handlePointer,
  movingCanvas: movingCanvas,
  canvasWheel: canvasWheel
}
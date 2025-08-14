import { CanvasContext, useCanvasContext } from "../../hooks/useCanvasContext";
import { CanvasContextTypes } from "../../types/CanvasContextTypes";

export default function DrawingCanvas() {
  const canvasStateVars: CanvasContextTypes = useCanvasContext();

  const { handlePointerDown, handlePointerMove, handlePointerUp } = canvasStateVars.handlePointer;
  const { handleTouchStart, handleTouchMove, handleTouchEnd } = canvasStateVars.handleTouch;
  const { width, height } = canvasStateVars.canvasProperties;
  const { allPathData, pathData, isDrawing } = canvasStateVars.canvasStates;
  const { color } = canvasStateVars.penSize;
  const { isMovingCanvas } = canvasStateVars.movingCanvas;

  return (
      <svg
        onPointerDown={isMovingCanvas ? () => {} : handlePointerDown}
        onPointerMove={isMovingCanvas ? () => {} : handlePointerMove}
        onPointerUp={isMovingCanvas ? () => {} : handlePointerUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ touchAction: "none", position: "relative", top: "0", left: "0", height: `${height}px`, width: `${width}px`, zIndex: "1", backgroundColor: "#ffffff", fill: color }}
      >
        {allPathData === undefined ? <></> : allPathData.map((pD, index)=>(<path d={pD.path} key={index} fill={pD.color} style={{zIndex: 100}}/>))}
        {isDrawing && <path d={pathData} style={{zIndex: 100}}/>}
      </svg>
  )
}
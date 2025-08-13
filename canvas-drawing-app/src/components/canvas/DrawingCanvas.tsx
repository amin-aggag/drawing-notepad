import { CanvasContext, useCanvasContext } from "../../hooks/useCanvasContext";

export default function DrawingCanvas() {
  const canvasStateVars: CanvasContextTypes = useCanvasContext();

  const { handlePointerDown, handlePointerMove, handlePointerUp } = canvasStateVars.handlePointer;
  const { handleTouchStart, handleTouchMove, handleTouchEnd } = canvasStateVars.handleTouch;
  const { width, height } = canvasStateVars.canvasProperties;
  const { allPathData, pathData, isDrawing } = canvasStateVars.canvasStates;
  const { color } = canvasStateVars.penSize;
  const { imageUrlList } = canvasStateVars.imageList;

  return (
      <svg
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ touchAction: "none", position: "relative", top: "0", left: "0", height: `${height}px`, width: `${width}px`, zIndex: "1", backgroundColor: "#ffffff", fill: color }}
      >
      {imageUrlList.map((url, index) => (<image href={url} key={index} style={{position: "relative", top: "0", left: "0", zIndex: 10, width: "500px", height: "10px"}}/>))}
        {allPathData === undefined ? <></> : allPathData.map((pD, index)=>(<path d={pD.path} key={index} fill={pD.color} style={{zIndex: 100}}/>))}
        {isDrawing && <path d={pathData} style={{zIndex: 100}}/>}
      </svg>
  )
}
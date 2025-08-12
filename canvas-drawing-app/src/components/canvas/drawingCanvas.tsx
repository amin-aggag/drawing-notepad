import * as React from "react";
import useCanvasStates from "../../hooks/useCanvasStates";
import getStroke from "perfect-freehand";
import usePen from "../../hooks/usePen";
import usePosition from "../../hooks/usePosition";
import useCanvasProperties from "../../hooks/useCanvasProperties";
import useTouch from "../../hooks/useTouch";
import useImageList from "../../hooks/useImageList";
import useHandleTouch from "../../hooks/useHandleTouch";
import useHandlePointer from "../../hooks/useHandlePointer";

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

export default function DrawingCanvas() {
  const { points, setPoints, states, setStates, index, setIndex, allPathData, setAllPathData, isDrawing, setIsDrawing } = useCanvasStates();
  const { left, setLeft, top, setTop } = usePosition();
  const { touchX, setTouchX, touchY, setTouchY } = useTouch();
  const { imageUrl, setImageUrl, imageUrlList, setImageUrlList } = useImageList();
  const { width, setWidth, height, setHeight } = useCanvasProperties();
  const { color, setColor, penSize, setPenSize } = usePen();
  const { handleTouchStartGeneral, handleTouchMoveGeneral, handleTouchEndGeneral } = useHandleTouch();
  const { handlePointerDownGeneral, handlePointerMoveGeneral, handlePointerUpGeneral } = useHandlePointer();

  const options = {
    size: penSize,
    smoothing: 0.01,
    thinning: 0.5,
    streamline: 0.5,
    easing: (t) => t
    start: {
      taper: 0,
      cap: true,
    },
    end: {
      taper: 0,
      cap: true,
    },
  };

  const handleTouchStart = (e) => {
    handleTouchStartGeneral(e, left, top, setTouchX, setTouchY);
  }

  const handleTouchMove  = (e) => {
    handleTouchMoveGeneral(e, left, top, setLeft, setTop, touchX, touchY);
  }

  const handleTouchEnd = (e) => {
    handleTouchEndGeneral(e, top, setTop);
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
  const pathData = getSvgPathFromStroke(stroke);

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
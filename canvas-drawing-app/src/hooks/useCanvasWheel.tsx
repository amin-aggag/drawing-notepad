import { useState } from "react";

export default function useCanvasWheel() {
  const handleWheelGeneral = (e, left, setLeft, top, setTop) => {
    // console.log("left - e.deltaX: ", left - e.deltaX)
    // console.log("top - e.deltaY: ", top - e.deltaY)
    setLeft((prev) => prev - e.deltaX);
    setTop((prev) => prev - e.deltaY);
  };

  return { handleWheelGeneral };
}
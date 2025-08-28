import { useState } from "react";

export default function useCanvasWheel() {
  const handleWheelGeneral = (e, left, setLeft, top, setTop) => {
    setLeft((prev) => prev - e.deltaX);
    setTop((prev) => prev - e.deltaY);
  };

  return { handleWheelGeneral };
}
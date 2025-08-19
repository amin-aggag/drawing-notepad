import { useState } from "react";

export default function useCanvasWheel() {
  const handleWheelGeneral = (e, setLeft, setTop) => {
    e.preventDefault();
    setLeft(prev => (prev - e.deltaX));
    setTop(prev => (prev - e.deltaY));
  }

  return { handleWheelGeneral };
}
import { useState } from "react";

export default function useCanvasProperties() {
  const [width, setWidth] = useState<number>(595);
  const [height, setHeight] = useState<number>(842);

  return { width, setWidth, height, setHeight };
}
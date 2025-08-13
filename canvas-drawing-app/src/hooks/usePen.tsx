import { useState } from "react";

export default function usePen() {
  const [color, setColor] = useState<string>("black");
  const [penSize, setPenSize] = useState<number>(10);

  return { color, setColor, penSize, setPenSize };
}
import * as React from "react";

export default function usePen() {
  const [color, setColor] = React.useState<string>("black");
  const [penSize, setPenSize] = React.useState<number>(10);

  return { color, setColor, penSize, setPenSize };
}
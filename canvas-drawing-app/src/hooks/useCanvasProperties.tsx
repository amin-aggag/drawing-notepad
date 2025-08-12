import * as React from "react";

export default function useCanvasProperties() {
  const [width, setWidth] = React.useState<number>(595);
  const [height, setHeight] = React.useState<number>(842);

  return { width, setWidth, height, setHeight };
}
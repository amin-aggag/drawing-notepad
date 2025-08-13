import * as React from "react";
import '../App.css';
import DrawingCanvas from "../components/canvas/DrawingCanvas";
import { CanvasContext, useCanvasStateVars } from "../hooks/useCanvasContext";
import UI from "../components/ui/UI";

export default function SVGCanvas() {

  const canvasStateVars: CanvasContextTypes = useCanvasStateVars();
  const { left, top } = canvasStateVars.position;

  const [zoomLevel, setZoomLevel] = React.useState<number>(100);

  return (
    <CanvasContext.Provider value={canvasStateVars}>
      <div style={{overflow: "hidden"}}>
        <div style={{position: "relative", transform: `translate(${left}px, ${top}px)`}}
        >
          <DrawingCanvas/>
        </div>
        <div>
          <UI/>
        </div>
      </div>
    </CanvasContext.Provider>
  );
}
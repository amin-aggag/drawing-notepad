import '../App.css';
import DrawingCanvas from "../components/canvas/DrawingCanvas";
import { CanvasContext, useCanvasStateVars } from "../hooks/useCanvasContext";
import UI from "../components/ui/UI";
import { CanvasContextTypes } from '../types/CanvasContextTypes';

export default function SVGCanvas() {

  const canvasStateVars: CanvasContextTypes = useCanvasStateVars();
  const { left, top } = canvasStateVars.position;
  const { handleWheel } = canvasStateVars.canvasWheel;
  const { isMovingCanvas } = canvasStateVars.movingCanvas;

  return (
    <CanvasContext.Provider value={canvasStateVars}>
      <div style={{overflow: "hidden", overscrollBehavior: "none", scrollbarWidth: "none"}}
      >
        <div
        onWheelCapture={handleWheel}
        >
          <div style={{position: "relative", transform: `translate(${left}px, ${top}px)`}}>
            <DrawingCanvas/>
          </div>
        </div>
        <div>
          <UI/>
        </div>
      </div>
    </CanvasContext.Provider>
  );
}
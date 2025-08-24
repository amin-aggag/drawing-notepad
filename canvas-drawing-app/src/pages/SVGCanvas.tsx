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
  const { isWritingText } = canvasStateVars.text;

  return (
    <CanvasContext.Provider value={canvasStateVars}>
      <div style={{overflow: "hidden", overscrollBehavior: "none", scrollbarWidth: "none"}}
      >
        <div
        onWheelCapture={handleWheel}
        className="h-[100%] w-[100%]"
        >
          <div style={{position: "relative", transform: `translate(${left}px, ${top}px)`}}>
            <DrawingCanvas/>
            {isWritingText ? <textarea className={`absolute left-[0px] top-[0px] z-10`} defaultValue={"Lessgoooo"}></textarea> : <></> }
          </div>
        </div>
        <div>
          <UI/>
        </div>
      </div>
    </CanvasContext.Provider>
  );
}
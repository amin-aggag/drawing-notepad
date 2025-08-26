import '../App.css';
import DrawingCanvas from "../components/canvas/DrawingCanvas";
import { CanvasContext, useCanvasStateVars } from "../hooks/useCanvasContext";
import UI from "../components/ui/UI";
import { CanvasContextTypes } from '../types/CanvasContextTypes';
import { useEffect, useRef } from 'react';

export default function SVGCanvas() {

  const canvasStateVars: CanvasContextTypes = useCanvasStateVars();
  const { left, top } = canvasStateVars.position;
  const { handleWheel } = canvasStateVars.canvasWheel;
  const { isMovingCanvas } = canvasStateVars.movingCanvas;
  const DrawingCanvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const CanvasRefCurrent = DrawingCanvasRef.current;

    if (!CanvasRefCurrent) return;

    const handleWheelWrapper = (e) => {
      e.preventDefault();
      e.stopPropagation();
      handleWheel(e);
    }

    CanvasRefCurrent.addEventListener('wheel', handleWheelWrapper);

    return () => CanvasRefCurrent.removeEventListener('wheel', handleWheelWrapper);
  });

  return (
    <CanvasContext.Provider value={canvasStateVars}>
      <div style={{overflow: "hidden", overscrollBehavior: "none", scrollbarWidth: "none"}}
      >
        <div
        ref={DrawingCanvasRef}
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
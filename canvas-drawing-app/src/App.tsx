import * as React from "react";
import './App.css';
import SVGCanvas from "./components/canvas/svgCanvas";

export default function App() {

  const svgCanvasWrapper = React.useRef<HTMLDivElement>(null);

  return (
    <div
      className="svgCanvasWrapper"
      ref={svgCanvasWrapper}
      style={{ position: "absolute", top: 0, left: 0, height: "100%", width: "100%", overflow: "hidden"}}
    >
      <SVGCanvas />
    </div>
  );
}
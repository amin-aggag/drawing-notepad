import * as React from "react";
import { getStroke } from "perfect-freehand";
import './App.css';
import Image from "./image";
import usePen from "../../hooks/usePen";
import useStates from "../../hooks/useCanvasStates";

export type svgPathType = {path: string, color: string}

export type pointType = (number[] | { x: number; y: number; pressure?: number | undefined; })[]

export default function SVGCanvas() {
  
  const [zoomLevel, setZoomLevel] = React.useState<number>(100);
  const { color, setColor, penSize, setPenSize } = usePen();

  

  

  return (
    <div style={{overflow: "hidden"}}>
      <div style={{position: "relative", transform: `translate(${left}px, ${top}px)`}}
      >
        <svg
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{ touchAction: "none", position: "relative", top: "0", left: "0", height: `${height}px`, width: `${width}px`, zIndex: "1", backgroundColor: "#ffffff", fill: color }}
        >
        {imageUrlList.map((url, index) => (<image href={url} key={index} style={{position: "absolute", top: "0", left: "0", zIndex: 10, width: "500px", height: "10px"}}/>))}
          {allPathData === undefined ? <></> : allPathData.map((pD, index)=>(<path d={pD.path} key={index} fill={pD.color} style={{zIndex: 100}}/>))}
          {isDrawing && <path d={pathData} style={{zIndex: 100}}/>}
        </svg>
      </div>
      <div>
        {(states.length === 1 || index <= 0) ?
          <button style={{position: "absolute", top: "0", left: "0", fontSize: "100px", zIndex: "1"}} onClick={undo} disabled>Undo</button> :
          <button style={{position: "absolute", top: "0", left: "0", fontSize: "100px", zIndex: "2"}} onClick={undo}>Undo</button>
        }
        {((states.length === 1 && index <= 0) || index === (states.length - 1)) ? 
          <button style={{position: "absolute", top: "0", left: "240px", fontSize: "100px", zIndex: "1"}} disabled>Redo</button> :
          <button style={{position: "absolute", top: "0", left: "240px", fontSize: "100px", zIndex: "1"}} onClick={redo}>Redo</button>
        }
        <div style={{position: "absolute", bottom: "0", right: "0px", fontSize: "100px", zIndex: "1", display: "flex", flexDirection: "column", background: "aliceblue"}}>
          <p>Colour</p>
          <div style={{display: "flex"}}>
            <div style={{height: "40px", width: "40px", background: "black", cursor: "pointer"}} onClick={() => setColor("black")}></div>
            <div style={{height: "40px", width: "40px", background: "orange", cursor: "pointer"}} onClick={() => setColor("orange")}></div>
            <div style={{height: "40px", width: "40px", background: "mediumseagreen", cursor: "pointer"}} onClick={() => setColor("mediumseagreen")}></div>
            <div style={{height: "40px", width: "40px", background: "tomato", cursor: "pointer"}} onClick={() => setColor("tomato")}></div>
            <div style={{height: "40px", width: "40px", background: "violet", cursor: "pointer"}} onClick={() => setColor("violet")}></div>
            <div style={{height: "40px", width: "40px", background: "dodgerblue", cursor: "pointer"}} onClick={() => setColor("dodgerblue")}></div>
            <div style={{height: "40px", width: "40px", background: "slateblue", cursor: "pointer"}} onClick={() => setColor("slateblue")}></div>
            <div style={{height: "40px", width: "40px", background: "lightgray", cursor: "pointer"}} onClick={() => setColor("lightgray")}></div>
          </div>
        </div>
        <div style={{position: "absolute", bottom: "150px", right: "0px", fontSize: "100px", zIndex: "1", display: "flex", flexDirection: "column", background: "aliceblue"}}>
          <p>Pen size: {penSize}</p>
          <div style={{display: "flex"}}>
            <div style={{height: "40px", width: "40px", background: "aliceblue", cursor: "pointer", fontSize: "30px"}} onClick={() => setPenSize(1)}>1</div>
            <div style={{height: "40px", width: "40px", background: "aliceblue", cursor: "pointer", fontSize: "30px"}} onClick={() => setPenSize(2)}>2</div>
            <div style={{height: "40px", width: "40px", background: "aliceblue", cursor: "pointer", fontSize: "30px"}} onClick={() => setPenSize(4)}>4</div>
            <div style={{height: "40px", width: "40px", background: "aliceblue", cursor: "pointer", fontSize: "30px"}} onClick={() => setPenSize(6)}>6</div>
            <div style={{height: "40px", width: "40px", background: "aliceblue", cursor: "pointer", fontSize: "30px"}} onClick={() => setPenSize(8)}>8</div>
            <div style={{height: "40px", width: "40px", background: "aliceblue", cursor: "pointer", fontSize: "30px"}} onClick={() => setPenSize(10)}>10</div>
            <div style={{height: "40px", width: "40px", background: "aliceblue", cursor: "pointer", fontSize: "30px"}} onClick={() => setPenSize(20)}>20</div>
            <div style={{height: "40px", width: "40px", background: "aliceblue", cursor: "pointer", fontSize: "30px"}} onClick={() => setPenSize(30)}>30</div>
          </div>
        </div>
        <div style={{position: "absolute", bottom: "300px", right: "0px", fontSize: "100px", zIndex: "1", display: "flex", flexDirection: "column", background: "aliceblue"}}>
          <div style={{display: "flex"}}>
            <input type="file" id="image-upload" hidden ref={inputRef} accept="image/png, image/jpeg" onChange={handleInputChange} />
            <label style={{height: "40px", width: "150px", background: "aliceblue", cursor: "pointer", fontSize: "30px"}} onClick={() => {}} htmlFor="image-upload">Add image</label>
          </div>
        </div>
      </div>
    </div>
  );
}
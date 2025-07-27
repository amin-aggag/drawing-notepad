import * as React from "react";
import { getStroke } from "perfect-freehand";
import './App.css';

const getSvgPathFromStroke = (stroke) => {
  if (!stroke.length) return ""

  const d = stroke.reduce(
    (acc, [x0, y0], i, arr) => {
      const [x1, y1] = arr[(i + 1) % arr.length]
      acc.push(x0, y0, (x0 + x1) / 2, (y0 + y1) / 2)
      return acc
    },
    ["M", ...stroke[0], "Q"]
  )

  d.push("Z")
  return d.join(" ")
}

const options = {
  size: 10,
  smoothing: 0.01,
  thinning: 0.5,
  streamline: 0.5,
  easing: (t) => t,
  start: {
    taper: 0,
    cap: true,
  },
  end: {
    taper: 0,
    cap: true,
  },
};

type pointType = (number[] | { x: number; y: number; pressure?: number | undefined; })[]

export default function SVGCanvas() {
  const [points, setPoints] = React.useState<pointType>([]);
  const [states, setStates] = React.useState<string[][]>([[]]);
  const [isDrawing, setIsDrawing] = React.useState<boolean>(false);
  // Index starts at -1 because I want the index to match the current state in the States array, so when
  // the first stroke is drawn, index is at index 0, which is the first element in the States array
  const [index, setIndex] = React.useState<number>(0);
  const [allPathData, setAllPathData]= React.useState<string[]>([]);
  const [redoPathData, setRedoPathData] = React.useState<string[]>([]);
  const [left, setLeft] = React.useState<number>(0);
  const [top, setTop] = React.useState<number>(0);
  const [touchX, setTouchX] = React.useState<number>(0);
  const [touchY, setTouchY] = React.useState<number>(0);
  const [width, setWidth] = React.useState<number>(595);
  const [height, setHeight] = React.useState<number>(842);
  const [zoomLevel, setZoomLevel] = React.useState<number>(100);
  const [colour, setColour] = React.useState<string>("black");

  const handleTouchStart: React.TouchEventHandler<HTMLDivElement> = (e) => {
    if (e.touches.length == 2) {
      setTouchX(e.touches[0].pageX);
      console.log("START: e.touches[0].pageX = ", e.touches[0].pageX);
      console.log("START: e.touches[0].pageY = ", e.touches[0].pageY);
      console.log("START: top = ", top);
      console.log("START: left = ", left);
      setTouchY(e.touches[0].pageY);
    }
  }

  const handleTouchMove: React.TouchEventHandler<HTMLDivElement> = (e) => {
    if (e.touches.length == 2) {
      console.log("MOVE: e.touches[0].pageX = ", e.touches[0].pageX);
      console.log("MOVE: e.touches[0].pageY = ", e.touches[0].pageY);
      console.log("MOVE: top = ", top);
      console.log("MOVE: left = ", left);
      if (e.touches[0].pageX != touchX) {
        const newLeft = left + ((e.touches[0].pageX - touchX) / 35);
        if (newLeft < -100) {
          setLeft(-100);
        } else if (newLeft > 1000) {
          setLeft(1000);
        } else {
          setLeft(newLeft);
        }
      }
      if (e.touches[0].pageY != touchY) {
        const newTop = top + ((e.touches[0].pageY - touchY) / 35);
        if (newTop < -100) {
          setTop(-100);
        } else if (newTop > 500) {
          setTop(500);
        } else {
          setTop(newTop);
        }
      }
    }
  }

  const handleTouchEnd: React.TouchEventHandler<HTMLDivElement> = (e) => {
    if (top < -100) {
      setTop(-100);
    } else if (top > 1500) {
      setTop(1500);
    }
  }

  function handlePointerDown(e) {
    e.target.setPointerCapture(e.pointerId);
    setPoints([[e.pageX - left, e.pageY - top, e.pressure]]);
    // console.log("handlePointerDown: ", points);
    setRedoPathData([]);
    // setStates([...states.slice(0, (states.length - 1 - undoCounter))]);
    setIsDrawing(true);
  }

  function handlePointerMove(e) {
    if (e.pointerType === "pen") {
      if (e.buttons !== 1) return;
      setPoints([...points, [e.pageX - left, e.pageY - top, e.pressure]]);
      // console.log("handlePointerMove: ", points);
      // if (pathData != "") {
      //   setAllPathData([...allPathData, pathData]);
      // }
      setIsDrawing(true);
    }
  }

  function handlePointerUp(e) {
    if (e.pointerType === "pen") {
      setAllPathData([...allPathData, pathData]);
      let temporaryState = states.slice(0, index + 1);
      setStates([...temporaryState, [...allPathData, pathData]]);
      console.log("states: ", [...temporaryState, [...allPathData, pathData]]);
      setIsDrawing(false);
      setIndex(index + 1);
      // The +1s for both of these console.log is because these values do not update straight away because of 
      // how state updating in React works
      // console.log("Index is now: ", index + 1);
      // console.log("states.length = ", states.length + 1);
    }
  }

  function undo() {
    if (
      index > 0 &&
      index <= (states.length - 1) 
    ) {
      // console.log("isDrawing is now: ", isDrawing);
      // console.log("[...states[index - 1]] = ", [...states[index - 1]]);
      setAllPathData([...states[index - 1]]);
      setIndex(index - 1);
      // console.log("Index is now: ", index - 1);
    }
  }

  function redo() {
    // if (allPathData.length <= states[states.length - 1].length)
    if (
      index > -1 &&
      index < (states.length - 1) 
    ) {
      // console.log("isDrawing is now: ", isDrawing);
      setAllPathData([...states[index + 1]]);
      // console.log("[...states[index + 1]] = ", [...states[index + 1]]);
      setIndex(index + 1);
      // console.log("Index is now: ", index + 1);
    }
  }

  const stroke = getStroke(points, options);
  const pathData = getSvgPathFromStroke(stroke);

  // console.log("allPathData: ", allPathData);

  return (
    <div style={{overflow: "hidden"}}>
      <div style={{position: "relative", transform: `translate(${left}px, ${top}px)`}}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <svg
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          style={{ touchAction: "none", position: "relative", top: "0", left: "0", height: `${height}px`, width: `${width}px`, zIndex: "1", backgroundColor: "#ffffff", fill: colour }}
        >
        {allPathData === undefined ? <></> : allPathData.map((pD, index)=>(<path d={pD} key={index} fill={colour}/>))}
        {isDrawing && <path d={pathData} />}
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
            <div style={{height: "40px", width: "40px", background: "black", cursor: "pointer"}} onClick={() => setColour("black")}></div>
            <div style={{height: "40px", width: "40px", background: "orange", cursor: "pointer"}} onClick={() => setColour("orange")}></div>
            <div style={{height: "40px", width: "40px", background: "mediumseagreen", cursor: "pointer"}} onClick={() => setColour("mediumseagreen")}></div>
            <div style={{height: "40px", width: "40px", background: "tomato", cursor: "pointer"}} onClick={() => setColour("tomato")}></div>
            <div style={{height: "40px", width: "40px", background: "violet", cursor: "pointer"}} onClick={() => setColour("violet")}></div>
            <div style={{height: "40px", width: "40px", background: "dodgerblue", cursor: "pointer"}} onClick={() => setColour("dodgerblue")}></div>
            <div style={{height: "40px", width: "40px", background: "slateblue", cursor: "pointer"}} onClick={() => setColour("slateblue")}></div>
            <div style={{height: "40px", width: "40px", background: "lightgray", cursor: "pointer"}} onClick={() => setColour("lightgray")}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
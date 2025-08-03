import * as React from "react";
import { getStroke } from "perfect-freehand";
import './App.css';
import Image from "./image";

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

type svgPathType = {path: string, color: string}

type pointType = (number[] | { x: number; y: number; pressure?: number | undefined; })[]

export default function SVGCanvas() {
  const [points, setPoints] = React.useState<pointType>([]);
  const [states, setStates] = React.useState<Array<svgPathType[]>>([[]]);
  const [isDrawing, setIsDrawing] = React.useState<boolean>(false);
  // Index starts at -1 because I want the index to match the current state in the States array, so when
  // the first stroke is drawn, index is at index 0, which is the first element in the States array
  const [index, setIndex] = React.useState<number>(0);
  const [allPathData, setAllPathData]= React.useState<svgPathType[]>([]);
  const [left, setLeft] = React.useState<number>(0);
  const [top, setTop] = React.useState<number>(0);
  const [touchX, setTouchX] = React.useState<number>(0);
  const [touchY, setTouchY] = React.useState<number>(0);
  const [width, setWidth] = React.useState<number>(595);
  const [height, setHeight] = React.useState<number>(842);
  const [zoomLevel, setZoomLevel] = React.useState<number>(100);
  const [color, setColor] = React.useState<string>("black");
  const [penSize, setPenSize] = React.useState<number>(10);

  const inputRef = React.useRef<HTMLInputElement>(null);
  const [imageUrl, setImageUrl] = React.useState<string | undefined>(undefined);
  const [imageUrlList, setImageUrlList] = React.useState<string[]>([]);

  const options = {
  size: penSize,
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

  const handleTouchStart: React.TouchEventHandler<SVGSVGElement> = (e) => {
    if (e.touches.length === 2) {
      setTouchX(e.touches[0].pageX);
      console.log("START: e.touches[0].pageX = ", e.touches[0].pageX);
      console.log("START: e.touches[0].pageY = ", e.touches[0].pageY);
      console.log("START: top = ", top);
      console.log("START: left = ", left);
      setTouchY(e.touches[0].pageY);
    }
  }

  const handleTouchMove: React.TouchEventHandler<SVGSVGElement> = (e) => {
    if (e.touches.length === 2) {
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

  const handleTouchEnd: React.TouchEventHandler<SVGSVGElement> = (e) => {
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
      setAllPathData([...allPathData, {path: pathData, color: color}]);
      let temporaryState = states.slice(0, index + 1);
      setStates([...temporaryState, [...allPathData, {path: pathData, color: color}]]);
      console.log("states: ", [...temporaryState, [...allPathData, {path: pathData, color: color}]]);
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

  const handleInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
        const url = URL.createObjectURL(file);
        // console.log(file);
        setImageUrlList([...imageUrlList, url]);
    }
  }

  const stroke = getStroke(points, options);
  const pathData = getSvgPathFromStroke(stroke);

  const imageUpload = document.getElementById("image-upload");
  // console.log("allPathData: ", allPathData);

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
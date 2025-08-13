import * as React from "react";
import usePen from "../../hooks/usePen";
import { useCanvasContext } from "../../hooks/useCanvasContext";
import { handleImgInputChangeGeneral } from "../../hooks/useImageList";

const colorArray = [ "black", "orange", "mediumseagreen", "tomato", "violet", "dodgerblue", "slateblue", "lightgray" ];

const penSizeArray = [ 1, 2, 4, 6, 8, 10, 20, 30 ];

export default function UI() {
  const canvasStateVars: CanvasContextTypes = useCanvasContext();

  const { states, index } = canvasStateVars.canvasStates;
  const { setImageUrlList, imageUrlList } = canvasStateVars.imageList;
  const handleImgInputChange = (e) => handleImgInputChangeGeneral(e, setImageUrlList, imageUrlList);
  const { setColor, penSize, setPenSize } = canvasStateVars.penSize;
  const { undo, redo } = canvasStateVars.canvasStates;
  
  const inputRef = React.useRef<HTMLInputElement>(null);

  return (
    <>
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
          {colorArray.map((color, index)=>(
            <div style={{height: "40px", width: "40px", background: color, cursor: "pointer"}} key={index} onClick={() => setColor(color) }></div>
          ))}
        </div>
      </div>
      <div style={{position: "absolute", bottom: "150px", right: "0px", fontSize: "100px", zIndex: "1", display: "flex", flexDirection: "column", background: "aliceblue"}}>
        <p>Pen size: {penSize}</p>
        <div style={{display: "flex"}}>
          {penSizeArray.map((penSize, index)=>(
           <div style={{height: "40px", width: "40px", background: "aliceblue", cursor: "pointer", fontSize: "30px"}} key={index} onClick={() => setPenSize(penSize)}>{penSize}</div>
          ))}
        </div>
      </div>
      <div style={{position: "absolute", bottom: "300px", right: "0px", fontSize: "100px", zIndex: "1", display: "flex", flexDirection: "column", background: "aliceblue"}}>
        <div style={{display: "flex"}}>
          <input type="file" id="image-upload" hidden ref={inputRef} accept="image/png, image/jpeg" onChange={handleImgInputChange} />
          <label style={{height: "40px", width: "150px", background: "aliceblue", cursor: "pointer", fontSize: "30px"}} onClick={() => {}} htmlFor="image-upload">Add image</label>
        </div>
      </div>
    </>
  )
}
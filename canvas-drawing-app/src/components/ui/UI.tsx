import { useRef } from "react";
import usePen from "../../hooks/usePen";
import { useCanvasContext } from "../../hooks/useCanvasContext";
import { CanvasContextTypes } from "../../types/CanvasContextTypes";

const colorArray = [ "black", "orange", "mediumseagreen", "tomato", "violet", "dodgerblue", "slateblue", "lightgray" ];

const penSizeArray = [ 1, 2, 4, 6, 8, 10, 20, 30 ];

export default function UI() {
  const canvasStateVars: CanvasContextTypes = useCanvasContext();

  const { states, index } = canvasStateVars.canvasStates;
  const { color, setColor, penSize, setPenSize } = canvasStateVars.penSize;
  const { undo, redo } = canvasStateVars.canvasStates;
  
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <div style={{position: "absolute",top: "0", left: "0px", fontSize: "50px", zIndex: "1", display: "flex", flexDirection: "row", background: "aliceblue", width: "100%", minHeight: "100px", marginBlock: "auto", alignItems: "center", padding: "17px", borderBottomRightRadius: "10px", borderBottomLeftRadius: "10px", borderStyle: "hidden", boxShadow: "1px 1px 4px 1px lightgray", flexWrap: "wrap", justifyContent: "space-around"}}>
        <div>
          {(states.length === 1 || index <= 0) ?
            <button style={{ fontSize: "50px", zIndex: "1", background: "aliceblue", borderRadius: "10px", borderColor: "lightgray", borderStyle: "hidden", boxShadow: "1px 1px 4px 1px lightgray", padding: "5px", minWidth: "100px", height: "75px", marginRight: "15px", paddingTop: "0"}} onClick={undo} disabled>Undo</button> :
            <button style={{fontSize: "50px", zIndex: "2", background: "aliceblue", borderRadius: "10px", borderColor: "lightgray", borderStyle: "hidden", boxShadow: "1px 1px 4px 1px lightgray", padding: "5px", minWidth: "100px", height: "75px", marginRight: "15px", paddingTop: "0"}} onClick={undo}>Undo</button>
          }
          {((states.length === 1 && index <= 0) || index === (states.length - 1)) ? 
            <button style={{fontSize: "50px", zIndex: "1", background: "aliceblue", borderRadius: "10px", borderColor: "lightgray", borderStyle: "hidden", boxShadow: "1px 1px 4px 1px lightgray", padding: "5px", minWidth: "100px", height: "75px", paddingTop: "0"}} disabled>Redo</button> :
            <button style={{fontSize: "50px", zIndex: "1", background: "aliceblue", borderRadius: "10px", borderColor: "lightgray", borderStyle: "hidden", boxShadow: "1px 1px 4px 1px lightgray", padding: "5px", minWidth: "100px", height: "75px", paddingTop: "0"}} onClick={redo}>Redo</button>
          }
        </div>
        <div style={{zIndex: "1", display: "flex", flexDirection: "column", background: "aliceblue", height: "75px", marginTop: "5px"}}>
          <p style={{ marginBottom: "5px", fontSize: "20px"}}>Pen size: {penSize}</p>
          <div style={{display: "flex"}}>
            {penSizeArray.map((penSize, index)=>(
            <button style={{height: "40px", width: "40px", background: "aliceblue", cursor: "pointer", fontSize: "30px", borderRadius: "10px", borderColor: "lightgray", borderStyle: "hidden", boxShadow: "1px 1px 4px 1px lightgray", marginRight: "10px"}} key={index} onClick={() => setPenSize(penSize)}>{penSize}</button>
            ))}
          </div>
        </div>
        <div style={{zIndex: "1", display: "flex", flexDirection: "column", background: "aliceblue", height: "75px"}}>
          <p style={{ fontSize: "20px", marginBottom: "5px" }}>Colour: {String(color).charAt(0).toUpperCase() + String(color).slice(1)}</p>
          <div style={{display: "flex"}}>
            {colorArray.map((color, index)=>(
              <button style={{height: "40px", width: "40px", background: color, cursor: "pointer", borderRadius: "10px", borderColor: "lightgray", borderStyle: "hidden", boxShadow: "1px 1px 4px 1px lightgray", marginRight: "10px"}} key={index} onClick={() => setColor(color) }></button>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
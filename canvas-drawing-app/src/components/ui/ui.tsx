import * as React from "react";
import usePen from "../../hooks/usePen";
import handleInputChange from '../../components/canvas/image'

export default function Ui() {
  const { states, index, undo, redo }
  const {  } 
  const { setColor, setPenSize, penSize } = usePen();
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
    </>
  )
}
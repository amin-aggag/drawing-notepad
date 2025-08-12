export default function useHandlePointer() {
  function handlePointerDownGeneral(e, setPoints, left, top, setIsDrawing) {
    e.target.setPointerCapture(e.pointerId);
    setPoints([[e.pageX - left, e.pageY - top, e.pressure]]);
    // console.log("handlePointerDown: ", points);
    // setStates([...states.slice(0, (states.length - 1 - undoCounter))]);
    setIsDrawing(true);
  }

  function handlePointerMoveGeneral(e, points, setPoints, left, top, setIsDrawing) {
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

  function handlePointerUpGeneral(e, allPathData, setAllPathData, pathData, color, states, setStates, setIsDrawing, index, setIndex) {
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

  return { handlePointerDownGeneral, handlePointerMoveGeneral, handlePointerUpGeneral };
}
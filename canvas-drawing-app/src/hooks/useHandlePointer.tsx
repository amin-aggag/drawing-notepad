export default function useHandlePointer() {
  function handlePointerDownGeneral(e, setPoints, left, top, setIsDrawing) {
    e.target.setPointerCapture(e.pointerId);
    setPoints([[e.pageX - left, e.pageY - top, e.pressure]]);
    setIsDrawing(true);
  }

  function handlePointerMoveGeneral(e, points, setPoints, left, top, setIsDrawing) {
    if (e.pointerType === "pen" || e.pointerType === "mouse" || e.pointerType === "touch") {
      if (e.buttons !== 1) return;
      setPoints([...points, [e.pageX - left, e.pageY - top, e.pressure]]);
      setIsDrawing(true);
    }
  }

  function handlePointerUpGeneral(e, allPathData, setAllPathData, pathData, color, states, setStates, setIsDrawing, index, setIndex) {
    if (e.pointerType === "pen" || e.pointerType === "mouse" || e.pointerType === "touch") {
      setAllPathData([...allPathData, {path: pathData, color: color}]);
      let temporaryState = states.slice(0, index + 1);
      setStates([...temporaryState, [...allPathData, {path: pathData, color: color}]]);
      // console.log("states: ", [...temporaryState, [...allPathData, {path: pathData, color: color}]]);
      setIsDrawing(false);
      setIndex(index + 1);
    }
  }

  return { handlePointerDownGeneral, handlePointerMoveGeneral, handlePointerUpGeneral };
}
export default function useHandleTouch() {
  const handleTouchStartGeneral = (e, left, top, setTouchX, setTouchY, setIsMovingCanvas) => {
    if (e.touches.length === 2) {
      setIsMovingCanvas(true);
      setTouchX(e.touches[0].pageX);
      console.log("START: e.touches[0].pageX = ", e.touches[0].pageX);
      console.log("START: e.touches[0].pageY = ", e.touches[0].pageY);
      console.log("START: top = ", top);
      console.log("START: left = ", left);
      setTouchY(e.touches[0].pageY);
    }
  }

  const handleTouchMoveGeneral = (e, left, top, setLeft, setTop, touchX, touchY, setIsMovingCanvas) => {
    if (e.touches.length === 2) {
      setIsMovingCanvas(true);
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

  const handleTouchEndGeneral = (e, top, setTop, setIsMovingCanvas) => {
    setIsMovingCanvas(false);
    if (top < -100) {
      setTop(-100);
    } else if (top > 1500) {
      setTop(1500);
    }
  }

  return { handleTouchStartGeneral, handleTouchMoveGeneral, handleTouchEndGeneral };
}
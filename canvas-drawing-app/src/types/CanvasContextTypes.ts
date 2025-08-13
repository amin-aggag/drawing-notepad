type CanvasContextTypes = {
  canvasStates: {
    points, setPoints, states, setStates, index, setIndex, allPathData, setAllPathData, pathData, setPathData, isDrawing, setIsDrawing, undo, redo
  },
  position: {
    left, setLeft, top, setTop
  },
  touch: {
    touchX, setTouchX, touchY, setTouchY
  },
  imageList: {
    imageUrl, setImageUrl, imageUrlList, setImageUrlList
  },
  canvasProperties: {
    width, setWidth, height, setHeight
  },
  penSize: {
    color, setColor, penSize, setPenSize
  },
  handleTouch: {
    handleTouchStart, handleTouchMove, handleTouchEnd
  },
  handlePointer: {
    handlePointerDown, handlePointerMove, handlePointerUp
  }
}
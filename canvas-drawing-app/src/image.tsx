import React from "react"

export default function Image(image: any, width: number, height: number) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const canvasCtx = canvasRef?.current?.getContext("2d");

  const handleLoad = () => {
    canvasCtx?.drawImage(image, width, height);
  }

  canvasRef?.current?.addEventListener("touch", () => {

  })

  const handleTouchStart = () => {
    
  }

  const handleTouchMove = () => {

  }

  const handleTouchEnd = () => {

  }
  
  return (
    <canvas 
      ref={canvasRef}
      width={`${width + 10}px`}
      height={`${height + 10}px`}
      onLoad={handleLoad}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
    </canvas>
  )
}
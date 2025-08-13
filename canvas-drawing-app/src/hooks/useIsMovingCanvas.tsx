import { useState } from "react";

export default function useIsMovingCanvas() {
  const [isMovingCanvas, setIsMovingCanvas] = useState<boolean>(false);

  return {  isMovingCanvas, setIsMovingCanvas };
}
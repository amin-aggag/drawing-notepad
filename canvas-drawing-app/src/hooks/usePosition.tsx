import { useState } from "react";

export default function usePosition() {
  const [left, setLeft] = useState<number>(0);
  const [top, setTop] = useState<number>(0);

  return { left, setLeft, top, setTop };
}
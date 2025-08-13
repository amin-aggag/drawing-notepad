import { useState } from 'react';

export default function useTouch() {
  const [touchX, setTouchX] = useState<number>(0);
  const [touchY, setTouchY] = useState<number>(0);

  return { touchX, setTouchX, touchY, setTouchY };
}
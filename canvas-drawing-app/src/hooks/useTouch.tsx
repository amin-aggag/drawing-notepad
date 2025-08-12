import * as React from 'react';
import usePosition from './usePosition';

export default function useTouch() {
  const [touchX, setTouchX] = React.useState<number>(0);
  const [touchY, setTouchY] = React.useState<number>(0);

  return { touchX, setTouchX, touchY, setTouchY };
}
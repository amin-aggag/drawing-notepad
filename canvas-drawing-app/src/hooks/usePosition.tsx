import React from "react";

export default function usePosition() {
  const [left, setLeft] = React.useState<number>(0);
  const [top, setTop] = React.useState<number>(0);

  return { left, setLeft, top, setTop };
}
import { useState } from "react";

export default function useText() {
  const [text, setText] = useState<string>("");
  const [isWritingText, setIsWritingText] = useState<boolean>(false);
  return { text, setText, isWritingText, setIsWritingText };
}
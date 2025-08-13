import { useState } from "react";

export function useImageList() {
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const [imageUrlList, setImageUrlList] = useState<string[]>([]);

  return { imageUrl, setImageUrl, imageUrlList, setImageUrlList };
}

export function handleImgInputChangeGeneral(e, setImageUrlList, imageUrlList) {
  const file = e.target.files[0];
  if (file) {
      const url = URL.createObjectURL(file);
      // console.log(file);
      setImageUrlList([...imageUrlList, url]);
  }
}
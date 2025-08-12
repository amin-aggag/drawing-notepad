import * as React from "react";

export default function useImageList() {
  const [imageUrl, setImageUrl] = React.useState<string | undefined>(undefined);
  const [imageUrlList, setImageUrlList] = React.useState<string[]>([]);

  return { imageUrl, setImageUrl, imageUrlList, setImageUrlList };
}
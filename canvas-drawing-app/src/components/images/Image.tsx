// import React from "react"
// import useImageList from "../../hooks/useImageList";

// export default function Image(
//   // imageUrl: string, width: number, height: number, x: number, y: number
// ) {
//   const imageRef = React.useRef<SVGImageElement>(null);
//   const svgRef = React.useRef<SVGSVGElement>(null);
//   const [selected, setSelected] = React.useState<boolean>();
//   const [xValue, setXValue] = React.useState<number>(0);
//   const [yValue, setYValue] = React.useState<number>(0);
//   const { imageUrl, setImageUrl, imageUrlList, setImageUrlList } = useImageList();

//   const handleTouchStart = () => {
    
//   }

//   const handleTouchMove = () => {

//   }

//   const handleTouchEnd = () => {

//   }

//   const handleInputChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//         const url = URL.createObjectURL(file);
//         // console.log(file);
//         setImageUrlList([...imageUrlList, url]);
//     }
//   }

//   const handlePointerDown: React.PointerEventHandler = (e: React.PointerEvent<SVGSVGElement>) => {
//     switch(e.currentTarget.dataset.adjustmentType) {
//       case "bottom-right":
//         break;
//       case "top-right":
//         break;
//       case "bottom-left":
//         break;
//       case "top-left":
//         break;
//       default:
//         break;
//     }
//   }

//   const handlePointerMove: React.PointerEventHandler = (e: React.PointerEvent<SVGSVGElement>) => {
//     switch(e.currentTarget.dataset.adjustmentType) {
//       case "bottom-right":
//         break;
//       case "top-right":
//         break;
//       case "bottom-left":
//         break;
//       case "top-left":
//         break;
//       default:
//         break;
//     }
//   }
  
//   const handlePointerUp: React.PointerEventHandler = (e: React.PointerEvent<SVGSVGElement>) => {
//     switch(e.currentTarget.dataset.adjustmentType) {
//       case "bottom-right":
//         break;
//       case "top-right":
//         break;
//       case "bottom-left":
//         break;
//       case "top-left":
//         break;
//       default:
//         break;
//     }
//   }
  
//   return (
//     <svg
//       ref={svgRef}
//     >
//       <svg
//         onPointerDown={handlePointerDown}
//         onPointerMove={handlePointerMove}
//         onPointerUp={handlePointerUp}
//       >
//         <circle cx={x + width} cy={y + height} r={10} fill={"blue"} onPointerDown={handlePointerDown} onPointerMove={handlePointerMove} onPointerUp={handlePointerUp} data-adjustment-type={"bottom-right"}></circle >
//         <circle cx={x + width} cy={y} r={10} fill={"blue"} onPointerDown={handlePointerDown} onPointerMove={handlePointerMove} onPointerUp={handlePointerUp} data-adjustment-type={"top-right"}></circle>
//         <circle cx={x} cy={y + height} r={10} fill={"blue"} onPointerDown={handlePointerDown} onPointerMove={handlePointerMove} onPointerUp={handlePointerUp} data-adjustment-type={"bottom-left"}></circle>
//         <circle cx={x} cy={y} r={10} fill={"blue"} onPointerDown={handlePointerDown} onPointerMove={handlePointerMove} onPointerUp={handlePointerUp} data-adjustment-type={"top-left"}></circle>
//       </svg>
//       <svg>
//         <image
//           ref={imageRef}
//           width={`${width}px`}
//           height={`${height}px`}
//           x={x}
//           y={y}
//           onTouchStart={handleTouchStart}
//           onTouchMove={handleTouchMove}
//           onTouchEnd={handleTouchEnd}
//           href={imageUrl}
//         >
//         </image>
//       </svg>
//     </svg>
//   )
// }
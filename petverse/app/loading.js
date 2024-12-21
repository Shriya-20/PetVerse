import loadingGIF from "@/public/loading.gif";
import Image from "next/image";
export default function Loading() {
  console.log("loading Component Rendered");
  return (
    <>
      <Image src={loadingGIF} alt="loading gif" />
    </>
  );
}

// import { PulseLoader } from "react-spinners";

// function Loading() {
//   return (
//     <div
//       style={{
//         display: 'flex',         
//         justifyContent: 'center',
//         alignItems: 'center',     
//         height: '100vh'        
//       }}
//     >
//       <PulseLoader
//         color="#0abfad"
//         margin={1}
//         size={27}
//         speedMultiplier={2}
//       />
//     </div>
//   );
// }

// export default Loading;

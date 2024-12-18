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

import loadingGIF from "@/public/loading.gif";
import Image from "next/image";

export default function Loading() {
  return (
    <>
      <Image src={loadingGIF} alt="loading gif" />
    </>
  );
}

import loadingGIF from "@/public/loading.gif";
import Image from "next/image";
export default function Loading() {
  return (
    <>
      <Image width={100} height={100} src={loadingGIF} alt="loading gif" />
    </>
  );
}

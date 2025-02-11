import loadinggif from "@/public/loading2.gif";
import Image from "next/image";

export default function Loading({ isLoading, scale = 100 }) {
  if (!isLoading) return null;

  return (
    <div className="absolute inset-0 flex items-center justify-center z-50">
      <Image
        src={loadinggif}
        alt="Loading..."
        height={20}
        width={20}
        style={{ transform: `scale(${scale / 100})` }}
      />
    </div>
  );
}

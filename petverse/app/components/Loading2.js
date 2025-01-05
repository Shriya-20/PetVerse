import loadinggif from "@/public/loading2.gif";
import Image from "next/image";

export default function Loading({ isLoading }) {
  if (!isLoading) return null;

  return (
    <div className="absolute inset-0 flex items-center justify-center z-10">
      <Image src={loadinggif} alt="Loading..." height={20} width={20} />
    </div>
  );
}

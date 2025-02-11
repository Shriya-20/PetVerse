import loadinggif from "@/public/loading2.gif";
import Image from "next/image";

export default function Loading({ isLoading }) {
  if (!isLoading) return null;
  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-dark1 bg-opacity-50 z-50">
        {/* Loading Spinner */}
        <div className="flex items-center justify-center">
          <Image src={loadinggif} alt="Loading..." height={30} width={30} />
        </div>
      </div>
    </>
  );
}

"use client";

import Image from "next/image";
import errorImage from "@/public/error.jpg";

export default function Error() {
  return (
    <>
      <div className="items-center flex justify-center">
        <Image src={errorImage} alt="error image" />
      </div>
    </>
  );
}

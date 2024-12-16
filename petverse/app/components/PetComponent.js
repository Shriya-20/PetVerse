"use client";

import Image from "next/image";

export default function PetComponent({ image }) {
  return (
    <div className="relative h-[150px] w-[150px]">
      <Image
        alt="profile-pic"
        src={image}
        layout="fill"
        className="shadow-xl rounded-full border-4 border-white"
      />
    </div>
  );
}

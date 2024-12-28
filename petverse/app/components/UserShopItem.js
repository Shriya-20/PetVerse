"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function UserShopItem(item) {
  const router = useRouter();

  // The fucntion should route the user to the chat of the product seller
  return (
    <>
      <div className="max-w-[384px] mx-auto rounded-xl hover:shadow-sm  dark:hover:shadow-mid3">
        {/* Product image */}
        <div className="relative w-full max-w-sm aspect-square">
          <Image
            src={item.images[0]}
            alt={item.title}
            className="relative w-full h-full rounded-xl object-cover"
            width={384}
            height={384}
          />
        </div>
        <div className="mt-5 flex px-2 pb-2 items-center justify-between">
          <div className="">
            {/* Product name */}
            <h6 className="font-medium text-xl leading-8 text-textDarker dark:text-textLight mb-2">
              {item.title}
            </h6>
            {/* Product price */}
            <h6 className="font-semibold text-xl leading-8 text-customTeal">
              {item.price}
            </h6>
          </div>
          {/* Seller profile */}
        </div>
      </div>
    </>
  );
}

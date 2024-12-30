"use client";

import ProfileIcon from "./ProfileIcon";
import Image from "next/image";
import { useRouter } from "next/navigation";
import default_item from "@/public/default_item.png";
import Link from "next/link";
import default_profile_pic from "@/public/default_user_profile_pic.jpeg";

export default function ShopItem(item) {
  const router = useRouter();

  // The fucntion should route the user to the chat of the product seller

  return (
    <>
      <div className="relative max-w-[384px] mx-auto rounded-xl hover:shadow-sm dark:hover:shadow-mid3">
        {/* Product image */}
        <div className="relative w-full aspect-square rounded-xl overflow-hidden">
          <Image
            src={"images" in item ? item.images[0] : default_item}
            alt={item.title}
            className="absolute top-0 left-0 w-full h-full object-cover"
            width={384}
            height={384}
          />
        </div>

        {/* Details Section */}
        <div className="relative p-2 mt-4 flex items-center justify-between">
          <div>
            {/* Product name */}
            <p className="w-16 md:w-32 font-medium text-sm md:text-base text-textDarker dark:text-textLight mb-1 truncate">
              {item.title}
            </p>
            {/* Product price */}
            <h6 className="font-semibold text-sm md:text-base text-customTeal">
              {item.price}
            </h6>
          </div>

          {/* Seller profile */}
          <div>
            <Link
              href={`/petverse/profile/${item.sellerId}`}
              className="flex items-center justify-center rounded-full bg-light1 border dark:bg-dark1 border-customTeal shadow-sm transition-all duration-300 hover:scale-95"
            >
              <ProfileIcon
                profile_pic={
                  item.sellerPic ? item.sellerPic : default_profile_pic
                }
                height="h-8 md:h-12"
                width="w-8 md:w-12"
              />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

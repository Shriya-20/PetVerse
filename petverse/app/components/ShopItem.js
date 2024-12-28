"use client";

import ProfileIcon from "./ProfileIcon";
import Image from "next/image";
import { useRouter } from "next/navigation";
import default_item from "@/public/default_item.png";
import default_profile_pic from "@/public/default_user_profile_pic.jpeg";

export default function ShopItem(item) {
  const router = useRouter();

  // The fucntion should route the user to the chat of the product seller
  function handleClick() {
    router.push("/petverse/messages");
  }

  console.log(item.images[0]);
  return (
    <>
      <div className="max-w-[384px] mx-auto rounded-xl hover:shadow-sm  dark:hover:shadow-mid3">
        {/* Product image */}
        <div className="relative w-full max-w-sm aspect-square">
          <Image
            src={item.images[0] == "" ? default_item : item.images[0]}
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
          <button
            onClick={handleClick}
            className="p-1 min-[400px]:p-1 rounded-full bg-light1 border dark:bg-dark1 border-customTeal flex items-center justify-center group shadow-sm shadow-transparent transition-all duration-500 hover:shadow-light2  hover:border-mid1 hover:bg-gray-50 dark:hover:bg-dark2 hover:scale-90"
          >
            <ProfileIcon
              profile_pic={
                item.sellerPic ? item.sellerPic : default_profile_pic
              }
            />
          </button>
        </div>
      </div>
    </>
  );
}

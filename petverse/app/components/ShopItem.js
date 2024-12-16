"use client";

import ProfileIcon from "./ProfileIcon";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function ShopItem(props) {
  const router = useRouter();

  // The fucntion should route the user to the chat of the product seller
  function handleClick() {
    router.push("/petverse/messages");
  }
  return (
    <>
      <div className="max-w-[384px] mx-auto hover:shadow-sm">
        {/* Product image */}
        <div className="relative w-full max-w-sm aspect-square">
          <Image
            src={props.item_image}
            alt={props.item_alt}
            className="relative w-full h-full rounded-xl object-cover"
            width={384}
            height={384}
          />
        </div>
        <div className="mt-5 flex items-center justify-between">
          <div className="">
            {/* Product name */}
            <h6 className="font-medium text-xl leading-8 text-black mb-2">
              {props.item_name}
            </h6>
            {/* Product price */}
            <h6 className="font-semibold text-xl leading-8 text-customTeal">
              {props.item_price}
            </h6>
          </div>
          {/* Seller profile */}
          <button
            onClick={handleClick}
            className="p-1 min-[400px]:p-1 rounded-full bg-white border border-customTeal flex items-center justify-center group shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-200 hover:border-gray-400 hover:bg-gray-50 hover:scale-90"
          >
            <ProfileIcon profile_pic={props.user_profile_pic} />
          </button>
        </div>
      </div>
    </>
  );
}

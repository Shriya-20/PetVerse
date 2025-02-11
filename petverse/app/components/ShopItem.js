"use client";

import ProfileIcon from "./ProfileIcon";
import Image from "next/image";
import { useRouter } from "next/navigation";
import default_item from "@/public/default_item.png";
import Link from "next/link";
import default_profile_pic from "@/public/default_user_profile_pic.jpeg";
import Modal from "./Modal";
import { useState } from "react";

export default function ShopItem(item) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  return (
    <>
      <div
        className="relative max-w-[384px] mx-auto rounded-xl hover:shadow-lg dark:shadow-md dark:hover:shadow-mid3"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="relative w-full aspect-square rounded-xl overflow-hidden">
          <Image
            src={"images" in item ? item.images[0] : default_item}
            alt={item.title}
            className="absolute top-0 left-0 w-full h-full object-cover"
            width={384}
            height={384}
          />
        </div>

        <div className="relative p-2 mt-4 flex items-center justify-between">
          <div>
            <p className="w-16 md:w-32 font-medium text-sm md:text-base text-textDarker dark:text-textLight mb-1 truncate">
              {item.title}
            </p>

            <h6 className="font-semibold text-sm md:text-base text-customTeal">
              {item.price}
            </h6>
          </div>

          <div onClick={(e) => e.stopPropagation()}>
            <Link
              href={`/petverse/profile/${item.sellerId}`}
              className="flex items-center justify-center rounded-full bg-light1 border dark:bg-dark1 border-customTeal shadow-sm transition-all duration-300 hover:scale-95"
            >
              <ProfileIcon
                profile_pic={
                  item.sellerDetails[0].profilePicture
                    ? item.sellerDetails[0].profilePicture
                    : default_profile_pic
                }
                height="h-8 md:h-12"
                width="w-8 md:w-12"
              />
            </Link>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <Modal
          onClose={() => {
            console.log("Modal closed successfully");
            setIsModalOpen(false);
          }}
          isOpen={isModalOpen}
        >
          <div className="flex flex-col items-center space-y-4 p-4">
            <div className="w-3/4">
              <Image
                src={item.images ? item.images[0] : default_item}
                alt="item image"
                width={300}
                height={300}
                className="object-cover rounded-md w-full h-[300px]"
              />
            </div>

            <div className="w-full text-center bg-gray-100 dark:bg-gray-800 rounded-md p-4 space-y-2">
              <h2 className="text-xl font-semibold">{item.title}</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {item.description}
              </p>
              <div className="flex justify-between text-lg font-medium mt-2">
                <p>Price: ₹{item.price}</p>
                <p>Quantity: {item.quantity}</p>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}

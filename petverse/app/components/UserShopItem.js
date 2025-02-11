"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import default_item from "@/public/default_item.png";
import { TrashIcon } from "@heroicons/react/24/outline";
import Modal from "./Modal";

export default function UserShopItem(item) {
  const router = useRouter();
  const [isModalOpen, SetIsModalOpen] = useState(false);
  const itemId = item._id;

  const handleDelete = () => {
    SetIsModalOpen(true);
  };

  const handleDeleteItem = async () => {
    try {
      const response = await fetch("/api/market/deleteitem", {
        method: "POST",
        body: JSON.stringify({ itemId }),
      });
      if (!response.ok) {
        throw new Error("Failed to delete item");
      }
      location.reload();
    } catch (error) {}
  };

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

          {/* Delete button */}
          <button
            onClick={handleDelete}
            className="absolute bottom-2 right-2 p-3 dark:bg-mid4 bg-textLighter rounded-full hover:bg-red-600 focus:outline-none shadow-md 
                      md:p-3 lg:p-4"
          >
            <TrashIcon className="h-4 w-4  dark:text-white text-mid4 hover:text-white" />
          </button>
        </div>
      </div>
      <Modal onClose={() => SetIsModalOpen(false)} isOpen={isModalOpen}>
        <div className="p-4 mx-auto bg-light1 dark:bg-dark2 rounded-lg shadow-md">
          <h3 className="text-lg font-bold  mb-2">Confirm Delete</h3>

          <p className="text-sm text-textlight2 mb-6">
            Are you sure you want to delete this item? Once delete it cannot be
            reversed.
          </p>
          <div className="flex justify-end space-x-3">
            <button
              className="bg-gray-300 text-gray-700  px-4 py-2 rounded-md hover:bg-gray-400"
              onClick={() => SetIsModalOpen(false)}
            >
              Cancel
            </button>
            <button
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
              onClick={handleDeleteItem}
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}

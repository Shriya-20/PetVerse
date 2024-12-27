"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import defaultItemIcon from "@/public/default_item.png";
export default function UserItems() {
  const itemImageRef = useRef();

  const ReferenceItemImage = () => {
    itemImageRef.current.click();
  };

  const hangleItemImage = (e) => {
    const file = e.target.files[0];

    if (file) {
      console.log("file added successfully");
    }
  };
  return (
    <>
      <div>
        <div className="h-64 lg:mx-32 xl:mx-48 md:mx-20">
          <form className="p-2 sm:flex mt-1">
            <div className="items-center mr-4 mt-4">
              <Image
                src={defaultItemIcon}
                alt="default item image"
                onClick={ReferenceItemImage}
                className="hover:opacity-75"
              />
              <input
                type="file"
                accept="image/*"
                ref={itemImageRef}
                className="hidden"
              />
            </div>
            <div>
              <p className="p-2 m-1 text-xl font-semibold transform scale-y-110">
                Enter details of the Product
              </p>
              <input placeholder="Title" required className="addItemInput" />
              <input
                placeholder="description"
                required
                className="addItemInput"
              ></input>
              <input placeholder="price" required className="addItemInput" />
              <input
                placeholder="quantity"
                required
                className="addItemInput "
              />
              <button className="bg-customTeal p-2 text-lg text-white hover:bg-teal-600 rounded-sm m-1">
                Create item
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

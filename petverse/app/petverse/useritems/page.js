"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import defaultItemIcon from "@/public/default_item.png";
import UserShopItem from "@/app/components/UserShopItem";

export default function UserItems() {
  const itemImageRef = useRef();
  const [userItems, setUserItems] = useState([]);

  useEffect(() => {
    async function GetUserItems() {
      try {
        const response = await fetch("/api/market/newuser");
        if (!response.ok) {
          throw new Error("Error in fetching items randomly");
        }
        const data = await response.json();
        setUserItems(data);
        console.log(data);
        console.log("FETCHED DATA S");
      } catch (error) {
        console.log("Error in fetching items randomly", error);
      }
    }
    GetUserItems();
  }, []);

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
        <div className="flex flex-col place-items-stretch md:grid md:grid-cols-3 md:gap-3 md:justify-center md:justify-items-center shadow  shadow-mid2 pb-4">
          <div className="justify-items-center md:col-start-1 md:col-span-3 mt-4">
            <p className="font-bold text-2xl ">Add a New Item for sale</p>
          </div>

          <form className="flex flex-col justify-items-center md:grid md:grid-cols-3 md:col-start-1 md:col-span-3  md:px-20 py-2">
            <div className="justify-items-center mb-3 md:mb-0 md:col-start-1 md:col-span-1 md:mr-3">
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
            <div className="flex flex-col px-6 md:px-0 md:grid md:grid-cols-2 md:col-start-2 md:col-span-2 md:gap-2 md:gap-y-2">
              <input
                placeholder="item name"
                required
                className="addItemInput"
              />
              <input placeholder="price" required className="addItemInput" />
              <textarea
                placeholder="description"
                required
                className="addItemInput md:col-start-1 md:col-span-2 md:row-span-2 md:min-h-16 overflow-wrap break-words"
              ></textarea>

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

        <section className="py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {userItems.map((shopItem) => (
                <UserShopItem key={shopItem._id} {...shopItem} />
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

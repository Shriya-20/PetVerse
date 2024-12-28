"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import defaultItemIcon from "@/public/default_item.png";
import ShopItem from "@/app/components/ShopItem";

export default function UserItems() {
  const itemImageRef = useRef();
  const [randomItems, setRandomItems] = useState([]);

  useEffect(() => {
    async function GetRandomItems() {
      try {
        const response = await fetch("/api/market/newuser");
        if (!response.ok) {
          throw new Error("Error in fetching items randomly");
        }
        const data = await response.json();
        setRandomItems(data);
        console.log(data);
        console.log("FETCHED DATA S");
      } catch (error) {
        console.log("Error in fetching items randomly", error);
      }
    }
    GetRandomItems();
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
        <div className="lg:h-64  lg:mx-32 xl:mx-48 md:mx-20 ">
          <p className="font-bold text-2xl mt-1 mr-4">
            Add a New Item for sale
          </p>
          <form className="p-2 sm:flex ">
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
        <hr></hr>
        <section className="py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {randomItems.map((shopItem) => (
                <ShopItem key={shopItem._id} {...shopItem} />
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

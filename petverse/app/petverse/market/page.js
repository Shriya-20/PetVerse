"use client";

import Searchbar from "@/app/components/Searchbar";
import ShopItem from "@/app/components/ShopItem";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useUser } from "@/context/UserContext";
import Modal from "@/app/components/Modal";
import Image from "next/image";

export default function Marketplace() {
  const [randomItems, setRandomItems] = useState([]);
  const { user } = useUser();
  const userId = user.id;

  useEffect(() => {
    async function GetRandomItems() {
      try {
        const response = await fetch("/api/market/newuser", {
          method: "POST",
          body: JSON.stringify({ userId }),
        });
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

  return (
    <>
      <div className="items-center">
        <div className="flex items-center">
          <div className="m-1 flex-grow">
            <Searchbar className="" />
          </div>

          <div className="m-1 mt-3 basis-1/5 md:basis-1/8 ">
            <Link
              className="bg-customTeal px-3 py-3 w-full md:w-3/4 lg:w-1/2 text-lg rounded-xl text-white hover:bg-teal-600 whitespace-nowrap"
              href={"/petverse/useritems"}
            >
              My Items
            </Link>
          </div>
        </div>

        <section className="py-12 px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 auto-rows-auto">
            {randomItems.map((shopItem) => (
              <div key={shopItem._id} className="w-full">
                <div>
                  <ShopItem {...shopItem} />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

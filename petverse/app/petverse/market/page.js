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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
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
                <div
                  onClick={() => {
                    console.log("Modal open successfully");
                    setSelectedItem(shopItem); // Set the clicked item
                    setIsModalOpen(true);
                  }}
                >
                  <ShopItem {...shopItem} />
                </div>
              </div>
            ))}
          </div>

          {isModalOpen && selectedItem && (
            <Modal
              onClose={() => {
                console.log("Modal closed successfully");
                setIsModalOpen(false);
                setSelectedItem(null); // Clear the selected item
              }}
              isOpen={isModalOpen}
            >
              <div className="flex flex-col items-center space-y-4 p-4">
                {/* Image Section */}
                <div className="w-3/4">
                  <Image
                    src={selectedItem.images[0]}
                    alt="item image"
                    width={300} // Set a fixed size for consistent appearance
                    height={300}
                    className="object-cover rounded-md w-full h-[300px]" // Square shape
                  />
                </div>

                {/* Details Section */}
                <div className="w-full text-center bg-gray-100 dark:bg-gray-800 rounded-md p-4 space-y-2">
                  <h2 className="text-xl font-semibold">
                    {selectedItem.title}
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {selectedItem.description}
                  </p>
                  <div className="flex justify-between text-lg font-medium mt-2">
                    <p>Price: ₹{selectedItem.price}</p>
                    <p>Quantity: {selectedItem.quantity}</p>
                  </div>
                </div>
              </div>
            </Modal>
          )}
        </section>
      </div>
    </>
  );
}

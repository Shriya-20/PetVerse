"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import defaultItemIcon from "@/public/default_item.png";
import UserShopItem from "@/app/components/UserShopItem";
import Loading from "@/app/components/Loading2";
import { useUser } from "@/context/UserContext";

export default function UserItems() {
  const itemImageRef = useRef();
  const [userItems, setUserItems] = useState([]);
  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [itemQuantity, setItemQuantity] = useState("");
  const [itemArrayBuffer, setItemArrayBuffer] = useState(null);
  const [imageSrc, setImageSrc] = useState(defaultItemIcon);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUser();
  const userId = user.id;

  useEffect(() => {
    async function GetUserItems() {
      try {
        const response = await fetch("/api/market/useritems", {
          method: "POST",
          body: JSON.stringify({ userId }),
        });
        if (!response.ok) {
          throw new Error("Error in fetching items randomly");
        }
        const data = await response.json();
        setUserItems(data);
      } catch (error) {
        console.log("Error in fetching items randomly", error);
      }
    }
    GetUserItems();
  }, []);

  const ReferenceItemImage = () => {
    itemImageRef.current.click();
  };

  const handleItemImage = async (e) => {
    try {
      const file = e.target.files[0];
      if (!file || !file.type.startsWith("image/")) {
        alert("Please select an valid image");
        return;
      }
      const arrayBuffer = await file.arrayBuffer();

      const blob = new Blob([arrayBuffer], { type: file.type });
      const dataUrl = URL.createObjectURL(blob);
      setImageSrc(dataUrl);

      setItemArrayBuffer(arrayBuffer);
    } catch (error) {
      console.error("Error reading file:", error);
    }
  };

  async function handleCreateItem() {
    setError(null);
    setIsLoading(true);
    try {
      if (!itemArrayBuffer) {
        throw new Error("Please upload an image");
      }
      const formData = new FormData();
      formData.append("itemName", itemName);
      formData.append("itemPrice", itemPrice);
      formData.append("itemDescription", itemDescription);
      formData.append("itemQuantity", itemQuantity);
      formData.append("userId", userId);

      const blob = new Blob([itemArrayBuffer], {
        type: "application/octet-stream",
      });
      formData.append("itemImage", blob);

      const response = await fetch("/api/market/additem", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to add new item");
      }
      location.reload();
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <div>
        <div className="flex flex-col place-items-stretch md:grid md:grid-cols-3 md:gap-3 md:justify-center md:justify-items-center shadow  shadow-mid2 pb-4">
          <div className="justify-items-center md:col-start-1 md:col-span-3 mt-4">
            <p className="font-bold text-2xl ">Add a New Item for sale</p>
          </div>

          <form
            className="flex flex-col justify-items-center md:grid md:grid-cols-3 md:col-start-1 md:col-span-3  md:px-10 lg:px-20 py-2
          "
            onSubmit={(e) => {
              e.preventDefault();
              handleCreateItem();
            }}
          >
            <div className="flex justify-center items-center mx-auto md:mx-0 h-[220px] w-[220px] overflow-hidden mb-3 md:mb-0 md:col-start-1 md:col-span-1 md:mr-3">
              <Image
                id="itemPic"
                src={imageSrc}
                alt="default item image"
                onClick={ReferenceItemImage}
                className="hover:opacity-75"
                height={220}
                width={220}
              />
              <input
                type="file"
                accept="image/*"
                ref={itemImageRef}
                onChange={handleItemImage}
                className="hidden"
              />
            </div>
            <div className="flex flex-col px-6 md:px-0 md:grid md:grid-cols-2 md:col-start-2 md:col-span-2 md:gap-2 md:gap-y-2">
              <input
                placeholder="item name"
                onChange={(e) => setItemName(e.target.value)}
                required
                className="addItemInput"
              />
              <input
                placeholder="price"
                required
                onChange={(e) => setItemPrice(e.target.value)}
                className="addItemInput"
              />
              <textarea
                placeholder="description"
                onChange={(e) => setItemDescription(e.target.value)}
                required
                className="addItemInput md:col-start-1 md:col-span-2 md:row-span-2 md:min-h-16 overflow-wrap break-words"
              ></textarea>

              <input
                placeholder="quantity"
                onChange={(e) => setItemQuantity(e.target.value)}
                required
                className="addItemInput "
              />
              {!isLoading && (
                <button
                  className="bg-customTeal p-2 text-lg text-white hover:bg-teal-600 rounded-sm m-1"
                  type="submit"
                >
                  Create item
                </button>
              )}
              {isLoading && (
                <button
                  className="bg-customTeal p-2 text-lg text-white hover:bg-teal-600 rounded-sm m-1 relative"
                  type="submit"
                >
                  <Loading isLoading={isLoading} />
                </button>
              )}
            </div>
          </form>
          {error && (
            <div className="md:col-span-3">
              <p className="text-red-500 text-center">{error}</p>
            </div>
          )}
        </div>

        <section className="py-12 px-8">
          <div className="w-full text-center -mt-9 mb-4 font-semibold ">
            My items
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 auto-rows-auto">
            {userItems.map((shopItem) => (
              <div key={shopItem._id} className="w-full">
                <UserShopItem key={shopItem._id} {...shopItem} />
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

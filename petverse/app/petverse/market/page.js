"use client";

import Searchbar from "@/app/components/Searchbar";
import ShopItem from "@/app/components/ShopItem";
import LoginDoggy from "@/public/logindoggy.jpg";
import LoginDoggy2 from "@/public/loginDoggies.jpg";
import profilepic from "@/public/profile_bg.jpg";

const shopItems = [
  {
    item_image: LoginDoggy,
    item_alt: "cream image",
    item_name: "Skin care cream",
    item_price: "$74.99",
    item_owner: "",
    user_profile_pic: LoginDoggy,
  },
  {
    item_image: LoginDoggy2,
    item_alt: "cream image",
    item_name: "Men’s Facial",
    item_price: "$25",
    item_owner: "",
    user_profile_pic: LoginDoggy2,
  },
  {
    item_image: LoginDoggy,
    item_alt: "serum bottle image",
    item_name: "Dark circles serum",
    item_price: "$199.99",
    item_owner: "",
    user_profile_pic: profilepic,
  },
  {
    item_image: profilepic,
    item_alt: "cream image",
    item_name: "Skin care cream",
    item_price: "$74.99",
    item_owner: "",
    user_profile_pic: LoginDoggy,
  },
];

export default function Marketplace() {
  return (
    <>
      <div className="items-center">
        <Searchbar />
        <section className="py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {shopItems.map((shopItem, index) => (
                <ShopItem key={index} {...shopItem} />
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

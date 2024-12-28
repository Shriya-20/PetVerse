"use client";

import ProfileIcon from "@/app/components/ProfileIcon";
import default_pet_profile_pic from "@/public/default_pet_profile_pic1.png";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import posts from "@/test_data/posts";
import {
  Popover,
  PopoverHandler,
  PopoverContent,
} from "@material-tailwind/react";

export default function PetProfile() {
  const params = useParams();
  const [petData, setPetData] = useState({});
  console.log(params);

  useEffect(() => {
    async function getPetData() {
      try {
        const response = await fetch("/api/pets", {
          method: "POST",
          body: JSON.stringify(params),
        });
        console.log(response);
        if (!response.ok) {
          throw new Error("Error fetching pet Data");
        }
        const data = await response.json();
        console.log(data);
        setPetData(() => ({
          ...data,
        }));
      } catch (error) {
        console.log(error);
      }
    }
    getPetData();
  }, []);

  return (
    <>
      <div className="flex flex-col my-0 mx-2 md:mx-8 lg:mx-16 relative">
        <div className="flex flex-wrap px-4 md:px-8 lg:px-12 my-8">
          <div className=" shrink-0">
            <ProfileIcon
              profile_pic={
                "profilePicture" in petData
                  ? petData.profilePicture
                  : default_pet_profile_pic
              }
              height="h-36"
              width="w-36"
            />
          </div>
          <div className="shrink px-3 md:px-5 lg:px-7">
            <div className="flex flex-col">
              <p className="text-3xl">{petData.name}</p>
              <p className="text-xl">{petData.breed}</p>
              {petData.age && <p className="text-lg">{petData.age} years</p>}
            </div>
          </div>
          <Popover placement="left" className="absolute bg-dark2">
            <PopoverHandler>
              <button
                className="absolute top-5 -right-1 hover:bg-gray-700 rounded-full  hover:text-customTeal transform scale-125"
                type="button"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6h.01M12 12h.01M12 18h.01"
                  />
                </svg>
              </button>
            </PopoverHandler>
            <PopoverContent className="bg-dark1 h-[80] w-24 mt-3 p-0">
              <button className="w-full block p-2 hover:bg-gray-700 hover:text-customTeal rounded-lg">
                Edit profile
              </button>
              <hr></hr>
              <button className="w-full block p-2 hover:bg-gray-700 rounded-lg hover:text-customTeal">
                New post
              </button>
            </PopoverContent>
          </Popover>
        </div>

        <hr></hr>
        <br></br>
        <div className="grid grid-cols-3 gap-1">
          {posts.map((post, index) => (
            <div key={index} className="relative w-full h-0 pb-[100%]">
              <Image
                src={post.image}
                alt="user post"
                width={300} //
                height={300} //
                className="absolute top-0 left-0 w-full h-full object-cover  shadow-lg transition-all duration-300 hover:scale-95"
                style={{
                  objectFit: "cover",
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

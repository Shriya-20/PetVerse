"use client";

import ProfileIcon from "@/app/components/ProfileIcon";
import default_pet_profile_pic from "@/public/default_pet_profile_pic1.png";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import posts from "@/test_data/posts";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import Link from "next/link";
import Slider2 from "@/app/components/Slider2";
import defaultImage from "@/public/default_item.png";

export default function PetProfile() {
  const params = useParams();

  const [petData, setPetData] = useState({});
  const [petPosts, setPetPosts] = useState([]);
  const [isPostOpen, setIsPostOpen] = useState(false);
  const [openedPost, setOpenedPost] = useState(null);
  const { user } = useUser();
  const router = useRouter();
  const userId = user.id;

  console.log(params);
  const ownerId = params.id;
  const petId = params.petid;

  useEffect(() => {
    async function getPetData() {
      try {
        const response = await fetch("/api/pets", {
          method: "POST",
          body: JSON.stringify(petId),
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

    async function getPetPosts() {
      try {
        const response = await fetch("/api/pets/fetchposts", {
          method: "POST",
          body: JSON.stringify({ petId }),
        });
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        console.log("Successfully fetched posts");
        const data = await response.json();
        console.log("PET DATAATATTAT");
        console.log(data);

        setPetPosts(() => data);
        console.log(petPosts);
      } catch (error) {
        console.log("Failed to fetch posts", error);
      }
    }
    getPetData();
    getPetPosts();
  }, []);

  return (
    <>
      {!isPostOpen && (
        <div className=" flex flex-col my-0 mx-2 md:mx-8 lg:mx-16 relative">
          <div className="flex flex-wrap px-4 md:px-8 lg:px-12 my-8 relative">
            <div className="shrink-0">
              <ProfileIcon
                profile_pic={
                  "profilePicture" in petData
                    ? petData.profilePicture
                    : default_pet_profile_pic
                }
                height="h-20 md:h-32 lg:h-36"
                width="w-20 md:w-32 lg:w-36"
              />
            </div>
            <div className="shrink px-3 md:px-5 lg:px-7">
              <div className="flex flex-col">
                <p className="text-xl md:text-2xl lg:text-3xl">
                  {petData.name}
                </p>
                <p className="text-sm md:text-lg lg:text-xl">{petData.breed}</p>
                {petData.age && <p className="text-lg">{petData.age} years</p>}
              </div>
            </div>
            {/* Message Owner Button */}
            <div className="absolute -bottom-4 right-0 bg-customTeal rounded-md p-2">
              <Link href={"/petverse/messages"} className="text-white">
                Message Owner
              </Link>
            </div>
          </div>

          <hr></hr>
          <br></br>
          <div className="grid grid-cols-3 gap-1">
            {petPosts.map((post, index) => (
              <div key={index} className="relative w-full h-0 pb-[100%]">
                <Image
                  src={post.imageUrl ? post.imageUrl : defaultImage}
                  alt="user post"
                  width={300} //
                  height={300} //
                  className="absolute top-0 left-0 w-full h-full object-cover  shadow-lg transition-all duration-300 hover:scale-95"
                  style={{
                    objectFit: "cover",
                  }}
                  unoptimized
                  onClick={() => {
                    setOpenedPost(index);
                    setIsPostOpen(true);
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {isPostOpen && (
        <div className="relative h-full">
          <div
            onClick={() => setIsPostOpen(false)}
            className="absolute top-4 right-4 px-4 py-2 text-xl hover:shadow-lg rounded-full  cursor-pointer z-10"
          >
            x
          </div>
          <div className="relative h-full flex justify-center items-center">
            <div className="relative h-auto w-full max-w-[1370px]">
              <Slider2
                petData={petData}
                slides={petPosts}
                currSlide={openedPost}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

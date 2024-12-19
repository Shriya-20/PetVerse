"use client";

import LoginDoggy from "@/public/logindoggy.jpg";
import LoginDoggy2 from "@/public/loginDoggies.jpg";
import loginDoggy3 from "@/public/profile_bg.jpg";
import ProfileIcon from "@/app/components/ProfileIcon";
import Image from "next/image";

const posts = [
  {
    user_id: 1,
    image: LoginDoggy,
    url: "",
  },
  {
    user_id: 2,
    image: LoginDoggy2,
    url: "",
  },
  {
    user_id: 3,
    image: loginDoggy3,
    url: "",
  },
  {
    user_id: 4,
    image: LoginDoggy,
    url: "",
  },
  {
    user_id: 5,
    image: LoginDoggy,
    url: "",
  },
  {
    user_id: 6,
    image: LoginDoggy,
    url: "",
  },
  {
    user_id: 7,
    image: LoginDoggy,
    url: "",
  },
  {
    user_id: 8,
    image: LoginDoggy2,
    url: "",
  },
  {
    user_id: 9,
    image: loginDoggy3,
    url: "",
  },
  {
    user_id: 10,
    image: LoginDoggy,
    url: "",
  },
  {
    user_id: 11,
    image: LoginDoggy,
    url: "",
  },
  {
    user_id: 12,
    image: LoginDoggy,
    url: "",
  },
];

export default function PetProfile() {
  return (
    <>
      <div className="flex flex-col my-0 mx-2 md:mx-8 lg:mx-16">
        <div className="flex flex-wrap px-4 md:px-8 lg:px-12 my-8">
          <div className=" shrink-0">
            <ProfileIcon profile_pic={LoginDoggy2} height="h-36" width="w-36" />
          </div>
          <div className="shrink px-3 md:px-5 lg:px-7">
            <div className="flex flex-col">
              <p className="text-3xl">Terry</p>
              <p className="text-xl">Labrador</p>
              <p className="text-lg">26 years</p>
            </div>
          </div>
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

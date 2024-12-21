"use client";

import Searchbar from "@/app/components/Searchbar";
import Slider from "@/app/components/Slider";

export default function Explore() {
  const slides = ["/1.png", "/3.png", "/1.png", "/3.png", "/1.png", "/3.png"];
  return (
    <>         
      <Searchbar />

      <div className="min-h-screen flex justify-center items-center ">
        <div className="relative w-full max-w-[1350px]">
          <Slider 
          slides={slides}
          userImage="/default_user_profile_pic.jpeg"
           />
        </div>
      </div>
    </>
  );
}

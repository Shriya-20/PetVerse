"use client";

import Searchbar from "@/app/components/Searchbar";
import Slider from "@/app/components/Slider";
import posts from "@/app/data/posts";

export default function Explore() {
  const slides = posts.map(post => ({
    src: post.src,
    title: post.title,
    desc: post.desc,
    likes: post.likes,
    username: post.username,
  }));

  return (
    <>         
      <Searchbar />

      <div className="min-h-screen flex justify-center items-center">
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

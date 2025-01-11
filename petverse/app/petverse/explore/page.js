"use client";

import Searchbar from "@/app/components/Searchbar";
import Slider from "@/app/components/Slider";
import posts from "@/app/data/posts";
import Slider2 from "@/app/components/Slider2";
import ProfileIcon from "@/app/components/ProfileIcon";
import Image from "next/image";
import { useUser } from "@/context/UserContext";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Explore() {
  const [posts, setPosts] = useState([]);
  const [isPostOpen, setIsPostOpen] = useState(null);
  const [petData, setPetData] = useState({});
  const [openedPost, setOpenedPost] = useState(null);
  const { user } = useUser();
  const userId = user.id;

  useEffect(() => {
    async function getPetData() {
      try {
        const response = await fetch("/api/pets", {
          method: "POST",
          body: JSON.stringify(params.id),
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
    const getPosts = async () => {
      try {
        const response = await fetch("/api/explore", {
          method: "POST",
          body: JSON.stringify({ userId }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.log(error);
        console.log("Failed to fetch posts");
      }
    };
    getPetData();
    getPosts();
  }, []);

  console.log(posts);
  return (
    <>
      <Searchbar />
      <br />
      {/* Grid display of posts*/}
      {!isPostOpen && (
        <div className=" flex flex-col my-0 mx-2 md:mx-8 lg:mx-16 relative">
          <div className="grid grid-cols-3 gap-1">
            {posts.map((post, index) => (
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

      {/* Expanded view of posts */}
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
                slides={posts}
                currSlide={openedPost}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

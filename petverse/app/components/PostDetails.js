import React from "react";
import posts from "../data/posts"; // to catch user's info
import Image from "next/image";
import left from "../../public/left.svg";
import right from "../../public/right.svg";

// Props type definition (if using TypeScript, you can skip it if not needed)
const PostDetails = ({ clickNet, clickPrev, activeImageInd }) => {
  return (
    <div className="grid place-items-start w-full bg-[#219B9D] relative md:rounded-tr-3xl md:rounded-br-3xl p-6">
      <div className="uppercase text-sm absolute right-4 top-2 underline-offset-4 underline">
        ignore
      </div>
      {posts.map((elem, ind) => (
        <div
          className={
            ind==activeImageInd
            ?"block w-full h-80vh object-cover transition-all duration-500 ease-in-out"
            :"hidden"
          }
          key={ind}
        >
          {/* Title */}
          <div className="py-4 text-2xl font-bold">{elem.title}</div>

          {/* User Profile and Like Count */}
          <div className="flex items-center justify-between mt-4">
            {/* User Profile */}
            <div className="flex items-center">
              <img
                src={"/1.png"}
                alt="User Profile"
                className="w-10 h-10 rounded-full border border-gray-300 shadow-sm"
              />
              <div className="ml-3 text-sm font-medium">{elem.userName}</div>
            </div>

            {/* Like Count */}
            <div className="flex items-center text-sm font-medium text-gray-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-5 h-5 text-red-500 mr-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                />
              </svg>
              {elem.likes}
            </div>
          </div>
          {/* Navigation Buttons */}
          <div className="absolute bottom-10 md:bottom-1 flex justify-between w-full">
            <div
              onClick={clickPrev}
              className="cursor-pointer flex justify-center items-center"
            >
              <Image src={left} alt="left" width={20} height={20} />
            </div>
            <div
              onClick={clickNet}
              className="cursor-pointer flex justify-center items-center"
            >
              <Image src={right} alt="right" width={20} height={20} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostDetails;

"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Heart } from "react-feather";  // Heart icon from react-feather
import Image from "next/image";

//  Image Component
const SlideImage = ({ src, alt, opacity, width, height }) => (
  <div className="flex-shrink-0" style={{ width: `${width}%` }}>
    <Image
      src={src}
      alt={alt}
      width={400}
      height={250}
      className={`w-full h-full object-cover rounded-lg opacity-${opacity}`}
      priority
    />
  </div>
);

export default function Slider({
  autoSlide = true,
  autoSlideInterval = 3000,
  slides,
  userImage,
}) {
  const [curr, setCurr] = useState(0);
  const [liked, setLiked] = useState(false); // State to handle like toggling

  const prev = () =>
    setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1));
  const next = () =>
    setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1));

  const toggleLike = () => setLiked(!liked);

  useEffect(() => {
    if (!autoSlide) return;
    const slideInterval = setInterval(next, autoSlideInterval);
    return () => clearInterval(slideInterval);
  }, [autoSlide, autoSlideInterval]);

  return (
    <div className="flex justify-center items-center w-full h-screen">
      <div className="relative w-full h-full p-4 rounded-2xl overflow-hidden">
        <div className="relative flex justify-center items-center gap-4">
          {/* Previous Image */}
          <SlideImage
            src={slides[(curr - 1 + slides.length) % slides.length]}
            alt={`Previous Slide 1`}
            opacity="70"
            width={20}
          />

          {/* Current Image */}
          <SlideImage
            src={slides[curr]}
            alt={`Current Slide`}
            opacity="100"
            width={60}
          />

          {/* Next Image */}
          <SlideImage
            src={slides[(curr + 1) % slides.length]}
            alt={`Next Slide 1`}
            opacity="70"
            width={20}
          />

          {/* Like Button */}
          {/* <div className="absolute top-4 right-4 z-10">
            <button
              onClick={toggleLike}
              className="p-2 rounded-full bg-white/80 text-gray-800 hover:bg-white shadow-lg"
            >
              <Heart
                size={30}
                className={`text-red-500 ${liked ? "fill-red-500" : "fill-none"}`}
              />
            </button>
          </div> */}

          {/* User Profile Image */}
          {/* <div className="absolute top-4 left-4 z-10">
            <div className="flex items-center justify-center w-12 h-12 rounded-full overflow-hidden shadow-lg">
              <Image
                src={userImage}
                alt="User Profile"
                width={48}
                height={48}
                className="object-cover"
              />
            </div>
          </div> */}
        </div>
        {/* Navigation Buttons */}
        <div className="absolute inset-0 flex items-center justify-between p-4">
          <button
            onClick={prev}
            className="p-2 rounded-full bg-white/80 text-gray-800 hover:bg-white shadow-lg"
          >
            <ChevronLeft size={40} />
          </button>
          <button
            onClick={next}
            className="p-2 rounded-full bg-white/80 text-gray-800 hover:bg-white shadow-lg"
          >
            <ChevronRight size={40} />
          </button>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-4 right-0 left-0">
          <div className="flex items-center justify-center gap-2">
            {slides.map((_, i) => (
              <div
                key={i}
                className={`transition-all w-3 h-3 bg-white rounded-full ${
                  curr === i ? "p-2" : "bg-opacity-50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

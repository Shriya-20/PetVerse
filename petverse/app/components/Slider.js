"use client";

import { useState, useEffect } from "react";
import SlideImage from "./ImageComponent";
import NavigationButtons from "./NavigationButtons";
import SlideIndicators from "./SlideIndicators";
import defaultImage from "@/public/default_item.png";
import Image from "next/image";

export default function Slider({
  autoSlide = false,
  autoSlideInterval = 3000,
  slides,
}) {
  const [curr, setCurr] = useState(0);
  const [visibleImages, setVisibleImages] = useState(5); // Default: Show 5 images

  const prev = () =>
    setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1));
  const next = () =>
    setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1));

  // Handle window resize
  useEffect(() => {
    const updateVisibleImages = () => {
      const width = window.innerWidth;
      if (width >= 1200) setVisibleImages(5); // Large screens
      else if (width >= 768) setVisibleImages(3); // Medium screens
      else setVisibleImages(1); // Small screens
    };

    updateVisibleImages(); // Initial check
    window.addEventListener("resize", updateVisibleImages);
    return () => window.removeEventListener("resize", updateVisibleImages);
  }, []);

  useEffect(() => {
    if (!autoSlide) return;
    const slideInterval = setInterval(next, autoSlideInterval);
    return () => clearInterval(slideInterval);
  }, [autoSlide, autoSlideInterval]);

  // Handle left and right arrow key press events
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowLeft") {
        prev();
      } else if (event.key === "ArrowRight") {
        next();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []); // Empty dependency array to set up the listener only once

  console.log(slides);

  return (
    <div className="flex justify-center items-center w-full h-screen">
      <div className="relative w-full h-full p-4 rounded-2xl overflow-hidden">
        <div className="relative flex justify-center items-center gap-2">
          {Array.from({ length: visibleImages }).map((_, index) => {
            const position = curr + index - Math.floor(visibleImages / 2);
            const slideIndex = (position + slides.length) % slides.length;
            const currentWidth = window.innerWidth;

            // Calculate opacity and width based on the index position
            const isCurrent = index === Math.floor(visibleImages / 2);
            const isPrevious = index === Math.floor(visibleImages / 2) - 1;
            const isNext = index === Math.floor(visibleImages / 2) + 1;

            let opacity = "50"; // Default opacity for non-active images
            let width = 15; // Default width for non-active images

            if (isCurrent) {
              opacity = "100"; // Active image is fully visible
              width =
                currentWidth >= 768 ? (currentWidth >= 1200 ? 30 : 40) : 80; // Active image is larger
            } else if (isPrevious || isNext) {
              opacity = "70"; // Previous and next images are less visible
              width = 20; // Previous and next images are smaller
            }

            return (
              <SlideImage
                key={slides[slideIndex]._id}
                src={
                  slides[slideIndex]?.imageUrl === ""
                    ? defaultImage
                    : slides[slideIndex]?.imageUrl
                }
                alt={`Slide ${slideIndex}`}
                name={slides[slideIndex]?.pet_name}
                profileImage={slides[slideIndex]?.pet_profile_pic}
                description={slides[slideIndex]?.caption}
                opacity={opacity}
                width={width}
              />
            );
          })}
        </div>

        <NavigationButtons onPrev={prev} onNext={next} />
        <SlideIndicators slides={slides} currentIndex={curr} />
      </div>
    </div>
  );
}

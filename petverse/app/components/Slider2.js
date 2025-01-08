"use client";

import { useState, useEffect } from "react";
import SlideImage from "./ImageComponent";
import NavigationButtons from "./NavigationButtons";
import SlideIndicators from "./SlideIndicators";
import defaultImage from "@/public/default_item.png";
import default_pet_profile_pic from "@/public/default_pet_profile_pic1.png";

export default function Slider1({
  autoSlide = false,
  autoSlideInterval = 3000,
  petData,
  slides,
  currSlide,
}) {
  const [curr, setCurr] = useState(currSlide);
  const [visibleImages, setVisibleImages] = useState(5); // Default: Show 5 images
  const [profilePicture, setProfilePicture] = useState(default_pet_profile_pic);
  const [ifPrev, setIfPrev] = useState(true);
  const [ifNext, setIfNext] = useState(true);

  useEffect(() => {
    if (petData.profilePicture) {
      setProfilePicture(petData.profilePicture);
    }
  }, []);

  const prev = () => setCurr((curr) => (curr === 0 ? curr : curr - 1));

  const next = () =>
    setCurr((curr) => (curr === slides.length - 1 ? curr : curr + 1));

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

  // For auto scrolling
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

  // Navigation keys for the first and last posts
  useEffect(() => {
    setIfPrev(curr === 0 ? false : true);
    setIfNext(curr === slides.length - 1 ? false : true);
  }, [curr]);

  return (
    <div className="flex justify-center items-center w-full h-screen">
      <div className="relative flex flex-col justify-around w-full h-full p-4 rounded-2xl overflow-hidden">
        <div className="relative flex justify-center items-center gap-0 mx-4">
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

            if (position < 0 || position > slides.length - 1) {
              return <div key={index}></div>;
            }

            return (
              <SlideImage
                key={index}
                src={
                  slides[slideIndex]?.imageUrl === ""
                    ? defaultImage
                    : slides[slideIndex]?.imageUrl
                }
                alt={`Slide ${slideIndex}`}
                name={petData.name}
                profileImage={profilePicture}
                description={slides[slideIndex]?.caption}
                opacity={opacity}
                width={width}
              />
            );
          })}
        </div>

        <NavigationButtons
          onPrev={prev}
          onNext={next}
          ifPrev={ifPrev}
          ifNext={ifNext}
        />
        <SlideIndicators slides={slides} currentIndex={curr} />
      </div>
    </div>
  );
}

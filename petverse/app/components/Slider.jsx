"use client";

import { useState, useEffect } from "react";
import SlideImage from "./ImageComponent";
import NavigationButtons from "./NavigationButtons";
import SlideIndicators from "./SlideIndicators";

export default function Slider({ autoSlide = true, autoSlideInterval = 3000, slides }) {
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

  return (
    <div className="flex justify-center items-center w-full h-screen">
      <div className="relative w-full h-full p-4 rounded-2xl overflow-hidden">
        <div className="relative flex justify-center items-center gap-2">
          {Array.from({ length: visibleImages }).map((_, index) => {
            const position = curr + index - Math.floor(visibleImages / 2);
            const slideIndex = (position + slides.length) % slides.length;

            // Adjust opacity and width based on position
            const isCurrent = index === Math.floor(visibleImages / 2);
            const opacity = isCurrent ? "100" : isCurrent - 1 ? "70" : "50";
            const width = isCurrent ? 30 : isCurrent - 1 ? 20 : 15;

            return (
              <SlideImage
                key={slideIndex}
                src={slides[slideIndex].src}
                alt={`Slide ${slideIndex}`}
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

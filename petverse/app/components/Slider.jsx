// "use client";

// import { useState, useEffect } from "react";
// import { ChevronLeft, ChevronRight } from "react-feather"; // Chevron icons
// import Image from "next/image";

// // Image Component
// const SlideImage = ({ src, alt, opacity, width }) => (
//   <div className="flex-shrink-0" style={{ width: `${width}%` }}>
//     <Image
//       src={src}
//       alt={alt}
//       width={400}
//       height={250}
//       className={`w-full h-full object-cover rounded-lg opacity-${opacity}`}
//       priority
//     />
//   </div>
// );

// export default function Slider({
//   autoSlide = true,
//   autoSlideInterval = 3000,
//   slides,
// }) {
//   const [curr, setCurr] = useState(0);
//   const [visibleImages, setVisibleImages] = useState(5); // Default: Show 5 images

//   const prev = () =>
//     setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1));
//   const next = () =>
//     setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1));

//   // Handle window resize
//   useEffect(() => {
//     const updateVisibleImages = () => {
//       const width = window.innerWidth;
//       if (width >= 1200) setVisibleImages(5); // Large screens
//       else if (width >= 768) setVisibleImages(3); // Medium screens
//       else setVisibleImages(1); // Small screens
//     };

//     updateVisibleImages(); // Initial check
//     window.addEventListener("resize", updateVisibleImages);
//     return () => window.removeEventListener("resize", updateVisibleImages);
//   }, []);

//   useEffect(() => {
//     if (!autoSlide) return;
//     const slideInterval = setInterval(next, autoSlideInterval);
//     return () => clearInterval(slideInterval);
//   }, [autoSlide, autoSlideInterval]);

//   return (
//     <div className="flex justify-center items-center w-full h-screen">
//       <div className="relative w-full h-full p-4 rounded-2xl overflow-hidden">
//         <div className="relative flex justify-center items-center gap-2">
//           {/* Dynamically render visible images */}
//           {Array.from({ length: visibleImages }).map((_, index) => {
//             const position = curr + index - Math.floor(visibleImages / 2);
//             const slideIndex = (position + slides.length) % slides.length;

//             // Adjust opacity and width based on position
//             const isCurrent = index === Math.floor(visibleImages / 2);
//             const opacity = isCurrent ? "100" : isCurrent - 1 ? "70" : "50";
//             const width = isCurrent ? 30 : isCurrent - 1 ? 20 : 15;

//             return (
//               <SlideImage
//                 key={slideIndex}
//                 src={slides[slideIndex].src}
//                 alt={`Slide ${slideIndex}`}
//                 opacity={opacity}
//                 width={width}
//               />
//             );
//           })}
//         </div>

//         {/* Navigation Buttons */}
//         <div className="absolute inset-0 flex items-center justify-between p-4">
//           <button
//             onClick={prev}
//             className="p-2 rounded-full bg-white/80 text-gray-800 hover:bg-white shadow-lg"
//           >
//             <ChevronLeft size={40} />
//           </button>
//           <button
//             onClick={next}
//             className="p-2 rounded-full bg-white/80 text-gray-800 hover:bg-white shadow-lg"
//           >
//             <ChevronRight size={40} />
//           </button>
//         </div>

//         {/* Slide Indicators */}
//         <div className="absolute bottom-4 right-0 left-0">
//           <div className="flex items-center justify-center gap-2">
//             {slides.map((_, i) => (
//               <div
//                 key={i}
//                 className={`transition-all w-3 h-3 bg-white rounded-full ${
//                   curr === i ? "p-2" : "bg-opacity-50"
//                 }`}
//               />
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


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

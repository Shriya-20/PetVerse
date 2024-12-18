//"use client";

import { useState, useEffect } from "react";

export default function useScreenSize() {
  const [screenSize, setScreenSize] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => setScreenSize(window.innerWidth);
      handleResize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  return screenSize;
}

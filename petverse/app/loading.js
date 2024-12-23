"use client";

import loadingGIF from "@/public/loading.gif";
import darkLoadingGIF from "@/public/runningcat.gif";
import Image from "next/image";
import { useTheme } from "./components/Theme";
import { useEffect, useState } from "react";

export default function Loading() {
  const { theme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState("system");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const SystemDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      const resolvedTheme =
        theme === "system" ? (SystemDark ? "dark" : "light") : theme;
      setCurrentTheme(resolvedTheme);
    }
  }, [theme]);

  return (
    <>
      <div className="flex items-center justify-center dark:bg-black">
        <Image
          src={currentTheme === "dark" ? darkLoadingGIF : loadingGIF}
          alt="loading gif"
          priority={true}
        />
      </div>
    </>
  );
}

// import { PulseLoader } from "react-spinners";

// function Loading() {
//   return (
//     <div
//       style={{
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         height: '100vh'
//       }}
//     >
//       <PulseLoader
//         color="#0abfad"
//         margin={1}
//         size={27}
//         speedMultiplier={2}
//       />
//     </div>
//   );
// }

// export default Loading;

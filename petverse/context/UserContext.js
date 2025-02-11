"use client";

import { createContext, useState, useEffect, useContext } from "react";
import { usePathname, useRouter } from "next/navigation";
import loadingGIF from "../public/loading.gif";
import darkLoadingGIF from "../public/runningcat.gif";
import Image from "next/image";
import { useTheme } from "@/app/components/Theme";

const UserContext = createContext();

export function Userprovider({ children }) {
  const [isLoading, setLoading] = useState(true);
  const [user, setUser] = useState();
  const router = useRouter();
  const { theme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState("system");
  const path = usePathname();

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

  useEffect(() => {
    async function fetchSession() {
      try {
        // Get user data
        const response = await fetch("/api/session", {
          credentials: "include",
        });
        const userData = await response.json();
        if (!response.ok) {
          throw error;
        }
        setUser(userData);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    fetchSession();

    const interval = setInterval(fetchSession, 10000);

    return () => clearInterval(interval);
  }, []);

  // Redirect if session has expired
  useEffect(() => {
    if (!isLoading && user === null) {
      router.push("/auth/login");
    }
  }, [user, isLoading, router]);

  if ((isLoading || user === null) && !path.includes("/auth")) {
    return (
      <>
        <div className="flex items-center justify-center bg-black h-full">
          <Image
            //src={currentTheme === "dark" ? darkLoadingGIF : loadingGIF}
            src={darkLoadingGIF}
            alt="loading gif"
            priority={true}
          />
        </div>
      </>
    );
  }

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}

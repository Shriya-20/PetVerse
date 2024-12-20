"use client";
import { createContext, useContext, useState, useEffect } from "react";

// Create a context to manage theme globally
const ThemeContext = createContext();

export default function Theme({ children }) {
  const [theme, setTheme] = useState("system");

  // Apply theme to the document
  const applyTheme = (mode) => {
    document.documentElement.classList.remove("dark", "light");

    if (mode === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.style.setProperty("--background", "#18202f");
      document.documentElement.style.setProperty("--foreground", "#ededed");
    } else if (mode === "light") {
      document.documentElement.classList.add("light");
      document.documentElement.style.setProperty("--background", "#ffffff");
      document.documentElement.style.setProperty("--foreground", "#171717");
    } else {
      const systemDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      if (systemDark) {
        document.documentElement.classList.add("dark");
        document.documentElement.style.setProperty("--background", "#18202f");
        document.documentElement.style.setProperty("--foreground", "#ededed");
      } else {
        document.documentElement.classList.add("light");
        document.documentElement.style.setProperty("--background", "#ffffff");
        document.documentElement.style.setProperty("--foreground", "#171717");
      }
    }
  };

  // On initial load, get the stored theme or default to "system"
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") || "system";
    setTheme(storedTheme);
    applyTheme(storedTheme);

    // Listen for system theme changes if the theme is set to "system"
    if (storedTheme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = (e) => {
        applyTheme(e.matches ? "dark" : "light");
      };

      // Attach event listener for system theme changes
      mediaQuery.addEventListener("change", handleChange);

      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, []);

  // Whenever the theme is updated, store it in localStorage
  useEffect(() => {
    if (theme !== "system") {
      localStorage.setItem("theme", theme);
      applyTheme(theme);
    }
  }, [theme]);

  const setMode = (mode) => {
    setTheme(mode);
    localStorage.setItem("theme", mode);
    applyTheme(mode);
  };

  return (
    <ThemeContext.Provider value={{ theme, setMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook to access theme state and setMode function
export const useTheme = () => useContext(ThemeContext);

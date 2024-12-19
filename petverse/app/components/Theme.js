"use client";
import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export default function Theme({ children }) {
  const [theme, setTheme] = useState("system");

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") || "system";
    setTheme(storedTheme);
    applyTheme(storedTheme);
  }, []);

  const applyTheme = (mode) => {
    document.documentElement.classList.remove("dark", "light");

    if (mode === "dark") {
      document.documentElement.classList.add("dark");
    } else if (mode === "light") {
      document.documentElement.classList.add("light");
    } else {
      const systemDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      if (systemDark) {
        document.documentElement.classList.add("dark");
      }
    }
  };

  const setMode = (mode) => {
    setTheme(mode);
    localStorage.setItem("theme", mode);
    applyTheme(mode);
    console.log(`Theme is set to ${mode}`);
  };

  return (
    <ThemeContext.Provider value={{ theme, setMode }}>
      <div className="my-4 mx-2 theme ">
        <label>
          <input
            type="radio"
            name="theme"
            value="light"
            checked={theme === "light"}
            onChange={() => setMode("light")}
            className="theme-input"
          />
          <span className="theme-span">light</span>
        </label>
        <label>
          <input
            type="radio"
            name="theme"
            value="dark"
            checked={theme === "dark"}
            onChange={() => setMode("dark")}
            className="theme-input"
          />
          <span className="theme-span">dark</span>
        </label>
        <label>
          <input
            type="radio"
            name="theme"
            value="system"
            checked={theme === "system"}
            onChange={() => setMode("system")}
            className="theme-input"
          />
          <span className="theme-span">System</span>
        </label>
      </div>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);

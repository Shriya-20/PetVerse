"use client";

import { useTheme } from "./Theme";

export default function ThemeUI() {
  const { theme, setMode } = useTheme();

  return (
    <>
      <div className="my-4 mx-2 theme">
        <label>
          <input
            type="radio"
            name="theme"
            value="light"
            checked={theme === "light"}
            onChange={() => setMode("light")}
          />
          <span>Light</span>
        </label>
        <label>
          <input
            type="radio"
            name="theme"
            value="dark"
            checked={theme === "dark"}
            onChange={() => setMode("dark")}
          />
          <span>Dark</span>
        </label>
        <label>
          <input
            type="radio"
            name="theme"
            value="system"
            checked={theme === "system"}
            onChange={() => setMode("system")}
          />
          <span>System</span>
        </label>
      </div>
    </>
  );
}

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        customTeal: "#03c1b4",
        customBg: "#f3f4f6",
        textLighter: "white",
        textLight: "#e5e7eb", // gray-200
        textMid: "#9ca3af", // gray-400
        textDark: "#4b5563", // gray-600
        textDarker: "black",
        dark1: "#18202f", // gray-900 with opacity 0.3
        dark2: "#111827", // gray-900
        light1: "white", //
        light2: "#e5e7eb", // gray-200
        mid1: "#e5e7eb", // gray-400
        mid2: "#4b5563", // gray-600
        mid3: "#374151", // gray-700
        mid4: "#1f2937", // gray 800
      },
    },
  },
  plugins: [
  ],
};

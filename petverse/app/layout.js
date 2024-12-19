import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Theme from "./components/Theme";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Petverse",
  description: "A buy/sell social media app for pets ",
};

export default function RootLayout({ children }) {
  return (
    <>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased dark:bg-dark1`}
        >
          {children}
        </body>
      </html>
    </>
  );
}

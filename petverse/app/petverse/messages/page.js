"use client";

import { useState, useEffect } from "react";
import useScreenSize from "@/app/components/Screensize";
import ChatWindow from "@/app/components/ChatWindow";
import ChatList from "@/app/components/ChatList";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import loadingGIF from "@/public/loading.gif";
import darkLoadingGIF from "@/public/runningcat.gif";
import Image from "next/image";
import { useTheme } from "@/app/components/Theme";

export default function Messages() {
  const [activeChat, setActiveChat] = useState(1);
  const [chatOpen, setChatOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeChatData, setActiveChatData] = useState({});
  const [chats, setChats] = useState([]);
  const screenSize = useScreenSize();
  const { user } = useUser();
  const router = useRouter();

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

  useEffect(() => {
    async function initialize() {
      if (user === undefined) {
        return;
      }
      if (!user) {
        router.push("/auth/login");
        return;
      }

      try {
        const response = await fetch("/api/messages/list", {
          method: "POST",
          body: JSON.stringify({ userId: user.id }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch chats");
        }

        const data = await response.json();
        const chatArray = data
          ? Object.entries(data).map(([id, value]) => ({ id, ...value }))
          : [];
        setChats(chatArray);
      } catch (error) {
        console.error("Error fetching chats:", error);
      } finally {
        setIsLoading(false);
      }
    }

    initialize();
  }, [user, router]);

  if (isLoading || user === undefined) {
    return (
      <div>
        <div className="flex items-center justify-center dark:bg-black h-full">
          <Image
            src={currentTheme === "dark" ? darkLoadingGIF : loadingGIF}
            alt="loading gif"
            priority={true}
          />
        </div>
      </div>
    );
  }

  const activeMessages =
    chats.find((chat) => chat.id === activeChat)?.messages || [];

  return (
    <div className="flex  h-screen bg-gray-50 dark:bg-dark1 overflow-y-hidden pb-12 sm:pb-0">
      {/* For larger screens */}
      {screenSize >= 768 && (
        <>
          {/* User List */}
          <div className="md:w-2/6 bg-light1 dark:bg-dark1  flex flex-col">
            <ChatList
              chats={chats}
              activeChat={activeChat}
              setActiveChatData={setActiveChatData}
              setActiveChat={setActiveChat}
              setChatOpen={setChatOpen}
            />
          </div>
          <div className="flex md:w-full flex-col overflow-y-hidden bottom-0 dark:bg-dark2">
            <ChatWindow
              activeChat={activeChat}
              activeChatData={activeChatData}
              activeMessages={activeMessages}
              chatOpen={chatOpen}
              isSmallScreen={false}
              setChatOpen={setChatOpen}
            />
          </div>
          {/* Chat Window */}
        </>
      )}

      {/* For smaller screens */}
      {screenSize < 768 && (
        <>
          {/* User List */}
          {!chatOpen && (
            <div
              className={` w-full bg-light1 dark:bg-dark1 border-r flex flex-col`}
            >
              <ChatList
                chats={chats}
                activeChat={activeChat}
                setActiveChatData={setActiveChatData}
                setActiveChat={setActiveChat}
                setChatOpen={setChatOpen}
              />
            </div>
          )}

          {/* Chat Window */}
          {chatOpen && (
            <div
              className={` w-full flex flex-grow flex-col overflow-y-auto bottom-0  dark:bg-dark2`}
            >
              <ChatWindow
                activeChat={activeChat}
                activeChatData={activeChatData}
                activeMessages={activeMessages}
                chatOpen={chatOpen}
                isSmallScreen={true}
                setChatOpen={setChatOpen}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}

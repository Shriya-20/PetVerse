"use client";

import { useState, useEffect } from "react";
import useScreenSize from "@/app/components/Screensize";
import ChatWindow from "@/app/components/ChatWindow";
import ChatList from "@/app/components/ChatList";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import chats from "@/test_data/chats";

export default function Messages() {
  const [activeChat, setActiveChat] = useState(1);
  const [chatOpen, setChatOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const screenSize = useScreenSize();
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user === undefined) {
      return;
    }
    if (!user) {
      router.push("/auth/login");
    } else {
      setIsLoading(false);
    }
  }, [user, router]);

  if (isLoading) {
    return <div>Loading</div>;
  }

  const activeMessages =
    chats.find((chat) => chat.id === activeChat)?.messages || [];

  return (
    <div className="flex  h-screen bg-gray-50 dark:bg-dark1 overflow-y-hidden">
      {/* For larger screens */}
      {screenSize >= 768 && (
        <>
          {/* User List */}
          <div className="md:w-2/6 bg-light1 dark:bg-dark1  flex flex-col">
            <ChatList
              activeChat={activeChat}
              setActiveChat={setActiveChat}
              setChatOpen={setChatOpen}
            />
          </div>
          <div className="flex md:w-full flex-col overflow-y-hidden bottom-0 dark:bg-dark2">
            <ChatWindow
              chats={chats}
              activeChat={activeChat}
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
                chats={chats}
                activeChat={activeChat}
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

"use client";

import { useState } from "react";
import useScreenSize from "@/app/components/Screensize";
import chats from "@/test_data/chats";
import ChatWindow from "@/app/components/ChatWindow";
import ChatList from "@/app/components/ChatList";

export default function Messages() {
  const [activeChat, setActiveChat] = useState(1);
  const [chatOpen, setChatOpen] = useState(false);
  const screenSize = useScreenSize();

  const activeMessages =
    chats.find((chat) => chat.id === activeChat)?.messages || [];

  return (
    <div className="flex  h-screen bg-gray-100 overflow-y-hidden">
      {/* For larger screens */}
      {screenSize >= 768 && (
        <>
          {/* User List */}
          <div className="md:w-2/6 bg-white border-r flex flex-col">
            <ChatList
              chats={chats}
              activeChat={activeChat}
              setActiveChat={setActiveChat}
              setChatOpen={setChatOpen}
            />
          </div>
          <div className="flex md:w-full flex-col overflow-y-hidden bottom-0">
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
            <div className={` w-full bg-white border-r flex flex-col`}>
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
              className={` w-full flex flex-grow flex-col overflow-y-auto bottom-0`}
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

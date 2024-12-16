"use client";

import React, { useState } from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import useScreenSize from "@/app/components/Screensize";

export default function Messages() {
  const [activeChat, setActiveChat] = useState(1);
  const [chatOpen, setChatOpen] = useState(false);
  const screenSize = useScreenSize();

  const chats = [
    {
      id: 199,
      name: "X_AE_A-13b",
      lastMessage: "Hey man!",
      timestamp: "12:25",
      unread: 12,
      messages: [
        { id: 1, sender: "them", content: "Hey man!", timestamp: "10:25" },
        {
          id: 2,
          sender: "me",
          content:
            "Hey, what's up? How are you doing, my friend? It's been a while 😄",
          timestamp: "11:25",
        },
        {
          id: 3,
          sender: "them",
          content: "Have you seen the latest holographic display technology?",
          timestamp: "12:25",
          type: "video",
          videoUrl: "https://via.placeholder.com/400x200",
        },
        {
          id: 4,
          sender: "them",
          content:
            "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.",
          timestamp: "02:25",
        },
        {
          id: 5,
          sender: "me",
          content: "External Link Title",
          link: "https://www.externallink.com",
          timestamp: "03:25",
        },
      ],
    },
    {
      id: 10,
      name: "X_AE_A-13b",
      lastMessage: "Hey man!",
      timestamp: "12:25",
      unread: 12,
      messages: [
        { id: 1, sender: "them", content: "Hey man!", timestamp: "10:25" },
        {
          id: 2,
          sender: "me",
          content:
            "Hey, what's up? How are you doing, my friend? It's been a while 😄",
          timestamp: "11:25",
        },
        {
          id: 3,
          sender: "them",
          content: "Have you seen the latest holographic display technology?",
          timestamp: "12:25",
          type: "video",
          videoUrl: "https://via.placeholder.com/400x200",
        },
        {
          id: 4,
          sender: "them",
          content:
            "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.",
          timestamp: "02:25",
        },
        {
          id: 5,
          sender: "me",
          content: "External Link Title",
          link: "https://www.externallink.com",
          timestamp: "03:25",
        },
      ],
    },
    {
      id: 9,
      name: "X_AE_A-13b",
      lastMessage: "Hey man!",
      timestamp: "12:25",
      unread: 12,
      messages: [
        { id: 1, sender: "them", content: "Hey man!", timestamp: "10:25" },
        {
          id: 2,
          sender: "me",
          content:
            "Hey, what's up? How are you doing, my friend? It's been a while 😄",
          timestamp: "11:25",
        },
        {
          id: 3,
          sender: "them",
          content: "Have you seen the latest holographic display technology?",
          timestamp: "12:25",
          type: "video",
          videoUrl: "https://via.placeholder.com/400x200",
        },
        {
          id: 4,
          sender: "them",
          content:
            "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.",
          timestamp: "02:25",
        },
        {
          id: 5,
          sender: "me",
          content: "External Link Title",
          link: "https://www.externallink.com",
          timestamp: "03:25",
        },
      ],
    },
    {
      id: 2,
      name: "Jerome White",
      lastMessage: "Enter your message description here...",
      timestamp: "12:25",
      unread: 0,
    },
    {
      id: 73,
      name: "Madagascar Silver",
      lastMessage: "Enter your message description here...",
      timestamp: "12:25",
      unread: 999,
    },
    {
      id: 62,
      name: "Jerome White",
      lastMessage: "Enter your message description here...",
      timestamp: "12:25",
      unread: 0,
    },
    {
      id: 443,
      name: "Madagascar Silver",
      lastMessage: "Enter your message description here...",
      timestamp: "12:25",
      unread: 999,
    },
    {
      id: 42,
      name: "Jerome White",
      lastMessage: "Enter your message description here...",
      timestamp: "12:25",
      unread: 0,
    },
    {
      id: 33,
      name: "Madagascar Silver",
      lastMessage: "Enter your message description here...",
      timestamp: "12:25",
      unread: 999,
    },
    {
      id: 22,
      name: "Jerome White",
      lastMessage: "Enter your message description here...",
      timestamp: "12:25",
      unread: 0,
    },
    {
      id: 13,
      name: "Madagascar Silver",
      lastMessage: "Enter your message description here...",
      timestamp: "12:25",
      unread: 999,
    },
  ];

  const activeMessages =
    chats.find((chat) => chat.id === activeChat)?.messages || [];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* For larger screens */}
      {screenSize >= 768 && (
        <>
          <div
            className={`
        md:w-1/4 bg-white border-r overflow-y-auto`}
          >
            <div className="p-4 sticky top-0 bg-white border-b-2">
              <h1 className="text-xl font-bold text-gray-800 z-50 bg-white">
                Messages
              </h1>
            </div>
            <div className="divide-y">
              {chats.map((chat) => (
                <div
                  key={chat.id}
                  className={`flex items-center p-4 cursor-pointer ${
                    chat.id === activeChat ? "bg-blue-100" : "hover:bg-gray-200"
                  }`}
                  onClick={() => {
                    setActiveChat(chat.id);
                  }}
                >
                  <div className="flex-1">
                    <h2 className="font-semibold text-gray-800">{chat.name}</h2>
                    <p className="text-sm text-gray-600 truncate">
                      {chat.lastMessage}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">{chat.timestamp}</p>
                    {chat.unread > 0 && (
                      <span className="text-xs bg-customTeal text-white rounded-full px-2 py-1">
                        {chat.unread}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div
            className={`md:w-3/4 md:block flex flex-grow flex-col overflow-y-auto bottom-0`}
          >
            <div className="sticky top-0 flex items-center justify-between bg-white p-4 border-b  z-50">
              <h2 className="font-bold text-gray-800">
                {chats.find((chat) => chat.id === activeChat)?.name ||
                  "Select a chat"}
              </h2>
              <p className="text-sm text-gray-500">Last seen 7h ago</p>
            </div>

            <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
              {activeMessages.map((message) => (
                <div
                  key={message.id}
                  className={`mb-4 ${
                    message.sender === "me" ? "text-right" : "text-left"
                  }`}
                >
                  <div
                    className={`inline-block p-3 rounded-lg  ${
                      message.sender === "me"
                        ? "bg-customTeal text-white"
                        : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    {message.type === "video" ? (
                      <div>
                        <video
                          controls
                          className="rounded-md border border-gray-300 w-full max-w-xs"
                        >
                          <source src={message.videoUrl} type="video/mp4" />
                          Your browser does not support videos.
                        </video>
                      </div>
                    ) : message.link ? (
                      <a
                        href={message.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-300 underline"
                      >
                        {message.content}
                      </a>
                    ) : (
                      message.content
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {message.timestamp}
                  </p>
                </div>
              ))}
            </div>

            <div className="p-4 bg-white border-t z-50 sticky bottom-0">
              <input
                type="text"
                placeholder="Type a message..."
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:bg-white"
              />
            </div>
          </div>
        </>
      )}

      {screenSize < 768 && (
        <>
          {!chatOpen && (
            <div className={` w-full bg-white border-r overflow-y-auto`}>
              <div className="p-4 sticky top-0 bg-white border-b-2">
                <h1 className="text-xl font-bold text-gray-800 z-50 bg-white">
                  Messages
                </h1>
              </div>
              <div className="divide-y">
                {chats.map((chat) => (
                  <div
                    key={chat.id}
                    className={`flex items-center p-4 cursor-pointer ${
                      chat.id === activeChat
                        ? "bg-blue-100"
                        : "hover:bg-gray-200"
                    }`}
                    onClick={() => {
                      setActiveChat(chat.id);
                      setChatOpen(true);
                    }}
                  >
                    <div className="flex-1">
                      <h2 className="font-semibold text-gray-800">
                        {chat.name}
                      </h2>
                      <p className="text-sm text-gray-600 truncate">
                        {chat.lastMessage}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">{chat.timestamp}</p>
                      {chat.unread > 0 && (
                        <span className="text-xs bg-customTeal text-white rounded-full px-2 py-1">
                          {chat.unread}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {chatOpen && (
            <div
              className={` w-full flex flex-grow flex-col overflow-y-auto bottom-0`}
            >
              <div className="sticky top-0 flex items-center justify-between bg-white p-4 border-b  z-50">
                <ArrowLeftIcon
                  className="w-5 hover:bg-slate-50 rounded-full hover:text-customTeal"
                  onClick={() => setChatOpen(false)}
                />
                <h2 className="font-bold text-gray-800">
                  {chats.find((chat) => chat.id === activeChat)?.name ||
                    "Select a chat"}
                </h2>
                <p className="text-sm text-gray-500">Last seen 7h ago</p>
              </div>

              <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
                {activeMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`mb-4 ${
                      message.sender === "me" ? "text-right" : "text-left"
                    }`}
                  >
                    <div
                      className={`inline-block p-3 rounded-lg  ${
                        message.sender === "me"
                          ? "bg-customTeal text-white"
                          : "bg-gray-200 text-gray-800"
                      }`}
                    >
                      {message.type === "video" ? (
                        <div>
                          <video
                            controls
                            className="rounded-md border border-gray-300 w-full max-w-xs"
                          >
                            <source src={message.videoUrl} type="video/mp4" />
                            Your browser does not support videos.
                          </video>
                        </div>
                      ) : message.link ? (
                        <a
                          href={message.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-300 underline"
                        >
                          {message.content}
                        </a>
                      ) : (
                        message.content
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {message.timestamp}
                    </p>
                  </div>
                ))}
              </div>

              <div className="p-4 bg-white border-t z-50 sticky bottom-0">
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:bg-white"
                />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

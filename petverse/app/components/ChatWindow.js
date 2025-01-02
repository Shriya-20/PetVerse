"use client";

import ChatMessage from "./ChatMessage";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import ProfileIcon from "./ProfileIcon";
import default_profile_pic from "@/public/default_user_profile_pic.jpeg";
import { useUser } from "@/context/UserContext";
import { useState, useEffect, useRef } from "react";
import {
  serverTimestamp,
  ref,
  onValue,
  getDatabase,
  off,
} from "firebase/database";
import { database } from "../_backend/firebaseConfig";

export default function ChatWindow({
  activeChat,
  activeChatData,
  activeMessages,
  chatOpen,
  isSmallScreen,
  setChatOpen,
}) {
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const { user } = useUser();
  const userId = user.id;
  const chatEndRef = useRef(null);

  console.log(activeChat);

  useEffect(() => {
    const messagesRef = ref(
      database,
      `messages/${[activeChat, userId].sort().join("_")}`
    );

    onValue(messagesRef, (snapshot) => {
      console.log(snapshot.val());
      const data = snapshot.val();
      if (!data) {
        setChatMessages([]);
        return;
      }

      const messages = Object.entries(data).map(([id, message]) => ({
        id,
        ...message,
      }));
      setChatMessages(messages);
    });
    return () => {
      off(messagesRef);
    };
  }, [activeChat, userId]);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages]);

  async function HandleSendMessage() {
    if (!message.trim()) return;
    try {
      const response = await fetch("/api/messages/send", {
        method: "POST",
        body: JSON.stringify({ userId, activeChat, message }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      const newMessage = {
        id: Date.now().toString(),
        sender: userId,
        content: message,
        timestamp: new Date().toLocaleTimeString(),
      };

      setChatMessages((prev) => [...prev, newMessage]);
      setMessage(""); // Clear input
      console.log("Message sent successfully");
    } catch (error) {
      console.log("Failed to send message");
      console.log(error);
    }
  }

  const convertTimeStampToTime = (serverTimestamp) => {
    const date = new Date(serverTimestamp);

    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    return `${hours}:${minutes}`;
  };

  return (
    <>
      {chatOpen && (
        <>
          {/* Chat header */}
          <div className="sticky p-2 top-0 flex items-center bg-light1 dark:bg-dark1 shadow-md dark:border-0 z-50">
            {chatOpen && isSmallScreen && (
              <ArrowLeftIcon
                className="w-5 hover:bg-slate-50 dark:hover:bg-mid4 rounded-full hover:text-customTeal flex-shrink-0"
                onClick={() => setChatOpen(false)}
              />
            )}
            <div className="flex items-center flex-grow overflow-hidden sm:ml-0 md:ml-2">
              <div className="flex-shrink-0 w-12 h-12">
                <ProfileIcon
                  profile_pic={
                    activeChatData.profile_picture
                      ? activeChatData.profile_picture
                      : default_profile_pic
                  }
                  width="w-12"
                  height="h-12"
                  custom_style="mx-2"
                />
              </div>
              <p className="font-bold text-base md:text-lg text-textDarker dark:text-textLight truncate pl-5">
                {activeChatData.name}
              </p>
            </div>
            <p className="text-sm text-textDark dark:text-textLight text-right whitespace-nowrap pl-2 flex-shrink-0">
              {isSmallScreen
                ? activeChatData.lastseen
                  ? activeChatData.lastseen
                  : ""
                : activeChatData.lastseen
                ? "Last seen " + activeChatData.lastseen
                : ""}
            </p>
          </div>

          {/* Chat messages */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50 dark:bg-dark2">
            {chatMessages.map((msg, index) => (
              <div
                key={msg.id || index}
                className={`mb-4 ${
                  msg.sender === userId ? "text-right" : "text-left"
                }`}
                ref={chatEndRef}
              >
                <div
                  className={`inline-block p-3 rounded-lg break-words ${
                    msg.sender === userId
                      ? "bg-customTeal text-textLighter dark:bg-customTeal dark:text-textLighter"
                      : "bg-light1 text-textDarker dark:bg-dark1 dark:text-textLight"
                  }`}
                  style={{ maxWidth: "75%" }}
                >
                  {msg.content}
                </div>
                <p className="text-xs text-textDark mt-1">
                  {convertTimeStampToTime(msg.timestamp)}
                </p>
              </div>
            ))}
          </div>

          {/* Send Message */}
          <div className="mx-4 mb-3 bg-light1 dark:bg-dark1 z-50 sticky bottom-0">
            <div className="relative">
              <input
                type="text"
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full p-3 pr-12 border rounded-2xl focus:outline-none focus:ring-2 focus:bg-light1 dark:bg-dark2 dark:focus:bg-mid4"
              />
              <button
                className="absolute inset-y-0 right-3 flex items-center"
                onClick={HandleSendMessage}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="w-6 h-6 text-customTeal hover:text-teal-700"
                >
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                </svg>
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}

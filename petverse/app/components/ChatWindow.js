"use client";

import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import ProfileIcon from "./ProfileIcon";
import default_profile_pic from "@/public/default_user_profile_pic.jpeg";
import { useUser } from "@/context/UserContext";
import { useState, useEffect, useRef } from "react";
import { ref, onValue, off, push } from "firebase/database";
import { database } from "../_backend/firebaseConfig";
import { Picker } from "emoji-mart";
import { Data } from "emoji-mart";
import EmojiPicker from "emoji-picker-react";
import {
  Popover,
  PopoverHandler,
  PopoverContent,
} from "@material-tailwind/react";

export default function ChatWindow({
  activeChat,
  activeChatData,
  chatOpen,
  isSmallScreen,
  setChatOpen,
}) {
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const { user } = useUser();
  const [isEmojiPickerVisible, setIsEmojiPickerVisible] = useState(false);
  const userId = user.id;
  const chatEndRef = useRef(null);
  const addImageRef = useRef();
  const addFileRef = useRef();

  useEffect(() => {
    const messagesRef = ref(
      database,
      `messages/${[activeChat, userId].sort().join("_")}`
    );

    onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      if (!data) {
        setChatMessages([]);
        return;
      }

      const messages = Object.entries(data)
        .map(([id, message]) => ({
          id,
          ...message,
        }))
        .filter((message) => message.timestamp);
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
    console.log(message);
    console.log(typeof message);
    if (typeof message !== "string") {
      return;
    }
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

      setMessage("");
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  }

  const convertTimeStampToTime = (serverTimestamp) => {
    if (!serverTimestamp) return "Invalid time";
    const date = new Date(serverTimestamp);

    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    return `${hours}:${minutes}`;
  };

  const formatDate = (timestamp) => {
    const messageDate = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    if (messageDate.toDateString() === today.toDateString()) {
      return "Today";
    }
    if (messageDate.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    }
    const options = { year: "numeric", month: "long", day: "numeric" };
    return messageDate.toLocaleDateString("en-US", options);
  };

  const groupMessagesByDate = (messages) => {
    let groupedMessages = [];
    let currentDate = "";

    messages.forEach((message, index) => {
      const messageDate = formatDate(message.timestamp);

      if (messageDate !== currentDate) {
        currentDate = messageDate;
        groupedMessages.push({
          date: currentDate,
          messages: [message],
        });
      } else {
        groupedMessages[groupedMessages.length - 1].messages.push(message);
      }
    });

    return groupedMessages;
  };

  const handleOpenEmoji = () => {
    try {
      setIsEmojiPickerVisible((prev) => !prev);
    } catch (error) {
      console.log(error);
      alert("This app dosent support emojis yet");
    }
  };

  const handleUploadDocument = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("Selected file", file);
      alert("App dosent support sending files and images yet");
      return;
      setMessage(file);
    }
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
              <p className="font-bold text-base md:text-lg text-textDarker dark:text-textLight truncate pl-5">
                {activeChatData.name}
              </p>
            </div>
          </div>

          {/* Chat messages */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50 dark:bg-dark2">
            {groupMessagesByDate(chatMessages).map((group, index) => (
              <div key={index}>
                <p className="text-center text-sm text-gray-500">
                  {group.date}
                </p>

                {group.messages.map((msg, index) => (
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
                onKeyDown={(e) => {
                  if (e.key === "Enter" && message.trim()) {
                    HandleSendMessage();
                  }
                }}
                className="w-full p-3 pr-12 pl-16 border rounded-2xl focus:outline-none focus:ring-2 focus:bg-light1 dark:bg-dark2 dark:focus:bg-mid4"
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

              <Popover
                placement="top"
                className="absolute inset-y-0 left-3 fle items-center"
              >
                <PopoverHandler>
                  <button className="absolute inset-y-0 left-3 fle items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      className="w-6 h-6 text-textLight hover:text-gray-400"
                    >
                      <path d="M16.5 6.75v7.25c0 3.04-2.46 5.5-5.5 5.5s-5.5-2.46-5.5-5.5V6.75a4.75 4.75 0 0 1 9.5 0v7.25a2.75 2.75 0 0 1-5.5 0V6.75h-1.5v7.25c0 2.47 2.02 4.5 4.5 4.5s4.5-2.03 4.5-4.5V6.75a6.25 6.25 0 0 0-12.5 0v7.25c0 3.87 3.13 7 7 7s7-3.13 7-7V6.75h-1.5z" />
                    </svg>
                  </button>
                </PopoverHandler>
                <PopoverContent className="bg-dark1 h-[76] w-28 mt-3 p-0">
                  <button
                    className="w-full block p-2 hover:bg-gray-700 hover:text-customTeal rounded-lg"
                    onClick={() => addImageRef.current.click()}
                  >
                    Add Image
                  </button>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleUploadDocument}
                    ref={addImageRef}
                  />
                  <hr></hr>
                  <button
                    className="w-full block p-2 hover:bg-gray-700 rounded-lg hover:text-customTeal"
                    onClick={() => addFileRef.current.click()}
                  >
                    Add File
                  </button>
                  <input
                    type="file"
                    className="hidden"
                    ref={addFileRef}
                    onChange={handleUploadDocument}
                  />
                </PopoverContent>
              </Popover>
              <button
                className="absolute inset-y-0 left-9 fle items-center"
                onClick={handleOpenEmoji}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="w-6 h-6 text-textLight hover:text-gray-400"
                >
                  <path d="M12 2a10 10 0 1 0 10 10A10.01 10.01 0 0 0 12 2zm-3.5 8.25a1.25 1.25 0 1 1-1.25 1.25A1.26 1.26 0 0 1 8.5 10.25zm7 0a1.25 1.25 0 1 1-1.25 1.25A1.26 1.26 0 0 1 15.5 10.25zm-7.88 5.56a4.73 4.73 0 0 1 7.76 0l1.15-.8a6.23 6.23 0 0 0-10.06 0z" />
                </svg>
              </button>
              {isEmojiPickerVisible && (
                <div className="absolute bottom-12 left-0 z-50">
                  <EmojiPicker
                    onEmojiClick={(emoji) => {
                      console.log(emoji);
                      setMessage((prevMessage) => prevMessage + emoji.emoji);
                      setIsEmojiPickerVisible(false);
                    }}
                    theme="auto"
                    emojiStyle="apple"
                    width="200"
                  />
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}

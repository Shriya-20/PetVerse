"use client";

import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import ProfileIcon from "./ProfileIcon";
import default_profile_pic from "@/public/default_user_profile_pic.jpeg";
import { useUser } from "@/context/UserContext";
import { useState, useEffect, useRef } from "react";
import { ref, onValue, off, update } from "firebase/database";
import { database } from "../_backend/firebaseConfig";
import ChatMessage from "./ChatMessage";
import EmojiPicker from "emoji-picker-react";
import { uploadImageToServer } from "../actions";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChevronDown } from "react-feather";

export default function ChatWindow({
  activeChat,
  activeChatData,
  chatOpen,
  isSmallScreen,
  setChatOpen,
}) {
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [isEmojiPickerVisible, setIsEmojiPickerVisible] = useState(false);
  const [isFileOpen, setIsFileOpen] = useState(false);
  const [mediaType, setMediaType] = useState(null);
  const [mediaSrc, setMediaSrc] = useState(null);
  const [mediaBuffer, setMediaBuffer] = useState(null);
  const [openedMedia, setOpenedMedia] = useState(null);
  const [openedMediaType, setOpenedMediaType] = useState(null);
  const { user } = useUser();
  const userId = user.id;
  const addImageRef = useRef();
  const scrollRef = useRef(null);
  const prevScrollPosition = useRef(0);
  const [scrollDown, setScrollDown] = useState(false);

  // Retrieve user chats

  // to make sure that unread message dosent increase when user is
  // viewing the chat

  update(ref(database, `chats/${userId}/${activeChat}`), {
    unread_messages: null,
  });

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

  // For the view to be adjusted to show the latest messages

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "auto",
      });
      // scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatMessages, scrollDown]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: prevScrollPosition.current,
        behavior: "auto",
      });
      // scrollRef.current.scrollTop = prevScrollPosition.current;
    }
  }, [openedMedia]);

  const handleScroll = () => {
    if (scrollRef.current) {
      prevScrollPosition.current = scrollRef.current.scrollTop;
    }
  };

  // Send Message
  async function HandleSendMessage(type) {
    if (type !== "") {
      try {
        // Upload to firebase storeage
        const timestamp = new Date();
        const path = `messages/${[activeChat, userId]
          .sort()
          .join("_")}/file_${timestamp}.jpg`;
        const imageUrl = await uploadImageToServer(mediaBuffer, path, type);

        const response = await fetch("/api/messages/send", {
          method: "POST",
          body: JSON.stringify({ userId, activeChat, message: imageUrl, type }),
        });
        if (!response.ok) {
          throw new Error("Failed to send image");
        }

        console.log("Sent successfully");
        setIsFileOpen(false);
        return;
      } catch (error) {
        console.log(error);
        console.log("Failed to send file");
        return;
      }
    }
    if (!message.trim()) return;

    try {
      const response = await fetch("/api/messages/send", {
        method: "POST",
        body: JSON.stringify({ userId, activeChat, message, type }),
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

  // Convert timeStamp to time
  const convertTimeStampToTime = (serverTimestamp) => {
    if (!serverTimestamp) return "Invalid time";
    const date = new Date(serverTimestamp);

    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    return `${hours}:${minutes}`;
  };

  // Format date-time based on location
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

  // Grouping messages by date
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

  // Handle emoji
  const handleOpenEmoji = () => {
    try {
      setIsEmojiPickerVisible((prev) => !prev);
    } catch (error) {
      console.log(error);
      alert("This app dosent support emojis yet");
    }
  };

  // For handling image/video that needs to be sent
  const handleDocument = async (e) => {
    try {
      if (!e.target.files[0]) {
        return;
      }
      if (e.target.files[0].type.startsWith("image/")) {
        setMediaType("image");
      } else if (e.target.files[0].type.startsWith("video/")) {
        setMediaType("video");
      } else {
        alert("Choose only a image or video");
        return;
      }
      const filer = e.target.files[0];
      const arrayBuffer = await filer.arrayBuffer();

      const blob = new Blob([arrayBuffer], { type: filer.type });
      const dataUrl = URL.createObjectURL(blob);
      setMediaSrc(dataUrl);
      setMediaBuffer(arrayBuffer);

      setIsFileOpen(true);
      return;
    } catch (error) {
      console.log(error);
      console.log("Error in selecting image");
      return;
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
            {/* Name and profile pic */}
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
          {!isFileOpen && !openedMedia && (
            <>
              {/* Chat messages */}
              <div
                ref={scrollRef}
                onScroll={handleScroll}
                className="flex-1 overflow-y-auto p-4 bg-gray-50 dark:bg-dark2"
              >
                {groupMessagesByDate(chatMessages).map((group, index) => (
                  <div key={index}>
                    <p className="text-center text-sm text-gray-500">
                      {group.date}
                    </p>

                    {group.messages.map((msg, index) => (
                      // Each Message
                      <div
                        key={msg.id || index}
                        className={`mb-4 ${
                          msg.sender === userId ? "text-right" : "text-left"
                        }`}
                      >
                        <div
                          className={`inline-block p-0.5 rounded-lg break-words ${
                            msg.sender === userId
                              ? "bg-customTeal text-textLighter dark:bg-customTeal dark:text-textLighter"
                              : "bg-light1 text-textDarker dark:bg-dark1 dark:text-textLight"
                          }`}
                          style={{ maxWidth: "75%" }}
                        >
                          {msg.type === "" && (
                            <ChatMessage
                              content={msg.content}
                              type={msg.type}
                            />
                          )}
                          {msg.type !== "" && (
                            <button
                              onClick={() => {
                                setOpenedMediaType(msg.type);
                                setOpenedMedia(msg.content);
                              }}
                            >
                              <ChatMessage
                                content={msg.content}
                                type={msg.type}
                              />
                            </button>
                          )}
                        </div>
                        {/* Timestamp */}
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
                  {/* Message input area */}
                  <input
                    type="text"
                    placeholder="Type a message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && message.trim()) {
                        HandleSendMessage("");
                      }
                    }}
                    className="w-full p-3 pr-12 pl-16 border rounded-2xl focus:outline-none focus:ring-2 focus:bg-light1 dark:bg-dark2 dark:focus:bg-mid4"
                  />
                  {/* Send message button*/}
                  <button
                    className="absolute inset-y-0 right-3 flex items-center"
                    onClick={() => {
                      HandleSendMessage("");
                    }}
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

                  {/* Send Images and Videos */}

                  <button
                    className="absolute inset-y-0 left-3 fle items-center"
                    onClick={() => addImageRef.current.click()}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      className="w-6 h-6 text-textMid hover:text-textMid/65 darK:text-textLight dark:hover:text-gray-400"
                    >
                      <path d="M16.5 6.75v7.25c0 3.04-2.46 5.5-5.5 5.5s-5.5-2.46-5.5-5.5V6.75a4.75 4.75 0 0 1 9.5 0v7.25a2.75 2.75 0 0 1-5.5 0V6.75h-1.5v7.25c0 2.47 2.02 4.5 4.5 4.5s4.5-2.03 4.5-4.5V6.75a6.25 6.25 0 0 0-12.5 0v7.25c0 3.87 3.13 7 7 7s7-3.13 7-7V6.75h-1.5z" />
                    </svg>
                  </button>
                  <input
                    type="file"
                    accept="image/*, video/*"
                    className="hidden"
                    onChange={(e) => {
                      handleDocument(e);
                    }}
                    ref={addImageRef}
                  />

                  {/* Emoji */}
                  <button
                    className="absolute inset-y-0 left-9 fle items-center"
                    onClick={handleOpenEmoji}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      className="w-6 h-6 text-textMid hover:text-textMid/65 darK:text-textLight dark:hover:text-gray-400"
                    >
                      <path d="M12 2a10 10 0 1 0 10 10A10.01 10.01 0 0 0 12 2zm-3.5 8.25a1.25 1.25 0 1 1-1.25 1.25A1.26 1.26 0 0 1 8.5 10.25zm7 0a1.25 1.25 0 1 1-1.25 1.25A1.26 1.26 0 0 1 15.5 10.25zm-7.88 5.56a4.73 4.73 0 0 1 7.76 0l1.15-.8a6.23 6.23 0 0 0-10.06 0z" />
                    </svg>
                  </button>
                  {isEmojiPickerVisible && (
                    <div className="absolute bottom-12 left-0 z-50">
                      <EmojiPicker
                        onEmojiClick={(emoji) => {
                          console.log(emoji);
                          setMessage(
                            (prevMessage) => prevMessage + emoji.emoji
                          );
                          setIsEmojiPickerVisible(false);
                        }}
                        theme="inherit"
                        emojiStyle="apple"
                        width="200"
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="absolute right-6 bottom-28 md:bottom-16  ">
                <button
                  onClick={() => setScrollDown(!scrollDown)}
                  className="p-2 bg-light1 dark:bg-dark1 shadow dark:shadow-sm rounded-full"
                >
                  <ChevronDown />{" "}
                </button>
              </div>
            </>
          )}

          {/* Show image/video before sending */}
          {isFileOpen && (
            <div className="relative mt-16 w-full  h-auto z-50 bg-light2 dark:bg-dark2 p-4 rounded-lg">
              <div
                className="absolute -top-10 right-3 w-8 h-8 flex items-center justify-center bg-gray-700 text-textLight rounded-full cursor-pointer hover:bg-gray-600"
                onClick={() => setIsFileOpen(false)}
              >
                X
              </div>
              {/* Image */}
              {mediaType === "image" && (
                <div className="relative w-full h-96">
                  <Image
                    src={mediaSrc}
                    alt="selected file"
                    layout="fill"
                    objectFit="contain"
                    className="rounded-lg"
                  />
                </div>
              )}
              {/* Video */}
              {mediaType === "video" && (
                <div className="relative w-full h-96">
                  <video controls width={700} height={700}>
                    <source src={mediaSrc} type="video/mp4" />
                    Your browser does not support videos.
                  </video>
                </div>
              )}

              {/* Send media button */}
              <button
                className="absolute -bottom-20 right-3 w-10 h-10 flex items-center bg-customTeal text-white py-2 px-2 rounded-full hover:bg-teal-600"
                onClick={() => {
                  HandleSendMessage(mediaType);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="w-6 h-6"
                >
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                </svg>
              </button>
            </div>
          )}
          {/* Open selected image */}
          {openedMedia && (
            <div className="relative mt-16 w-full  h-auto z-50 bg-light1 dark:bg-dark2 p-4 rounded-lg">
              <div
                className="w-8 h-8 flex items-center justify-center bg-gray-700 text-textLight rounded-full cursor-pointer hover:bg-gray-600"
                onClick={() => setOpenedMedia(null)}
              >
                X
              </div>
              {/* Image */}
              {openedMediaType === "image" && (
                <div className="relative w-full h-96">
                  <Image
                    src={openedMedia}
                    alt="selected file"
                    layout="fill"
                    objectFit="contain"
                    className="rounded-lg"
                  />
                </div>
              )}
              {/* Video */}
              {openedMediaType === "video" && (
                <div className="relative w-full h-96 m-2">
                  <video controls width={700} height={700}>
                    <source src={openedMedia} type="video/mp4" />
                    Your browser does not support videos.
                  </video>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </>
  );
}

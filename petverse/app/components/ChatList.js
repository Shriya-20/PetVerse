"use client";

import ProfileIcon from "./ProfileIcon";
import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import { useUser } from "@/context/UserContext";
import { useEffect, useState } from "react";
import { ref, onValue, update } from "firebase/database";
import { database } from "@/app/_backend/firebaseConfig";
import defaultImage from "@/public/default_user_profile_pic.jpeg";

export default function ChatList({
  activeChat,
  setActiveChatData = () => {},
  setActiveChat,
  setChatOpen,
}) {
  const { user } = useUser();
  const userId = user.id;

  const [chats, setChats] = useState([]);

  useEffect(() => {
    if (!userId) return;

    const chatsRef = ref(database, `chats/${userId}`);

    const unsubscribe = onValue(chatsRef, (snapshot) => {
      if (snapshot.exists()) {
        const chatData = Object.entries(snapshot.val()).map(([id, chat]) => ({
          id,
          ...chat,
        }));
        setChats(chatData);
      } else {
        setChats([]);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [userId]);

  const convertTimeStampToTime = (serverTimestamp) => {
    const date = new Date(serverTimestamp);

    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    return `${hours}:${minutes}`;
  };

  const handleResetUnreadMessages = async (id) => {
    const unreadRef = ref(database, `chats/${userId}/${id}`);

    update(unreadRef, {
      unread_messages: null,
    });
  };

  const sortchats = (chats) => {
    return chats.sort((a, b) => {
      const timeA = a.timestamp || 0;
      const timeB = b.timestamp || 0;
      return timeB - timeA;
    });
  };

  return (
    <>
      <div className="flex items-center justify-center p-4 pt-5 sticky top-0 bg-light1 dark:bg-dark2 shadow-md dark:shadow-mid3 dark:shadow-sm border-r ">
        <h1 className="text-xl font-bold text-textDarker dark:text-textLight z-50 bg-light1 dark:bg-dark2">
          Messages
        </h1>
      </div>

      <IconsContainer>
        <Search>
          <SearchIcon />
          <SearchInput
            placeholder="Search for chats"
            className="dark:bg-dark1"
          />
        </Search>
      </IconsContainer>

      {/* User list */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden">
        <div className="">
          {sortchats(chats).map((chat) => (
            <div
              key={chat.id}
              className={`flex gap-2 md:gap-2 p-4 cursor-pointer ${
                chat.id === activeChat
                  ? "bg-blue-100 dark:bg-dark1"
                  : "hover:bg-light2 dark:hover:bg-mid4"
              }`}
              onClick={() => {
                handleResetUnreadMessages(chat.id);
                setActiveChat(chat.id);
                setActiveChatData({ ...chat });
                setChatOpen(true);
              }}
            >
              <ProfileIcon
                profile_pic={
                  chat.profile_picture ? chat.profile_picture : defaultImage
                }
                width="w-11"
                height="h-11"
              />

              <div
                className="flex-1"
                style={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                <h2 className="inline font-semibold text-textDarker dark:text-textLight overflow-wrap break-words">
                  {chat.name}
                </h2>
                <p className="block text-sm text-textDark dark:text-textMid">
                  {chat.last_message ? chat.last_message : ""}
                </p>
              </div>

              <div className="text-right">
                <p className="text-xs text-textDark dark:text-textMid">
                  {chat.timestamp
                    ? convertTimeStampToTime(chat.timestamp)
                    : "00:00"}
                </p>
                {chat.unread_messages && chat.unread_messages > 0 && (
                  <span className="text-xs bg-customTeal text-textLighter rounded-full px-2 py-1">
                    {chat.unread_messages}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

const Search = styled.div`
  padding: 20px;
  display: flex;
  align-items: center;
  border-radius: 2px;
`;
const SearchInput = styled.input`
  outline-width: 0;
  border: none;
  flex: 1;
`;

const IconsContainer = styled.div``;

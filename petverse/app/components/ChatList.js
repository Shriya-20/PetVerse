"use client";

import ProfileIcon from "./ProfileIcon";
import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import { CornerDownLeft } from "react-feather";
import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";
import defaultImage from "@/public/default_user_profile_pic.jpeg";

export default function ChatList({ activeChat, setActiveChat, setChatOpen }) {
  const [chats, setChats] = useState([]);
  const { user } = useUser();
  const userId = user.id;

  useEffect(() => {
    async function HandleGetChats() {
      try {
        const response = await fetch("/api/messages/list", {
          method: "POST",
          body: JSON.stringify({ userId }),
        });
        if (!response.ok) {
          throw new Error("Failed to fetch chats");
        }
        console.log(response);
        const data = await response.json();
        const chatArray = data
          ? Object.entries(data).map(([id, value]) => ({ id, ...value }))
          : [];

        setChats(chatArray);
        console.log(chatArray);
        console.log("Successfully fetched chats");
      } catch (error) {
        console.log("failed to get chats");
        console.log(error);
      }
    }
    HandleGetChats();
  }, []);

  console.log("CHATSSS");
  console.log(chats);

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
          {chats.map((chat) => (
            <div
              key={chat.id}
              className={`flex gap-2 md:gap-2  p-4 cursor-pointer ${
                chat.id === activeChat
                  ? "bg-blue-100 dark:bg-dark1"
                  : "hover:bg-light2 dark:hover:bg-mid4"
              }`}
              onClick={() => {
                setActiveChat(chat.id);
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
              {/* User name and last unread message */}
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
                  {chat.lastMessage ? chat.lastMessage : ""}
                </p>
              </div>
              {/* No of unread messages and timestamp */}
              <div className="text-right">
                <p className="text-xs  text-textDark dark:text-textMid">
                  {chat.timestamp ? chat.timestamp : "00.00"}
                </p>
                {chat.unread && chat.unread > 0 && (
                  <span className="text-xs bg-customTeal text-textLighter  rounded-full px-2 py-1">
                    {chat.unread}
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
  border: none; //use full page
  flex: 1;
`;

// const Header=styled.div``;
const IconsContainer = styled.div``;
// const Container=styled.div``;
// const IconButton=styled.div``;

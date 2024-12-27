import ProfileIcon from "./ProfileIcon";

export default function ChatList({
  chats,
  activeChat,
  setActiveChat,
  setChatOpen,
}) {
  return (
    <>
      <div className="flex items-center justify-center p-4 pt-5 sticky top-0 bg-light1 dark:bg-dark2 shadow-md dark:shadow-mid3 dark:shadow-sm border-r ">
        <h1 className="text-xl font-bold text-textDarker dark:text-textLight z-50 bg-light1 dark:bg-dark2">
          Messages
        </h1>
      </div>
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
                profile_pic={chat.profile_pic}
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
                  {chat.lastMessage}
                </p>
              </div>
              {/* No of unread messages and timestamp */}
              <div className="text-right">
                <p className="text-xs  text-textDark dark:text-textMid">
                  {chat.timestamp}
                </p>
                {chat.unread > 0 && (
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

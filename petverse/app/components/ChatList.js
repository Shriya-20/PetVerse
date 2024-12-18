import ProfileIcon from "./ProfileIcon";
import loginDoggy from "@/public/logindoggy.jpg";

export default function ChatList({
  chats,
  activeChat,
  setActiveChat,
  setChatOpen,
}) {
  return (
    <>
      <div className="p-4 sticky top-0 bg-white border-b-2">
        <h1 className="text-xl font-bold text-gray-800 z-50 bg-white">
          Messages
        </h1>
      </div>
      {/* User list */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden">
        <div className="divide-y">
          {chats.map((chat) => (
            <div
              key={chat.id}
              className={`flex gap-2 md:gap-2  p-4 cursor-pointer ${
                chat.id === activeChat ? "bg-blue-100" : "hover:bg-gray-200"
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
                <h2 className="inline font-semibold text-gray-800 overflow-wrap break-words">
                  {chat.name}
                </h2>
                <p className="block text-sm text-gray-600 ">
                  {chat.lastMessage}
                </p>
              </div>
              {/* No of unread messages and timestamp */}
              <div className="text-right">
                <p className="text-xs  text-gray-500">{chat.timestamp}</p>
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
    </>
  );
}

export default function ChatList({
  chats,
  activeChat,
  setActiveChat,
  setChatOpen,
  isSmallScreen,
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
              className={`flex items-center p-4 cursor-pointer ${
                chat.id === activeChat ? "bg-blue-100" : "hover:bg-gray-200"
              }`}
              onClick={() => {
                setActiveChat(chat.id);
                if (isSmallScreen) {
                  setChatOpen(true);
                }
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
    </>
  );
}

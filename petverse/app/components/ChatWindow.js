import ChatMessage from "./ChatMessage";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import ProfileIcon from "./ProfileIcon";
import default_profile_pic from "@/public/default_user_profile_pic.jpeg";

export default function ChatWindow({
  chats,
  activeChat,
  activeMessages,
  chatOpen,
  isSmallScreen,
  setChatOpen,
}) {
  return (
    <>
      {chatOpen && (
        <>
          {/* Chat header*/}

          <div className="sticky p-2 top-0 flex items-center bg-light1 dark:bg-dark1 shadow-md dark:border-0  z-50">
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
                    chats.find((chat) => chat.id === activeChat)?.profile_pic ||
                    default_profile_pic
                  }
                  width="w-12"
                  height="h-12"
                  custom_style="mx-2"
                />
              </div>
              <p className="font-bold text-base md:text-lg text-textDarker dark:text-textLight truncate pl-5">
                {chats.find((chat) => chat.id === activeChat)?.name || ""}
              </p>
            </div>
            <p className="text-sm text-textDark dark:text-textLight text-right whitespace-nowrap pl-2 flex-shrink-0">
              {isSmallScreen ? "18.23" : "Last seen 12.21"}
            </p>
          </div>

          {/* Chat messages */}
          <div className="flex-1  overflow-y-auto p-4 bg-gray-50 dark:bg-dark2">
            {activeMessages.map((message) => (
              <div
                key={message.id}
                className={`mb-4 ${
                  message.sender === "me" ? "text-right" : "text-left"
                }`}
              >
                <div
                  className={`inline-block p-3 rounded-lg break-words ${
                    message.sender === "me"
                      ? "bg-customTeal text-textLighter dark:bg-customTeal dark:text-textLighter"
                      : "bg-light1 text-textDarker dark:bg-dark1 dark:text-textLight"
                  }`}
                  style={{ maxWidth: "75%" }}
                >
                  <ChatMessage {...message} />
                </div>
                <p className="text-xs text-textDark mt-1">
                  {message.timestamp}
                </p>
              </div>
            ))}
          </div>

          {/* Send Message */}
          <div className="mx-4 mb-3 bg-light1 dark:bg-dark1  z-50 sticky bottom-0">
            <input
              type="text"
              placeholder="Type a message..."
              className="w-full p-3 border rounded-2xl focus:outline-none focus:ring-2 focus:bg-light1 dark:bg-dark2 dark:focus:bg-mid4"
            />
          </div>
        </>
      )}
    </>
  );
}

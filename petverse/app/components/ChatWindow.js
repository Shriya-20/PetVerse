import ChatMessage from "./ChatMessage";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import ProfileIcon from "./ProfileIcon";
import loginDoggy from "@/public/logindoggy.jpg";

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

          <div className="sticky top-0 flex items-center justify-between bg-light1 dark:bg-dark1 shadow-md dark:border-0 pt-1 z-50">
            {chatOpen && isSmallScreen && (
              <ArrowLeftIcon
                className="w-5 hover:bg-slate-50 dark:hover:bg-mid4 rounded-full hover:text-customTeal"
                onClick={() => setChatOpen(false)}
              />
            )}
            <div className="flex flex-row items-center basis-2/3">
              <ProfileIcon
                profile_pic={
                  chats.find((chat) => chat.id === activeChat)?.profile_pic ||
                  loginDoggy
                }
                width="w-12"
                height="h-12"
                custom_style="mx-4 mt-1 mb-2 "
              />
              <h2 className="font-bold text-textDarker dark:text-textLight text-center">
                {chats.find((chat) => chat.id === activeChat)?.name || ""}
              </h2>
            </div>
            <p className="text-sm text-textDark dark:text-textLight basis-1/3 text-right pr-2">
              Last seen 7h ago
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

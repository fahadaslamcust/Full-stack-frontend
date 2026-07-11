import {
  Video,
  Phone,
  Smile,
  Send
} from "lucide-react";
import SearchInput from "../components/common/SearchInput";
import { useState, useRef, useEffect } from "react";
import { useOutletContext, useLocation } from "react-router-dom";
import { useInbox, useChat, useSendMessage } from "../hooks/useMessages";
// Added useNetwork to fetch the list of people you are following
import { useCurrentUser, useNetwork } from "../hooks/useUsers"; 
import EmojiPicker from "emoji-picker-react";
import CallOverlay from "../components/messages/CallOverlay";

const FALLBACK_AVATAR =
  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=60";

export default function Messages() {
  const location = useLocation();
  const { data: currentUser } = useCurrentUser();
  const currentUserId =
    currentUser?._id ||
    currentUser?.id ||
    (() => {
      try {
        return JSON.parse(localStorage.getItem("user") || "{}")?.id || null;
      } catch {
        return null;
      }
    })();

  const { isSidebarOpen } = useOutletContext();
  const [selectedChat, setSelectedChat] = useState(() => {
    if (location?.state?.targetUser) {
      return { otherUser: location?.state.targetUser, lastMessage: null };
    }
    return null;
  });
  
  const [isChatListOpen, setIsChatListOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [callType, setCallType] = useState(null);
  const [messageText, setMessageText] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const messagesEndRef = useRef(null);

  const { data: inbox, isLoading: inboxLoading } = useInbox();
  
  // Fetch network data to get the following list
  const { data: network } = useNetwork();
  const followingList = Array.isArray(network?.following) ? network.following : [];

  const targetUserId =
    selectedChat?.otherUser?._id || selectedChat?.otherUser?.id || null;
  const { data: messages, isLoading: chatLoading } = useChat(targetUserId);
  const sendMutation = useSendMessage();

  const inboxList = Array.isArray(inbox)
    ? inbox.map((conv) => {
        const otherUser =
          conv.otherUser ||
          (conv.participants &&
            conv.participants.find(
              (p) => p._id !== currentUserId && p.id !== currentUserId,
            )) ||
          conv.participants?.[0];
        return { ...conv, otherUser };
      })
    : [];

  const filteredInbox = inboxList.filter((conv) => {
    const name = conv.otherUser?.name || "";
    return name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!messageText.trim() || !targetUserId) return;
    sendMutation.mutate({
      receiverId: targetUserId,
      content: messageText.trim(),
    });
    setMessageText("");
    setShowEmojiPicker(false);
  };

  return (
    <div className="flex-1 flex flex-col md:flex-row h-full bg-[#f8f8f8] overflow-hidden relative w-full">
      {/* ====== CHAT LIST ====== */}
      <section
        className={`chat-list w-full md:w-[370px] lg:w-[393px] bg-white border-r px-6 py-4 md:py-1 lg:py-1 flex flex-col h-full overflow-hidden flex-shrink-0 transition-all duration-300 ${
          isChatListOpen ? "flex" : "hidden md:flex"
        } ${
          isSidebarOpen
            ? "opacity-40 pointer-events-none md:opacity-100 md:pointer-events-auto"
            : ""
        }`}
      >
        <div>
          <h1 className="hidden md:block font-bold text-[#2D2D2D] md:text-2xl">
            Messages
          </h1>
        </div>
        
        <div className="mb-4">
          <SearchInput
            size={18}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search messages of Your Friend..."
          />
        </div>
{/* ====== FOLLOWING STRIP ====== */}
{followingList.length > 0 && (
  <div className="mb-4">
    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 px-1">
      Following
    </h3>
    <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2 flex-shrink-0">
      {followingList
        .filter((user) => {
          const userId = user._id || user.id;
          // Only show if there's NO existing conversation
          const hasConversation = inboxList.some(
            (conv) =>
              conv.otherUser?._id === userId || conv.otherUser?.id === userId
          );
          return !hasConversation;
        })
        .map((user) => {
          const userId = user._id || user.id;
          
          return (
            <div
              key={userId}
              className="flex-shrink-0 cursor-pointer group flex flex-col items-center"
              onClick={() => {
                // Open a new chat window with this user
                setSelectedChat({ otherUser: user, lastMessage: null });
                if (window.innerWidth < 768) setIsChatListOpen(false);
              }}
            >
              <img
                src={
                  user?.avatar
                    ? user.avatar.startsWith("http")
                      ? user.avatar
                      : `https://full-stack-backend-d1g9.onrender.com${user.avatar}`
                    : FALLBACK_AVATAR
                }
                className="w-12 h-12 rounded-full border-2 border-blue-500 p-0.5 object-cover transform group-hover:scale-105 transition duration-200"
                alt={user?.name}
              />
              <span className="text-[10px] text-gray-600 mt-1 truncate max-w-[56px] text-center font-medium">
                {user.name}
              </span>
            </div>
          );
        })}
    </div>
  </div>
)}
        {/* Chat List */}
        <div className="flex-1 space-y-1.5 overflow-y-auto hide-scrollbar pr-1">
          {inboxLoading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-3 animate-pulse"
              >
                <div className="w-10 h-10 rounded-full bg-gray-100 shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-3 bg-gray-100 rounded w-1/2" />
                  <div className="h-2 bg-gray-100 rounded w-3/4" />
                </div>
              </div>
            ))
          ) : filteredInbox.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-14 h-14 bg-blue-50 text-blue-400 rounded-full flex items-center justify-center mb-3">
                <svg
                  className="w-7 h-7"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </div>
              <p className="text-sm font-medium text-gray-700">
                No conversations yet
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Start messaging someone!
              </p>
            </div>
          ) : (
            filteredInbox.map((conv, idx) => {
              const user = conv.otherUser;
              const isSelected = selectedChat?.otherUser?._id === user?._id;
              const lastMsg = conv.lastMessage?.content || "No messages yet";
              const timeStr = conv.lastMessage?.createdAt
                ? new Date(conv.lastMessage.createdAt).toLocaleDateString([], {
                    month: "short",
                    day: "numeric",
                  })
                : "";
              return (
                <div
                  key={idx}
                  onClick={() => {
                    setSelectedChat(conv);
                    if (window.innerWidth < 768) setIsChatListOpen(false);
                  }}
                  className={`flex items-center justify-between cursor-pointer p-3 rounded-xl transition duration-200 ${
                    isSelected ? "bg-blue-50/80 shadow-xs" : "hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className="relative flex-shrink-0">
                      <img
                        src={
                          user?.avatar
                            ? user.avatar.startsWith("http")
                              ? user.avatar
                              : `https://full-stack-backend-d1g9.onrender.com${user.avatar}`
                            : FALLBACK_AVATAR
                        }
                        alt=""
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-sm text-gray-900 truncate">
                        {user?.name || "User"}
                      </h3>
                      <p className="text-xs text-gray-400 truncate mt-0.5">
                        {lastMsg}
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] text-gray-400 flex-shrink-0 ml-2 self-start mt-1 font-medium">
                    {timeStr}
                  </span>
                </div>
              );
            })
          )}
        </div>
      </section>

      {/* ====== CHAT SCREEN ====== */}
      <section
        className={`flex-1 bg-[#fbfbfb] flex flex-col min-w-0 h-full ${
          !isChatListOpen ? "flex" : "hidden md:flex"
        }`}
      >
        {!selectedChat ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
            <div className="w-20 h-20 bg-blue-50 text-blue-400 rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-10 h-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </div>
            <p className="font-semibold text-gray-700 text-lg">
              Select a conversation
            </p>
            <p className="text-sm text-gray-400 mt-1">
              Choose a chat from the list to start messaging
            </p>
          </div>
        ) : (
          <>
            {/* Chat Header */}
<div className="bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between flex-shrink-0 gap-2 shadow-xs">
  <div className="flex items-center gap-3 min-w-0">
    <button
      onClick={() => setIsChatListOpen(true)}
      className="md:hidden text-gray-500 p-1.5 hover:bg-gray-50 rounded-lg transition active:scale-95"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
      </svg>
    </button>
    <div className="relative flex-shrink-0">
      <img
        src={
          selectedChat.otherUser?.avatar
            ? selectedChat.otherUser.avatar.startsWith("http")
              ? selectedChat.otherUser.avatar
              : `https://full-stack-backend-d1g9.onrender.com${selectedChat.otherUser.avatar}`
            : FALLBACK_AVATAR
        }
        className="w-10 h-10 rounded-full object-cover"
        alt=""
      />
      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white" />
    </div>
    <div className="min-w-0">
      <h3 className="font-bold text-sm text-gray-900 truncate max-w-[140px] sm:max-w-[220px]">
        {selectedChat.otherUser?.name || "User"}
      </h3>
      <p className="text-[11px] font-medium text-green-500">Online</p>
    </div>
  </div>

  {/* ====== CALL BUTTONS ====== */}
  {selectedChat && (
    <div className="flex items-center gap-1">
      <button
        onClick={() => setCallType("voice")}
        className="p-2.5 hover:bg-gray-100 rounded-xl text-gray-600 hover:text-blue-600 transition-all active:scale-95"
        title="Voice Call"
      >
        <Phone size={20} />
      </button>
      <button
        onClick={() => { setCallType("video") }}
        className="p-2.5 hover:bg-gray-100 rounded-xl text-gray-600 hover:text-blue-600 transition-all active:scale-95"
        title="Video Call"
      >
        <Video size={20} />
      </button>
    </div>
  )}
</div>
            {/* Message Stream */}
            <div className="flex-1 p-4 md:p-6 overflow-y-auto hide-scrollbar space-y-4 bg-gray-50/30 flex flex-col">
              {chatLoading ? (
                <div className="flex-1 flex items-center justify-center">
                  <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                </div>
              ) : !messages || messages.length === 0 ? (
                <div className="flex-1 flex items-center justify-center">
                  <p className="text-sm text-gray-400">
                    No messages yet. Say hello! 👋
                  </p>
                </div>
              ) : (
                messages.map((msg, i) => {
                  const isOwn =
                    msg.sender === currentUserId ||
                    msg.sender?._id === currentUserId ||
                    msg.sender?.id === currentUserId;
                  return (
                    <div
                      key={msg._id || i}
                      className={`flex ${
                        isOwn ? "justify-end" : "justify-start"
                      } w-full`}
                    >
                      <div
                        className={`max-w-[75%] sm:max-w-md px-4 py-2.5 rounded-2xl text-xs sm:text-sm break-words ${
                          isOwn
                            ? "bg-blue-500 text-white rounded-tr-none shadow-xs"
                            : "bg-white text-gray-800 rounded-tl-none border border-gray-100 shadow-xs"
                        }`}
                      >
                        {msg.content || msg.text}
                        <span
                          className={`block text-[10px] mt-1 ${
                            isOwn ? "text-blue-200" : "text-gray-400"
                          }`}
                        >
                          {msg.createdAt
                            ? new Date(msg.createdAt).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })
                            : ""}
                        </span>
                      </div>
                    </div>
                  );
                })
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="p-3 bg-white border-t border-gray-100 flex-shrink-0 relative">
              {showEmojiPicker && (
                <div className="absolute bottom-[calc(100%+8px)] left-4 z-50 shadow-xl rounded-lg overflow-hidden">
                  <EmojiPicker
                    onEmojiClick={(emojiObject) => {
                      setMessageText((prev) => prev + emojiObject.emoji);
                    }}
                    theme="light"
                  />
                </div>
              )}
              <form onSubmit={handleSend}>
                <div className="bg-gray-100 rounded-full px-4 py-1.5 flex items-center gap-3">
                  <Smile
                    className="text-gray-400 w-5 h-5 flex-shrink-0 cursor-pointer hover:text-gray-600 transition"
                    onClick={() => setShowEmojiPicker((prev) => !prev)}
                  />
                  <input
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleSend(e);
                      }
                    }}
                    placeholder="Type a message..."
                    className="flex-1 bg-transparent outline-none text-xs sm:text-sm min-w-0 text-gray-800"
                  />
                  <button
                    type="submit"
                    disabled={sendMutation.isPending || !messageText.trim()}
                    className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 hover:bg-blue-600 disabled:bg-blue-300 transition shadow-xs"
                  >
                    {sendMutation.isPending ? (
                      <div className="flex justify-center items-center py-6">
                        <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                      </div>
                    ) : (
                      <Send size={14} className="text-white ml-0.5" />
                    )}
                  </button>
                </div>
              </form>
            </div>
          </>
        )}
      </section>
      {/* ====== CALL SCREEN ====== */}
      <CallOverlay
        type={callType}
        user={selectedChat?.otherUser}
        onClose={() => setCallType(null)}
      />
    </div>
  );
}
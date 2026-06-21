import {
  Video,
  Phone,
  Smile,
  Send,
  Volume2,
  Mic,
  VideoOff,
  PhoneOff,
} from "lucide-react";
import SearchInput from "../components/common/SearchInput";
import { useState } from "react";
import { useOutletContext } from "react-router-dom"; // Hook imported successfully

const chats = [
  {
    name: "Jenny Willimson",
    message: "How are you",
    avatar: "https://i.pravatar.cc/100?img=1",
    active: true,
  },
  {
    name: "Lucas Brown",
    message: "Kevin Peterson",
    avatar: "https://i.pravatar.cc/100?img=2",
  },
  {
    name: "Mason Davis",
    message: "Designed a Student",
    avatar: "https://i.pravatar.cc/100?img=3",
  },
  {
    name: "Elijah Miller",
    message: "Designed a Student",
    avatar: "https://i.pravatar.cc/100?img=4",
  },
  {
    name: "James Anderson",
    message: "Designed a Student",
    avatar: "https://i.pravatar.cc/100?img=5",
  },
];

const storyUsers = [1, 2, 3, 4, 5];

export default function Messages() {
  // Global Layout context se dynamic functions nikal liye takay crash na ho
  const { isSidebarOpen } = useOutletContext();
  
  const [selectedChat, setSelectedChat] = useState(chats[0]);
  const [isChatListOpen, setIsChatListOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCalling, setIsCalling] = useState(false);

  return (
    <div className="flex-1 flex flex-col md:flex-row h-full bg-[#f8f8f8] overflow-hidden relative w-full">
      <section
        className={`
          chat-list w-full md:w-[370px] lg:w-[393px] bg-white border-r px-6 py-4 md:py-1 lg:py-1
          flex flex-col h-full overflow-hidden flex-shrink-0 transition-all duration-300
          ${isChatListOpen ? "flex" : "hidden md:flex"}
          ${isSidebarOpen ? "opacity-40 pointer-events-none md:opacity-100 md:pointer-events-auto" : ""}
        `}
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
            placeholder="Search messages..."
          />
        </div>

        {/* Active Users Status Scrollbar Panel */}
        <div className="flex gap-3 mb-5 overflow-x-auto hide-scrollbar pb-2 flex-shrink-0">
          {storyUsers.map((id) => (
            <div key={id} className="relative flex-shrink-0 cursor-pointer group">
              <img
                src={`https://i.pravatar.cc/100?img=${id + 10}`}
                className="w-12 h-12 rounded-full border-2 border-blue-500 p-0.5 object-cover transform group-hover:scale-105 transition duration-200"
                alt="Active User"
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-white shadow-xs" />
            </div>
          ))}
        </div>

        {/* Dynamic Chats List Loop */}
        <div className="flex-1 space-y-1.5 overflow-y-auto hide-scrollbar pr-1">
          {chats.map((chat, idx) => (
            <div
              key={idx}
              onClick={() => {
                setSelectedChat(chat);
                if (window.innerWidth < 768) setIsChatListOpen(false);
              }}
              className={`
                flex items-center justify-between cursor-pointer p-3 rounded-xl transition duration-200
                ${selectedChat?.name === chat.name ? "bg-blue-50/80 shadow-xs" : "hover:bg-gray-50"}
              `}
            >
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div className="relative flex-shrink-0">
                  <img src={chat.avatar} alt="" className="w-10 h-10 rounded-full object-cover" />
                  {chat.active && (
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white" />
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-sm text-gray-900 truncate">
                    {chat.name}
                  </h3>
                  <p className="text-xs text-gray-400 truncate mt-0.5">
                    {chat.message}
                  </p>
                </div>
              </div>

              <span className="text-[10px] text-gray-400 flex-shrink-0 ml-2 self-start mt-1 font-medium">
                12 Jun
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ====== CHAT SCREEN CONVERSATION WINDOW ====== */}
      <section 
        className={`
          flex-1 bg-[#fbfbfb] flex flex-col min-w-0 h-full
          ${!isChatListOpen ? "flex" : "hidden md:flex"}
        `}
      >
        {/* Active Contact Header Panel */}
        <div className="bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between flex-shrink-0 gap-2 shadow-xs">
          <div className="flex items-center gap-3 min-w-0">
            {/* Mobile Back navigation button overlay target */}
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
                src={selectedChat?.avatar || "https://i.pravatar.cc/100?img=1"}
                className="w-10 h-10 rounded-full object-cover"
                alt=""
              />
              {selectedChat?.active && (
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white" />
              )}
            </div>

            <div className="min-w-0">
              <h3 className="font-bold text-sm text-gray-900 truncate max-w-[140px] sm:max-w-[220px]">
                {selectedChat?.name || "Jenny Willimson"}
              </h3>
              <p className="text-[11px] font-medium text-green-500">
                {selectedChat?.active ? "Online" : "Offline"}
              </p>
            </div>
          </div>

          {/* Quick Calling Call Actions */}
          <div className="flex gap-1.5">
            <button
              onClick={() => setIsCalling(true)}
              className="w-9 h-9 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl flex items-center justify-center transition"
            >
              <Phone size={16} />
            </button>
            <button className="w-9 h-9 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl flex items-center justify-center transition">
              <Video size={16} />
            </button>
          </div>
        </div>

        {/* Message Stream Area Body */}
        <div className="flex-1 p-4 md:p-6 overflow-y-auto hide-scrollbar space-y-4 bg-gray-50/30 flex flex-col">
          <p className="text-center text-gray-400 text-[10px] font-semibold uppercase tracking-wider py-1">
            Today
          </p>

          {/* Incoming Message Bubble */}
          <div className="max-w-[75%] sm:max-w-md bg-white px-4 py-2.5 rounded-2xl rounded-tl-none border border-gray-100 shadow-xs text-xs sm:text-sm text-gray-800 break-words self-start">
            Hello how are you were are you from
          </div>

          {/* Outgoing Message Bubble */}
          <div className="flex justify-end w-full">
            <div className="max-w-[75%] sm:max-w-md bg-blue-500 text-white px-4 py-2.5 rounded-2xl rounded-tr-none shadow-xs text-xs sm:text-sm break-words">
              Hello how are you were are you from
            </div>
          </div>

          {/* Incoming Message Bubble */}
          <div className="max-w-[75%] sm:max-w-md bg-white px-4 py-2.5 rounded-2xl rounded-tl-none border border-gray-100 shadow-xs text-xs sm:text-sm text-gray-800 break-words self-start">
            I'm fine, thanks! How about you?
          </div>

          {/* Outgoing Message Bubble */}
          <div className="flex justify-end w-full">
            <div className="max-w-[75%] sm:max-w-md bg-blue-500 text-white px-4 py-2.5 rounded-2xl rounded-tr-none shadow-xs text-xs sm:text-sm break-words">
              Doing great! 😊
            </div>
          </div>
        </div>

        {/* Action Panel Chat Input Bottom Footer */}
        <div className="p-3 bg-white border-t border-gray-100 flex-shrink-0">
          <div className="bg-gray-100 rounded-full px-4 py-1.5 flex items-center gap-3">
            <Smile className="text-gray-400 w-5 h-5 flex-shrink-0 cursor-pointer hover:text-gray-600 transition" />
            <input
              placeholder="Type a message..."
              className="flex-1 bg-transparent outline-none text-xs sm:text-sm min-w-0 text-gray-800"
            />
            <button className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 hover:bg-blue-600 transition shadow-xs">
              <Send size={14} className="text-white ml-0.5" />
            </button>
          </div>
        </div>
      </section>

      {/* ====== CALL MODULE SCREEN INTERFACE ====== */}
      {isCalling && (
        <div className="fixed inset-0 bg-[#f8f9fa] z-50 flex flex-col items-center justify-center animate-fade-in">
          <img
            src={selectedChat?.avatar}
            alt=""
            className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover mb-4 ring-4 ring-white shadow-md"
          />

          <h2 className="text-xl font-bold text-gray-900">
            {selectedChat?.name}
          </h2>

          <p className="text-xs text-gray-500 mt-1 animate-pulse font-medium">Ongoing Call...</p>
          <p className="text-xs text-gray-400 mt-0.5 font-mono bg-gray-100 px-2 py-0.5 rounded-md">00:56</p>

          <div className="absolute bottom-16 flex items-center gap-4">
            <button className="w-10 h-10 rounded-full bg-white border border-gray-200 shadow-xs flex items-center justify-center hover:bg-gray-50 text-gray-600 transition">
              <Volume2 size={16} />
            </button>

            <button className="w-10 h-10 rounded-full bg-white border border-gray-200 shadow-xs flex items-center justify-center hover:bg-gray-50 text-gray-600 transition">
              <VideoOff size={16} />
            </button>

            <button className="w-10 h-10 rounded-full bg-white border border-gray-200 shadow-xs flex items-center justify-center hover:bg-gray-50 text-gray-600 transition">
              <Mic size={16} />
            </button>

            <button
              onClick={() => setIsCalling(false)}
              className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center hover:bg-red-600 transition shadow-md group"
            >
              <PhoneOff size={18} className="text-white group-hover:rotate-135 transition-transform duration-300" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
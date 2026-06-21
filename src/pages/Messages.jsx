import {
  Video,
  Phone,
  Smile,
  Send,
  Menu,
  Volume2,
  Mic,
  VideoOff,
  PhoneOff,
} from "lucide-react";
import SearchInput from "../components/common/SearchInput";
import { useState } from "react";

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
  const [selectedChat, setSelectedChat] = useState(chats[0]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // پیرنٹ مینو کو کھولنے کے لیے اگر ضرورت ہو
  const [isChatListOpen, setIsChatListOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCalling, setIsCalling] = useState(false);
  return (
    <div className="flex-1 flex flex-col md:flex-row h-screen bg-[#f8f8f8] overflow-hidden relative w-full">
      {/* ====== MOBILE HEADER (shows on small screens) ====== */}
      <div className="md:hidden flex items-center justify-between bg-white px-4 py-3 border-b z-20 w-full flex-shrink-0">
        <button onClick={() => setIsSidebarOpen(true)} className="p-1">
          <Menu className="w-6 h-6 text-gray-600" />
        </button>
        <h1 className="text-xl font-bold text-blue-800">Messages</h1>
        <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-blue-400">
          <img
            src="https://i.pravatar.cc/100?img=8"
            alt="user"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* ====== CHAT LIST ====== */}
      <section
        className={`
          chat-list w-full md:w-[380px] bg-white border-r px-4 sm:px-6 py-4 md:py-1
          flex flex-col h-full overflow-y-auto hide-scrollbar flex-shrink-0 transition-all duration-300
          ${isChatListOpen ? "block" : "hidden md:block"}
          ${isSidebarOpen ? "opacity-50 pointer-events-none md:opacity-100 md:pointer-events-auto" : ""}
        `}
      >
        <div className="hidden lg:block">
          <h1 className="font-bold text-[#000000] text-xl md:text-2xl">
            Messages
          </h1>
        </div>
        <div className="mb-4 md:mb-6">
          <SearchInput
            size={18}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search messages..."
          />
        </div>

        {/* Stories Status Grid */}
        <div className="flex gap-3 md:gap-4 mb-6 md:mb-8 overflow-x-auto story-scroll pb-2 flex-shrink-0">
          {storyUsers.map((id) => (
            <div key={id} className="relative flex-shrink-0">
              <img
                src={`https://i.pravatar.cc/100?img=${id + 10}`}
                className="w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-blue-200 object-cover"
                alt="story"
              />
              <span className="absolute bottom-0 right-0 w-3.5 h-3.5 md:w-4 md:h-4 rounded-full bg-green-500 border-2 border-white" />
            </div>
          ))}
        </div>

        {/* Conversations List Container */}
        <div className="flex-1 space-y-3 md:space-y-4 overflow-y-auto hide-scrollbar">
          {chats.map((chat, idx) => (
            <div
              key={idx}
              onClick={() => {
                setSelectedChat(chat);
                if (window.innerWidth < 768) setIsChatListOpen(false);
              }}
              className={`
                flex items-center justify-between cursor-pointer p-3 rounded-xl transition
                ${selectedChat?.name === chat.name ? "bg-blue-50/80" : "hover:bg-gray-50"}
              `}
            >
              <div className="flex items-center gap-3 md:gap-4 min-w-0">
                <div className="relative flex-shrink-0">
                  <img
                    src={chat.avatar}
                    alt=""
                    className="w-10 h-10 md:w-11 md:h-11 rounded-full object-cover"
                  />
                  {chat.active && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                  )}
                </div>

                <div className="min-w-0">
                  <h3 className="font-semibold text-sm md:text-base text-gray-900 truncate">
                    {chat.name}
                  </h3>
                  <p className="text-xs md:text-sm text-gray-400 truncate mt-0.5">
                    {chat.message}
                  </p>
                </div>
              </div>

              <span className="text-[10px] md:text-xs text-gray-400 flex-shrink-0 ml-2 self-start mt-1">
                12 Jun
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ====== CHAT WINDOW ====== */}
      <section className="flex-1 bg-[#fafafa] flex flex-col min-w-0 h-full">
        {/* Top Header */}
        <div className="bg-white border-b px-4 sm:px-6 md:px-8 py-3 md:py-4 flex items-center justify-between flex-shrink-0 gap-2">
          <div className="flex items-center gap-3 md:gap-4">
            {/* Mobile Back Button */}
            <button
              onClick={() => setIsChatListOpen(true)}
              className="md:hidden text-gray-600 p-1"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <div className="relative">
              <img
                src={selectedChat?.avatar || "https://i.pravatar.cc/100?img=1"}
                className="w-10 h-10 md:w-11 md:h-11 rounded-full object-cover"
                alt=""
              />
              {selectedChat?.active && (
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
              )}
            </div>

            <div>
              <h3 className="font-bold text-sm md:text-base text-gray-900 truncate max-w-[120px] sm:max-w-[200px]">
                {selectedChat?.name || "Jenny Willimson"}
              </h3>
              <p className="text-xs text-gray-400">
                {selectedChat?.active ? "Online" : "Offline"}
              </p>
            </div>
          </div>

          <div className="flex gap-2 md:gap-3">
            <button
              onClick={() => setIsCalling(true)}
              className="w-9 h-9 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center hover:bg-blue-100 transition"
            >
              <Phone size={16} />
            </button>
            <button className="w-9 h-9 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center hover:bg-blue-100 transition">
              <Video size={16} />
            </button>
          </div>
        </div>

        {/* Message Stream */}
        <div className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto hide-scrollbar space-y-4 bg-gray-50/50">
          <p className="text-center text-gray-400 text-xs tracking-wide py-2">
            Today
          </p>

          <div className="max-w-[75%] sm:max-w-md bg-white px-4 py-3 rounded-2xl rounded-tl-none shadow-sm text-sm text-gray-800 break-words self-start">
            Hello how are you were are you from
          </div>

          <div className="flex justify-end">
            <div className="max-w-[75%] sm:max-w-md bg-blue-500 text-white px-4 py-3 rounded-2xl rounded-tr-none text-sm break-words">
              Hello how are you were are you from
            </div>
          </div>

          <div className="max-w-[75%] sm:max-w-md bg-white px-4 py-3 rounded-2xl rounded-tl-none shadow-sm text-sm text-gray-800 break-words">
            I'm fine, thanks! How about you?
          </div>

          <div className="flex justify-end">
            <div className="max-w-[75%] sm:max-w-md bg-blue-500 text-white px-4 py-3 rounded-2xl rounded-tr-none text-sm break-words">
              Doing great! 😊
            </div>
          </div>
        </div>

        {/* Action Panel Footer Input */}
        <div className="p-4 bg-white border-t flex-shrink-0">
          <div className="bg-gray-100 rounded-full px-4 py-2 md:px-5 md:py-2.5 flex items-center gap-3 shadow-inner">
            <Smile className="text-gray-400 w-5 h-5 flex-shrink-0 cursor-pointer hover:text-gray-600 transition" />
            <input
              placeholder="Type a message..."
              className="flex-1 bg-transparent outline-none text-sm min-w-0 text-gray-800"
            />
            <button className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 hover:bg-blue-600 transition shadow-sm">
              <Send size={15} className="text-white ml-0.5" />
            </button>
          </div>
        </div>
      </section>
      {/* Call Screen */}
      {/* Call Screen */}
      {isCalling && (
        <div className="fixed inset-0 bg-[#F5F5F5] z-50 flex flex-col items-center justify-center">
          <img
            src={selectedChat?.avatar}
            alt={selectedChat?.name}
            className="w-36 h-36 rounded-full object-cover mb-6"
          />

          <h2 className="text-2xl font-semibold text-black">
            {selectedChat?.name}
          </h2>

          <p className="text-gray-500 mt-2">Ongoing Call</p>
          <p className="text-gray-400 text-sm mt-1">00:00:56</p>

          <div className="absolute bottom-16 flex items-center gap-4">
            <button className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
              <Volume2 size={18} className="text-gray-600" />
            </button>

            <button className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
              <VideoOff size={18} className="text-gray-600" />
            </button>

            <button className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
              <Mic size={18} className="text-gray-600" />
            </button>

            <button
              onClick={() => setIsCalling(false)}
              className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center hover:bg-red-600 transition"
            >
              <PhoneOff size={20} className="text-white" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

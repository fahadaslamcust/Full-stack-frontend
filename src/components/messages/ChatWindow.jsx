import { useState } from "react";

export default function ChatWindow({ activeChat }) {
  const [typedMessage, setTypedMessage] = useState("");

  if (!activeChat) {
    return (
      <div className="flex-1 flex items-center justify-center bg-white text-gray-400 text-sm">
        Select a chat to start messaging
      </div>
    );
  }
  return (
    <div className="flex-1 bg-white flex flex-col h-full relative">
      <div className="flex items-center justify-between px-8 py-4 border-b border-gray-100">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <img
              className="w-10 h-10 rounded-full object-cover"
              src={activeChat.avatar}
              alt={activeChat.name}
            />
            <span className="absolute bottom-0 right-0 bg-[#10B981] rounded-full w-2.5 h-2.5 border-2 border-white"></span>
          </div>
          <div>
            <h2 className="text-sm font-bold text-gray-900 leading-none">
              {activeChat.name}
            </h2>
            <span className="text-[11px] text-gray-400">Online</span>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button className="p-2 text-blue-500 hover:bg-gray-50 rounded-full transition-colors">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
              />
            </svg>
          </button>
          <button className="p-2 text-blue-500 hover:bg-gray-50 rounded-full transition-colors">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-8 space-y-6">
        <div className="text-center">
          <span className="text-xs text-gray-400 tracking-wide">Today</span>
        </div>
        <div className="flex flex-col items-start space-y-1 max-w-[70%]">
          <div className="bg-[#F3F4F6]/70 text-gray-800 text-sm p-3.5 px-5 rounded-2xl rounded-tl-none leading-relaxed">
            Hello how are you were are you from
          </div>
          <span className="text-[10px] text-gray-400 pl-1">10:2pm</span>
        </div>
        <div className="flex flex-col items-end space-y-1 max-w-[70%] ml-auto">
          <div className="bg-[#3B82F6] text-white text-sm p-3.5 px-5 rounded-2xl rounded-tr-none leading-relaxed shadow-sm shadow-blue-50/50">
            Hello how are you were are you from
          </div>
          <span className="text-[10px] text-gray-400 pr-1">10:30pm</span>
        </div>
      </div>
      <div className="p-6 px-8 flex items-center space-x-4 bg-white">
        <div className="flex-1 relative flex items-center">
          <span className="absolute left-4 text-gray-400 cursor-pointer hover:text-gray-600 transition-colors">
            😊
          </span>
          <input
            type="text"
            value={typedMessage}
            onChange={(e) => setTypedMessage(e.target.value)}
            placeholder="Messages"
            className="w-full bg-[#F3F4F6]/60 text-sm text-gray-800 pl-12 pr-4 py-3 rounded-full focus:outline-none"
          />
        </div>
        <button className="p-3 bg-[#F3F4F6]/60 text-blue-500 rounded-full hover:bg-blue-50 transition-colors">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

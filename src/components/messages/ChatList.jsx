export default function ChatList({ chats, activeChat, setActiveChat }) {
  const onlineUsers = [
    {
      id: 1,
      img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
    },
    {
      id: 2,
      img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    },
    {
      id: 3,
      img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    },
    {
      id: 4,
      img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
    },
  ];

  return (
    <div className="w-full md:w-80 bg-white border-r border-gray-100 flex flex-col h-full overflow-hidden">
      <div className="p-6 pb-2">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
          Messages
        </h1>
      </div>
      <div className="px-6 mb-4 relative">
        <span className="absolute inset-y-0 left-0 flex items-center pl-10 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </span>
        <input
          type="text"
          placeholder="Sana fatima|"
          className="w-full bg-[#F3F4F6]/60 text-sm text-gray-700 pl-10 pr-4 py-2.5 rounded-xl focus:outline-none placeholder-gray-400"
        />
      </div>
      <div className="px-6 flex items-center space-x-3 overflow-x-auto pb-4 scrollbar-none border-b border-gray-50">
        <div className="relative flex-shrink-0 cursor-pointer">
          <img
            className="w-11 h-11 rounded-full object-cover border border-gray-200"
            src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150"
            alt="me"
          />
          <span className="absolute bottom-0 right-0 bg-[#3B82F6] text-white rounded-full w-4 h-4 flex items-center justify-center text-xs font-bold border-2 border-white">
            +
          </span>
        </div>
        {onlineUsers.map((user) => (
          <div key={user.id} className="relative flex-shrink-0">
            <img
              className="w-11 h-11 rounded-full object-cover"
              src={user.img}
              alt="online user"
            />
            <span className="absolute bottom-0 right-0 bg-[#10B981] rounded-full w-3 h-3 border-2 border-white"></span>
          </div>
        ))}
      </div>
      <div className="flex-1 overflow-y-auto divide-y divide-gray-50/50">
        {chats.map((chat) => {
          const isSelected = activeChat?.id === chat.id;
          return (
            <div
              key={chat.id}
              onClick={() => setActiveChat(chat)}
              className={`flex items-center justify-between p-4 px-6 cursor-pointer transition-colors ${
                isSelected ? "bg-gray-50/80" : "hover:bg-gray-50/40"
              }`}
            >
              <div className="flex items-center space-x-3 min-w-0">
                <img
                  className="w-11 h-11 rounded-full object-cover flex-shrink-0"
                  src={chat.avatar}
                  alt={chat.name}
                />
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold text-gray-900 truncate">
                    {chat.name}
                  </h3>
                  <p className="text-xs text-gray-400 truncate mt-0.5">
                    {chat.subText}
                  </p>
                </div>
              </div>
              <span className="text-[10px] text-gray-400 whitespace-nowrap self-start mt-1">
                {chat.time}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

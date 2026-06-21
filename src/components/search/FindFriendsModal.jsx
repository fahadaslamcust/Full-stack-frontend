import { X, Search } from "lucide-react";
import { useState } from "react";

const initialUsers = [
  {
    id: 1,
    name: "Sana Fatima",
    role: "Computer Science",
    followers: "1055 Followers",
    avatar: "https://i.pravatar.cc/100?img=5",
  },
  {
    id: 2,
    name: "Sana Fatima",
    role: "Computer Science",
    followers: "1055 Followers",
    avatar: "https://i.pravatar.cc/100?img=9",
  },
  {
    id: 3,
    name: "Sana Fatima",
    role: "Computer Science",
    followers: "1055 Followers",
    avatar: "https://i.pravatar.cc/100?img=12",
  },
  {
    id: 4,
    name: "Sana Fatima",
    role: "Computer Science",
    followers: "1055 Followers",
    avatar: "https://i.pravatar.cc/100?img=16",
  },
  {
    id: 5,
    name: "Sana Fatima",
    role: "Computer Science",
    followers: "1055 Followers",
    avatar: "https://i.pravatar.cc/100?img=21",
  },
  {
    id: 6,
    name: "Sana Fatima",
    role: "Computer Science",
    followers: "1055 Followers",
    avatar: "https://i.pravatar.cc/100?img=25",
  },
];

const categories = ["All", "Cs", "Software Engineer", "Art"];

export default function FindFriendsModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("Sana Fatima");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-[28px] p-6 shadow-2xl relative flex flex-col max-h-[85vh] transition-all animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition"
        >
          <X size={18} />
        </button>
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
            Find Friends
          </h2>
        </div>
        <div className="mb-4 relative">
          <span className="absolute inset-y-0 left-4 flex items-center text-gray-400">
            <Search size={16} />
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search friends..."
            className="w-full bg-[#F3F4F6]/70 pl-11 pr-4 py-2.5 rounded-full text-sm outline-none text-gray-700 placeholder-gray-400"
          />
        </div>
        <div className="flex gap-2 mb-5 overflow-x-auto hide-scrollbar pb-1 flex-shrink-0">
          {categories.map((cat) => {
            const isActive = activeTab === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? "bg-[#3B82F6] text-white shadow-sm"
                    : "bg-[#F3F4F6] text-gray-500 hover:bg-gray-200"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
        <div className="flex-1 overflow-y-auto space-y-4 pr-1 hide-scrollbar">
          {initialUsers.map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-between gap-3 py-0.5"
            >
              <div className="flex items-center gap-3">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-10 h-10 rounded-full object-cover border border-gray-100 shadow-sm"
                />
                <div>
                  <h4 className="text-sm font-bold text-gray-900 leading-tight">
                    {user.name}
                  </h4>
                  <p className="text-[11px] text-gray-400 font-medium">
                    {user.role}
                  </p>
                  <p className="text-[10px] text-gray-400/90 tracking-wide mt-0.5">
                    {user.followers}
                  </p>
                </div>
              </div>

              {/* دائیں طرف: فالو بٹن */}
              <button className="px-5 py-1.5 bg-[#3B82F6] hover:bg-blue-600 text-white text-xs font-semibold rounded-full transition shadow-sm hover:shadow">
                Follow
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

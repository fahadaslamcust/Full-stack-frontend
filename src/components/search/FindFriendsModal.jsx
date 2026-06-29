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
    name: "Areeba Khan",
    role: "Computer Science",
    followers: "980 Followers",
    avatar: "https://i.pravatar.cc/100?img=9",
  },
  {
    id: 3,
    name: "Ali Ahmed",
    role: "Software Engineer",
    followers: "1500 Followers",
    avatar: "https://i.pravatar.cc/100?img=12",
  },
  {
    id: 4,
    name: "Hina Noor",
    role: "Software Engineer",
    followers: "1200 Followers",
    avatar: "https://i.pravatar.cc/100?img=16",
  },
  {
    id: 5,
    name: "Zain",
    role: "Art",
    followers: "800 Followers",
    avatar: "https://i.pravatar.cc/100?img=21",
  },
  {
    id: 6,
    name: "Sana Fatima",
    role: "Art",
    followers: "1055 Followers",
    avatar: "https://i.pravatar.cc/100?img=25",
  },
];

const categories = ["All", "Cs", "Software Engineer", "Art"];

export default function FindFriendsModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");

  if (!isOpen) return null;

  const filteredUsers = initialUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.role.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      activeTab === "All" ||
      (activeTab === "Cs" &&
        user.role.toLowerCase() === "computer science") ||
      (activeTab === "Software Engineer" &&
        user.role.toLowerCase() === "software engineer") ||
      (activeTab === "Art" &&
        user.role.toLowerCase() === "art");

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-[28px] p-6 shadow-2xl flex flex-col max-h-[85vh] relative">

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1 rounded-full hover:bg-gray-100"
        >
          <X size={18} />
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold mb-4">
          Find Friends
        </h2>

        {/* Search */}
        <div className="relative mb-4">
          <Search
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search by name or role..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-gray-100 rounded-full py-2.5 pl-11 pr-4 outline-none text-sm"
          />
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-5 overflow-x-auto hide-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap ${
                activeTab === cat
                  ? "bg-[#3B82F6] text-white"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Users */}
        <div className="flex-1 overflow-y-auto space-y-4 hide-scrollbar">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />

                  <div>
                    <h4 className="text-sm font-semibold">
                      {user.name}
                    </h4>

                    <p className="text-xs text-gray-500">
                      {user.role}
                    </p>

                    <p className="text-[10px] text-gray-400">
                      {user.followers}
                    </p>
                  </div>
                </div>

                <button className="px-5 py-1.5 rounded-full bg-[#3B82F6] text-white text-xs font-medium hover:bg-blue-600">
                  Follow
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-400 py-8">
              No friends found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
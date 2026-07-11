import { X, Search } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  useSearchUsers,
  useFollowUser,
  useNetwork,
  useUnfollowUser,
} from "../../hooks/useUsers";

const categories = ["All", "Cs", "Software Engineer", "Art"];

export default function FindFriendsModal({ isOpen, onClose }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const followMutation = useFollowUser();
  const unfollowMutation = useUnfollowUser();
  const { data: network } = useNetwork();

  const followingIds = (network?.following || []).map((u) => u._id || u.id);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    return () => clearTimeout(handler);
  }, [search]);

  const { data: searchResults, isLoading } = useSearchUsers({
    name: debouncedSearch.trim(),
  });

  const users = Array.isArray(searchResults) ? searchResults : [];

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
        <div className="flex-1 overflow-y-auto space-y-4 pr-1 hide-scrollbar min-h-32">
          {isLoading && search.trim() ? (
            <div className="flex justify-center items-center py-6">
              <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : users.length === 0 ? (
            <p className="text-sm text-gray-500 text-center py-6">
              No users found.
            </p>
          ) : (
            users.map((user) => (
              <div
                key={user._id || user.id}
                className="flex items-center justify-between gap-3 py-0.5"
              >
                <div
                  className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition"
                  onClick={() => {
                    onClose();
                    navigate(`/dashboard/user/${user._id || user.id}`);
                  }}
                >
                  {user.avatar ? (
                    <img
                      src={
                        user.avatar.startsWith("http")
                          ? user.avatar
                          : `https://full-stack-backend-d1g9.onrender.com${user.avatar}`
                      }
                      alt={user.name}
                      className="w-10 h-10 rounded-full object-cover border border-gray-100 shadow-sm"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                      {user.name?.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 leading-tight">
                      {user.name}
                    </h4>
                    <p className="text-[11px] text-gray-400 font-medium truncate max-w-48">
                      {user.bio || user.university || "Student"}
                    </p>
                    <p className="text-[10px] text-gray-400/90 tracking-wide mt-0.5">
                      {user.followers?.length || 0} Followers
                    </p>
                  </div>
                </div>

                {followingIds.includes(user._id || user.id) ? (
                  <button
                    onClick={() => unfollowMutation.mutate(user._id || user.id)}
                    disabled={unfollowMutation.isPending}
                    className="px-5 py-1.5 bg-gray-200 hover:bg-gray-300 disabled:opacity-50 text-gray-700 text-xs font-semibold rounded-full transition shadow-sm"
                  >
                    Unfollow
                  </button>
                ) : (
                  <button
                    onClick={() => followMutation.mutate(user._id || user.id)}
                    disabled={followMutation.isPending}
                    className="px-5 py-1.5 bg-[#3B82F6] hover:bg-blue-600 disabled:bg-blue-300 text-white text-xs font-semibold rounded-full transition shadow-sm hover:shadow"
                  >
                    Follow
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

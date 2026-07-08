import { Menu, Bell } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useCurrentUser } from "../../hooks/useUsers";

export default function Navbar({ onMenuClick }) {
  const location = useLocation();
  const { data: currentUser } = useCurrentUser();

  const userAvatarRaw =
    currentUser?.avatar ||
    (() => {
      try {
        return JSON.parse(localStorage.getItem("user") || "{}").avatar;
      } catch {
        return null;
      }
    })();
  const userAvatar = userAvatarRaw
    ? userAvatarRaw.startsWith("http")
      ? userAvatarRaw
      : `https://full-stack-backend-d1g9.onrender.com${userAvatarRaw}`
    : null;
  const getHeaderTitle = () => {
    const path = location.pathname;
    if (path.includes("events")) return "Events";
    if (path.includes("setting")) return "Settings";
    if (path.includes("search")) return "Search";
    if (path.includes("messages")) return "Messages";
    if (path.includes("setting")) return "Settings";
    if (path.includes("profile")) return "Profile";
    return "Dashboard"; // Default title
  };

  return (
    <header className="md:hidden w-full h-14 bg-white border-b border-gray-100 px-4 flex items-center justify-between sticky top-0 z-30 shadow-xs">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="p-1.5 hover:bg-gray-50 rounded-xl text-gray-600 transition active:scale-95"
          aria-label="Open Sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>
        <h1 className="text-base font-bold text-gray-900 tracking-tight">
          {getHeaderTitle()}
        </h1>
      </div>

      <div className="flex items-center gap-2">
        <button className="p-1.5 hover:bg-gray-50 text-gray-500 rounded-full relative transition">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        {/* Small User Image Status Circle */}
        <div className="w-7 h-7 rounded-full overflow-hidden border border-gray-200 ml-1 cursor-pointer bg-blue-500 flex items-center justify-center text-white text-xs font-bold">
          {userAvatar ? (
            <img
              src={userAvatar}
              alt="Profile View"
              className="w-full h-full object-cover"
            />
          ) : (
            (currentUser?.name || "U").charAt(0).toUpperCase()
          )}
        </div>
      </div>
    </header>
  );
}

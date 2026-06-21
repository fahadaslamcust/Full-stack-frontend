import { Menu, Bell } from "lucide-react";
import { useLocation } from "react-router-dom";

export default function Navbar({ onMenuClick }) {
  const location = useLocation();
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
        <div className="w-7 h-7 rounded-full overflow-hidden border border-gray-200 ml-1 cursor-pointer">
          <img 
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&auto=format&fit=crop&q=60" 
            alt="Profile View" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>

    </header>
  );
}
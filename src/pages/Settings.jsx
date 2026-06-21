import { useState } from "react";
import AccountSettings from "../components/setting/AccountSetting";
import PreferenceAndPrivacy from "../components/setting/PreferenceAndPrivacy";
import LogoutButton from "../components/setting/LogoutButton";

export default function Settings() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [user, setUser] = useState({
    name: "Peterson",
    email: "Peterson@gmail.com",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=60"
  });

  const handleLogout = () => {
    alert("Logging out...");
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="flex-1 flex flex-col lg:flex-row h-screen bg-[#ffffff] w-full p-0 px-6 py-4 md:py-1 lg:py-1 gap-4 md:gap-6">
      <section className="w-full lg:w-[400px] flex flex-col justify-between h-full">
        <div className="space-y-4 overflow-y-auto hide-scrollbar">
          <div>
            <h1 className="hidden md:block font-bold text-[#2D2D2D] tracking-tight">Settings</h1>
          </div>
           <div className="flex items-center gap-3 bg-[#F9FAFB] p-4 rounded-2xl border border-gray-100">
        <img
          src={user?.avatar || "https://i.pravatar.cc/100?img=3"}
          alt="Profile"
          className="w-12 h-12 rounded-full object-cover border border-gray-200"
        />
        <div className="min-w-0">
          <h4 className="text-sm font-bold text-gray-900 truncate">{user?.name || "Peterson"}</h4>
          <p className="text-xs text-gray-400 truncate">{user?.email || "Peterson@gmail.com"}</p>
        </div>
      </div>
          <PreferenceAndPrivacy 
            isDarkMode={isDarkMode} 
            onToggleTheme={toggleTheme} 
          />
        <LogoutButton onLogout={handleLogout} />
        </div>
      </section>
      <section className="hidden lg:flex flex-1 flex-col h-full pt-5 overflow-y-auto hide-scrollbar">
        <div className="border-b border-gray-100 pb-4 mb-6">
          <h2 className="text-lg font-bold text-gray-900">Profile Edit</h2>
        </div>
        <AccountSettings user={user} onAvatarClick={() => alert("Change Photo Clicked")} />
      </section>
    </div>
  );
}
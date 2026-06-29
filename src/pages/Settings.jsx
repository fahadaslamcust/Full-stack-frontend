import { useState } from "react";
import AccountSettings from "../components/setting/AccountSetting";
import PreferenceAndPrivacy from "../components/setting/PreferenceAndPrivacy";
import LogoutButton from "../components/setting/LogoutButton";

export default function Settings() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [user, setUser] = useState({
    name: "Peterson",
    email: "Peterson@gmail.com",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=60",
  });

  const handleLogout = () => {
    alert("Logging out...");
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen w-full bg-white p-4 md:p-6 gap-6 overflow-y-auto">
      <section className="w-full lg:w-[380px] xl:w-[400px] flex-shrink-0">
        <div className="space-y-4">
          <h1 className="text-2xl font-bold text-[#2D2D2D] hidden md:block">
            Settings
          </h1>

          <div className="flex items-center gap-3 bg-[#F9FAFB] p-4 rounded-2xl border border-gray-100">
            <img
              src={user?.avatar}
              alt="Profile"
              className="w-12 h-12 rounded-full object-cover border border-gray-200"
            />

            <div className="min-w-0">
              <h4 className="text-sm font-bold truncate">{user?.name}</h4>

              <p className="text-xs text-gray-400 truncate">{user?.email}</p>
            </div>
          </div>

          <PreferenceAndPrivacy
            isDarkMode={isDarkMode}
            onToggleTheme={toggleTheme}
          />

          <LogoutButton onLogout={handleLogout} />
        </div>
      </section>
      <section className=" pt-0 lg:pt-5">
        <div className="border-b border-gray-100 pb-4 mb-6">
          <h2 className="text-lg font-bold text-gray-900">Profile Edit</h2>
        </div>

        <AccountSettings
          user={user}
          onAvatarClick={() => alert("Change Photo Clicked")}
        />
      </section>
    </div>
  );
}

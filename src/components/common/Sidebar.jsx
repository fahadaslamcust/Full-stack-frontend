import { Plus } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCurrentUser } from "../../hooks/useUsers";
import { useLogout } from "../../hooks/useAuth";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const logout = useLogout();
  const { data: currentUser } = useCurrentUser();

  // Read user from localStorage as a fast fallback before query resolves
  const storedUser = (() => {
    try { return JSON.parse(localStorage.getItem('user') || '{}'); } catch { return {}; }
  })();

  const userName = currentUser?.name || storedUser?.name || "User";
  const userRole = currentUser?.university || storedUser?.university || "Student";
  const userAvatarRaw = currentUser?.avatar || storedUser?.avatar || null;
  const userAvatar = userAvatarRaw ? (userAvatarRaw.startsWith('http') ? userAvatarRaw : `http://localhost:5000${userAvatarRaw}`) : null;

  const menuItems = [
    { name: "Home", path: "/dashboard", icon: "/icons/home.png" },
    { name: "Explore Events", path: "/dashboard/events", icon: "/icons/event.png" },
    { name: "Messages", path: "/dashboard/messages", icon: "/icons/messages.png" },
    { name: "Settings", path: "/dashboard/settings", icon: "/icons/settings.png" },
    { name: "Search", path: "/dashboard/search", icon: "/icons/search.png" },
    { name: "Notifications", path: "/dashboard/notifications", icon: "/icons/notifications.png" },
  ];

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <aside className="w-64  bg-white border-r border-gray-100 hidden flex-col justify-between p-6 md:flex sticky top-0 h-screen shrink-0">
      <div className="space-y-8 flex flex-col h-[calc(100%-60px)]">
        {/* Logo */}
        <div className="flex items-center space-x-2 px-3 shrink-0">
          <img
            className="w-8 h-8 object-contain"
            src="/images/login-logo.png"
            alt="Campus Connect Logo"
          />
        </div>

        {/* Navigation Links & Create Button */}
        <div className="flex-1 flex flex-col justify-between overflow-y-auto hide-scrollbar pb-4">
          <nav className="space-y-2">
            {menuItems.map((item) => {
              const isSelected = location.pathname === item.path;

              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl font-medium text-sm transition-all ${
                    isSelected
                      ? "bg-[#4285F4] text-white shadow-md"
                      : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <img
                    src={item.icon}
                    alt={item.name}
                    className={`w-6 h-6 object-contain ${
                      isSelected
                        ? "brightness-0 invert"
                        : "brightness-0 opacity-60"
                      }`}
                  />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Create Post Button */}
          <div className="pl-2 mt-auto">
            <button 
              onClick={() => navigate("/create-post")}
              className="w-10 h-10 flex items-center justify-center space-x-2 bg-[#4285F4] hover:bg-blue-600 text-white font-medium text-sm rounded-full transition-all shadow-sm hover:shadow-md"
            >
              <Plus className="w-5 h-5 shrink-0" />
            </button>
          </div>
        </div>
      </div>

      {/* User Profile Footer */}
      <div
        className="flex items-center justify-between border-t border-gray-100 pt-4 shrink-0 cursor-pointer group"
        onClick={handleLogout}
        title="Click to logout"
      >
        <div className="flex items-center space-x-3 min-w-0">
          {userAvatar ? (
            <img
              className="w-10 h-10 rounded-full object-cover border border-gray-200 shrink-0"
              src={userAvatar}
              alt={userName}
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-sm shrink-0">
              {userName.charAt(0).toUpperCase()}
            </div>
          )}
          <div className="min-w-0">
            <p className="text-sm font-semibold text-gray-900 truncate">{userName}</p>
            <p className="text-xs text-gray-400 truncate">{userRole}</p>
          </div>
        </div>
        <svg className="w-4 h-4 text-gray-400 group-hover:text-red-400 shrink-0 transition" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
      </div>
    </aside>
  );
};

export default Sidebar;
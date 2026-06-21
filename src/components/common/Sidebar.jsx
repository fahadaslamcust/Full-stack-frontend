import { Plus } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const menuItems = [
    {
      name: "Home",
      path: "/dashboard",
      icon: "/icons/home.png",
    },
    {
      name: "Explore Events",
      path: "/dashboard/events",
      icon: "/icons/event.png",
    },
    {
      name: "Messages",
      path: "/dashboard/messages",
      icon: "/icons/messages.png",
    },
    {
      name: "Settings",
      path: "/dashboard/settings",
      icon: "/icons/settings.png",
    },
    {
      name: "Search",
      path: "/dashboard/search",
      icon: "/icons/search.png",
    },
    {
      name: "Notifications",
      path: "/dashboard/notifications",
      icon: "/icons/notifications.png",
    },
  ];

  return (
    <aside className="w-64  bg-white border-r border-gray-100 flex flex-col justify-between p-6 hidden md:flex sticky top-0 h-screen flex-shrink-0">
      <div className="space-y-8 flex flex-col h-[calc(100%-60px)]">
        {/* Logo */}
        <div className="flex items-center space-x-2 px-3 flex-shrink-0">
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
                      ? "bg-[#3B82F6] text-white shadow-md"
                      : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <img
                    src={item.icon}
                    alt={item.name}
                    className={`w-6 h-6 object-contain ${
                      isSelected
                        ? "invert brightness-0 saturate-100"
                        : "opacity-100"
                      }`}
                  />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* ====== PROPERLY STYLED CREATE POST BUTTON ====== */}
          <div className="pl-2 mt-auto">
            <button 
              onClick={() => navigate("/create-post")}
              className="w-10 h-10 flex items-center justify-center space-x-2 bg-[#3B82F6] hover:bg-blue-600 text-white font-medium text-sm rounded-full transition-all shadow-sm hover:shadow-md"
            >
              <Plus className="w-5 h-5 flex-shrink-0" />
            </button>
          </div>
        </div>
      </div>

      {/* User Profile Footer */}
      <div className="flex items-center space-x-3 border-t border-gray-100 pt-4 flex-shrink-0">
        <img
          className="w-10 h-10 rounded-full object-cover border border-gray-200"
          src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=60"
          alt="User Avatar"
        />
        <div>
          <p className="text-sm font-semibold text-gray-900">Wajiha</p>
          <p className="text-xs text-gray-400">CSS Student</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Sidebar = ({ isOpen, onClose, isCollapsed, onToggleCollapse }) => {
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
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
    fixed md:sticky
    top-14 md:top-0
    left-0
    z-50
    h-[calc(100vh-56px)] md:h-screen
    ${isCollapsed ? "md:w-20" : "md:w-64"} w-64
    bg-white
    border-r border-gray-100
    flex flex-col justify-between
    ${isCollapsed ? "p-3" : "p-6"}
    transition-all duration-300
    ${isOpen ? "translate-x-0" : "-translate-x-full"}
    md:translate-x-0
  `}
      >
        <div className="space-y-8 flex flex-col h-[calc(100%-60px)]">
          {/* Logo */}
          <div
            className={`flex items-center ${
              isCollapsed ? "justify-center" : "px-3"
            }`}
          >
            <img
              className="w-8 h-8 object-contain"
              src="/images/login-logo.png"
              alt="Logo"
            />
          </div>
          <button
            onClick={onToggleCollapse}
            className="hidden md:flex absolute -right-3 top-8 w-7 h-7 bg-white border rounded-full shadow items-center justify-center"
          >
            {isCollapsed ? (
              <ChevronRight size={16} />
            ) : (
              <ChevronLeft size={16} />
            )}
          </button>
          {/* Navigation */}
          <div className="flex-1 flex flex-col justify-between overflow-y-auto hide-scrollbar pb-4">
            <nav className="space-y-2">
              {menuItems.map((item) => {
                const isSelected = location.pathname === item.path;

                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={onClose}
                    className={`flex items-center rounded-xl py-3 text-sm font-medium transition-all ${
                      isCollapsed ? "justify-center px-0" : "gap-3 px-4"
                    } ${
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
                          ? "invert brightness-0 saturate-100"
                          : "grayscale brightness-50 opacity-80"
                      }`}
                    />

                    {!isCollapsed && <span>{item.name}</span>}
                  </Link>
                );
              })}
            </nav>

            {/* Create Button */}
            <div
              className={`mt-auto ${
                isCollapsed ? "flex justify-center" : "pl-2"
              }`}
            >
              <button
                onClick={() => {
                  navigate("/create-post");
                  onClose();
                }}
                className="w-10 h-10 rounded-full bg-[#4285F4] hover:bg-blue-600 text-white flex items-center justify-center shadow-md transition"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* User */}
        <div className="flex items-center gap-3 border-t border-gray-100 pt-4">
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
    </>
  );
};

export default Sidebar;

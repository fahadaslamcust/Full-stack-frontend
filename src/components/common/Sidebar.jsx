import { useState } from "react";

const Sidebar = () => {
  const [activeMenu, setActiveMenu] = useState("Home");
  return (
    <aside className="w-64 bg-white border-r border-gray-100 flex flex-col justify-between p-6 hidden md:flex sticky top-0 h-screen">
      <div className="space-y-8">
        <div className="flex items-center space-x-2 px-3 text-[#3B82F6]">
          <img
            className="w-8 h-8 text-[#3B82F6]"
            viewBox="0 0 24 24"
            fill="currentColor"
            src="/images/login-logo.png"
          />
        </div>
        <nav className="space-y-2">
          {[
            {
              name: "Home",
              icon: "M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25",
            },
            {
              name: "Explore Events",
              icon: "M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5",
            },
            {
              name: "Messages",
              icon: "M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501c1.153-.086 2.294-.213 3.423-.379 1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z",
            },
            {
              name: "Settings",
              icon: "M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.43l-1.003.767c-.304.233-.464.607-.428.992.003.041.005.082.005.124s-.002.083-.005.124c-.036.385.124.759.428.992l1.003.767a1.125 1.125 0 01.26 1.43l-1.296 2.247a1.125 1.125 0 01-1.37.49l-1.216-.456c-.356-.133-.751-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.43l1.003-.767c.304-.233.464-.607.428-.992a5.58 5.58 0 01-.006-.124c0-.042.002-.083.006-.124.036-.385-.124-.759-.428-.992l-1.003-.767a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.49l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.28z",
            },
            {
              name: "Search",
              icon: "M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z",
            },
            {
              name: "Notifications",
              icon: "M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0",
            },
          ].map((item) => {
            const isSelected = activeMenu === item.name;
            return (
              <button
                key={item.name}
                onClick={() => setActiveMenu(item.name)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium text-sm transition-all ${
                  isSelected
                    ? "bg-[#3B82F6] text-white shadow-md shadow-blue-100"
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d={item.icon}
                  />
                </svg>
                <span>{item.name}</span>
              </button>
            );
          })}
        </nav>
      </div>
      <div className="flex items-center space-x-3 border-t border-gray-100 pt-4">
        <img
          className="w-10 h-10 rounded-full object-cover border border-gray-200"
          src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=60"
          alt="User avatar"
        />
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-gray-900">wajiha</span>
          <span className="text-xs text-gray-400">CSS Student</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

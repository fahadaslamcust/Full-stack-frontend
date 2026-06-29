import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/common/Sidebar";
import Navbar from "../components/common/Navbar";
import NotificationModal from "../components/notifications/NotificationModal";

export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
 const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  return (
    <div className="flex flex-col md:flex-row min-h-screen w-full bg-[#f8f8f8]">
      <Sidebar
        onNotificationClick={() => setIsNotificationOpen(true)}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <Navbar onMenuClick={() => setIsSidebarOpen(true)} onNotificationClick={() => setIsNotificationOpen(true)} />
        <NotificationModal
          isOpen={isNotificationOpen}
          onClose={() => setIsNotificationOpen(false)}
        />
        <main className="flex-1 overflow-y-auto">
          <Outlet context={{ isSidebarOpen, setIsSidebarOpen }} />
        </main>
      </div>
    </div>
  );
}

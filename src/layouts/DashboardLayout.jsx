import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/common/Sidebar";
import Navbar from "../components/common/Navbar"; // Navbar import ki

export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row h-screen w-screen overflow-hidden bg-[#f8f8f8] relative">
      
      {/* ====== RESPONSIVE SIDEBAR ====== */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* ====== RIGHT MAIN CONTAINER AREA ====== */}
      <div className="flex-1 flex flex-col h-full w-full min-w-0 overflow-hidden">
        
        {/* Yahan Navbar lagayi! 
          Yeh mobile par sub-screens ke top par unka trigger aur name handle karegi.
        */}
        <Navbar onMenuClick={() => setIsSidebarOpen(true)} />

        {/* Router Render Target Page Viewports */}
        <main className="flex-1 h-full w-full overflow-hidden">
          <Outlet context={{ isSidebarOpen, setIsSidebarOpen }} />
        </main>

      </div>
    </div>
  );
}
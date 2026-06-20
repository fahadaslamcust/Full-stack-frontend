import { Outlet } from "react-router-dom";
import Sidebar from "../components/common/Sidebar";

const DashboardLayout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <main className=" min-h-screen">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

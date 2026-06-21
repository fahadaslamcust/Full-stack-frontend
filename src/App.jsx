import { Routes, Route } from "react-router-dom";

import DashboardLayout from "./layouts/DashboardLayout";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import Events from "./pages/Events";
import Messages from "./pages/Messages";
import Search from "./pages/Search";
import Settings from "./pages/Settings";

function App() {
  return (
    <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/events" element={<Events />} />
        <Route path="/dashboard/messages" element={<Messages/>} />
        <Route path="/dashboard/search" element={<Search />} />
        <Route path="/dashboard/settings" element={<Settings />} />
      </Route>

    </Routes>
  );
}

export default App;
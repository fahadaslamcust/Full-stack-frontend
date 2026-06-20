import { Routes, Route } from "react-router-dom";

import DashboardLayout from "./layouts/DashboardLayout";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import Events from "./pages/Events";

function App() {
  return (
    <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/events" element={<Events />} />
      </Route>

    </Routes>
  );
}

export default App;
import { LogOut } from "lucide-react";

export default function LogoutButton({ onLogout }) {
  return (
    <div className="pt-4">
      <button
        onClick={onLogout}
        className="w-full py-3 bg-[#FF3B30] hover:bg-red-600 text-white font-semibold text-sm rounded-2xl transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2"
      >
        <LogOut size={16} />
        <span>Log Out</span>
      </button>
    </div>
  );
}
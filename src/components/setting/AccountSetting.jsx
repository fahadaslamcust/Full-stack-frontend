import { Camera } from "lucide-react";

export default function AccountSettings({ user, onAvatarClick }) {
  return (
    <div className="space-y-6">
      <div className="hidden lg:flex flex-col items-center justify-center pt-8">
        <div className="relative group cursor-pointer" onClick={onAvatarClick}>
          <div className="w-32 h-32 rounded-full bg-gray-200 border-2 border-gray-100 overflow-hidden shadow-inner">
            <img
              src={user?.avatar || "https://i.pravatar.cc/100?img=3"}
              alt="Profile Edit"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute bottom-1 right-1 w-9 h-9 bg-white border border-gray-200 shadow-md rounded-full flex items-center justify-center text-gray-600 hover:text-blue-500 transition">
            <Camera size={16} />
          </div>
        </div>
      </div>
    </div>
  );
}
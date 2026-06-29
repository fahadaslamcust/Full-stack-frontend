import { Camera } from "lucide-react";

export default function AccountSettings({ user, onAvatarClick }) {
  return (
    <div className="w-full flex flex-col items-center p-6 md:y-8">
      <div
        className="relative cursor-pointer group"
        onClick={onAvatarClick}
      >
        {/* Avatar */}
        <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-gray-100 shadow-inner bg-gray-200">
          <img
            src={user?.avatar || "https://i.pravatar.cc/100?img=3"}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Camera Icon */}
        <button
          type="button"
          className="absolute bottom-1 right-1 flex items-center justify-center
                     w-8 h-8 sm:w-9 sm:h-9 rounded-full
                     bg-white border border-gray-200 shadow-md
                     hover:text-blue-500 transition"
        >
          <Camera size={16} />
        </button>
      </div>

      {/* User Info */}
      <div className="mt-4 text-center">
        <h2 className="text-lg md:text-xl font-semibold text-gray-900">
          {user?.name}
        </h2>

        <p className="text-sm text-gray-500 break-all">
          {user?.email}
        </p>
      </div>
    </div>
  );
}
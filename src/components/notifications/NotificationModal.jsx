import { X } from "lucide-react";

const notifications = [
  {
    id: 1,
    name: "Sana Fatima",
    message: "liked your post.",
    time: "2 min ago",
    avatar: "https://i.pravatar.cc/100?img=5",
    unread: true,
  },
  {
    id: 2,
    name: "Ali Khan",
    message: "started following you.",
    time: "10 min ago",
    avatar: "https://i.pravatar.cc/100?img=8",
    unread: true,
  },
  {
    id: 3,
    name: "Ayesha Noor",
    message: "commented on your event.",
    time: "30 min ago",
    avatar: "https://i.pravatar.cc/100?img=12",
    unread: false,
  },
  {
    id: 4,
    name: "Ahmed Raza",
    message: "invited you to an event.",
    time: "1 hour ago",
    avatar: "https://i.pravatar.cc/100?img=16",
    unread: false,
  },
  {
    id: 5,
    name: "Fatima Zahra",
    message: "shared your post.",
    time: "Yesterday",
    avatar: "https://i.pravatar.cc/100?img=20",
    unread: false,
  },
];

export default function NotificationModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-[2px] flex items-center justify-center p-4">
      <div className="relative w-full max-w-md bg-white rounded-[28px] p-6 shadow-2xl flex flex-col max-h-[85vh] animate-in fade-in zoom-in-95 duration-200">

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1 rounded-full hover:bg-gray-100 transition"
        >
          <X size={18} className="text-gray-500" />
        </button>

        {/* Heading */}
        <div className="mb-5">
          <h2 className="text-2xl font-bold text-gray-900">
            Notifications
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            Stay updated with your latest activity.
          </p>
        </div>
        {/* Notifications */}
        <div className="flex-1 overflow-y-auto hide-scrollbar space-y-3 pr-1">
          {notifications.map((item) => (
            <div
              key={item.id}
              className={`flex items-center gap-3 p-3 rounded-2xl transition hover:bg-gray-50 ${
                item.unread ? "bg-blue-50" : ""
              }`}
            >
              <img
                src={item.avatar}
                alt={item.name}
                className="w-11 h-11 rounded-full object-cover"
              />

              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-800 leading-5">
                  <span className="font-semibold">
                    {item.name}
                  </span>{" "}
                  {item.message}
                </p>

                <p className="text-xs text-gray-400 mt-1">
                  {item.time}
                </p>
              </div>

              {item.unread && (
                <span className="w-2.5 h-2.5 rounded-full bg-[#3B82F6]" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
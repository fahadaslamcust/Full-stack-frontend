import { X } from "lucide-react";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useNotifications, useMarkNotificationAsRead, useMarkAllNotificationsAsRead } from "../../hooks/useNotifications";
import { useSocket } from "../../context/SocketContext";
import apiClient from "../../api/client";

export default function NotificationModal({ isOpen, onClose }) {
  const { data: notifications = [], isLoading } = useNotifications();
  const markAsReadMutation = useMarkNotificationAsRead();
  const markAllAsReadMutation = useMarkAllNotificationsAsRead();
  
  const socket = useSocket();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!socket) return;

    const handleNewNotification = (newNotification) => {
      queryClient.setQueryData(['notifications'], (oldData) => {
        if (!oldData) return [newNotification];
        // Prevent duplicates
        if (oldData.some(n => n._id === newNotification._id)) return oldData;
        return [newNotification, ...oldData];
      });
    };

    socket.on("new_notification", handleNewNotification);

    return () => {
      socket.off("new_notification", handleNewNotification);
    };
  }, [socket, queryClient]);

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

        <div className="mb-5 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Notifications
            </h2>
            <p className="text-sm text-gray-400 mt-1">
              Stay updated with your latest activity.
            </p>
          </div>
          {notifications.some(n => !n.isRead) && (
            <button 
              onClick={() => markAllAsReadMutation.mutate()}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              Mark all as read
            </button>
          )}
        </div>
        {/* Notifications */}
        <div className="flex-1 overflow-y-auto hide-scrollbar space-y-3 pr-1">
          {isLoading ? (
            <div className="flex justify-center items-center py-6">
              <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : notifications.length === 0 ? (
            <p className="text-sm text-gray-500 text-center py-6">No notifications yet.</p>
          ) : (
            notifications.map((item) => (
              <div
                key={item._id}
                onClick={() => {
                  if (!item.isRead) markAsReadMutation.mutate(item._id);
                }}
                className={`flex items-center gap-3 p-3 rounded-2xl transition cursor-pointer hover:bg-gray-50 ${
                  !item.isRead ? "bg-blue-50" : ""
                }`}
              >
                {item.sender?.avatar ? (
                  <img
                    src={item.sender.avatar.startsWith('http') ? item.sender.avatar : `${apiClient.defaults.baseURL.replace('/api/v1', '')}${item.sender.avatar}`}
                    alt={item.sender?.name}
                    className="w-11 h-11 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-11 h-11 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                    {(item.sender?.name || "U").charAt(0).toUpperCase()}
                  </div>
                )}

                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-800 leading-5">
                    <span className="font-semibold">
                      {item.sender?.name || "Someone"}
                    </span>{" "}
                    {item.content || item.message}
                  </p>

                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </p>
                </div>

                {!item.isRead && (
                  <span className="w-2.5 h-2.5 rounded-full bg-[#3B82F6]" />
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
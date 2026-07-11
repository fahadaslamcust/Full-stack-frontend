import apiClient from "../api/client";
import { useMarkAllNotificationsAsRead, useMarkNotificationAsRead, useNotifications } from "../hooks/useNotifications";
import { useSocket } from "../context/SocketContext";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export default function Notifications() {
  const [notificationsEnabled] = useState(
    localStorage.getItem("notificationsEnabled") !== "false"
  );
  const { data: notifications = [], isLoading } = useNotifications();
  const markAsReadMutation = useMarkNotificationAsRead();
  const markAllAsReadMutation = useMarkAllNotificationsAsRead();
  const socket = useSocket();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!socket|| !notificationsEnabled) return;

    const handleNewNotification = (newNotification) => {
      queryClient.setQueryData(['notifications'], (oldData) => {
        if (!oldData) return [newNotification];
        if (oldData.some(n => n._id === newNotification._id)) return oldData;
        return [newNotification, ...oldData];
      });
    };

    socket.on("new_notification", handleNewNotification);

    return () => {
      socket.off("new_notification", handleNewNotification);
    };
  }, [socket, queryClient, notificationsEnabled]);
if (!notificationsEnabled) {
    return (
      <div className="px-6 py-4 md:py-1 lg:py-1 gap-4 h-screen bg-[#ffffff] flex flex-col items-center justify-center text-center">
        <p className="text-sm text-gray-500">Notifications are turned off. Go to Settings to turn them on.</p>
      </div>
    );
  }
  return (
    <div className="px-6 py-4 md:py-1 lg:py-1 gap-4 h-screen bg-[#ffffff]">
      <h1 className="text-[#2D2D2D] font-bold mb-4">Notifications</h1>

      {notifications.some((n) => !n.isRead) && (
        <button
          onClick={() => markAllAsReadMutation.mutate()}
          className="mb-4 px-5 py-2.5 bg-[#3B82F6] text-white rounded-xl font-medium shadow-md"
        >
          Mark all as read
        </button>
      )}

      <div className="overflow-y-auto hide-scrollbar space-y-3 pr-1">
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
                  src={item.sender.avatar.startsWith('http')
                    ? item.sender.avatar
                    : `${apiClient.defaults.baseURL.replace('/api/v1', '')}${item.sender.avatar}`}
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
  );
}


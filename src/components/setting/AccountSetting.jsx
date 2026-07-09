import { Camera } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { useUpdateAvatar } from "../../hooks/useUsers";
import apiClient from "../../api/client";

export default function AccountSettings({ user, onUpdate, isUpdating }) {
  const [avatar, setAvatar] = useState("");
  const [bio, setBio] = useState("");
  const fileInputRef = useRef(null);
  const updateAvatarMutation = useUpdateAvatar();

  useEffect(() => {
    if (user) {
      // Ensure absolute URL if backend returns relative
      const avatarUrl = user.avatar && !user.avatar.startsWith('http') 
        ? `${apiClient.defaults.baseURL.replace('/api/v1', '')}${user.avatar}` 
        : user.avatar;
      setAvatar(avatarUrl || "");
      setBio(user.bio || "");
    }
  }, [user]);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("avatar", file);
      
      const toastId = toast.loading("Uploading avatar...");
      updateAvatarMutation.mutate(formData, {
        onSuccess: (data) => {
          toast.update(toastId, { render: "Avatar updated!", type: "success", isLoading: false, autoClose: 3000 });
        },
        onError: () => {
          toast.update(toastId, { render: "Failed to upload avatar", type: "error", isLoading: false, autoClose: 3000 });
        }
      });
    }
  };

  const handleSave = () => {
    onUpdate({ avatar, bio });
  };

  return (
    <div className="space-y-6">
      <div className="hidden lg:flex flex-col items-center justify-center pt-8">
        <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
          <div className="w-32 h-32 rounded-full bg-gray-200 border-2 border-gray-100 overflow-hidden shadow-inner">
            <img
              src={avatar || "https://i.pravatar.cc/100?img=3"}
              alt="Profile Edit"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute bottom-1 right-1 w-9 h-9 bg-white border border-gray-200 shadow-md rounded-full flex items-center justify-center text-gray-600 group-hover:scale-105 transition-transform">
            <Camera size={16} />
          </div>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleAvatarChange} 
            accept="image/*" 
            className="hidden" 
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="hidden">
          <label className="block text-sm font-medium text-gray-700 mb-1">Avatar URL</label>
          <input 
            type="text" 
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
            placeholder="https://example.com/avatar.jpg"
            className="w-full bg-[#F9FAFB] border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
          <textarea 
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Tell us about yourself..."
            rows={4}
            className="w-full bg-[#F9FAFB] border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
          />
        </div>

        <button 
          onClick={handleSave}
          disabled={isUpdating}
          className="w-full py-3 bg-[#3B82F6] hover:bg-blue-600 disabled:bg-blue-300 text-white font-semibold text-sm rounded-xl transition-all shadow-sm hover:shadow-md"
        >
          {isUpdating ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
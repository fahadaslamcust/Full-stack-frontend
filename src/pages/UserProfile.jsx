import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Users, UserPlus, UserMinus } from "lucide-react";
import apiClient from "../api/client";
import { useFollowUser, useUnfollowUser, useNetwork } from "../hooks/useUsers";

export default function UserProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const followMutation = useFollowUser();
  const unfollowMutation = useUnfollowUser();
  const { data: network } = useNetwork();

  const followingIds = (network?.following || []).map(u => u._id || u.id);
  const isFollowing = followingIds.includes(id);

  const { data: user, isLoading, isError } = useQuery({
    queryKey: ["user", id],
    queryFn: async () => {
      const res = await apiClient.get(`/users/${id}`);
      return res.data.data;
    },
    enabled: !!id && !!localStorage.getItem("token"),
    retry: false,
  });

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center h-screen bg-white">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (isError || !user) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center h-screen bg-white gap-3">
        <p className="text-red-500 font-medium">User not found</p>
        <button onClick={() => navigate(-1)} className="text-sm text-blue-500 hover:underline">Go Back</button>
      </div>
    );
  }

  const avatar = user.avatar || user.profilePicture;
  const name = user.name || "Unknown";
  const bio = user.bio || "";
  const followersCount = user.followers?.length || 0;
  const followingCount = user.following?.length || 0;

  return (
    <div className="flex-1 h-full bg-white overflow-y-auto hide-scrollbar px-4 sm:px-6 md:px-8 py-6 md:py-8">
      <div className="max-w-2xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-500 hover:text-gray-800 mb-6 transition group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-0.5 transition-transform" />
          <span className="text-sm font-medium">Back</span>
        </button>

        {/* Profile Card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {/* Banner */}
          <div className="h-28 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>

          {/* Avatar + Info */}
          <div className="px-6 pb-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 -mt-12">
              {avatar ? (
                <img
                  src={avatar}
                  alt={name}
                  className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-blue-100 border-4 border-white shadow-md flex items-center justify-center text-3xl font-bold text-blue-600">
                  {name.charAt(0).toUpperCase()}
                </div>
              )}

              <div className="flex-1 min-w-0 pt-2">
                <h1 className="text-xl font-bold text-gray-900 truncate">{name}</h1>
                {bio && <p className="text-sm text-gray-500 mt-1">{bio}</p>}
              </div>

              {/* Follow / Unfollow Button */}
              <div className="self-start sm:self-end pt-2">
                {isFollowing ? (
                  <button
                    onClick={() => unfollowMutation.mutate(id)}
                    disabled={unfollowMutation.isPending}
                    className="flex items-center gap-1.5 px-5 py-2 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 text-gray-700 text-sm font-semibold rounded-full transition"
                  >
                    <UserMinus size={14} />
                    Unfollow
                  </button>
                ) : (
                  <button
                    onClick={() => followMutation.mutate(id)}
                    disabled={followMutation.isPending}
                    className="flex items-center gap-1.5 px-5 py-2 bg-[#3B82F6] hover:bg-blue-600 disabled:bg-blue-300 text-white text-sm font-semibold rounded-full transition shadow-sm"
                  >
                    <UserPlus size={14} />
                    Follow
                  </button>
                )}
              </div>
            </div>

            {/* Stats */}
            <div className="flex gap-6 mt-6 pt-5 border-t border-gray-100">
              <div className="flex items-center gap-2">
                <Users size={16} className="text-gray-400" />
                <span className="text-sm font-bold text-gray-900">{followersCount}</span>
                <span className="text-xs text-gray-400">Followers</span>
              </div>
              <div className="flex items-center gap-2">
                <Users size={16} className="text-gray-400" />
                <span className="text-sm font-bold text-gray-900">{followingCount}</span>
                <span className="text-xs text-gray-400">Following</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

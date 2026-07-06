import { Search, UserPlus, Image, Edit2, Trash2, X, Clock, XCircle } from 'lucide-react';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePosts, useCreatePost } from '../hooks/usePosts';
import { useCurrentUser } from '../hooks/useUsers';
import { useNetwork } from '../hooks/useUsers';
import apiClient from '../api/client';
import { useQueryClient } from '@tanstack/react-query';

export default function CreatePost() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: postsData, isLoading, isError, error } = usePosts();
  const createPostMutation = useCreatePost();

  // Ensure posts is an array
  const posts = Array.isArray(postsData) ? postsData : [];

  // --- Current User ---
  const { data: currentUser } = useCurrentUser();
  const storedUser = (() => {
    try { return JSON.parse(localStorage.getItem('user') || '{}'); } catch { return {}; }
  })();
  const userName = currentUser?.name || storedUser?.name || 'You';
  const userAvatar = currentUser?.profilePicture || storedUser?.profilePicture || null;

  // --- Network (for Tag Friends) ---
  const { data: networkData } = useNetwork();
  
  const rawNetworkList = networkData ? [...(networkData.followers || []), ...(networkData.following || [])] : [];
  const networkUsers = Array.from(new Map(rawNetworkList.map(u => [u._id || u.id, u])).values());

  const [postText, setPostText] = useState('');
  const [mediaFile, setMediaFile] = useState(null);
  const [mediaPreview, setMediaPreview] = useState(null);
  const fileInputRef = useRef(null);

  const [editingPostId, setEditingPostId] = useState(null);
  const [editText, setEditText] = useState('');
  const [postToDelete, setPostToDelete] = useState(null);

  const [taggedIds, setTaggedIds] = useState([]);
  const [friendSearch, setFriendSearch] = useState('');

  const filteredNetwork = networkUsers.filter(u =>
    (u.name || '').toLowerCase().includes(friendSearch.toLowerCase())
  );

  const toggleTag = (userId) => {
    setTaggedIds(prev =>
      prev.includes(userId) ? prev.filter(id => id !== userId) : [...prev, userId]
    );
  };

  const handleMediaChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMediaFile(file);
      setMediaPreview(URL.createObjectURL(file));
    }
  };

  const clearMedia = () => {
    setMediaFile(null);
    setMediaPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleCreatePost = (e) => {
    e.preventDefault();
    if (!postText.trim() && !mediaFile) return;

    let payload;
    if (mediaFile || taggedIds.length > 0) {
      payload = new FormData();
      if (postText.trim()) payload.append('content', postText);
      else payload.append('content', ' '); // Fallback if schema requires content
      if (mediaFile) payload.append('media', mediaFile);
      if (taggedIds.length > 0) {
        taggedIds.forEach(id => payload.append('taggedUsers[]', id));
      }
    } else {
      payload = { content: postText };
    }

    createPostMutation.mutate(payload, {
      onSuccess: () => {
        setPostText('');
        clearMedia();
        setTaggedIds([]);
        navigate('/dashboard');
      },
      onError: (err) => {
        console.error("Failed to create post", err);
        alert("Failed to create post");
      }
    });
  };

  const handleSaveEdit = async (id) => {
    try {
      await apiClient.put(`/posts/${id}`, { content: editText });
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      setEditingPostId(null);
    } catch (error) {
      console.error("Failed to update post", error);
    }
  };

  const confirmDeletePost = async () => {
    if (!postToDelete) return;
    try {
      await apiClient.delete(`/posts/${postToDelete}`);
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      setPostToDelete(null);
    } catch (error) {
      console.error("Failed to delete post", error);
    }
  };


  return (
    <div className="h-full overflow-y-auto bg-[#F9F9F9] p-3 sm:p-6 md:p-8 font-sans text-gray-800 pb-20">
      
      {/* ================= MAIN CONTAINER ================= */}
      {/* Responsive layout: flex-col on mobile, flex-row on md screens */}
      <div className="w-full max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row h-auto overflow-hidden shrink-0 mb-6">  
        
        {/* LEFT COLUMN: Add a Post Form */}
        {/* Mobile: takes full width, Desktop: takes equal flex space */}
        <form onSubmit={handleCreatePost} className="flex-1 p-5 sm:p-8 border-b md:border-b-0 md:border-r border-gray-100 flex flex-col justify-start gap-6">
          <div className="w-full">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Add a Post</h1>
            
            <div className="flex items-center gap-3 mb-4">
              {userAvatar ? (
                <img src={userAvatar} alt={userName} className="w-9 h-9 rounded-full object-cover" />
              ) : (
                <div className="w-9 h-9 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-sm">
                  {userName.charAt(0).toUpperCase()}
                </div>
              )}
              <span className="font-semibold text-sm text-gray-900">{userName}</span>
            </div>

            <textarea
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
              className="w-full h-36 p-4 bg-[#F5F6F8] rounded-2xl resize-none text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition"
              placeholder="What's on your mind?"
            />
            
            {mediaPreview && (
              <div className="relative mt-3">
                <img src={mediaPreview} alt="Preview" className="w-full max-h-64 object-cover rounded-xl border border-gray-200" />
                <button 
                  type="button" 
                  onClick={clearMedia}
                  className="absolute top-2 right-2 bg-white rounded-full p-1 shadow hover:bg-gray-100"
                >
                  <XCircle size={20} className="text-gray-600" />
                </button>
              </div>
            )}
          </div>

          <div className="space-y-3 w-full mt-auto">
            <button type="button" className="w-full flex items-center justify-center gap-2 py-3 px-4 border border-blue-600 text-blue-600 rounded-xl font-medium text-sm hover:bg-blue-50 transition">
              <UserPlus size={16} /> Tag Friend ({taggedIds.length})
            </button>
            <button 
              type="button" 
              onClick={() => fileInputRef.current?.click()}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 border text-[#4285F4] rounded-xl font-medium text-sm hover:bg-blue-50 transition"
            >
              <Image size={16} /> Add Photo / Video
            </button>
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleMediaChange} 
              accept="image/*,video/*" 
              className="hidden" 
            />
            <button 
              type="submit" 
              disabled={createPostMutation.isPending}
              className="w-full py-3 px-4 bg-[#4285F4] hover:bg-blue-700 disabled:bg-blue-300 text-white rounded-xl font-semibold text-sm shadow-md transition"
            >
              {createPostMutation.isPending ? "Posting..." : "Post"}
            </button>
          </div>
        </form>

        {/* RIGHT COLUMN: Tag Friends List */}
        {/* Mobile: takes full width, Desktop: fixed 380px width */}
        <div className="w-full md:w-95 p-5 sm:p-8 flex flex-col justify-start">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Tag</h2>
          
          <div className="relative mb-6">
            <Search className="absolute left-4 top-3.5 text-gray-400" size={16} />
            <input 
              type="text" 
              value={friendSearch}
              onChange={(e) => setFriendSearch(e.target.value)}
              placeholder="Search..." 
              className="w-full pl-11 pr-4 py-3 bg-[#F5F6F8] rounded-full text-sm text-gray-700 focus:outline-none transition"
            />
          </div>

          <div className="space-y-4 overflow-y-auto max-h-70 pr-1">
            {networkUsers.length === 0 ? (
              <p className="text-xs text-gray-400 text-center py-4">No connections yet. Follow people to tag them!</p>
            ) : filteredNetwork.length === 0 ? (
              <p className="text-xs text-gray-400 text-center py-4">No results found.</p>
            ) : filteredNetwork.map((user) => {
              const uid = user._id || user.id;
              const isTagged = taggedIds.includes(uid);
              const avatar = user.profilePicture || null;
              return (
                <div key={uid} className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-3 min-w-0">
                    {avatar ? (
                      <img src={avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover shrink-0" />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-sm shrink-0">
                        {(user.name || 'U').charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div className="min-w-0">
                      <h4 className="text-sm font-semibold text-gray-900 truncate">{user.name}</h4>
                      <p className="text-xs text-gray-400 truncate">{user.university || 'Student'}</p>
                    </div>
                  </div>
                  <label className="relative flex items-center cursor-pointer shrink-0">
                    <input type="checkbox" checked={isTagged} onChange={() => toggleTag(uid)} className="sr-only peer" />
                    <div className="w-5 h-5 border-2 border-gray-300 rounded-md bg-white peer-checked:bg-blue-600 peer-checked:border-blue-600 flex items-center justify-center transition">
                      <svg className="w-3 h-3 text-white fill-none stroke-current stroke-3" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" /></svg>
                    </div>
                  </label>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ================= FEEDS SECTION ================= */}
      <div className="w-full max-w-4xl mx-auto space-y-4 shrink-0">
        <h3 className="text-lg font-bold text-gray-700 px-1">Recent Feed Posts</h3>
        
        {isLoading ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm flex flex-col items-center justify-center space-y-4">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-500 text-sm font-medium">Loading posts...</p>
          </div>
        ) : isError ? (
          <div className="bg-white rounded-2xl border border-red-100 p-8 shadow-sm flex flex-col items-center justify-center space-y-3">
            <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center text-red-500 mb-2">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <p className="text-red-600 font-medium text-center">Failed to load posts</p>
            <p className="text-gray-500 text-xs text-center">{error?.response?.data?.message || error?.message || "An unexpected error occurred"}</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-10 shadow-sm flex flex-col items-center justify-center space-y-4">
            <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mb-2">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
            </div>
            <h3 className="text-gray-900 font-bold text-lg">No posts yet</h3>
            <p className="text-gray-500 text-sm text-center">Be the first to share something with the community!</p>
          </div>
        ) : (
          posts.map((post) => (
            <div key={post._id || post.id} className="w-full bg-white rounded-2xl p-4 sm:p-6 border border-gray-100 shadow-sm flex flex-col gap-4">
              
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <img src={post.author?.avatar ? (post.author.avatar.startsWith('http') ? post.author.avatar : `${apiClient.defaults.baseURL.replace('/api/v1', '')}${post.author.avatar}`) : "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150"} alt={post.author?.name} className="w-10 h-10 rounded-full object-cover shrink-0" />
                  <div className="min-w-0">
                    <h4 className="text-sm font-bold text-gray-900 truncate">{post.author?.name || "Unknown Author"}</h4>
                    <div className="flex items-center gap-1 text-xs text-gray-400 mt-0.5">
                      <Clock size={12} className="shrink-0" />
                      <span className="truncate">{new Date(post.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button 
                    onClick={() => { setEditingPostId(post._id || post.id); setEditText(post.text); }}
                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button 
                    onClick={() => setPostToDelete(post._id || post.id)}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              {editingPostId === (post._id || post.id) ? (
                <div className="space-y-2 w-full">
                  <textarea
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="w-full p-3 bg-gray-50 border rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  <div className="flex gap-2 justify-end">
                    <button onClick={() => setEditingPostId(null)} className="px-3 py-1.5 text-xs font-semibold bg-gray-200 rounded-lg">Cancel</button>
                    <button onClick={() => handleSaveEdit(post._id || post.id)} className="px-3 py-1.5 text-xs font-semibold bg-blue-600 text-white rounded-lg">Save</button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <p className="text-sm text-gray-700 whitespace-pre-wrap break-words">{post.text || post.content}</p>
                  {post.mediaUrl && (
                    <img 
                      src={post.mediaUrl.startsWith('http') ? post.mediaUrl : `${apiClient.defaults.baseURL.replace('/api/v1', '')}${post.mediaUrl}`} 
                      alt="Post media" 
                      className="w-full max-h-96 object-cover rounded-xl border border-gray-100" 
                    />
                  )}
                </div>
              )}

              {post.taggedUsers && post.taggedUsers.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-gray-50">
                  {post.taggedUsers.map((t, idx) => (
                    <span key={idx} className="text-xs bg-blue-50 text-blue-600 px-2.5 py-1 rounded-full font-medium max-w-xs truncate">@{t.name || t}</span>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* ================= RESPONSIVE MODAL ================= */}
      {postToDelete && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 sm:p-6 shadow-xl border m-2">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Confirm Deletion</h3>
              <button onClick={() => setPostToDelete(null)} className="text-gray-400 hover:text-gray-600"><X size={18} /></button>
            </div>
            <p className="text-sm text-gray-500 mb-6">Are you sure you want to delete your text post? This action cannot be undone.</p>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setPostToDelete(null)} className="flex-1 py-2.5 bg-gray-100 text-gray-700 font-semibold rounded-xl text-sm">
                Cancel
              </button>
              <button onClick={confirmDeletePost} className="flex-1 py-2.5 bg-red-600 text-white font-semibold rounded-xl text-sm shadow-md">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
import { Search, UserPlus, Image, Edit2, Trash2, X, Clock } from 'lucide-react';
import { useState } from 'react';

export default function CreatePost() {
  // --- States ---
  const [postText, setPostText] = useState('Going To Karachi');
  const [searchQuery, setSearchQuery] = useState('');
  const [posts, setPosts] = useState([
    {
      id: 1,
      name: 'Muhammad Ali',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
      timestamp: 'Today at 9:45 PM',
      text: 'Excited to visit Karachi this weekend! ✈️',
      tagged: ['Lucas Brown', 'Jenny Williamson']
    }
  ]);
  
  // Editing state variables
  const [editingPostId, setEditingPostId] = useState(null);
  const [editText, setEditText] = useState('');

  // Deletion modal state variables
  const [postToDelete, setPostToDelete] = useState(null);

  // Friends Checklist State
  const [friends, setFriends] = useState([
    { id: 1, name: 'Jenny Williamson', subtitle: 'How are you', checked: false, img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150' },
    { id: 2, name: 'Lucas Brown', subtitle: 'Kevin Peterson', checked: true, img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150' },
    { id: 3, name: 'Jenny Williamson', subtitle: 'Designedia Student', checked: true, img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150' },
    { id: 4, name: 'Mason Davis', subtitle: 'Designedia Student', checked: true, img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150' },
  ]);

  // --- Handlers ---
  const handleCheckboxChange = (id) => {
    setFriends(friends.map(f => f.id === id ? { ...f, checked: !f.checked } : f));
  };

  const handleCreatePost = (e) => {
    e.preventDefault();
    if (!postText.trim()) return;

    const newPost = {
      id: Date.now(),
      name: 'Muhammad Ali',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
      timestamp: 'Just now',
      text: postText,
      tagged: friends.filter(f => f.checked).map(f => f.name)
    };

    setPosts([newPost, ...posts]);
    setPostText('');
  };

  const handleSaveEdit = (id) => {
    setPosts(posts.map(p => p.id === id ? { ...p, text: editText } : p));
    setEditingPostId(null);
  };

  const confirmDeletePost = () => {
    setPosts(posts.filter(p => p.id !== postToDelete));
    setPostToDelete(null);
  };

  const filteredFriends = friends.filter(f =>
    f.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F9F9F9] p-3 sm:p-6 md:p-8 font-sans text-gray-800 flex flex-col items-center justify-start gap-6">
      
      {/* ================= MAIN CONTAINER ================= */}
      {/* Responsive layout: flex-col on mobile, flex-row on md screens */}
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row min-h-125">  
        
        {/* LEFT COLUMN: Add a Post Form */}
        {/* Mobile: takes full width, Desktop: takes equal flex space */}
        <form onSubmit={handleCreatePost} className="flex-1 p-5 sm:p-8 border-b md:border-b-0 md:border-r border-gray-100 flex flex-col justify-between gap-6">
          <div className="w-full">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Add a Post</h1>
            
            <div className="flex items-center gap-3 mb-4">
              <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150" alt="Avatar" className="w-9 h-9 rounded-full object-cover" />
              <span className="font-semibold text-sm text-gray-900">Muhammad Ali</span>
            </div>

            <textarea
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
              className="w-full h-36 p-4 bg-[#F5F6F8] rounded-2xl resize-none text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition"
              placeholder="What's on your mind?"
            />
          </div>

          <div className="space-y-3 w-full">
            <button type="button" className="w-full flex items-center justify-center gap-2 py-3 px-4 border border-blue-600 text-blue-600 rounded-xl font-medium text-sm hover:bg-blue-50 transition">
              <UserPlus size={16} /> Tag Friend ({friends.filter(f => f.checked).length})
            </button>
            <button type="button" className="w-full flex items-center justify-center gap-2 py-3 px-4 border text-[#4285F4] rounded-xl font-medium text-sm hover:bg-blue-50 transition">
              <Image size={16} /> Add Photo / Video
            </button>
            <button type="submit" className="w-full py-3 px-4 bg-[#4285F4] text-white rounded-xl font-semibold text-sm shadow-md hover:bg-blue-700 transition+">
              Post
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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..." 
              className="w-full pl-11 pr-4 py-3 bg-[#F5F6F8] rounded-full text-sm text-gray-700 focus:outline-none transition"
            />
          </div>

          {/* Dynamic Scroll Height for lists */}
          <div className="space-y-4 overflow-y-auto max-h-70 pr-1"   >
            {filteredFriends.map((friend) => (
              <div key={friend.id} className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-3 min-w-0">
                  <img src={friend.img} alt={friend.name} className="w-10 h-10 rounded-full object-cover shrink-0" />
                  <div className="min-w-0">
                    <h4 className="text-sm font-semibold text-gray-900 truncate">{friend.name}</h4>
                    <p className="text-xs text-gray-400 truncate">{friend.subtitle}</p>
                  </div>
                </div>
                <label className="relative flex items-center cursor-pointer shrink-0">
                  <input type="checkbox" checked={friend.checked} onChange={() => handleCheckboxChange(friend.id)} className="sr-only peer" />
                  <div className="w-5 h-5 border-2 border-gray-300 rounded-md bg-white peer-checked:bg-blue-600 peer-checked:border-blue-600 flex items-center justify-center transition">
                    <svg className="w-3 h-3 text-white fill-none stroke-current stroke-3" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" /></svg>
                  </div>
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ================= FEEDS SECTION ================= */}
      <div className="w-full max-w-4xl space-y-4">
        <h3 className="text-lg font-bold text-gray-700 px-1">Recent Feed Posts</h3>
        
        {posts.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-6 bg-white rounded-2xl border">No posts available.</p>
        ) : (
          posts.map((post) => (
            <div key={post.id} className="w-full bg-white rounded-2xl p-4 sm:p-6 border border-gray-100 shadow-sm flex flex-col gap-4">
              
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <img src={post.avatar} alt={post.name} className="w-10 h-10 rounded-full object-cover shrink-0" />
                  <div className="min-w-0">
                    <h4 className="text-sm font-bold text-gray-900 truncate">{post.name}</h4>
                    <div className="flex items-center gap-1 text-xs text-gray-400 mt-0.5">
                      <Clock size={12} className="shrink-0" />
                      <span className="truncate">{post.timestamp}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button 
                    onClick={() => { setEditingPostId(post.id); setEditText(post.text); }}
                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button 
                    onClick={() => setPostToDelete(post.id)}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              {editingPostId === post.id ? (
                <div className="space-y-2 w-full">
                  <textarea
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="w-full p-3 bg-gray-50 border rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  <div className="flex gap-2 justify-end">
                    <button onClick={() => setEditingPostId(null)} className="px-3 py-1.5 text-xs font-semibold bg-gray-200 rounded-lg">Cancel</button>
                    <button onClick={() => handleSaveEdit(post.id)} className="px-3 py-1.5 text-xs font-semibold bg-blue-600 text-white rounded-lg">Save</button>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-gray-700 whitespace-pre-wrap wrap-break-word">{post.text}</p>
              )}

              {post.tagged.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-gray-50">
                  {post.tagged.map((t, idx) => (
                    <span key={idx} className="text-xs bg-blue-50 text-blue-600 px-2.5 py-1 rounded-full font-medium max-w-xs truncate">@{t}</span>
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
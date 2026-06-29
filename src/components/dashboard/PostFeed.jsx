import { useState } from "react";
import { usePosts, useLikePost, useCommentPost, useUpdatePost, useDeletePost } from "../../hooks/usePosts";
import { useFollowUser, useNetwork } from "../../hooks/useUsers";
import { MoreHorizontal, Edit2, Trash2, X, Check } from "lucide-react";

export default function PostFeed() {
  const { data: posts, isLoading, isError, error } = usePosts();
  const likeMutation = useLikePost();
  const followMutation = useFollowUser();
  const commentMutation = useCommentPost();
  const updatePostMutation = useUpdatePost();
  const deletePostMutation = useDeletePost();
  const { data: network } = useNetwork();

  const followingIds = (network?.following || []).map(u => u._id || u.id);

  const [expandedComments, setExpandedComments] = useState({});
  const [commentTexts, setCommentTexts] = useState({});
  
  // Post Edit State
  const [editingPostId, setEditingPostId] = useState(null);
  const [editContent, setEditContent] = useState("");
  const [menuOpenId, setMenuOpenId] = useState(null);

  const currentUserId = (() => {
    try { return JSON.parse(localStorage.getItem('user') || '{}')?.id || null; } catch { return null; }
  })();

  const handleLike = (postId) => {
    likeMutation.mutate(postId);
  };

  const handleFollow = (userId) => {
    if (userId && userId !== currentUserId) followMutation.mutate(userId);
  };

  const toggleComments = (postId) => {
    setExpandedComments(prev => ({ ...prev, [postId]: !prev[postId] }));
  };

  const handleCommentChange = (postId, text) => {
    setCommentTexts(prev => ({ ...prev, [postId]: text }));
  };

  const submitComment = (postId) => {
    const text = commentTexts[postId];
    if (!text || !text.trim()) return;
    commentMutation.mutate({ postId, text: text.trim() }, {
      onSuccess: () => {
        setCommentTexts(prev => ({ ...prev, [postId]: "" }));
      }
    });
  };

  const handleEditClick = (post) => {
    setEditingPostId(post._id || post.id);
    setEditContent(post.content || "");
    setMenuOpenId(null);
  };

  const saveEdit = (postId) => {
    if (!editContent.trim()) return;
    updatePostMutation.mutate({ postId, content: editContent.trim() }, {
      onSuccess: () => {
        setEditingPostId(null);
      }
    });
  };

  const handleDelete = (postId) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      deletePostMutation.mutate(postId);
      setMenuOpenId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm flex flex-col items-center justify-center space-y-4">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-500 text-sm font-medium">Loading posts...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-white rounded-2xl border border-red-100 p-8 shadow-sm flex flex-col items-center justify-center space-y-3">
        <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center text-red-500 mb-2">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <p className="text-red-600 font-medium text-center">Failed to load posts</p>
        <p className="text-gray-500 text-xs text-center">{error?.response?.data?.message || error?.message || "An unexpected error occurred"}</p>
      </div>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 p-10 shadow-sm flex flex-col items-center justify-center space-y-4">
        <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mb-2">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
          </svg>
        </div>
        <h3 className="text-gray-900 font-bold text-lg">No posts yet</h3>
        <p className="text-gray-500 text-sm text-center">Be the first to share something with the community!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6 w-full">
      {posts.map((post) => {
        // Fallbacks for data mapping depending on backend schema
        const authorName = post.author?.name || "Unknown Author";
        const authorRole = post.author?.bio || post.author?.university || "User";
        const avatar = post.author?.profilePicture || "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&auto=format&fit=crop&q=60";
        const time = new Date(post.createdAt).toLocaleDateString() || "Just now";
        const isLiked = post.likes?.includes("currentUserId") || false; // Ideally backend sends `isLiked`
        const likesCount = post.likes?.length || 0;
        const commentsCount = post.comments?.length || 0;
        const content = post.content || "";
        const image = post.media?.[0] || null;

        return (
          <div
            key={post._id || post.id}
            className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-5 shadow-sm space-y-4 w-full"
          >
            {/* Header */}
            <div className="flex items-center justify-between gap-3 w-full">
              <div className="flex items-center space-x-3 min-w-0">
                <img
                  className="w-10 h-10 rounded-full object-cover shrink-0 border border-gray-50"
                  src={avatar}
                  alt={authorName}
                />

                <div className="min-w-0">
                  <h3 className="text-sm font-bold text-gray-900 truncate">
                    {authorName}
                  </h3>

                  <p className="text-[11px] text-gray-400 truncate">
                    {authorRole} • {time}
                  </p>
                </div>
              </div>

              {/* Follow button — hidden for own posts or if already following */}
              {post.author?._id !== currentUserId && !followingIds.includes(post.author?._id) && (
                <button
                  onClick={() => handleFollow(post.author?._id)}
                  disabled={followMutation.isPending}
                  className="text-[11px] sm:text-xs font-semibold text-white bg-[#4285F4] rounded-full px-3.5 py-1 hover:bg-blue-500 disabled:bg-blue-300 transition shrink-0 shadow-xs"
                >
                  + Follow
                </button>
              )}

              {/* Options Menu for Own Posts */}
              {post.author?._id === currentUserId && (
                <div className="relative">
                  <button 
                    onClick={() => setMenuOpenId(menuOpenId === (post._id || post.id) ? null : (post._id || post.id))}
                    className="p-1.5 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-50 transition"
                  >
                    <MoreHorizontal size={18} />
                  </button>
                  
                  {menuOpenId === (post._id || post.id) && (
                    <div className="absolute right-0 mt-1 w-36 bg-white border border-gray-100 rounded-xl shadow-lg z-10 py-1 animate-in fade-in zoom-in-95 duration-100">
                      <button 
                        onClick={() => handleEditClick(post)}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                      >
                        <Edit2 size={14} /> Edit Post
                      </button>
                      <button 
                        onClick={() => handleDelete(post._id || post.id)}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                      >
                        <Trash2 size={14} /> Delete Post
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Content or Edit Mode */}
            {editingPostId === (post._id || post.id) ? (
              <div className="space-y-3">
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="w-full p-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none bg-gray-50/50"
                  rows={3}
                />
                <div className="flex items-center gap-2 justify-end">
                  <button 
                    onClick={() => setEditingPostId(null)}
                    className="px-4 py-1.5 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-full transition"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={() => saveEdit(post._id || post.id)}
                    disabled={updatePostMutation.isPending || !editContent.trim()}
                    className="px-4 py-1.5 text-xs font-semibold text-white bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 rounded-full transition flex items-center gap-1"
                  >
                    {updatePostMutation.isPending ? "Saving..." : "Save"}
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-xs text-gray-600 leading-relaxed whitespace-pre-line">
                {content}
                {post.isEdited && <span className="text-[10px] text-gray-400 italic ml-2">(edited)</span>}
              </p>
            )}

            {/* Image */}
            {image && (
              <div className="rounded-xl overflow-hidden bg-gray-50 border border-gray-100 w-full max-h-85 flex items-center justify-center mt-3">
                <img
                  className="w-full h-full object-cover"
                  src={image}
                  alt="Post Media"
                />
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center space-x-6 pt-2 text-xs border-t border-gray-50 w-full">
              {/* Like */}
              <button
                onClick={() => handleLike(post._id || post.id)}
                disabled={likeMutation.isPending}
                className={`flex items-center space-x-1.5 font-semibold group ${
                  isLiked ? "text-blue-500" : "text-gray-500"
                } ${likeMutation.isPending ? "opacity-50" : ""}`}
              >
                <svg
                  className={`w-4 h-4 transform group-hover:scale-110 transition ${
                    isLiked ? "fill-blue-500" : "fill-gray-300"
                  }`}
                  viewBox="0 0 24 24"
                >
                  <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3c1.749 0 3.3.815 4.312 2.087C13.012 3.815 14.564 3 16.31 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                </svg>
                <span>{likesCount}</span>
              </button>

              {/* Comment */}
              <button 
                onClick={() => toggleComments(post._id || post.id)}
                className="flex items-center space-x-1.5 hover:text-gray-900 group transition text-gray-500"
              >
                <svg
                  className="w-4 h-4 transform group-hover:scale-110 transition"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.92 1.78 4.61 4.61 0 002.811-.777c.512-.304 1.08-.154 1.654.121A9.066 9.066 0 0012 20.25z"
                  />
                </svg>
                <span>{commentsCount}</span>
              </button>
            </div>

            {/* Comments Section (Expandable) */}
            {expandedComments[post._id || post.id] && (
              <div className="pt-3 border-t border-gray-50 w-full space-y-4">
                {/* Existing Comments */}
                <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
                  {post.comments?.length > 0 ? (
                    post.comments.map((comment) => (
                      <div key={comment._id} className="flex gap-2">
                        {comment.user?.avatar ? (
                          <img src={comment.user.avatar} alt={comment.user.name} className="w-6 h-6 rounded-full object-cover shrink-0 mt-0.5" />
                        ) : (
                          <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-[10px] font-bold text-blue-600 shrink-0 mt-0.5">
                            {(comment.user?.name || "U").charAt(0).toUpperCase()}
                          </div>
                        )}
                        <div className="bg-gray-50 rounded-xl px-3 py-2 text-xs flex-1">
                          <p className="font-semibold text-gray-800">{comment.user?.name || "Unknown User"}</p>
                          <p className="text-gray-600 mt-0.5">{comment.text}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-gray-400 text-center py-2">No comments yet. Be the first!</p>
                  )}
                </div>
                
                {/* Add Comment Input */}
                <div className="flex gap-2 items-center">
                  <input 
                    type="text" 
                    value={commentTexts[post._id || post.id] || ""}
                    onChange={(e) => handleCommentChange(post._id || post.id, e.target.value)}
                    placeholder="Write a comment..." 
                    className="flex-1 text-xs bg-gray-50 border-none rounded-full px-4 py-2 focus:ring-1 focus:ring-blue-500 outline-none transition"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') submitComment(post._id || post.id);
                    }}
                  />
                  <button 
                    onClick={() => submitComment(post._id || post.id)}
                    disabled={commentMutation.isPending || !commentTexts[post._id || post.id]?.trim()}
                    className="text-xs font-semibold text-white bg-[#4285F4] hover:bg-blue-600 disabled:bg-blue-300 rounded-full px-4 py-2 transition"
                  >
                    Post
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
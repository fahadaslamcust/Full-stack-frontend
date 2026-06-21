export default function PostFeed() {
  // Dummy data array structural clean layout ke liye
  const posts = [
    {
      id: 1,
      author: "Muhammad Ali",
      role: "CSS Student",
      time: "19h",
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&auto=format&fit=crop&q=60",
      isFollowing: true,
      content: "Designed a Student Community App that enables university students to connect, share documents, communicate, and collaborate within their academic community.",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&auto=format&fit=crop&q=60",
      likes: 65,
      comments: 45,
      shares: 2
    },
    {
      id: 2,
      author: "Muhammad Ali",
      role: "CSS Student",
      time: "19h",
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&auto=format&fit=crop&q=60",
      isFollowing: false,
      content: "Designed a Student Community App that enables university students to connect, share documents, communicate, and collaborate within their academic community.",
      image: null, // Text-only post
      likes: 12,
      comments: 4,
      shares: 0
    }
  ];

  return (
    <div className="space-y-4 sm:space-y-6 w-full">
      {posts.map((post) => (
        <div 
          key={post.id} 
          className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-5 shadow-sm space-y-4 w-full"
        >
          {/* ====== CARD HEADER ====== */}
          <div className="flex items-center justify-between gap-3 w-full">
            <div className="flex items-center space-x-3 min-w-0">
              <img 
                className="w-10 h-10 rounded-full object-cover flex-shrink-0 border border-gray-50" 
                src={post.avatar} 
                alt={post.author} 
              />
              <div className="min-w-0">
                <h3 className="text-sm font-bold text-gray-900 truncate">{post.author}</h3>
                <p className="text-[11px] text-gray-400 truncate">{post.role} • {post.time}</p>
              </div>
            </div>

            {/* Dynamic Follow/Following Buttons */}
            {post.isFollowing ? (
              <button className="text-[11px] sm:text-xs font-semibold text-gray-400 border border-gray-200 rounded-full px-3 py-1 bg-gray-50 hover:bg-gray-100 transition flex-shrink-0">
                Following
              </button>
            ) : (
              <button className="text-[11px] sm:text-xs font-semibold text-white bg-[#3B82F6] rounded-full px-3.5 py-1 hover:bg-blue-600 transition flex-shrink-0 shadow-xs">
                + Follow
              </button>
            )}
          </div>

          {/* ====== CARD CONTENT ====== */}
          <p className="text-xs text-gray-600 leading-relaxed break-words">
            {post.content}
          </p>

          {/* ====== POST IMAGE (Responsive Container) ====== */}
          {post.image && (
            <div className="rounded-xl overflow-hidden bg-gray-50 border border-gray-100 w-full max-h-[340px] flex items-center justify-center">
              <img 
                className="w-full h-full object-cover" 
                src={post.image} 
                alt="Post Media" 
              />
            </div>
          )}

          {/* ====== ACTION BUTTONS ====== */}
          <div className="flex items-center space-x-6 pt-2 text-xs text-gray-500 border-t border-gray-50 w-full">
            {/* Like Button */}
            <button className="flex items-center space-x-1.5 text-blue-500 font-semibold group">
              <svg className="w-4 h-4 fill-blue-500 transform group-hover:scale-110 transition" viewBox="0 0 24 24">
                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3c1.749 0 3.3.815 4.312 2.087C13.012 3.815 14.564 3 16.31 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
              </svg>
              <span>{post.likes}</span>
            </button>

            {/* Comment Button */}
            <button className="flex items-center space-x-1.5 hover:text-gray-900 group transition">
              <svg className="w-4 h-4 transform group-hover:scale-110 transition" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.92 1.78 4.61 4.61 0 002.811-.777c.512-.304 1.08-.154 1.654.121A9.066 9.066 0 0012 20.25z" />
              </svg>
              <span>{post.comments}</span>
            </button>

            {/* Share Button */}
            <button className="flex items-center space-x-1.5 hover:text-gray-900 group transition">
              <svg className="w-4 h-4 transform group-hover:scale-110 transition" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
              </svg>
              <span>{post.shares || "0"}</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
import { useNetwork } from "../../hooks/useUsers";

const FALLBACK_IMG = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=60";

export default function Stories() {
  const { data: network, isLoading } = useNetwork();

  const storedUser = (() => {
    try { return JSON.parse(localStorage.getItem('user') || '{}'); } catch { return {}; }
  })();

  const currentUserStory = {
    id: 'me',
    name: "Your Story",
    img: storedUser?.profilePicture || FALLBACK_IMG,
    isUser: true,
  };

  const networkUsers = network ? [...(network.following || []), ...(network.followers || [])] : [];
  
  // Deduplicate users if someone is in both followers and following
  const uniqueNetworkUsers = Array.from(new Map(networkUsers.map(u => [u._id || u.id, u])).values());

  const networkStories = uniqueNetworkUsers.map((u) => ({
    id: u._id || u.id,
    name: u.name || "User",
    img: u.profilePicture || FALLBACK_IMG,
    avatar: u.profilePicture || FALLBACK_IMG,
  }));

  const storiesData = [currentUserStory, ...networkStories];

  return (
    <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-none">
      {isLoading
        ? Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="relative flex-shrink-0 w-24 h-36 rounded-2xl bg-gray-100 animate-pulse" />
          ))
        : storiesData.map((story) => (
            <div key={story.id} className="relative flex-shrink-0 w-24 h-36 rounded-2xl overflow-hidden group shadow-sm bg-gray-200 cursor-pointer">
              <img src={story.img} alt={story.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              
              {story.isUser ? (
                <div className="absolute bottom-2 inset-x-0 flex flex-col items-center">
                  <div className="w-6 h-6 bg-[#3B82F6] text-white rounded-full flex items-center justify-center border-2 border-white text-xs font-bold mb-1">
                    +
                  </div>
                  <span className="text-[10px] text-white font-medium text-center">{story.name}</span>
                </div>
              ) : (
                <>
                  <img src={story.avatar} className="absolute top-2 left-2 w-7 h-7 rounded-full border-2 border-[#3B82F6] object-cover" alt="" />
                  <span className="absolute bottom-2 left-2 text-[10px] text-white font-medium truncate w-20">{story.name}</span>
                </>
              )}
            </div>
          ))
      }
    </div>
  );
}
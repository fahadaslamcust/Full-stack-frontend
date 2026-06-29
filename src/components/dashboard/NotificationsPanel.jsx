import { useNetwork } from "../../hooks/useUsers";

const FALLBACK_IMG = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&auto=format&fit=crop&q=60";

export default function NotificationsPanel() {
  const { data: network, isLoading } = useNetwork();

  const networkList = network ? [...(network.followers || []), ...(network.following || [])] : [];
  // Deduplicate
  const uniqueNetwork = Array.from(new Map(networkList.map(u => [u._id || u.id, u])).values());

  return (
    <div className="w-full bg-white flex flex-col h-auto">
      {/* Header Container */}
      <div className="flex items-center justify-between mb-5 flex-shrink-0">
        <h2 className="text-base sm:text-lg font-bold text-gray-950">Notifications</h2>
        <button className="text-xs text-[#3B82F6] font-semibold hover:underline">Hide</button>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3 animate-pulse">
              <div className="w-9 h-9 rounded-full bg-gray-100 shrink-0" />
              <div className="flex-1 space-y-1.5">
                <div className="h-3 bg-gray-100 rounded w-3/4" />
                <div className="h-2 bg-gray-100 rounded w-1/3" />
              </div>
            </div>
          ))}
        </div>
      ) : uniqueNetwork.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <div className="w-12 h-12 bg-blue-50 text-blue-400 rounded-full flex items-center justify-center mb-3">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </div>
          <p className="text-sm font-medium text-gray-700">No notifications yet</p>
          <p className="text-xs text-gray-400 mt-1">Connect with people to see updates here</p>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Your Network</h3>
            {uniqueNetwork.slice(0, 6).map((user, index) => {
              const name = user.name || "User";
              const avatar = user.profilePicture || FALLBACK_IMG;
              const timeAgo = user.createdAt
                ? new Date(user.createdAt).toLocaleDateString()
                : "Recently";

              return (
                <div key={user._id || index} className="flex items-center justify-between gap-3 group cursor-pointer">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <img className="w-9 h-9 rounded-full object-cover border border-gray-100 shrink-0" src={avatar} alt={name} />
                    <div className="min-w-0">
                      <p className="text-xs text-gray-800 font-medium leading-snug break-words">
                        <span className="font-bold text-gray-900">{name}</span> is in your network
                      </p>
                      <span className="text-[10px] text-gray-400 font-medium mt-0.5 block">{timeAgo}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default function NotificationsPanel() {
  const yesterdayNotifs = [
    { name: 'Olivia Smith', action: 'Add a Post', img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&auto=format&fit=crop&q=60', time: '1 d', postPreview: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=50&auto=format&fit=crop&q=60' },
    { name: 'Hanon Davis', action: 'Add a Post', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=60', time: '1 d', postPreview: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=50&auto=format&fit=crop&q=60' },
    { name: 'Elijah Miller', action: 'Add a Post', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=60', time: '1 d', postPreview: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=50&auto=format&fit=crop&q=60' },
    { name: 'Sana Fatima', action: 'Start Follow You', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&auto=format&fit=crop&q=60', time: '1 d' },
  ];

  return (
    <aside className="w-full bg-white border-l border-gray-100 p-6 hidden lg:block top-0 h-screen overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-black">Notifications</h2>
        <button className="text-xs text-[#3B82F6] font-medium hover:underline">Hide</button>
      </div>

      {/* Today */}
      <div className="space-y-4 mb-6">
        <h3 className="text-xs font-bold text-[#2D2D2D] tracking-wider">Today</h3>
        
        <div className="flex items-center space-x-3">
          <img className="w-8 h-8 rounded-full object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&auto=format&fit=crop&q=60" alt="" />
          <div className="flex-1">
            <p className="text-xs text-[#000000] font-medium">
              <span className="font-semibold text-gray-900">Jenny Williamson</span> Start Follow You
            </p>
            <span className="text-[10px] text-gray-400">2 hr</span>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <img className="w-8 h-8 rounded-full object-cover" src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&auto=format&fit=crop&q=60" alt="" />
          <div className="flex-1">
            <p className="text-xs text-[#000000] font-medium">
              <span className="font-semibold text-gray-900">Sana Fatima</span> Start Follow You
            </p>
            <span className="text-[10px] text-gray-400">4 hr</span>
          </div>
        </div>
      </div>

      {/* Yesterday */}
      <div className="space-y-4">
        <h3 className="font-24 font-semibold text-[#2D2D2D] tracking-wider">Yesterday</h3>
        {yesterdayNotifs.map((notif, index) => (
          <div key={index} className="flex items-center justify-between space-x-3">
            <div className="flex items-center space-x-3 flex-1">
              <img className="w-8 h-8 rounded-full object-cover" src={notif.img} alt="" />
              <div>
                <p className="text-xs text-[#000000] font-medium leading-snug">
                  <span className="font-semibold text-gray-900">{notif.name}</span> {notif.action}
                </p>
                <span className="text-[10px] text-gray-400">{notif.time}</span>
              </div>
            </div>
            {notif.postPreview && (
              <img className="w-8 h-8 rounded-md object-cover flex-shrink-0 border border-gray-100" src={notif.postPreview} alt="" />
            )}
          </div>
        ))}
      </div>
    </aside>
  );
}
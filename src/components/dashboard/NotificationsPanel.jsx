export default function NotificationsPanel() {
  const yesterdayNotifs = [
    { name: 'Olivia Smith', action: 'Add a Post', img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&auto=format&fit=crop&q=60', time: '1 d', postPreview: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=50&auto=format&fit=crop&q=60' },
    { name: 'Hanon Davis', action: 'Add a Post', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=60', time: '1 d', postPreview: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=50&auto=format&fit=crop&q=60' },
    { name: 'Elijah Miller', action: 'Add a Post', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=60', time: '1 d', postPreview: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=50&auto=format&fit=crop&q=60' },
    { name: 'Sana Fatima', action: 'Start Follow You', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&auto=format&fit=crop&q=60', time: '1 d' },
  ];

  return (
    <div className="w-full bg-white flex flex-col h-auto">
      {/* Header Container */}
      <div className="flex items-center justify-between mb-5 flex-shrink-0">
        <h2 className="text-base sm:text-lg font-bold text-gray-950">Notifications</h2>
        <button className="text-xs text-[#3B82F6] font-semibold hover:underline">Hide</button>
      </div>

      {/* Main Notifications Content Stack */}
      <div className="space-y-6">
        
        {/* ====== TODAY SECTION ====== */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Today</h3>
          
          <div className="flex items-center space-x-3 group cursor-pointer">
            <img className="w-9 h-9 rounded-full object-cover border border-gray-100" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&auto=format&fit=crop&q=60" alt="" />
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-800 font-medium leading-snug break-words">
                <span className="font-bold text-gray-900">Jenny Williamson</span> Start Follow You
              </p>
              <span className="text-[10px] text-gray-400 font-medium mt-0.5 block">2 hr</span>
            </div>
          </div>

          <div className="flex items-center space-x-3 group cursor-pointer">
            <img className="w-9 h-9 rounded-full object-cover border border-gray-100" src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&auto=format&fit=crop&q=60" alt="" />
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-800 font-medium leading-snug break-words">
                <span className="font-bold text-gray-900">Sana Fatima</span> Start Follow You
              </p>
              <span className="text-[10px] text-gray-400 font-medium mt-0.5 block">4 hr</span>
            </div>
          </div>
        </div>

        {/* ====== YESTERDAY SECTION ====== */}
        <div className="space-y-4">
          {/* 'font-24' bug fixed, replaced with consistent text styling scales */}
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Yesterday</h3>
          
          {yesterdayNotifs.map((notif, index) => (
            <div key={index} className="flex items-center justify-between gap-3 group cursor-pointer">
              
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <img className="w-9 h-9 rounded-full object-cover border border-gray-100" src={notif.img} alt="" />
                <div className="min-w-0">
                  <p className="text-xs text-gray-800 font-medium leading-snug break-words">
                    <span className="font-bold text-gray-900">{notif.name}</span> {notif.action}
                  </p>
                  <span className="text-[10px] text-gray-400 font-medium mt-0.5 block">{notif.time}</span>
                </div>
              </div>

              {/* Right post preview image alignment */}
              {notif.postPreview && (
                <div className="w-9 h-9 rounded-lg overflow-hidden flex-shrink-0 border border-gray-100 shadow-2xs">
                  <img className="w-full h-full object-cover" src={notif.postPreview} alt="Preview" />
                </div>
              )}

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
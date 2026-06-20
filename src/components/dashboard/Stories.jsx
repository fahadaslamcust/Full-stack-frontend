export default function Stories() {
  const storiesData = [
  {
    id: 1,
    name: "Your Story",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=60",
    isUser: true,
  },
  {
    id: 2,
    name: "Ayesha Ahmed",
    img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=60",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&auto=format&fit=crop&q=60",
  },
  {
    id: 3,
    name: "Ali Raza",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=60",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=50&auto=format&fit=crop&q=60",
  },
  {
    id: 4,
    name: "Fatima Noor",
    img: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=150&auto=format&fit=crop&q=60",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=50&auto=format&fit=crop&q=60",
  },
  {
    id: 5,
    name: "Hassan Malik",
    img: "https://images.unsplash.com/photo-1504593811423-6dd665756598?w=150&auto=format&fit=crop&q=60",
    avatar:
      "https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=50&auto=format&fit=crop&q=60",
  },
  {
    id: 6,
    name: "Sara Khan",
    img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=60",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&auto=format&fit=crop&q=60",
  },
];

  return (
    <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-none">
      {storiesData.map((story) => (
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
      ))}
    </div>
  );
}
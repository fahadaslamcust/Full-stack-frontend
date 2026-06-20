
export default function EventCard({ title, image, dateBadge, location, time, onRegister }) {
  return (
    <div className="space-y-4">
      <div className="w-full h-52 rounded-2xl overflow-hidden shadow-sm bg-gray-100">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Event Details Section */}
      <div className="space-y-3 px-1">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
          {/* Title */}
          <h2 className="text-base font-bold text-gray-900 leading-snug max-w-sm">
            {title}
          </h2>
          
          {/* Date Badge */}
          <span className="inline-block bg-[#00D2FF] text-white text-[10px] font-bold px-3 py-1 rounded-full whitespace-nowrap self-start sm:self-auto">
            {dateBadge}
          </span>
        </div>

        {/* Meta Info (Location & Time) */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-medium text-gray-400">
          {/* Location */}
          <div className="flex items-center space-x-1">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>{location}</span>
          </div>

          {/* Time */}
          <div className="flex items-center space-x-1">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{time}</span>
          </div>
        </div>

        {/* Register Button */}
        <div className="pt-2">
          <button 
            onClick={onRegister}
            className="bg-[#3B82F6] text-white text-sm font-semibold px-10 py-2.5 rounded-full hover:bg-blue-600 transition-colors shadow-sm shadow-blue-100"
          >
            Register Now
          </button>
        </div>

      </div>
    </div>
  );
}
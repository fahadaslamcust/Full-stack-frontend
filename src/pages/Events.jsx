import { useState } from 'react';
import EventCard from '../components/event/EventCard';

export default function Events() {
  const [searchQuery, setSearchQuery] = useState('');

  const eventsData = [
    {
      id: 1,
      title: "Agriculture University Ai-Learning Camp",
      image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&auto=format&fit=crop&q=60",
      dateBadge: "12June /12July2026",
      location: "Faisalabad/Clock Tower",
      time: "10 Am-12Pm",
    },
    {
      id: 2,
      title: "Agriculture University Cricket Tournament",
      image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=600&auto=format&fit=crop&q=60",
      dateBadge: "20June /12July2026",
      location: "Faisalabad/Clock Tower",
      time: "10 Am-12Pm",
    },
    {
      id: 3,
      title: "Agriculture University Sports Gala",
      image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=600&auto=format&fit=crop&q=60",
      dateBadge: "25June /15July2026",
      location: "Faisalabad/Clock Tower",
      time: "10 Am-12Pm",
    }
  ];

  const handleRegister = (eventName) => {
    console.log(`Registered for: ${eventName}`);
  };

  return (
    <div className="flex-1 bg-white p-6 md:p-10 overflow-y-auto max-w-full">
      <h1 className="text-3xl font-bold text-gray-900 mb-6 tracking-tight">
        Explore Events
      </h1>
      <div className="relative mb-8">
        <span className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </span>
        <input
          type="text"
          placeholder="Sana fatima.."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-[#F3F4F6]/60 text-sm text-gray-700 pl-11 pr-4 py-3 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 border border-transparent transition-all placeholder-gray-400"
        />
      </div>
      <div className="space-y-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {eventsData.map((event) => (
          <EventCard 
            key={event.id} 
            title={event.title}
            image={event.image}
            dateBadge={event.dateBadge}
            location={event.location}
            time={event.time}
            onRegister={() => handleRegister(event.title)} 
          />
        ))}
      </div>
    </div>
  );
}
import { useState } from "react";
import EventCard from "../components/event/EventCard";

export default function Events() {
  const [searchQuery, setSearchQuery] = useState("");

  const eventsData = [
    {
      id: 1,
      title: "Agriculture University AI Learning Camp",
      image:
        "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&auto=format&fit=crop&q=60",
      dateBadge: "12 June - 12 July 2026",
      location: "Faisalabad / Clock Tower",
      time: "10 AM - 12 PM",
    },
    {
      id: 2,
      title: "Agriculture University Cricket Tournament",
      image:
        "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=600&auto=format&fit=crop&q=60",
      dateBadge: "20 June - 12 July 2026",
      location: "Faisalabad / Clock Tower",
      time: "10 AM - 12 PM",
    },
    {
      id: 3,
      title: "Agriculture University Sports Gala",
      image:
        "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=600&auto=format&fit=crop&q=60",
      dateBadge: "25 June - 15 July 2026",
      location: "Faisalabad / Clock Tower",
      time: "10 AM - 12 PM",
    },
  ];

  const filteredEvents = eventsData.filter((event) =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleRegister = (eventName) => {
    console.log(`Registered for: ${eventName}`);
  };

  return (
    <div className="flex-1 h-full bg-white overflow-y-auto hide-scrollbar w-full px-4 sm:px-4 md:px-6 lg:px-8 py-4 md:py-1 lg:py-1">
      <h1 className="hidden md:block font-bold text-[#2D2D2D] text-xl md:text-2xl mb-6">
        Explore Events
      </h1>
      <div className="relative mb-10">
        <span className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <svg
            className="w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </span>

        <input
          type="text"
          placeholder="Search events..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-[#F3F4F6] text-gray-700 pl-12 pr-4 py-4 rounded-2xl border border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {filteredEvents.map((event) => (
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

import { useState } from "react";
import EventCard from "../components/event/EventCard";
import { useNavigate } from "react-router-dom";
import { useEvents, useRsvpEvent } from "../hooks/useEvents";

export default function Events() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { data: events, isLoading, isError, error } = useEvents();
  const rsvpMutation = useRsvpEvent();

  const filteredEvents = (events || []).filter((event) => {
    const title = event.title || event.name || "";
    return title.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const handleRegister = (eventId) => {
    rsvpMutation.mutate(eventId);
  };

  return (
    <div className="flex-1 h-full bg-white overflow-y-auto hide-scrollbar w-full px-4 sm:px-4 md:px-6 lg:px-8 py-4 md:py-1 lg:py-1">
      <h1 className="hidden md:block font-bold text-[#2D2D2D] text-xl md:text-2xl mb-6">
        Explore Events
      </h1>
      <div className="relative mb-5">
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
       <button
          onClick={() => navigate("/create-event")}
          className="bg-[#4285F4] text-white px-4 py-2 rounded-xl hover:bg-blue-600 "
        >
          Create Event
        </button>

      {isLoading ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm flex flex-col items-center justify-center space-y-4 mt-5">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-500 text-sm font-medium">Loading events...</p>
        </div>
      ) : isError ? (
        <div className="bg-white rounded-2xl border border-red-100 p-8 shadow-sm flex flex-col items-center justify-center space-y-3 mt-5">
          <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center text-red-500 mb-2">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <p className="text-red-600 font-medium text-center">Failed to load events</p>
          <p className="text-gray-500 text-xs text-center">{error?.response?.data?.message || error?.message || "An unexpected error occurred"}</p>
        </div>
      ) : filteredEvents.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-10 shadow-sm flex flex-col items-center justify-center space-y-4 mt-5">
          <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mb-2">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
            </svg>
          </div>
          <h3 className="text-gray-900 font-bold text-lg">No events found</h3>
          <p className="text-gray-500 text-sm text-center">There are no upcoming events at the moment.</p>
        </div>
      ) : (
        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredEvents.map((event) => {
            const startDate = new Date(event.startDate || event.createdAt || Date.now());
            const formattedDate = startDate.toLocaleDateString();
            const time = startDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            const title = event.title || event.name || "Untitled Event";
            
            return (
              <EventCard
                key={event._id || event.id}
                title={title}
                image={event.image || "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&auto=format&fit=crop&q=60"}
                dateBadge={formattedDate}
                location={event.location || "Online / TBA"}
                time={time}
                onRegister={() => handleRegister(event._id || event.id)}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

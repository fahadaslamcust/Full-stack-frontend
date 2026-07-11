import React, { useState } from "react";
import { Type, AlignLeft, Calendar, MapPin } from "lucide-react"; // Matching Screenshot style icons
import { InputField, TextAreaField } from "./FormElements";

export default function CreateEvent() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Dynamic Form Submitted:", formData);
    // await axios.post("/api/events", formData);
  };

  // Generic dynamic state updater
  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-[#F9F9F9] flex items-center justify-center p-4 font-sans text-gray-800">
      {/* Container matching Screenshot 2026-06-22 211141.png structure */}
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        
        {/* Header Heading */}
        <h1 className="text-2xl font-bold text-gray-900 mb-6 tracking-tight">
          Create Event
        </h1>

        {/* User Badge Section (Optional, but aligns with screenshot style) */}
        <div className="flex items-center gap-3 mb-6">
          <img 
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150" 
            alt="Author" 
            className="w-9 h-9 rounded-full object-cover"
          />
          <span className="font-semibold text-sm text-gray-900">Muhammad Ali</span>
        </div>

        {/* Form Layout */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Reusable Dynamic Title Input */}
          <InputField
            type="text"
            placeholder="Event Title"
            value={formData.title}
            icon={Type}
            onChange={(e) => handleChange("title", e.target.value)}
          />

          {/* Reusable Dynamic Description Textarea */}
          <TextAreaField
            placeholder="Write event description here..."
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
          />

          {/* Reusable Dynamic DateTime Picker */}
          <InputField
            type="datetime-local"
            placeholder="Event Date & Time"
            value={formData.eventDate}
            icon={Calendar}
            onChange={(e) => handleChange("date", e.target.value)}
          />

          {/* Reusable Dynamic Location Input */}
          <InputField
            type="text"
            placeholder="Location / Venue / Meeting Link"
            value={formData.location}
            icon={MapPin}
            onChange={(e) => handleChange("location", e.target.value)}
          />

          {/* Premium Blue Post Button matching layout exactly */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3.5 bg-blue-600 text-white rounded-xl font-semibold text-sm shadow-md shadow-blue-200 hover:bg-blue-700 transition duration-200"
            >
              Create Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
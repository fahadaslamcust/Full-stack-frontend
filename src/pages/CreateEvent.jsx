import { Type, Calendar, MapPin } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { InputField, TextAreaField } from "../components/common/InputField";
import { useCreateEvent } from "../hooks/useEvents";

export default function CreateEvent() {
  const navigate = useNavigate();
  const createEventMutation = useCreateEvent();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    eventDate: "",
    location: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      alert("Event title is required");
      return;
    }

    createEventMutation.mutate(formData, {
      onSuccess: () => {
        setFormData({
          title: "",
          description: "",
          eventDate: "",
          location: "",
        });
        navigate("/events");
      },
      onError: (err) => {
        console.error("Failed to create event", err);
        alert(
          err?.response?.data?.message ||
            err?.message ||
            "Failed to create event. Please try again."
        );
      },
    });
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-[#F9F9F9] flex items-center justify-center p-4 font-sans text-gray-800">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 tracking-tight">
          Create Event
        </h1>

        <div className="flex items-center gap-3 mb-6">
          <img
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150"
            alt="Author"
            className="w-9 h-9 rounded-full object-cover"
          />
          <span className="font-semibold text-sm text-gray-900">
            Muhammad Ali
          </span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField
            type="text"
            placeholder="Event Title"
            value={formData.title}
            icon={Type}
            onChange={(e) => handleChange("title", e.target.value)}
          />

          <TextAreaField
            placeholder="Write event description here..."
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
          />

          <InputField
            type="date"
            placeholder="Event Date & Time"
            value={formData.eventDate}
            icon={Calendar}
            onChange={(e) => handleChange("eventDate", e.target.value)}
          />

          <InputField
            type="text"
            placeholder="Location / Venue / Meeting Link"
            value={formData.location}
            icon={MapPin}
            onChange={(e) => handleChange("location", e.target.value)}
          />

          <div className="pt-2">
            <button
              type="submit"
              disabled={createEventMutation.isPending}
              className="w-full py-3.5 bg-[#4285F4] text-white rounded-xl font-semibold text-sm shadow-md shadow-blue-200 hover:bg-blue-600 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {createEventMutation.isPending ? "Creating..." : "Create Event"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

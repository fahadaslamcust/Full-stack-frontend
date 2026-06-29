import { useState } from "react";
import FindFriendsModal from "../components/search/FindFriendsModal";

export default function Search() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="flex-1 h-full bg-white overflow-y-auto hide-scrollbar w-full p-4 md:p-6">
      <h1 className="text-[#2D2D2D] font-bold mb-4">Search</h1>
      <button
        onClick={() => setModalOpen(true)}
        className="px-5 py-2.5 bg-[#3B82F6] text-white rounded-xl font-medium shadow-md"
      >
      Find Friends
      </button>
      <FindFriendsModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
      />
    </div>
  );
}
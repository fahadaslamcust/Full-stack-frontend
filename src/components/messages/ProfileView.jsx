import { ArrowLeft, GraduationCap, MapPin, Globe, Heart, MessageCircle, Share2 } from "lucide-react";
import { useState } from "react";

export default function ProfileView({ user, onClose }) {
  const [activeTab, setActiveTab] = useState("Photos");

  return (
    <div className="flex-1 flex flex-col bg-white overflow-y-auto hide-scrollbar">
      {/* Header Toolbar */}
      <div className="flex items-center px-6 py-3 border-b border-gray-100 sticky top-0 bg-white/95 backdrop-blur z-10 justify-between">
        <div className="flex items-center gap-3">
          <button onClick={onClose} className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-600 transition">
            <ArrowLeft size={18} />
          </button>
          <h2 className="text-base font-bold text-gray-900">Profile</h2>
        </div>
      </div>

      {/* Cover & Avatar */}
      <div className="relative w-full h-44 sm:h-56 bg-gray-100 flex-shrink-0">
        <img 
          src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1000&q=80" 
          alt="Cover" 
          className="w-full h-full object-cover"
        />
        <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-white shadow-md bg-white">
            <img src={user?.avatar} alt="Avatar" className="w-full h-full rounded-full object-cover" />
            <div className="absolute bottom-0 right-0 p-1 bg-white rounded-full border border-gray-100 shadow-xs">
              <svg className="w-3.5 h-3.5 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Name & Stats */}
      <div className="mt-12 text-center px-6">
        <h1 className="text-lg font-bold text-gray-900">{user?.name}</h1>
        <div className="flex justify-center items-center gap-6 mt-4 border-y border-gray-50 py-2.5 max-w-sm mx-auto">
          <div><p className="text-sm font-bold text-gray-900">240</p><p className="text-[10px] text-gray-400 font-semibold tracking-wider uppercase">Post</p></div>
          <div className="w-[1px] h-6 bg-gray-100" />
          <div><p className="text-sm font-bold text-gray-900">240</p><p className="text-[10px] text-gray-400 font-semibold tracking-wider uppercase">Followers</p></div>
          <div className="w-[1px] h-6 bg-gray-100" />
          <div><p className="text-sm font-bold text-gray-900">240</p><p className="text-[10px] text-gray-400 font-semibold tracking-wider uppercase">Followings</p></div>
        </div>
      </div>

      {/* Grid Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 mt-2 flex-1">
        <div className="lg:col-span-5 space-y-6">
          <div>
            <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-3">Details</h3>
            <div className="space-y-3 bg-gray-50/50 p-4 rounded-2xl border border-gray-100/60 text-xs text-gray-600 font-medium">
              <div className="flex items-center gap-3"><GraduationCap size={16} className="text-gray-400" /><span>Agriculture University</span></div>
              <div className="flex items-center gap-3"><MapPin size={16} className="text-gray-400" /><span>Karachi</span></div>
              <div className="flex items-center gap-3"><Globe size={16} className="text-gray-400" /><span>AAA-AAA-AAA</span></div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between border-b border-gray-100 pb-2">
              {["Photos", "Vedio", "Saved"].map((tab) => (
                <button key={tab} onClick={() => setActiveTab(tab)} className={`text-xs font-bold px-3 py-1 relative ${activeTab === tab ? "text-blue-500" : "text-gray-400"}`}>
                  {tab}{activeTab === tab && <span className="absolute bottom-[-9px] left-0 right-0 h-[2px] bg-blue-500 rounded-full" />}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4">
              <div className="row-span-2 rounded-2xl overflow-hidden h-[210px]"><img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80" className="w-full h-full object-cover" /></div>
              <div className="rounded-xl overflow-hidden h-[101px]"><img src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=400&q=80" className="w-full h-full object-cover" /></div>
              <div className="rounded-xl overflow-hidden h-[101px]"><img src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=400&q=80" className="w-full h-full object-cover" /></div>
            </div>
          </div>
        </div>

        {/* Feed Posts */}
        <div className="lg:col-span-7 space-y-6 border-t lg:border-t-0 lg:border-l border-gray-100 lg:pl-6 pt-6 lg:pt-0">
          {[1, 2].map((id) => (
            <div key={id} className="bg-white border border-gray-100 shadow-xs rounded-2xl p-4 space-y-3">
              <div className="flex items-center gap-3">
                <img src={user?.avatar} className="w-8 h-8 rounded-full object-cover" />
                <div>
                  <h4 className="text-xs font-bold text-gray-900">{user?.name} <span className="text-gray-400 font-normal ml-1">Update</span></h4>
                  <p className="text-[10px] text-gray-400">Profile Photo • {id}h</p>
                </div>
              </div>
              <div className="rounded-xl overflow-hidden bg-gray-100 w-full aspect-4/3 max-h-64">
                <img src={id === 1 ? "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80" : "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=600&q=80"} className="w-full h-full object-cover" />
              </div>
              <div className="flex items-center gap-4 text-gray-400 text-[11px] font-semibold pt-1">
                <button className="flex items-center gap-1.5 hover:text-red-500"><Heart size={14} /> 65</button>
                <button className="flex items-center gap-1.5 hover:text-blue-500"><MessageCircle size={14} /> 65</button>
                <button className="flex items-center gap-1.5 hover:text-green-500 ml-auto"><Share2 size={14} /> 2</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
import { Volume2, VideoOff, Mic, PhoneOff } from "lucide-react";

export default function CallOverlay({ type, user, onClose }) {
  if (!type) return null;

  if (type === "voice") {
    return (
      <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center animate-fade-in select-none">
        <div className="flex flex-col items-center text-center">
          <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden mb-4 shadow-lg ring-4 ring-gray-50">
            <img src={user?.avatar} alt="" className="w-full h-full object-cover" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">{user?.name}</h2>
          <p className="text-xs text-gray-400 mt-1 font-medium tracking-wide">Ongoing Call</p>
          <p className="text-xs text-gray-400 mt-1 font-mono">00:00:56</p>
        </div>
        <div className="absolute bottom-16 flex items-center gap-4">
          <button className="w-10 h-10 rounded-full bg-white border border-gray-100 shadow-sm flex items-center justify-center text-gray-400"><Volume2 size={16} /></button>
          <button className="w-10 h-10 rounded-full bg-white border border-gray-100 shadow-sm flex items-center justify-center text-gray-400"><VideoOff size={16} /></button>
          <button className="w-10 h-10 rounded-full bg-white border border-gray-100 shadow-sm flex items-center justify-center text-gray-400"><Mic size={16} /></button>
          <button onClick={onClose} className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center text-white shadow-md shadow-red-200"><PhoneOff size={18} /></button>
        </div>
      </div>
    );
  }

  if (type === "video") {
    return (
      <div className="fixed inset-0 bg-black z-50 flex items-center justify-center p-4 animate-fade-in select-none">
        <div className="relative w-full h-full max-w-5xl aspect-video md:h-[85vh] bg-neutral-900 rounded-3xl overflow-hidden shadow-2xl border border-neutral-800/40">
          <img src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80" alt="Remote Stream" className="w-full h-full object-cover brightness-95" />
          <div className="absolute top-4 right-4 w-28 h-36 sm:w-36 sm:h-48 rounded-2xl overflow-hidden border border-white/20 shadow-xl">
            <img src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=300&q=80" alt="Self Stream" className="w-full h-full object-cover" />
          </div>
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center gap-4 bg-black/30 backdrop-blur-xl px-5 py-3 rounded-2xl border border-white/10 shadow-lg">
            <button className="w-9 h-9 rounded-full bg-white/10 text-white flex items-center justify-center"><Volume2 size={16} /></button>
            <button className="w-9 h-9 rounded-full bg-white/10 text-white flex items-center justify-center"><VideoOff size={16} /></button>
            <button className="w-9 h-9 rounded-full bg-white/10 text-white flex items-center justify-center"><Mic size={16} /></button>
            <button onClick={onClose} className="w-10 h-10 rounded-full bg-red-500 text-white flex items-center justify-center shadow-md shadow-red-500/20"><PhoneOff size={16} /></button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
import { Volume2,VolumeX,Video,VideoOff,Mic, MicOff,PhoneOff,} from "lucide-react";
import { useState } from "react";
function CallControls({
  speakerOn,
  setSpeakerOn,
  cameraOn,
  setCameraOn,
  micOn,
  setMicOn,
  onClose,
}) {
  return (
    <div className="flex items-center gap-4">
      {/* Speaker */}
      <button
        onClick={() => setSpeakerOn(!speakerOn)}
        className={`w-10 h-10 rounded-full flex items-center justify-center transition ${
          speakerOn
            ? "bg-white text-gray-700"
            : "bg-blue-500 text-white"
        }`}
      >
        {speakerOn ? <Volume2 size={16} /> : <VolumeX size={16} />}
      </button>

      {/* Camera */}
      <button
        onClick={() => setCameraOn(!cameraOn)}
        className={`w-10 h-10 rounded-full flex items-center justify-center transition ${
          cameraOn
            ? "bg-white text-gray-700"
            : "bg-red-500 text-white"
        }`}
      >
        {cameraOn ? <Video size={16} /> : <VideoOff size={16} />}
      </button>

      {/* Mic */}
      <button
        onClick={() => setMicOn(!micOn)}
        className={`w-10 h-10 rounded-full flex items-center justify-center transition ${
          micOn
            ? "bg-white text-gray-700"
            : "bg-gray-500 text-white"
        }`}
      >
        {micOn ? <Mic size={16} /> : <MicOff size={16} />}
      </button>

      {/* End */}
      <button
        onClick={onClose}
        className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center text-white"
      >
        <PhoneOff size={18} />
      </button>
    </div>
  );
}
export default function CallOverlay({ type, user, onClose }) {
  const [speakerOn, setSpeakerOn] = useState(true);
const [micOn, setMicOn] = useState(true);
const [cameraOn, setCameraOn] = useState(true);
  if (!type) return null;
  if (type === "voice") {
    return (
      <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center animate-fade-in select-none">
        <div className="flex flex-col items-center text-center">
          <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden mb-4 shadow-lg ring-4 ring-gray-50">
            {cameraOn ? (
  <img
    src={user?.avatar}
    className="w-full h-full object-cover"
  />
) : (
  <div className="w-full h-full bg-neutral-900 flex items-center justify-center text-white">
    Camera Off
  </div>
)}
          </div>
          <h2 className="text-xl font-bold text-gray-900">{user?.name}</h2>
          <p className="text-xs text-gray-400 mt-1 font-medium tracking-wide">Ongoing Call</p>
          <p className="text-xs text-gray-400 mt-1 font-mono">00:00:00</p>
        </div>
        <div className="absolute bottom-16">
          <CallControls
            speakerOn={speakerOn}
            setSpeakerOn={setSpeakerOn}
            cameraOn={cameraOn}
            setCameraOn={setCameraOn}
            micOn={micOn}
            setMicOn={setMicOn}
            onClose={onClose}
          />
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
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
            <CallControls
              speakerOn={speakerOn}
              setSpeakerOn={setSpeakerOn}
              cameraOn={cameraOn}
              setCameraOn={setCameraOn}
              micOn={micOn}
              setMicOn={setMicOn}
              onClose={onClose}
            />
          </div>
        </div>
      </div>
    );
  }

  return null;
}
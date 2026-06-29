import { ChevronRight } from "lucide-react";

export default function PreferenceAndPrivacy() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-[13px] md:text-[18px] font-bold text-gray-400 uppercase tracking-wider mb-3 px-1">Preference</h3>
        <div className="space-y-1">
          <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 text-gray-700 transition text-left group">
            <div className="flex items-center gap-3">
              <img 
                src="/icons/notifications.png" 
                alt="Notification" 
                className="w-5 h-5 object-contain opacity-70 group-hover:opacity-100 transition"
              />
              <span className="text-sm font-medium">Notification</span>
            </div>
            <ChevronRight size={16} className="text-gray-400" />
          </button>
          <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 text-gray-700 transition text-left group">
            <div className="flex items-center gap-3">
              <img 
                src="/icons/language.png" 
                alt="Language" 
                className="w-5 h-5 object-contain opacity-70 group-hover:opacity-100 transition"
                onError={(e) => { e.target.src = "/icons/search.png" }}
              />
              <span className="text-sm font-medium">Language</span>
            </div>
            <ChevronRight size={16} className="text-gray-400" />
          </button>
        </div>
      </div>
      <div>
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 px-1">Help & Info</h3>
        <div className="space-y-1">
          <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 text-gray-700 transition text-left group">
            <div className="flex items-center gap-3">
              <img 
                src="/icons/help.png" 
                alt="Help Center" 
                className="w-5 h-5 object-contain opacity-70 group-hover:opacity-100 transition"
                onError={(e) => { e.target.src = "/icons/settings.png" }}
              />
              <span className="text-sm font-medium">Help Center</span>
            </div>
            <ChevronRight size={16} className="text-gray-400" />
          </button>
          <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 text-gray-700 transition text-left group">
            <div className="flex items-center gap-3">
              <img 
                src="/icons/event.png" 
                alt="Terms of Service" 
                className="w-5 h-5 object-contain opacity-70 group-hover:opacity-100 transition"
              />
              <span className="text-sm font-medium">Terms of Service</span>
            </div>
            <ChevronRight size={16} className="text-gray-400" />
          </button>
          <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 text-gray-700 transition text-left group">
            <div className="flex items-center gap-3">
              <img 
                src="/icons/privacy.png" 
                alt="Privacy Policy" 
                className="w-5 h-5 object-contain opacity-70 group-hover:opacity-100 transition"
                onError={(e) => { e.target.src = "/icons/settings.png" }}
              />
              <span className="text-sm font-medium">Privacy Policy</span>
            </div>
            <ChevronRight size={16} className="text-gray-400" />
          </button>
        </div>
      </div>
    </div>
  );
}
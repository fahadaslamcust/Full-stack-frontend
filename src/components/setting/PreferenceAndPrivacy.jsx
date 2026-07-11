import { ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
export default function PreferenceAndPrivacy({onSelect,}) {
  const { t } = useTranslation();
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-[13px] md:text-[18px] font-bold text-gray-400 uppercase tracking-wider mb-3 px-1">{t("preference")}</h3>
        <div className="space-y-1">
          <button 
          className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 text-gray-700 transition text-left group"
          onClick={() => onSelect("notifications")}
          >
            <div className="flex items-center gap-3">
              <img 
                src="/icons/notifications.png" 
                alt="Notification" 
                className="w-5 h-5 object-contain opacity-70 group-hover:opacity-100 transition"
              />
              <span className="text-sm font-medium">{t("notifications")}</span>
            </div>
            <ChevronRight size={16} className="text-gray-400" />
          </button>
          <button 
          className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 text-gray-700 transition text-left group"
          onClick={() => onSelect("language")}
          >
            <div className="flex items-center gap-3">
              <img 
                src="/icons/language.png" 
                alt="Language" 
                className="w-5 h-5 object-contain opacity-70 group-hover:opacity-100 transition"
                onError={(e) => { e.target.src = "/icons/search.png" }}
              />
              <span className="text-sm font-medium">{t("language")}</span>
            </div>
            <ChevronRight size={16} className="text-gray-400" />
          </button>
        </div>
      </div>
      <div>
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 px-1">{t("information")}</h3>
        <div className="space-y-1">
          <button 
          onClick={() => onSelect("help")}
          className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 text-gray-700 transition text-left group">
            <div className="flex items-center gap-3">
              <img 
                src="/icons/help.png" 
                alt="Help Center" 
                className="w-5 h-5 object-contain opacity-70 group-hover:opacity-100 transition"
                onError={(e) => { e.target.src = "/icons/settings.png" }}
              />
              <span className="text-sm font-medium">{t("helpCenter")}</span>
            </div>
            <ChevronRight size={16} className="text-gray-400" />
          </button>
          <button 
          onClick={() => onSelect("terms")}
          className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 text-gray-700 transition text-left group">
            <div className="flex items-center gap-3">
              <img 
                src="/icons/event.png" 
                alt="Terms of Service" 
                className="w-5 h-5 object-contain opacity-70 group-hover:opacity-100 transition"
              />
              <span className="text-sm font-medium">{t("terms")}</span>
            </div>
            <ChevronRight size={16} className="text-gray-400" />
          </button>
          <button 
          onClick={() => onSelect("privacy")}
          className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 text-gray-700 transition text-left group">
            <div className="flex items-center gap-3">
              <img 
                src="/icons/privacy.png" 
                alt="Privacy Policy" 
                className="w-5 h-5 object-contain opacity-70 group-hover:opacity-100 transition"
                onError={(e) => { e.target.src = "/icons/settings.png" }}
              />
              <span className="text-sm font-medium">{t("privacy")}</span>
            </div>
            <ChevronRight size={16} className="text-gray-400" />
          </button>
        </div>
      </div>
    </div>
  );
}
import { ChevronRight } from "lucide-react";

export default function PreferenceAndPrivacy() {
  const menuClass =
    "w-full flex items-center justify-between rounded-xl px-2 py-2 md:px-2 md:py-2 hover:bg-gray-50 active:bg-gray-100 transition";

  const iconClass =
    "w-5 h-5 md:w-6 md:h-6 object-contain opacity-70 group-hover:opacity-100 transition";

  return (
    <div className="w-full space-y-6">

      {/* Preference */}
      <div>
        <h3 className="mb-3 px-1 text-xs sm:text-sm md:text-base font-bold uppercase tracking-wider text-gray-400">
          Preference
        </h3>

        <div className="space-y-2">

          <button className={`${menuClass} group`}>
            <div className="flex items-center gap-3 min-w-0">
              <img
                src="/icons/notifications.png"
                alt="Notification"
                className={iconClass}
              />

              <span className="text-sm md:text-base font-medium truncate">
                Notification
              </span>
            </div>

            <ChevronRight
              size={18}
              className="text-gray-400 flex-shrink-0"
            />
          </button>

          <button className={`${menuClass} group`}>
            <div className="flex items-center gap-3 min-w-0">
              <img
                src="/icons/language.png"
                alt="Language"
                className={iconClass}
                onError={(e) => (e.target.src = "/icons/search.png")}
              />

              <span className="text-sm md:text-base font-medium truncate">
                Language
              </span>
            </div>

            <ChevronRight
              size={18}
              className="text-gray-400 flex-shrink-0"
            />
          </button>

        </div>
      </div>

      {/* Help */}
      <div>
        <h3 className="mb-3 px-1 text-xs sm:text-sm md:text-base font-bold uppercase tracking-wider text-gray-400">
          Help & Info
        </h3>

        <div className="space-y-2">

          <button className={`${menuClass} group`}>
            <div className="flex items-center gap-3 min-w-0">
              <img
                src="/icons/help.png"
                alt="Help Center"
                className={iconClass}
                onError={(e) => (e.target.src = "/icons/settings.png")}
              />

              <span className="text-sm md:text-base font-medium truncate">
                Help Center
              </span>
            </div>

            <ChevronRight
              size={18}
              className="text-gray-400 flex-shrink-0"
            />
          </button>

          <button className={`${menuClass} group`}>
            <div className="flex items-center gap-3 min-w-0">
              <img
                src="/icons/event.png"
                alt="Terms"
                className={iconClass}
              />

              <span className="text-sm md:text-base font-medium truncate">
                Terms of Service
              </span>
            </div>

            <ChevronRight
              size={18}
              className="text-gray-400 flex-shrink-0"
            />
          </button>

          <button className={`${menuClass} group`}>
            <div className="flex items-center gap-3 min-w-0">
              <img
                src="/icons/privacy.png"
                alt="Privacy"
                className={iconClass}
                onError={(e) => (e.target.src = "/icons/settings.png")}
              />

              <span className="text-sm md:text-base font-medium truncate">
                Privacy Policy
              </span>
            </div>

            <ChevronRight
              size={18}
              className="text-gray-400 flex-shrink-0"
            />
          </button>

        </div>
      </div>

    </div>
  );
}
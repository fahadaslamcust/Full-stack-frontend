import { useState, useEffect } from "react";
import AccountSettings from "../components/setting/AccountSetting";
import PreferenceAndPrivacy from "../components/setting/PreferenceAndPrivacy";
import LogoutButton from "../components/setting/LogoutButton";
import { useCurrentUser, useUpdateProfile } from "../hooks/useUsers";
import { useNavigate } from "react-router-dom";
import apiClient from "../api/client";
import { toast } from "react-toastify";
import { CheckCircle, Circle } from "lucide-react";
import { useTranslation } from "react-i18next";
export default function Settings() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(
  localStorage.getItem("notificationsEnabled") !== "false"
);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState("profile");
  const navigate = useNavigate();
  const { data: user, isLoading } = useCurrentUser();
  const updateProfileMutation = useUpdateProfile();
  const { t,i18n } = useTranslation();
  const languages = [
    { code: "en", name: "English", flag: "/flags/usa.png" },
    { code: "ur", name: "Urdu", flag: "/flags/download.png" },
    { code: "fr", name: "French", flag: "/flags/Flag-France.png" },
  ];
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };
  return (
    <div className="flex-1 flex flex-col lg:flex-row h-screen bg-[#ffffff] w-full p-0 px-6 py-4 md:py-1 lg:py-1 gap-4 md:gap-6">
      <section className="w-full lg:w-[400px] flex flex-col justify-between h-full">
        <div className="space-y-4 overflow-y-auto hide-scrollbar">
          <div>
            <h1 className="hidden md:block font-bold text-[#2D2D2D] tracking-tight">{t("settings")}</h1>
          </div>
           <div className="flex items-center gap-3 bg-[#F9FAFB] p-4 rounded-2xl border border-gray-100">
        <img
          src={user?.avatar ? (user.avatar.startsWith('http') ? user.avatar : `${apiClient.defaults.baseURL.replace('/api/v1', '')}${user.avatar}`) : "https://i.pravatar.cc/100?img=3"}
          alt="Profile"
          className="w-12 h-12 rounded-full object-cover border border-gray-200"
        />
        <div className="min-w-0">
          <h4 className="text-sm font-bold text-gray-900 truncate">{isLoading ? "Loading..." : (user?.name || "User")}</h4>
          <p className="text-xs text-gray-400 truncate">{user?.email || "No email provided"}</p>
        </div>
      </div>
          <PreferenceAndPrivacy
            isDarkMode={isDarkMode}
            onToggleTheme={toggleTheme}
            onSelect={setActiveSection}
          />
        <LogoutButton onLogout={handleLogout} />
        </div>
      </section>
      <section className="hidden lg:flex flex-1 flex-col h-full pt-5 overflow-y-auto hide-scrollbar">
        {activeSection === "profile" && (
    <>
      <div className="border-b border-gray-100 pb-4 mb-6">
        <h2 className="text-lg font-bold text-gray-900">{t("profileEdit")}</h2>
      </div>
      <AccountSettings
        user={user}
        onUpdate={(data) => {
        const toastId = toast.loading("Saving changes...");
        updateProfileMutation.mutate(data, {
          onSuccess: () => {
            toast.update(toastId, {
              render: "Profile updated successfully!",
              type: "success",
              isLoading: false,
              autoClose: 3000,
            });
          },
          onError: () => {
            toast.update(toastId, {
              render: "Failed to update profile",
              type: "error",
              isLoading: false,
              autoClose: 3000,
            });
          },
        });
      }}
        isUpdating={updateProfileMutation.isPending}
      />
    </>
  )}
  {activeSection === "notifications" && (
  <>
    <div className="border-b border-gray-100 pb-4 mb-6">
      <h2 className="text-lg font-bold text-gray-900">{t("notifications")}</h2>
    </div>
    <div className="flex items-center justify-between p-4 bg-[#F9FAFB] rounded-2xl border border-gray-100">
      <span className="text-sm font-medium text-gray-800">{t("enableNotifications")}</span>
      <button
        onClick={() => {
          const next = !notificationsEnabled;
          setNotificationsEnabled(next);
          localStorage.setItem("notificationsEnabled", JSON.stringify(next));
        }}
        className={`relative w-11 h-6 rounded-full transition ${
          notificationsEnabled ? "bg-[#3B82F6]" : "bg-gray-300"
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
            notificationsEnabled ? "translate-x-5" : ""
          }`}
        />
      </button>
    </div>
  </>
)}
  {activeSection === "language" && (
  <>
    <div className="border-b border-gray-100 pb-4 mb-6">
      <h2 className="text-lg font-bold text-gray-900">{t("language")}
      </h2>
    </div>

    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => i18n.changeLanguage(lang.code)}
          className="w-full flex items-center justify-between px-5 py-4 border-b last:border-b-0 hover:bg-gray-50 transition"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">
              <img src={lang.flag} alt={lang.name} className="w-8 h-8 rounded-full object-cover" />
            </span>

            <span className="text-gray-800 font-medium">
              {lang.name}
            </span>
          </div>

          {i18n.language === lang.code ? (
            <CheckCircle
              size={20}
              className="text-blue-500"
            />
          ) : (
            <Circle
              size={20}
              className="text-gray-400"
            />
          )}
        </button>
      ))}
    </div>
  </>
)}
  {activeSection === "help" && (
  <>
    <div className="border-b border-gray-100 pb-4 mb-6">
      <h2 className="text-lg font-bold text-gray-900">{t("helpCenter")}</h2>
    </div>
    <ul className="space-y-4 text-sm text-gray-700 list-disc pl-4">
      <li>{t("help.languageNote")}</li>
      <li>{t("help.callNote")}</li>
      <li>{t("help.homeNotifNote")}</li>
      <li>{t("help.notifPageNote")}</li>
      <li>{t("help.eventNote")}</li>
      <li>{t("help.messageSearchNote")}</li>
    </ul>
  </>
)}
  {activeSection === "terms" && (
  <>
    <div className="border-b border-gray-100 pb-4 mb-6">
      <h2 className="text-lg font-bold text-gray-900">{t("terms")}</h2>
    </div>
    <div className="space-y-4 text-sm text-gray-700 whitespace-pre-line leading-relaxed">
      {t("termsContent")}
    </div>
  </>
)}
  {activeSection === "privacy" && (
  <>
    <div className="border-b border-gray-100 pb-4 mb-6">
      <h2 className="text-lg font-bold text-gray-900">{t("privacy")}</h2>
    </div>
    <div className="space-y-4 text-sm text-gray-700 whitespace-pre-line leading-relaxed">
      {t("privacyContent")}
    </div>
  </>
)}
      </section>
    </div>
  );
}
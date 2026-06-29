import { useState } from "react";
import Stories from "../components/dashboard/Stories";
import PostFeed from "../components/dashboard/PostFeed";
import NotificationsPanel from "../components/dashboard/NotificationsPanel";

export default function Dashboard() {
  const [showProfileModal, setShowProfileModal] = useState(false);

  // useEffect(() => {
  //   const isProfileComplete = localStorage.getItem("isProfileComplete") === "true";

  //   if (!isProfileComplete) {
  //     setShowProfileModal(true);
  //   }
  // }, []);

  // const handleProfileSuccess = () => {
  //   // Form complete hone par status save karo aur modal close kar do
  //   localStorage.setItem("isProfileComplete", "true");
  //   setShowProfileModal(false);
  // };

  return (
    <div className="relative w-full h-full min-h-screen overflow-hidden">
      <div 
        className={`flex-1 h-full bg-white overflow-y-auto hide-scrollbar w-full px-4 sm:px-4 md:px-6 lg:px-8 py-4 md:py-6 lg:py-8 transition-all duration-500
          ${showProfileModal ? "blur-[2px] pointer-events-none select-none scale-[0.99]" : ""}
        `}
      >
        <main className="w-full">
          <div className="overflow-x-auto hide-scrollbar pb-2">
            <Stories />
          </div>
          <div className="mt-6 flex flex-col xl:flex-row gap-6">
            <section className="flex-1 min-w-0">
              <PostFeed />
            </section>
            <aside className="w-full xl:w-90 shrink-0">
              <NotificationsPanel />
            </aside>
          </div>
        </main>
      </div>
      {/* {showProfileModal && (
        <div className="fixed inset-0 z-50 bg-black/20 backdrop-blur-xs flex items-center justify-center animate-fade-in">
          <div className="w-full h-full relative">
            <ProfileCompletion onSuccess={handleProfileSuccess} />
          </div>
        </div>
      )} */}

    </div>
  );
}
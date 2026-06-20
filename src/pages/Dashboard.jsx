import Stories from "../components/dashboard/Stories";
import PostFeed from "../components/dashboard/PostFeed";
import NotificationsPanel from "../components/dashboard/NotificationsPanel";

export default function Dashboard() {
  return (
    <div className=" min-h-screen bg-white text-gray-800">
      <main className="w-full px-4 py-6 md:px-8 md:py-8">
        <Stories />

        <div className="mt-8 flex flex-col lg:flex-row gap-6">
          {/* Posts */}
          <div className="w-full lg:w-2/3">
            <PostFeed />
          </div>

          {/* Notifications */}
          <div className="w-full lg:w-1/3">
            <NotificationsPanel />
          </div>
        </div>
      </main>
    </div>
  );
}
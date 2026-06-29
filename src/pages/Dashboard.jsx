import Stories from "../components/dashboard/Stories";
import PostFeed from "../components/dashboard/PostFeed";
import NotificationsPanel from "../components/dashboard/NotificationsPanel";

export default function Dashboard() {
  return (
 <div className="flex-1 h-full bg-white overflow-y-auto hide-scrollbar w-full px-4 sm:px-4 md:px-6 lg:px-8 py-4 md:py-6 lg:py-8">
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
  );
}
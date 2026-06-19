import React from "react";
import {
  Heart,
  MessageCircle,
  Share2,
  Plus,
} from "lucide-react";

const stories = [
  { name: "Your Story", own: true },
  { name: "JS" },
  { name: "AK" },
  { name: "SM" },
  { name: "RT" },
];

const notifications = [
  {
    name: "Jenny Willimson",
    action: "Start Follow You",
    time: "9:12",
  },
  {
    name: "Sana Fatima",
    action: "Start Follow You",
    time: "9:12",
  },
];

const yesterday = [
  {
    name: "Olivia Smith",
    action: "Add a Post",
  },
  {
    name: "Mason Davis",
    action: "Add a Post",
  },
  {
    name: "Elijah Miller",
    action: "Add a Post",
  },
];

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto flex">
        {/* Left Side */}
        <div className="w-3/5 border-r border-gray-200 p-6">
          {/* Stories */}
          <div className="flex gap-4">
            {stories.map((story, i) => (
              <div
                key={i}
                className="relative w-24 h-32 rounded-2xl bg-gradient-to-b from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold"
              >
                {story.own ? (
                  <>
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-white text-blue-500 flex items-center justify-center">
                      <Plus size={14} />
                    </div>

                    <span className="text-xs">
                      Your Story
                    </span>
                  </>
                ) : (
                  story.name
                )}
              </div>
            ))}
          </div>

          {/* Post Card */}
          <div className="mt-12">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center">
                MA
              </div>

              <div>
                <h3 className="font-semibold">
                  Muhammad Ali
                </h3>
                <p className="text-xs text-gray-400">
                  CSS Student
                </p>
              </div>

              <button className="ml-auto px-4 py-1 rounded-full bg-gray-100 text-xs">
                Following
              </button>
            </div>

            <p className="mt-4 text-sm text-gray-500 leading-6">
              Designed a Student Community App that enables
              university students to connect, share documents,
              communicate and collaborate within their
              academic community.
            </p>

            <div className="mt-4 h-64 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
              Post Preview
            </div>

            <div className="flex gap-10 mt-4 text-gray-500">
              <div className="flex items-center gap-2">
                <Heart
                  size={18}
                  className="fill-blue-500 text-blue-500"
                />
                <span>8.5</span>
              </div>

              <div className="flex items-center gap-2">
                <MessageCircle size={18} />
                <span>8.5</span>
              </div>

              <div className="flex items-center gap-2">
                <Share2 size={18} />
                <span>2</span>
              </div>
            </div>
          </div>

          {/* Second Card */}
          <div className="mt-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-purple-500 text-white flex items-center justify-center">
                MA
              </div>

              <div>
                <h3 className="font-semibold">
                  Muhammad Ali
                </h3>
                <p className="text-xs text-gray-400">
                  CSS Student
                </p>
              </div>

              <button className="ml-auto px-4 py-1 rounded-full bg-blue-500 text-white text-xs">
                + Following
              </button>
            </div>

            <p className="mt-4 text-sm text-gray-500">
              Designed a Student Community App that enables
              university students to connect and collaborate.
            </p>
          </div>
        </div>

        {/* Right Side */}
        <div className="w-2/5 p-8">
          <div className="flex justify-between items-center">
            <h2 className="text-4xl font-bold">
              Notifications
            </h2>

            <button className="text-blue-500">
              Hide
            </button>
          </div>

          {/* Today */}
          <div className="mt-8">
            <h3 className="font-semibold mb-5">
              Today
            </h3>

            <div className="space-y-5">
              {notifications.map((item, index) => (
                <div
                  key={index}
                  className="flex gap-3"
                >
                  <div className="w-10 h-10 rounded-full bg-pink-500 text-white flex items-center justify-center">
                    {item.name.charAt(0)}
                  </div>

                  <div>
                    <p className="text-sm">
                      <span className="font-medium">
                        {item.name}
                      </span>{" "}
                      {item.action}
                    </p>

                    <p className="text-xs text-gray-400">
                      {item.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Yesterday */}
            <h3 className="font-semibold mt-10 mb-5">
              Yesterday
            </h3>

            <div className="space-y-5">
              {yesterday.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center"
                >
                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center">
                      {item.name.charAt(0)}
                    </div>

                    <div>
                      <p className="text-sm">
                        <span className="font-medium">
                          {item.name}
                        </span>{" "}
                        {item.action}
                      </p>

                      <p className="text-xs text-gray-400">
                        9:12
                      </p>
                    </div>
                  </div>

                  <div className="w-10 h-10 rounded bg-gray-300"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
export default function StudentDashboard() {
  const stats = [
    { title: "Average Grade", value: "88%", icon: "📊" },
    { title: "Courses", value: "3", icon: "📚" },
    { title: "Study Hours", value: "45h", icon: "⏰" },
    { title: "Assignments", value: "12", icon: "✍️" },
  ];

  const courses = [
    {
      title: "React Fundamentals",
      progress: 75,
      nextTopic: "Components & Props",
      instructor: "Sarah Wilson",
    },
    {
      title: "JavaScript Advanced",
      progress: 45,
      nextTopic: "Async/Await",
      instructor: "Mike Johnson",
    },
    {
      title: "UI/UX Design",
      progress: 90,
      nextTopic: "Color Theory",
      instructor: "Emily Chen",
    },
  ];

  const assignments = [
    {
      title: "Build a Todo App",
      course: "React Fundamentals",
      status: "pending",
      dueDate: "2024-03-20",
    },
    {
      title: "API Integration",
      course: "JavaScript Advanced",
      status: "completed",
      dueDate: "2024-03-18",
    },
    {
      title: "Design System",
      course: "UI/UX Design",
      status: "in-progress",
      dueDate: "2024-03-25",
    },
  ];

  const announcements = [
    {
      title: "New Course Available",
      desc: "Check out our new TypeScript course!",
      time: "2 hours ago",
    },
    {
      title: "Maintenance Notice",
      desc: "Platform updates scheduled for tonight",
      time: "5 hours ago",
    },
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return "bg-red-100 text-red-500";
      case "completed":
        return "bg-emerald-100 text-emerald-600";
      case "in-progress":
        return "bg-amber-100 text-amber-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] p-6 md:p-10 font-sans text-gray-800">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome back, Student!
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Here's what's happening with your courses today.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-xl p-2 rounded-full hover:bg-gray-50 relative">
              🔔
              <span className="w-2 h-2 bg-red-500 rounded-full absolute top-2 right-2"></span>
            </button>
            <div className="w-10 h-10 rounded-full bg-pink-500 text-white font-semibold flex items-center justify-center">
              S
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-center gap-4"
            >
              <div className="text-2xl p-3 bg-gray-50 rounded-xl">
                {stat.icon}
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold text-gray-900 mt-0.5">
                  {stat.value}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Course Progress */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold text-gray-900 mb-6">
              Course Progress
            </h2>
            <div className="space-y-6">
              {courses.map((course, idx) => (
                <div
                  key={idx}
                  className="bg-[#f8fafc] p-4 rounded-xl space-y-3"
                >
                  <div className="flex justify-between items-center text-sm font-semibold text-gray-800">
                    <span>{course.title}</span>
                    <span className="text-gray-500">{course.progress}%</span>
                  </div>
                  {/* Progress Bar */}
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gray-400 h-2 rounded-full"
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between items-center text-xs text-gray-500 pt-1">
                    <span>Next: {course.nextTopic}</span>
                    <span>{course.instructor}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Assignments & Announcements */}
          <div className="space-y-6">
            {/* Upcoming Assignments */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                Upcoming Assignments
              </h2>
              <div className="space-y-4">
                {assignments.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between text-sm"
                  >
                    <div>
                      <p className="font-semibold text-gray-800">
                        {item.title}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {item.course}
                      </p>
                    </div>
                    <div className="text-right">
                      <span
                        className={`text-xs px-2.5 py-1 rounded-full font-medium ${getStatusBadge(
                          item.status,
                        )}`}
                      >
                        {item.status}
                      </span>
                      <p className="text-[11px] text-gray-400 mt-1">
                        Due {item.dueDate}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Announcements */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                Announcements
              </h2>
              <div className="space-y-4">
                {announcements.map((news, idx) => (
                  <div
                    key={idx}
                    className="border-l-2 border-blue-600 pl-3 space-y-1"
                  >
                    <p className="font-semibold text-sm text-gray-800">
                      {news.title}
                    </p>
                    <p className="text-xs text-gray-500">{news.desc}</p>
                    <p className="text-[11px] text-gray-400">{news.time}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

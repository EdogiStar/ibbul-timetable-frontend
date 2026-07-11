function WelcomeBanner({ user }) {
  const today = new Date().toLocaleDateString("en-NG", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="rounded-2xl bg-gradient-to-r from-green-600 to-emerald-500 text-white p-6 shadow-lg">
      <h1 className="text-3xl font-bold">
        Welcome back, {user?.full_name || "Administrator"} 👋
      </h1>

      <p className="mt-2 text-green-100">
        {today}
      </p>

      <p className="mt-4 text-green-50">
        Manage the IBBUL Timetable Scheduling System from one place.
      </p>
    </div>
  );
}

export default WelcomeBanner;
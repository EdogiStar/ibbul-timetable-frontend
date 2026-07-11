import { Link } from "react-router-dom";
import {
  ArrowRight,
  CalendarDays,
  Building2,
  GraduationCap,
  Users,
  BookOpen,
  CheckCircle2,
} from "lucide-react";

function Hero() {
  const highlights = [
    "Faculty Management",
    "Academic Scheduling",
    "Course Allocation",
    "Responsive Dashboard",
  ];

  const stats = [
    {
      icon: Building2,
      title: "Faculties",
      value: "Manage",
    },
    {
      icon: GraduationCap,
      title: "Departments",
      value: "Organize",
    },
    {
      icon: Users,
      title: "Lecturers",
      value: "Coordinate",
    },
    {
      icon: BookOpen,
      title: "Courses",
      value: "Schedule",
    },
  ];

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-green-100 pt-32"
    >
      {/* Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="h-full w-full bg-[linear-gradient(#10b98122_1px,transparent_1px),linear-gradient(90deg,#10b98122_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-6 py-20 lg:grid-cols-2">

        {/* LEFT */}
        <div>

          <span className="inline-flex items-center rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
            Digital Transformation for IBBUL
          </span>

          <h1 className="mt-6 text-5xl font-extrabold leading-tight text-gray-900 lg:text-6xl">
            Smarter Timetable Management
            <span className="block text-emerald-600">
              for IBBUL
            </span>
          </h1>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            The IBBUL Timetable Scheduling System (IBBUL TSS) is a
            centralized platform that simplifies academic scheduling,
            faculty administration, lecturer allocation and timetable
            management for Ibrahim Badamasi Babangida University, Lapai.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">

            <Link
              to="/login"
              className="flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-4 font-semibold text-white shadow-lg transition hover:-translate-y-1 hover:bg-emerald-700"
            >
              Launch Application
              <ArrowRight size={20} />
            </Link>

            <a
              href="#features"
              className="rounded-xl border border-emerald-600 px-6 py-4 font-semibold text-emerald-700 transition hover:bg-emerald-50"
            >
              Explore Features
            </a>

          </div>

          <div className="mt-12 grid gap-3 sm:grid-cols-2">

            {highlights.map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 rounded-xl bg-white p-4 shadow-sm"
              >
                <CheckCircle2
                  size={20}
                  className="text-emerald-600"
                />

                <span className="font-medium text-gray-700">
                  {item}
                </span>
              </div>
            ))}

          </div>

        </div>

        {/* RIGHT */}

        <div className="relative">

          <div className="rounded-3xl border border-emerald-100 bg-white p-8 shadow-2xl">

            <div className="mb-8 flex items-center justify-between">

              <div>

                <h2 className="text-xl font-bold text-gray-800">
                  IBBUL Dashboard
                </h2>

                <p className="text-sm text-gray-500">
                  Timetable Scheduling System
                </p>

              </div>

              <CalendarDays
                size={40}
                className="text-emerald-600"
              />

            </div>

            <div className="grid gap-5 sm:grid-cols-2">

              {stats.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="rounded-2xl bg-emerald-50 p-6 transition hover:-translate-y-2 hover:shadow-lg"
                  >
                    <Icon
                      size={34}
                      className="mb-4 text-emerald-600"
                    />

                    <h3 className="font-semibold text-gray-800">
                      {item.title}
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                      {item.value}
                    </p>
                  </div>
                );
              })}

            </div>

            <div className="mt-8 rounded-2xl bg-gradient-to-r from-emerald-600 to-green-700 p-6 text-white">

              <h3 className="text-lg font-bold">
                Academic Scheduling Made Easy
              </h3>

              <p className="mt-2 text-sm text-emerald-100">
                Manage faculties, departments, lecturers, venues,
                courses and timetables from one centralized platform.
              </p>

            </div>

          </div>

          {/* Floating cards */}

          <div className="absolute -left-10 top-16 hidden rounded-xl bg-white p-4 shadow-xl lg:block">
            <p className="text-sm font-semibold text-gray-700">
              Faculties
            </p>

            <span className="text-2xl font-bold text-emerald-600">
              6+
            </span>
          </div>

          <div className="absolute -right-8 bottom-10 hidden rounded-xl bg-white p-4 shadow-xl lg:block">
            <p className="text-sm font-semibold text-gray-700">
              Status
            </p>

            <span className="font-bold text-green-600">
              System Online
            </span>
          </div>

        </div>

      </div>
    </section>
  );
}

export default Hero;
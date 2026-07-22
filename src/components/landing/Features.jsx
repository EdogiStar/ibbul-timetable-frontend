import {
  Building2,
  GraduationCap,
  BookOpen,
  Users,
 MapPinned,
  CalendarRange,
  ArrowRight,
} from "lucide-react";

function Features() {
  const features = [
    {
      icon: Building2,
      title: "Faculty Management",
      description:
        "Create, update and manage faculties across the university from a centralized dashboard.",
    },
    {
      icon: GraduationCap,
      title: "Department Management",
      description:
        "Organize academic departments and associate them with their respective faculties.",
    },
    {
      icon: BookOpen,
      title: "Course Management",
      description:
        "Maintain courses, programmes, levels and academic information efficiently.",
    },
    {
      icon: Users,
      title: "Lecturer Management",
      description:
        "Manage lecturer profiles and support teaching allocations across departments.",
    },
    {
      icon: MapPinned,
      title: "Venue Management",
      description:
        "Manage lecture halls, classrooms and laboratories to improve resource allocation.",
    },
    {
      icon: CalendarRange,
      title: "Timetable Scheduling",
      description:
        "Generate and manage academic timetables while reducing scheduling conflicts.",
    },
  ];

  return (
    <section
      id="features"
      className="bg-gradient-to-b from-gray-50 to-white py-24"
    >
      <div className="mx-auto max-w-7xl px-6">

        <div className="mx-auto max-w-3xl text-center">

          <span className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
            System Modules
          </span>

          <h2 className="mt-6 text-4xl font-bold text-gray-900">
            Designed to Simplify Academic Administration
          </h2>

          <p className="mt-5 text-lg leading-8 text-gray-600">
            IBBUL Timetable Scheduling System provides a unified platform
            for managing academic resources, scheduling activities and
            university operations from one modern interface.
          </p>

        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3">

          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="group rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-3 hover:border-emerald-500 hover:shadow-xl"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600 transition group-hover:bg-emerald-600 group-hover:text-white">
                  <Icon size={32} />
                </div>

                <h3 className="mt-8 text-2xl font-semibold text-gray-900">
                  {feature.title}
                </h3>

                <p className="mt-4 leading-7 text-gray-600">
                  {feature.description}
                </p>

                <div className="mt-8 flex items-center gap-2 font-medium text-emerald-600 opacity-0 transition group-hover:opacity-100">
                  Learn More
                  <ArrowRight size={18} />
                </div>
              </div>
            );
          })}

        </div>

        <div className="mt-20 rounded-3xl bg-gradient-to-r from-emerald-600 to-green-700 p-10 text-white">

          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">

            <div>

              <h3 className="text-3xl font-bold">
                Built for Academic Excellence
              </h3>

              <p className="mt-5 text-lg leading-8 text-emerald-100">
                From faculty administration to timetable scheduling,
                IBBUL TSS provides a scalable foundation for efficient
                academic management and future intelligent scheduling
                capabilities.
              </p>

            </div>

            <div className="grid grid-cols-2 gap-6">

              <div className="rounded-2xl bg-white/10 p-6 backdrop-blur">
                <h4 className="text-2xl md:text-4xl font-bold">
                  100%
                </h4>

                <p className="mt-2 text-emerald-100">
                  Responsive Interface
                </p>
              </div>

              <div className="rounded-2xl bg-white/10 p-6 backdrop-blur">
                <h4 className="text-2xl md:text-4xl font-bold">
                  Secure
                </h4>

                <p className="mt-2 text-emerald-100">
                  JWT Authentication
                </p>
              </div>

              <div className="rounded-2xl bg-white/10 p-6 backdrop-blur">
                <h4 className="text-2xl md:text-4xl font-bold">
                  Modern
                </h4>

                <p className="mt-2 text-emerald-100">
                  React + Node.js
                </p>
              </div>

              <div className="rounded-2xl bg-white/10 p-6 backdrop-blur">
                <h4 className="text-2xl md:text-4xl font-bold">
                  Scalable
                </h4>

                <p className="mt-2 text-emerald-100">
                  Modular Architecture
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default Features;
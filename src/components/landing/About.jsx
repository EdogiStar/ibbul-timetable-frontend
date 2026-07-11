import {
  CheckCircle2,
  Clock3,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

function About() {
  const benefits = [
    {
      icon: Clock3,
      title: "Reduce Manual Work",
      description:
        "Digitize timetable management and eliminate time-consuming manual scheduling processes.",
    },
    {
      icon: ShieldCheck,
      title: "Improve Accuracy",
      description:
        "Minimize scheduling conflicts and maintain consistent academic records across faculties.",
    },
    {
      icon: Sparkles,
      title: "Modern User Experience",
      description:
        "A responsive and intuitive interface designed for administrators and academic staff.",
    },
  ];

  const goals = [
    "Centralized academic management",
    "Secure role-based authentication",
    "Scalable architecture for future expansion",
    "Foundation for automated timetable generation",
  ];

  return (
    <section id="about" className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">

        <div className="grid items-center gap-16 lg:grid-cols-2">

          {/* LEFT */}

          <div>

            <span className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
              About IBBUL TSS
            </span>

            <h2 className="mt-6 text-4xl font-bold text-gray-900">
              Digitalizing Academic Timetable Management at
              <span className="text-emerald-600"> IBBUL</span>
            </h2>

            <p className="mt-6 text-lg leading-8 text-gray-600">
              The IBBUL Timetable Scheduling System is designed to help
              Ibrahim Badamasi Babangida University manage academic
              scheduling more efficiently through a centralized platform.
              Instead of relying on manual processes, administrators can
              manage faculties, departments, lecturers, courses, venues,
              and timetable data in one secure system.
            </p>

            <div className="mt-8 space-y-4">

              {goals.map((goal) => (
                <div
                  key={goal}
                  className="flex items-center gap-3"
                >
                  <CheckCircle2
                    size={22}
                    className="text-emerald-600"
                  />

                  <span className="text-gray-700">
                    {goal}
                  </span>
                </div>
              ))}

            </div>

          </div>

          {/* RIGHT */}

          <div className="grid gap-6">

            {benefits.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="rounded-2xl border border-emerald-100 bg-emerald-50 p-6 transition duration-300 hover:-translate-y-2 hover:shadow-lg"
                >
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-600 text-white">
                    <Icon size={28} />
                  </div>

                  <h3 className="text-xl font-semibold text-gray-800">
                    {item.title}
                  </h3>

                  <p className="mt-3 leading-7 text-gray-600">
                    {item.description}
                  </p>
                </div>
              );
            })}

          </div>

        </div>
      </div>
    </section>
  );
}

export default About;
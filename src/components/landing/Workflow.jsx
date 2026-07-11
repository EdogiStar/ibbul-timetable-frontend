import {
  LogIn,
  Building2,
  Database,
  CalendarRange,
  CheckCircle2,
} from "lucide-react";

function Workflow() {
  const steps = [
    {
      icon: LogIn,
      title: "1. Secure Login",
      description:
        "Administrators authenticate securely to access the timetable management dashboard.",
    },
    {
      icon: Building2,
      title: "2. Configure Academic Data",
      description:
        "Create faculties, departments, programmes, levels, semesters, lecturers, venues and courses.",
    },
    {
      icon: Database,
      title: "3. Manage Course Allocation",
      description:
        "Assign lecturers and organize course offerings before scheduling begins.",
    },
    {
      icon: CalendarRange,
      title: "4. Build Timetables",
      description:
        "Create structured academic timetables while reducing scheduling conflicts.",
    },
    {
      icon: CheckCircle2,
      title: "5. Publish",
      description:
        "Review, finalize and make timetables available for academic use.",
    },
  ];

  return (
    <section
      id="workflow"
      className="bg-white py-24"
    >
      <div className="mx-auto max-w-7xl px-6">

        <div className="mx-auto max-w-3xl text-center">

          <span className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
            Workflow
          </span>

          <h2 className="mt-6 text-4xl font-bold text-gray-900">
            How IBBUL TSS Works
          </h2>

          <p className="mt-5 text-lg leading-8 text-gray-600">
            A simple workflow that streamlines academic scheduling from
            system setup to timetable publication.
          </p>

        </div>

        <div className="relative mt-20">

          {/* Timeline (desktop) */}
          <div className="absolute left-0 right-0 top-10 hidden h-1 bg-emerald-200 lg:block" />

          <div className="grid gap-8 lg:grid-cols-5">

            {steps.map((step) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.title}
                  className="relative text-center"
                >
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-600 text-white shadow-lg">
                    <Icon size={34} />
                  </div>

                  <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl">
                    <h3 className="text-lg font-bold text-gray-900">
                      {step.title}
                    </h3>

                    <p className="mt-4 text-sm leading-7 text-gray-600">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}

          </div>

        </div>

      </div>
    </section>
  );
}

export default Workflow;
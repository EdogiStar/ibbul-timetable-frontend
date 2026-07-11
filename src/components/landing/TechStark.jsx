import {
  Code2,
  Server,
  Database,
  ShieldCheck,
  Layers3,
  GitBranch,
} from "lucide-react";

function TechStack() {
  const technologies = [
    {
      icon: Code2,
      title: "React",
      description:
        "Modern component-based frontend for a fast and responsive user interface.",
    },
    {
      icon: Server,
      title: "Node.js & Express",
      description:
        "RESTful backend APIs powering authentication and academic data management.",
    },
    {
      icon: Database,
      title: "Supabase PostgreSQL",
      description:
        "Reliable relational database for storing university records and scheduling data.",
    },
    {
      icon: ShieldCheck,
      title: "JWT Authentication",
      description:
        "Secure authentication and role-based access control for system users.",
    },
    {
      icon: Layers3,
      title: "Tailwind CSS",
      description:
        "Utility-first styling framework used to build a clean, responsive interface.",
    },
    {
      icon: GitBranch,
      title: "Git & GitHub",
      description:
        "Version control and collaborative development throughout the project lifecycle.",
    },
  ];

  return (
    <section
      id="technology"
      className="bg-gradient-to-br from-emerald-700 via-emerald-600 to-green-700 py-24 text-white"
    >
      <div className="mx-auto max-w-7xl px-6">

        <div className="mx-auto max-w-3xl text-center">

          <span className="rounded-full bg-white/20 px-4 py-2 text-sm font-semibold backdrop-blur">
            Technology Stack
          </span>

          <h2 className="mt-6 text-4xl font-bold">
            Built with Modern Web Technologies
          </h2>

          <p className="mt-5 text-lg leading-8 text-emerald-100">
            IBBUL Timetable Scheduling System combines a modern frontend,
            secure backend and scalable database architecture to provide
            an efficient academic management platform.
          </p>

        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3">

          {technologies.map((tech) => {
            const Icon = tech.icon;

            return (
              <div
                key={tech.title}
                className="rounded-3xl border border-white/20 bg-white/10 p-8 backdrop-blur transition duration-300 hover:-translate-y-2 hover:bg-white/15"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-emerald-600">
                  <Icon size={32} />
                </div>

                <h3 className="mt-6 text-2xl font-semibold">
                  {tech.title}
                </h3>

                <p className="mt-4 leading-7 text-emerald-100">
                  {tech.description}
                </p>
              </div>
            );
          })}

        </div>

        <div className="mt-20 rounded-3xl border border-white/20 bg-white/10 p-10 backdrop-blur">

          <div className="grid gap-10 md:grid-cols-4">

            <div className="text-center">
              <h3 className="text-4xl font-bold">Frontend</h3>
              <p className="mt-3 text-emerald-100">
                React + Tailwind CSS
              </p>
            </div>

            <div className="text-center">
              <h3 className="text-4xl font-bold">Backend</h3>
              <p className="mt-3 text-emerald-100">
                Express.js REST API
              </p>
            </div>

            <div className="text-center">
              <h3 className="text-4xl font-bold">Database</h3>
              <p className="mt-3 text-emerald-100">
                PostgreSQL (Supabase)
              </p>
            </div>

            <div className="text-center">
              <h3 className="text-4xl font-bold">Security</h3>
              <p className="mt-3 text-emerald-100">
                JWT Authentication
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default TechStack;
import { Link } from "react-router-dom";
import {
  Building2,
  BookOpen,
  Users,
  MapPin,
  CalendarSearch,
  Plus,
} from "lucide-react";

const actions = [
  {
    title: "Add Faculty",
    icon: Building2,
    link: "/faculties",
  },
  {
    title: "Add Course",
    icon: BookOpen,
    link: "/courses",
  },
  {
    title: "Add Lecturer",
    icon: Users,
    link: "/lecturers",
  },
  {
    title: "Add Venue",
    icon: MapPin,
    link: "/venues",
  },
  {
    title: "Generate Timetable",
    icon: CalendarSearch,
    link: "/scheduler",
  },
];

function QuickActions() {
  return (
    <div className="rounded-xl border border-green-100 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-green-700 mb-5">
        Quick Actions
      </h2>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <Link
              key={action.title}
              to={action.link}
              className="group rounded-xl border border-green-100 p-4 hover:bg-green-50 hover:border-green-300 transition"
            >
              <div className="flex items-center justify-between">
                <Icon className="text-green-600" size={28} />

                <Plus
                  size={18}
                  className="text-green-500 group-hover:rotate-90 transition-transform"
                />
              </div>

              <p className="mt-4 font-medium text-gray-700">
                {action.title}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default QuickActions;
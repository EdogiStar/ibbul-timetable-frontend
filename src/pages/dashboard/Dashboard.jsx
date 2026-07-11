import { useEffect, useState } from "react";
import {
  Building2,
  BookOpen,
  Users,
  Calendar,
  GraduationCap,
  School,
  MapPin,
  Layers,
} from "lucide-react";

import api from "@/services/api";
import { useAuth } from "@/context/AuthContext";
import PageHeader from "@/components/PageHeader";
import StatCard from "@/components/StatCard";
import WelcomeBanner from "@/components/dashboard/WelcomeBanner";
import QuickActions from "@/components/dashboard/QuickActions";

function Dashboard() {
  const { user } = useAuth();

  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get("/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setStats(response.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const cards = [
    {
      title: "Faculties",
      value: stats?.faculties ?? 0,
      icon: School,
    },
    {
      title: "Departments",
      value: stats?.departments ?? 0,
      icon: Building2,
    },
    {
      title: "Programmes",
      value: stats?.programmes ?? 0,
      icon: GraduationCap,
    },
    {
      title: "Courses",
      value: stats?.courses ?? 0,
      icon: BookOpen,
    },
    {
      title: "Lecturers",
      value: stats?.lecturers ?? 0,
      icon: Users,
    },
    {
      title: "Venues",
      value: stats?.venues ?? 0,
      icon: MapPin,
    },
    {
      title: "Levels",
      value: stats?.levels ?? 0,
      icon: Layers,
    },
    {
      title: "Semesters",
      value: stats?.semesters ?? 0,
      icon: Calendar,
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <WelcomeBanner user={user} />

      <PageHeader
        title="Dashboard"
        subtitle="Monitor your university timetable system."
      />

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <StatCard
            key={card.title}
            title={card.title}
            value={loading ? "..." : card.value}
            icon={card.icon}
          />
        ))}
      </div>

      <QuickActions />

      <div className="rounded-xl border border-green-100 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold text-green-700">
          System Overview
        </h2>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg bg-green-50 p-4">
            <p className="text-sm text-gray-500">Registered Users</p>
            <p className="mt-1 text-3xl font-bold text-green-700">
              {loading ? "..." : stats?.users}
            </p>
          </div>

          <div className="rounded-lg bg-green-50 p-4">
            <p className="text-sm text-gray-500">Course Offerings</p>
            <p className="mt-1 text-3xl font-bold text-green-700">
              {loading ? "..." : stats?.courseOfferings}
            </p>
          </div>

          <div className="rounded-lg bg-green-50 p-4">
            <p className="text-sm text-gray-500">Academic Sessions</p>
            <p className="mt-1 text-3xl font-bold text-green-700">
              {loading ? "..." : stats?.sessions}
            </p>
          </div>

          <div className="rounded-lg bg-green-50 p-4">
            <p className="text-sm text-gray-500">Semesters</p>
            <p className="mt-1 text-3xl font-bold text-green-700">
              {loading ? "..." : stats?.semesters}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
import React, { useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  School,
  Building2,
  GraduationCap,
  Layers,
  Calendar,
  Clock,
  Users,
  MapPin,
  BookOpen,
  ClipboardCheck,
  UserCheck,
  Grid3X3,
  CalendarSearch,
  BarChart3,
  Settings,
  User,
  Menu,
  X,
  LogOut,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

const navItems = [
  { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { path: "/faculties", label: "Faculties", icon: School },
  { path: "/departments", label: "Departments", icon: Building2 },
  { path: "/programmes", label: "Programmes", icon: GraduationCap },
  { path: "/levels", label: "Levels", icon: Layers },
  { path: "/sessions", label: "Sessions", icon: Calendar },
  { path: "/semesters", label: "Semesters", icon: Clock },
  { path: "/lecturers", label: "Lecturers", icon: Users },
  { path: "/venues", label: "Venues", icon: MapPin },
  { path: "/courses", label: "Courses", icon: BookOpen },
  { path: "/course-offerings", label: "Course Offerings", icon: ClipboardCheck },
  { path: "/course-allocation", label: "Course Allocations", icon: UserCheck },
  { path: "/timetables", label: "Timetables", icon: Grid3X3 },
  { path: "/scheduler", label: "Scheduler", icon: CalendarSearch },
  { path: "/reports", label: "Reports", icon: BarChart3 },
  { path: "/users", label: "User Management", icon: Settings },
  { path: "/profile", label: "My Profile", icon: User },
];

const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/login", { replace: true });
  };

  const initials = user?.full_name
    ? user.full_name
        .split(" ")
        .map((name) => name[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "AD";

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 z-50 flex flex-col border-r bg-card transition-all duration-300",
          sidebarOpen ? "w-64" : "w-20"
        )}
      >
        <div className="flex h-16 items-center border-b px-6">
          <h2
            className={cn(
              "truncate font-bold text-primary",
              !sidebarOpen && "hidden"
            )}
          >
            IBBUL TSS
          </h2>

          <span
            className={cn(
              "font-bold text-primary",
              sidebarOpen && "hidden"
            )}
          >
            IB
          </span>
        </div>

        <nav className="custom-scrollbar flex-1 space-y-1 overflow-y-auto p-4">
          {navItems.map((item) => {
            const Icon = item.icon;

            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                title={!sidebarOpen ? item.label : ""}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <Icon size={20} className="shrink-0" />

                {sidebarOpen && (
                  <span className="text-sm font-medium">
                    {item.label}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="border-t p-4">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-destructive transition-colors hover:bg-destructive/10"
          >
            <LogOut size={20} className="shrink-0" />

            {sidebarOpen && (
              <span className="text-sm font-medium">
                Logout
              </span>
            )}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main
        className={cn(
          "flex flex-1 flex-col transition-all duration-300",
          sidebarOpen ? "ml-64" : "ml-20"
        )}
      >
        {/* Top Navbar */}
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b bg-card px-6">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="rounded-md p-2 hover:bg-muted"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <div className="flex items-center gap-4">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-medium">
                {user?.full_name || "Administrator"}
              </p>

              <p className="text-xs text-muted-foreground">
                {user?.email || "admin@ibbul.edu.ng"}
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/20 bg-primary/10 font-bold text-primary">
              {initials}
            </div>
          </div>
        </header>

        <div className="flex-1">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
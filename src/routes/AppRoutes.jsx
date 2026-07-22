import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import MainLayout from "@/layouts/MainLayout";
import ProtectedRoute from "./ProtectedRoute";

import Landing from "@/pages/Landing";
import Login from "@/pages/auth/Login";

import Dashboard from "@/pages/dashboard/Dashboard";
import Faculties from "@/pages/faculties/Faculties";
import Departments from "@/pages/departments/Departments";
import Programmes from "@/pages/programmes/Programmes";
import Levels from "@/pages/levels/Levels";
import Courses from "@/pages/courses/Courses";
import CourseOfferings from "@/pages/course-offerings/CourseOfferings";
import CourseAllocation from "@/pages/course-allocation/CourseAllocation";
import Sessions from "@/pages/sessions/Sessions";
import Semesters from "@/pages/semesters/Semesters";
import Lecturers from "@/pages/lecturers/Lecturers";
import Venues from "@/pages/venues/Venues";
import Scheduler from "@/pages/scheduler/Scheduler";
import Timetables from "@/pages/timetables/Timetables";
import Users from "@/pages/users/Users";
import Reports from "@/pages/reports/Reports";
import Profile from "@/pages/profile/Profile";
import Days from "@/pages/days/Days";
import TimeSlots from "@/pages/time-slots/TimeSlots";


function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>

            <Route path="/dashboard" element={<Dashboard />} />

            <Route path="/faculties" element={<Faculties />} />
            <Route path="/departments" element={<Departments />} />
            <Route path="/programmes" element={<Programmes />} />
            <Route path="/levels" element={<Levels />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/course-offerings" element={<CourseOfferings />} />
            <Route path="/course-allocation" element={<CourseAllocation />} />
            <Route path="/sessions" element={<Sessions />} />
            <Route path="/semesters" element={<Semesters />} />
            <Route path="/lecturers" element={<Lecturers />} />
            <Route path="/venues" element={<Venues />} />
            <Route path="/scheduler" element={<Scheduler />} />
            <Route path="/timetables" element={<Timetables />} />
            <Route path="/users" element={<Users />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/days" element={<Days />} />
            <Route path="/time-slots" element={<TimeSlots />} />
          </Route>
        </Route>

        {/* Catch-all */}
        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
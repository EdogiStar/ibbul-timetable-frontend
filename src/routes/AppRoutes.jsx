import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import MainLayout from "@/layouts/MainLayout";
import ProtectedRoute from "./ProtectedRoute";

import Login from "@/pages/auth/Login";
import Dashboard from "@/pages/dashboard/Dashboard";
import Faculties from "@/pages/faculties/Faculties";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Routes */}
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>

            <Route
              path="/"
              element={<Navigate to="/dashboard" replace />}
            />

            <Route
              path="/dashboard"
              element={<Dashboard />}
            />
            <Route
             path="/faculties"
             element={<Faculties />}
             />

          </Route>
        </Route>

        {/* Catch-all */}
        <Route
          path="*"
          element={<Navigate to="/dashboard" replace />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Appointments from "../pages/Appointments";
import NewAppointment from "../pages/NewAppointment";
import EditAppointment from "../pages/EditAppointment";
import Profile from "../pages/Profile";
import { useAuth } from "../context/AuthContext";
import Layout from "../components/Layout";
import Register from "../pages/Register";

function PrivateRoute({ children }) {
  const { user } = useAuth();
  const token = localStorage.getItem("token");
  const location = useLocation();

  if (!user || !token) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
}

function AppLayout({ children }) {
  return <Layout>{children}</Layout>;
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <AppLayout>
              <Dashboard />
            </AppLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/appointments"
        element={
          <PrivateRoute>
            <AppLayout>
              <Appointments />
            </AppLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/new-appointment"
        element={
          <PrivateRoute>
            <AppLayout>
              <NewAppointment />
            </AppLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/edit-appointment/:id"
        element={
          <PrivateRoute>
            <AppLayout>
              <EditAppointment />
            </AppLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <AppLayout>
              <Profile />
            </AppLayout>
          </PrivateRoute>
        }
      />

      <Route
        path="*"
        element={
          <PrivateRoute>
            <Navigate to="/dashboard" />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

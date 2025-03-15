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
  const accessToken = localStorage.getItem("access_token");
  const location = useLocation();

  if (!user || !accessToken) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

function AppLayout({ children }) {
  return <Layout>{children}</Layout>;
}

export default function AppRoutes() {
  return (
    <Routes>
      {/* Rotas públicas */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Rotas privadas */}
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
        path="/"
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

      {/* Redirecionamento para rota padrão */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginPage from "@/pages/Auth/LoginPage";
import SignupPage from "@/pages/Auth/SignupPage";
import NotFoundPage from "@/pages/Auth/NotFoundPage";
import { useAuth } from "@/hooks/useAuth";
import EducationPage from "@/pages/Education/EducationPage";
import DashboardPage from "@/pages/Dashboard/DashboardPage";
import AdminPage from "@/pages/Admin/AdminPage";
import DentistPage from "@/pages/Dentist/DentistPage";
import ForgetPasswordPage from "./pages/Auth/ForgetPasswordPage";
import { Toaster } from "@/components/ui/toaster";
import ResetPasswordPage from "@/pages/Auth/ResetPasswordPage";
import Layout from "./Layout";

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { authState, isLording } = useAuth();

  if (!authState && !isLording) {
    console.log("ProtectedRoute: User is not authenticated");
    // Redirect to login if the user is not authenticated
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default function App() {
  const { authState } = useAuth();
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/login"
          element={!authState ? <LoginPage /> : <Navigate to="/" replace />}
        />
        {/* Signup Not working*/}
        <Route path="/signup" element={<SignupPage />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            // <ProtectedRoute>
            // </ProtectedRoute>
            <Layout />
          }
        >
          <Route index element={<DashboardPage />} />

          <Route path="/education" element={<EducationPage />} />
          {/* <Route path="/lands" element={<LandsPage />} />
          <Route path="/jobs" element={<JobsPage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/courses" element={<CoursePage />} /> */}

          <Route path="/" element={<AdminPage />} />
          <Route path="/dentist" element={<DentistPage />} />
        </Route>

        <Route
          path="/forget-password"
          element={
            !authState ? <ForgetPasswordPage /> : <Navigate to="/" replace />
          }
        />

        <Route
          path="/reset-password"
          element={
            !authState ? <ResetPasswordPage /> : <Navigate to="/" replace />
          }
        />
        {/* Error Page */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import BuyPage from "./pages/BuyPage";
import SellPage from "./pages/SellPage";
import RentPage from "./pages/RentPage";
import AgentsPage from "./pages/AgentsPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import VerifyCodePage from "./pages/VerifyCodePage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import PropertyDetailsPage from "./pages/PropertyDetailsPage";
import FindAgentsPage from './pages/FindAgentsPage';
import AllAgentsPage from './pages/AllAgentsPage';
import DashboardLayout from "./components/dashboard/DashboardLayout";
import DashboardOverview from "./components/dashboard/DashboardOverview";
import PropertyHub from "./components/dashboard/PropertyHub";
import LeadManager from "./components/dashboard/LeadManager";
import Analytics from "./components/dashboard/Analytics";
import Reviews from "./components/dashboard/Reviews";
import Communications from "./components/dashboard/Communications";
import Settings from "./components/dashboard/Settings";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public Routes */}
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="buy" element={<BuyPage />} />
          <Route path="rent" element={<RentPage />} />
          <Route path="sell" element={<SellPage />} />
          <Route path="find-agents" element={<FindAgentsPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="signin" element={<SignInPage />} />
          <Route path="signup" element={<SignUpPage />} />
          <Route path="forgot-password" element={<ForgotPasswordPage />} />
          <Route path="reset-password" element={<ResetPasswordPage />} />
          <Route path="verify" element={<VerifyCodePage />} />
          <Route path="property/:id" element={<PropertyDetailsPage />} />
          <Route path="all-agents" element={<AllAgentsPage />} />
        </Route>

        {/* Protected Dashboard Routes */}
        <Route
          path="dashboard"
          element={
            <PrivateRoute>
              <DashboardLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<DashboardOverview />} />
          <Route path="properties" element={<PropertyHub />} />
          <Route path="leads" element={<LeadManager />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="reviews" element={<Reviews />} />
          <Route path="messages" element={<Communications />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;

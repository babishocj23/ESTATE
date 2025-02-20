import { Routes, Route } from "react-router-dom";
import { useMediaQuery } from 'react-responsive';
import { AuthProvider } from "./contexts/AuthContext";
import { Toaster } from 'react-hot-toast';
import Layout from "./components/Layout";
import MobileHomePage from "./pages/MobileHomePage";
import HomePage from "./pages/HomePage";
import BuyPage from "./pages/BuyPage";
import RentPage from "./pages/RentPage";
import SellPage from "./pages/SellPage";
import FindAgentsPage from "./pages/FindAgentsPage";
import PropertyDetailsPage from "./pages/PropertyDetailsPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import ProfilePage from "./pages/ProfilePage";
import FavoritesPage from "./pages/FavoritesPage";
import MapPage from "./pages/MapPage";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import PrivateRoute from "./components/PrivateRoute";
import './styles/mobile.css';

function App() {
  // Use standard breakpoint from our documentation
  const isMobile = useMediaQuery({ maxWidth: 640 }); // sm breakpoint

  return (
    <AuthProvider>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 2000,
          style: {
            background: '#1f2937',
            color: '#fff',
            border: '1px solid rgba(59, 130, 246, 0.1)',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
      <Routes>
        {/* Public Routes */}
        <Route element={<Layout />}>
          {/* Home Route with Mobile/Desktop Switch */}
          <Route 
            index 
            element={isMobile ? <MobileHomePage /> : <HomePage />} 
          />

          {/* Property Routes */}
          <Route path="buy" element={<BuyPage />} />
          <Route path="rent" element={<RentPage />} />
          <Route path="sell" element={<SellPage />} />
          <Route path="find-agents" element={<FindAgentsPage />} />
          <Route path="property/:id" element={<PropertyDetailsPage />} />
          <Route path="map" element={<MapPage />} />

          {/* Auth Routes */}
          <Route path="signin" element={<SignInPage />} />
          <Route path="signup" element={<SignUpPage />} />

          {/* Protected Routes */}
          <Route
            path="profile"
            element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            }
          />
          <Route
            path="favorites"
            element={
              <PrivateRoute>
                <FavoritesPage />
              </PrivateRoute>
            }
          />
        </Route>

        {/* Protected Dashboard Routes */}
        <Route
          path="dashboard/*"
          element={
            <PrivateRoute>
              <DashboardLayout />
            </PrivateRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;

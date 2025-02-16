import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { FiHome, FiUsers, FiBarChart2, FiMessageSquare, FiSettings, FiMenu, FiX } from 'react-icons/fi';
import DashboardNav from './DashboardNav';
import { useAuth } from '../../contexts/AuthContext';

const DashboardLayout = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <div className="min-h-screen bg-dark-900 flex">
      {/* Mobile Menu Button */}
      {isMobile && (
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="fixed top-4 left-4 z-50 p-2 bg-dark-800 rounded-lg text-white hover:bg-dark-700 transition-colors"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      )}

      {/* Sidebar */}
      <aside
        className={`${
          isMobile
            ? `fixed inset-y-0 left-0 transform ${
                isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
              }`
            : 'sticky top-0 h-screen'
        } w-64 bg-dark-800 border-r border-dark-700 transition-transform duration-300 ease-in-out z-40`}
      >
        <div className="h-full flex flex-col">
          <div className="flex items-center justify-center h-16 border-b border-dark-700">
            <h1 className="text-xl font-bold text-white">
              Agent Dashboard<span className="text-primary">.</span>
            </h1>
          </div>
          <DashboardNav />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <Outlet />
        </div>
      </main>

      {/* Mobile Menu Overlay */}
      {isMobile && isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </div>
  );
};

export default DashboardLayout; 
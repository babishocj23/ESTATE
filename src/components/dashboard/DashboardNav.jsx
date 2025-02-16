import { NavLink, useLocation } from 'react-router-dom';
import { FiHome, FiUsers, FiBarChart2, FiMessageSquare, FiSettings, FiPackage, FiStar } from 'react-icons/fi';
import { useAuth } from '../../contexts/AuthContext';

const navItems = [
  { to: '/dashboard', icon: FiHome, label: 'Overview', end: true },
  { to: '/dashboard/properties', icon: FiPackage, label: 'Properties' },
  { to: '/dashboard/leads', icon: FiUsers, label: 'Leads' },
  { to: '/dashboard/analytics', icon: FiBarChart2, label: 'Analytics' },
  { to: '/dashboard/reviews', icon: FiStar, label: 'Reviews' },
  { to: '/dashboard/messages', icon: FiMessageSquare, label: 'Messages' },
  { to: '/dashboard/settings', icon: FiSettings, label: 'Settings' },
];

const DashboardNav = () => {
  const { user } = useAuth();
  const location = useLocation();

  return (
    <nav className="flex-1 overflow-y-auto py-4">
      <div className="px-4 mb-6">
        <div className="py-4 border-b border-dark-700">
          <p className="text-sm text-gray-400">Signed in as</p>
          <p className="text-sm font-medium text-white truncate">
            {user?.email}
          </p>
        </div>
      </div>
      <ul className="space-y-1 px-3">
        {navItems.map(({ to, icon: Icon, label, end }) => (
          <li key={to}>
            <NavLink
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-[0.98]'
                    : 'text-gray-400 hover:text-white hover:bg-dark-700'
                }`
              }
            >
              <Icon className="w-5 h-5 mr-3" />
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default DashboardNav; 
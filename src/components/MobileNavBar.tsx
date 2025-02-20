import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FiHome, FiMapPin, FiHeart, FiUser } from 'react-icons/fi';
import { useAuth } from '../contexts/AuthContext';

interface NavItem {
  path: string;
  icon: JSX.Element;
  label: string;
  requiresAuth?: boolean;
}

const MobileNavBar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const navItems: NavItem[] = [
    { path: '/', icon: <FiHome size={24} />, label: 'Home' },
    { path: '/map', icon: <FiMapPin size={24} />, label: 'Nearby' },
    { path: '/favorites', icon: <FiHeart size={24} />, label: 'Saved', requiresAuth: true },
    { path: '/profile', icon: <FiUser size={24} />, label: 'Profile', requiresAuth: true },
  ];

  const handleNavClick = (item: NavItem) => {
    if (item.requiresAuth && !user) {
      navigate('/signin');
    } else {
      navigate(item.path);
    }
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-dark-900/95 backdrop-blur-md border-t border-gray-800 sm:hidden z-50">
      <div className="flex justify-around items-center h-16 px-4">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => handleNavClick(item)}
              className={`flex flex-col items-center justify-center w-16 h-full transition-colors ${
                isActive ? 'text-primary' : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              {item.icon}
              <span className="text-xs mt-1">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileNavBar; 
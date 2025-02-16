import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FiMenu, FiX, FiUser, FiLogOut, FiHome, FiSearch, FiDollarSign } from 'react-icons/fi';
import { supabase } from '../lib/supabase';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const menuRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { name: 'Buy', path: '/buy', icon: <FiHome /> },
    { name: 'Rent', path: '/rent', icon: <FiSearch /> },
    { name: 'Sell', path: '/sell', icon: <FiDollarSign /> },
    { name: 'Find Agents', path: '/find-agents', icon: <FiUser /> },
  ];

  useEffect(() => {
    // Check for authenticated session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    // Handle clicks outside menu to close it
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      subscription.unsubscribe();
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const renderAuthButtons = () => {
    if (user) {
      return (
        <div className="flex flex-col md:flex-row gap-3">
          <Link
            to="/dashboard"
            className="flex items-center justify-center gap-2 px-4 py-3 md:py-2 rounded-xl bg-dark-800 text-white transition-all duration-300 hover:bg-dark-700 active:scale-95 touch-manipulation"
          >
            <FiUser />
            <span>Dashboard</span>
          </Link>
          <button
            onClick={handleSignOut}
            className="flex items-center justify-center gap-2 px-4 py-3 md:py-2 rounded-xl bg-primary hover:bg-primary-dark text-white transition-all duration-300 active:scale-95 touch-manipulation"
          >
            <FiLogOut />
            <span>Sign Out</span>
          </button>
        </div>
      );
    }

    return (
      <div className="flex flex-col md:flex-row gap-3">
        <Link
          to="/signin"
          className="flex items-center justify-center gap-2 px-4 py-3 md:py-2 rounded-xl bg-dark-800 text-white transition-all duration-300 hover:bg-dark-700 active:scale-95 touch-manipulation"
        >
          <FiUser />
          <span>Sign In</span>
        </Link>
        <Link
          to="/signup"
          className="flex items-center justify-center gap-2 px-4 py-3 md:py-2 rounded-xl bg-primary hover:bg-primary-dark text-white transition-all duration-300 active:scale-95 touch-manipulation"
        >
          <span>Sign Up</span>
        </Link>
      </div>
    );
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-dark-900/95 backdrop-blur-md' : 'bg-gradient-to-b from-dark-900/90 to-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold text-white hover:text-primary transition-colors duration-300"
          >
            RedLynx
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-medium transition-all duration-300 hover:scale-105 ${
                  location.pathname === link.path
                    ? 'text-primary'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="flex items-center space-x-4">
              {renderAuthButtons()}
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden rounded-lg p-2 text-gray-400 hover:text-white hover:bg-dark-800 focus:outline-none active:scale-95 touch-manipulation"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          ref={menuRef}
          className={`fixed inset-x-0 top-16 md:hidden transition-all duration-300 ease-in-out transform ${
            isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
          }`}
        >
          <div className="bg-dark-900/95 backdrop-blur-md shadow-lg rounded-b-2xl mx-4 overflow-hidden">
            <div className="p-4 space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-300 active:scale-95 touch-manipulation ${
                    location.pathname === link.path
                      ? 'text-primary bg-dark-800'
                      : 'text-gray-300 hover:text-white hover:bg-dark-800'
                  }`}
                >
                  {link.icon}
                  {link.name}
                </Link>
              ))}
              <div className="pt-3 border-t border-dark-700">
                {renderAuthButtons()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;


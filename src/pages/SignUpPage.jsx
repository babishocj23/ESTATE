import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiUser, FiMail, FiLock, FiArrowRight, FiPhone, FiHome, FiUserCheck } from 'react-icons/fi';
import AuthLayout from '../components/AuthLayout';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

const SignUpPage = () => {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'buyer', // buyer, seller, or agent
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match');
    }

    if (formData.password.length < 6) {
      return setError('Password must be at least 6 characters long');
    }

    if (!formData.phone) {
      return setError('Phone number is required');
    }

    // Validate phone number format
    const phoneRegex = /^\+?[\d\s-]{10,}$/;
    if (!phoneRegex.test(formData.phone)) {
      return setError('Please enter a valid phone number');
    }

    try {
      setError('');
      setLoading(true);

      const { error } = await signUp({
        email: formData.email,
        password: formData.password,
        full_name: formData.fullName,
        phone: formData.phone,
        role: formData.role
      });

      if (error) throw error;

      // Navigate to verification page
      navigate('/verify', { 
        state: { 
          email: formData.email
        } 
      });
    } catch (err) {
      console.error('Sign up error:', err);
      if (err.message.includes('duplicate key') || err.message.includes('already exists')) {
        setError('An account with this email already exists');
      } else if (err.message.includes('invalid email')) {
        setError('Please enter a valid email address');
      } else if (err.message.includes('password')) {
        setError('Password must be at least 6 characters long');
      } else {
        setError(err.message || 'Failed to create account. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const roles = [
    { id: 'buyer', icon: <FiUser />, label: 'Buyer' },
    { id: 'seller', icon: <FiHome />, label: 'Seller' },
    { id: 'agent', icon: <FiUserCheck />, label: 'Agent' },
  ];

  return (
    <AuthLayout
      title="Create Account"
      subtitle="Join our community of real estate enthusiasts"
      backgroundImage="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3"
    >
      <div className="mt-8">
        {/* Role Selection */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {roles.map(role => (
            <button
              key={role.id}
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, role: role.id }))}
              className={`flex flex-col items-center p-4 rounded-xl transition-all ${
                formData.role === role.id
                  ? 'bg-primary text-white'
                  : 'bg-dark-800/50 text-gray-400 hover:bg-dark-700/50'
              }`}
            >
              <div className="text-2xl mb-2">{role.icon}</div>
              <span className="text-sm">{role.label}</span>
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
              <p className="text-red-500 text-sm text-center">{error}</p>
            </div>
          )}

          <div className="space-y-4">
            <div className="relative">
              <FiUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="w-full pl-12 pr-4 py-3 bg-dark-800/50 backdrop-blur-md border border-dark-700 rounded-xl focus:ring-2 focus:ring-primary text-white placeholder-gray-400"
                placeholder="Full name"
              />
            </div>

            <div className="relative">
              <FiMail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full pl-12 pr-4 py-3 bg-dark-800/50 backdrop-blur-md border border-dark-700 rounded-xl focus:ring-2 focus:ring-primary text-white placeholder-gray-400"
                placeholder="Email address"
              />
            </div>

            <div className="relative">
              <FiPhone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                pattern="^\+?[\d\s-]{10,}$"
                className="w-full pl-12 pr-4 py-3 bg-dark-800/50 backdrop-blur-md border border-dark-700 rounded-xl focus:ring-2 focus:ring-primary text-white placeholder-gray-400"
                placeholder="Phone number (e.g. +1 555-123-4567)"
                title="Please enter a valid phone number with country code"
                onBlur={(e) => {
                  const value = e.target.value.trim();
                  if (value && !value.startsWith('+')) {
                    setFormData(prev => ({
                      ...prev,
                      phone: '+' + value
                    }));
                  }
                }}
              />
              <div className="text-xs text-gray-400 mt-1 ml-1">
                Include country code (e.g. +1 for US)
              </div>
            </div>

            <div className="relative">
              <FiLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={6}
                className="w-full pl-12 pr-4 py-3 bg-dark-800/50 backdrop-blur-md border border-dark-700 rounded-xl focus:ring-2 focus:ring-primary text-white placeholder-gray-400"
                placeholder="Password (min. 6 characters)"
              />
            </div>

            <div className="relative">
              <FiLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                minLength={6}
                className="w-full pl-12 pr-4 py-3 bg-dark-800/50 backdrop-blur-md border border-dark-700 rounded-xl focus:ring-2 focus:ring-primary text-white placeholder-gray-400"
                placeholder="Confirm password"
              />
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="terms"
              required
              className="h-4 w-4 bg-dark-800 border-dark-700 rounded focus:ring-primary text-primary"
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-400">
              I agree to the{' '}
              <Link to="/terms" className="text-primary hover:text-primary-dark transition-colors">
                Terms of Service
              </Link>
              {' '}and{' '}
              <Link to="/privacy" className="text-primary hover:text-primary-dark transition-colors">
                Privacy Policy
              </Link>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-sm font-medium rounded-xl text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></span>
                Creating Account...
              </>
            ) : (
              <>
                Create Account
                <FiArrowRight className="ml-2" />
              </>
            )}
          </button>

          <div className="text-center">
            <p className="text-sm text-gray-400">
              Already have an account?{' '}
              <Link to="/signin" className="text-primary hover:text-primary-dark transition-colors">
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
};

export default SignUpPage; 
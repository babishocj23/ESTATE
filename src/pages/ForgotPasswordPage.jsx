import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMail, FiArrowRight } from 'react-icons/fi';
import AuthLayout from '../components/AuthLayout';
import { supabase } from '../lib/supabase';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setError('');
      setLoading(true);

      // First check if the email exists in the profiles table
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('email')
        .eq('email', email.toLowerCase())
        .single();

      if (profileError || !profile) {
        throw new Error('No account found with this email address');
      }

      // If email exists, send reset password link
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email.toLowerCase(), {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (resetError) throw resetError;

      setSuccess(true);
    } catch (err) {
      console.error('Password reset error:', err);
      setError(err.message || 'Failed to send reset instructions');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <AuthLayout
        title="Check Your Email"
        subtitle="Password reset instructions have been sent"
        backgroundImage="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3"
      >
        <div className="mt-8 text-center">
          <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg mb-6">
            <p className="text-green-400">
              We've sent password reset instructions to <strong>{email}</strong>
            </p>
          </div>
          <p className="text-gray-400 mb-6">
            Please check your email and follow the instructions to reset your password.
            The link will expire in 24 hours.
          </p>
          <div className="space-y-4">
            <button
              onClick={() => window.location.href = 'mailto:'}
              className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-sm font-medium rounded-xl text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-300 hover:scale-105"
            >
              Open Email App
              <FiArrowRight className="ml-2" />
            </button>
            <Link
              to="/signin"
              className="block text-primary hover:text-primary-dark transition-colors"
            >
              Back to Sign In
            </Link>
          </div>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Reset Password"
      subtitle="Enter your email to receive reset instructions"
      backgroundImage="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3"
    >
      <div className="mt-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
              <p className="text-red-500 text-sm text-center">{error}</p>
            </div>
          )}

          <div className="relative">
            <FiMail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full pl-12 pr-4 py-3 bg-dark-800/50 backdrop-blur-md border border-dark-700 rounded-xl focus:ring-2 focus:ring-primary text-white placeholder-gray-400"
              placeholder="Enter your email address"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-sm font-medium rounded-xl text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></span>
                Sending Instructions...
              </>
            ) : (
              <>
                Send Reset Instructions
                <FiArrowRight className="ml-2" />
              </>
            )}
          </button>

          <div className="text-center">
            <Link
              to="/signin"
              className="text-primary hover:text-primary-dark transition-colors"
            >
              Back to Sign In
            </Link>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
};

export default ForgotPasswordPage; 
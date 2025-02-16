import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FiMail, FiArrowRight } from 'react-icons/fi';
import { supabase } from '../lib/supabase';
import AuthLayout from '../components/AuthLayout';

const VerifyCodePage = () => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [resendDisabled, setResendDisabled] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;
  const mode = location.state?.mode || 'verify-email';

  if (!email) {
    navigate('/signup');
    return null;
  }

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const verificationCode = code.join('');

    try {
      const { data, error } = await supabase
        .from('verification_codes')
        .select('*')
        .eq('email', email)
        .eq('code', verificationCode)
        .eq('verified', false)
        .gt('expires_at', new Date().toISOString())
        .single();

      if (error) throw error;

      if (!data) {
        throw new Error('Invalid or expired verification code');
      }

      // Mark code as verified
      const { error: updateError } = await supabase
        .from('verification_codes')
        .update({ verified: true })
        .eq('id', data.id);

      if (updateError) throw updateError;

      if (mode === 'reset-password') {
        // Navigate to reset password page
        navigate('/reset-password', {
          state: {
            email,
            code: verificationCode
          }
        });
      } else {
        // Update user metadata to mark as verified
        const { error: userError } = await supabase.auth.updateUser({
          data: { email_verified: true }
        });

        if (userError) throw userError;

        // Redirect to signin with success message
        navigate('/signin', {
          state: {
            message: 'Email verified successfully! You can now sign in.'
          }
        });
      }
    } catch (err) {
      console.error('Error:', err);
      setError(err.message || 'Failed to verify code');
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    setLoading(true);
    setError('');
    try {
      const { error } = await supabase.rpc('generate_verification_code', {
        user_email: email
      });

      if (error) throw error;

      // Start countdown timer (2 minutes)
      setResendDisabled(true);
      setCountdown(120);
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setResendDisabled(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

    } catch (error) {
      console.error('Error:', error);
      setError(error.message || 'Failed to resend code');
    } finally {
      setLoading(false);
    }
  };

  const handleCodeChange = (index, value) => {
    // Only allow numbers
    if (value && !/^\d+$/.test(value)) return;

    setCode(prevCode => {
      const newCode = [...prevCode];
      newCode[index] = value;

      // Auto-focus next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`code-${index + 1}`);
        if (nextInput) nextInput.focus();
      }

      return newCode;
    });

    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      if (prevInput) {
        prevInput.focus();
        setCode(prevCode => {
          const newCode = [...prevCode];
          newCode[index - 1] = '';
          return newCode;
        });
      }
    }
  };

  return (
    <AuthLayout
      title={mode === 'reset-password' ? 'Reset Password' : 'Verify Your Email'}
      subtitle={`Enter the 6-digit code sent to ${email}`}
      backgroundImage="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3"
    >
      <div className="mt-8">
        <form onSubmit={handleVerify} className="space-y-6">
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
              <p className="text-red-500 text-sm text-center">{error}</p>
            </div>
          )}

          <div className="flex justify-center gap-2">
            {code.map((digit, index) => (
              <input
                key={index}
                id={`code-${index}`}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleCodeChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-14 text-center text-2xl font-bold bg-dark-800/50 backdrop-blur-md border border-dark-700 rounded-xl focus:ring-2 focus:ring-primary text-white"
                required
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={loading || code.some(digit => !digit)}
            className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-sm font-medium rounded-xl text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></span>
                Verifying...
              </>
            ) : (
              <>
                {mode === 'reset-password' ? 'Continue to Reset Password' : 'Verify Email'}
                <FiArrowRight className="ml-2" />
              </>
            )}
          </button>

          <div className="text-center">
            <button
              type="button"
              onClick={handleResendCode}
              disabled={loading || resendDisabled}
              className="text-primary hover:text-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {resendDisabled ? (
                `Resend code in ${Math.floor(countdown / 60)}:${(countdown % 60).toString().padStart(2, '0')}`
              ) : (
                'Resend code'
              )}
            </button>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
};

export default VerifyCodePage; 
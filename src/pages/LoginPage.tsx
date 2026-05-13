import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Scale, Mail, Lock, AlertCircle } from 'lucide-react';
import { useAuth } from "../context/AuthContext";
import { useChat } from '../context/ChatContext';
import { ForgotPasswordModal } from './ForgotPasswordModal';

export function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const { login } = useAuth();
  const { createNewConversation } = useChat();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const success = await login(email, password);
      if (success) {
        await createNewConversation();
        navigate('/dashboard');
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred. Try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center p-6"
      style={{
        background: 'linear-gradient(135deg, #1a0f08 0%, #2e1a0e 35%, #3B2319 60%, #5a3420 100%)',
      }}
    >
      {/* Background Legal Icons */}
      <div className="absolute inset-0 overflow-hidden" style={{ opacity: 0.04 }}>
        <Scale className="absolute top-20 left-10 w-48 h-48 text-[#D4AF37] rotate-12" />
        <Scale className="absolute bottom-32 right-20 w-40 h-40 text-[#D4AF37] -rotate-12" />
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md">

        {/* Logo */}
        <Link to="/" className="flex items-center justify-center gap-3 mb-8">
          <Scale className="w-10 h-10" style={{ color: '#D4AF37' }} />
          <span
            className="text-3xl font-serif"
            style={{
              background: 'linear-gradient(135deg, #D4AF37 0%, #F0D060 50%, #C49F2F 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            LexiConnect
          </span>
        </Link>

        {/* Card */}
        <div
          style={{
            background: 'linear-gradient(160deg, rgba(255,255,255,0.11) 0%, rgba(255,255,255,0.05) 100%)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: '1px solid rgba(212,175,55,0.3)',
            borderRadius: '20px',
            padding: '40px',
            boxShadow: '0 8px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)',
          }}
        >
          <h1
            className="text-4xl font-serif mb-3 text-center"
            style={{ color: 'rgba(255,255,255,0.93)' }}
          >
            Welcome Back
          </h1>
          <p className="text-center mb-8" style={{ color: 'rgba(255,255,255,0.4)', fontSize: '15px' }}>
            Sign in to access your legal assistant
          </p>

          {/* Error */}
          {error && (
            <div
              className="mb-6 p-4 rounded-xl flex items-start gap-3"
              style={{
                background: 'rgba(220,38,38,0.12)',
                border: '1px solid rgba(220,38,38,0.35)',
              }}
            >
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: 'rgba(252,165,165,0.9)' }} />
              <p style={{ fontSize: '14px', color: 'rgba(252,165,165,0.9)' }}>{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block mb-2"
                style={{ color: 'rgba(212,175,55,0.8)', fontSize: '14px' }}
              >
                Email Address
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5"
                  style={{ color: 'rgba(212,175,55,0.45)' }}
                />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  required
                  className="w-full outline-none transition-all"
                  style={{
                    paddingLeft: '48px',
                    paddingRight: '16px',
                    paddingTop: '12px',
                    paddingBottom: '12px',
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(212,175,55,0.25)',
                    borderRadius: '10px',
                    color: 'rgba(255,255,255,0.85)',
                    fontSize: '14px',
                    fontFamily: 'inherit',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.border = '1px solid rgba(212,175,55,0.6)';
                    e.currentTarget.style.background = 'rgba(255,255,255,0.09)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.border = '1px solid rgba(212,175,55,0.25)';
                    e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                  }}
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block mb-2"
                style={{ color: 'rgba(212,175,55,0.8)', fontSize: '14px' }}
              >
                Password
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5"
                  style={{ color: 'rgba(212,175,55,0.45)' }}
                />
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="w-full outline-none transition-all"
                  style={{
                    paddingLeft: '48px',
                    paddingRight: '16px',
                    paddingTop: '12px',
                    paddingBottom: '12px',
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(212,175,55,0.25)',
                    borderRadius: '10px',
                    color: 'rgba(255,255,255,0.85)',
                    fontSize: '14px',
                    fontFamily: 'inherit',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.border = '1px solid rgba(212,175,55,0.6)';
                    e.currentTarget.style.background = 'rgba(255,255,255,0.09)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.border = '1px solid rgba(212,175,55,0.25)';
                    e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                  }}
                />
              </div>
            </div>

            {/* Forgot Password */}
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setShowForgotPassword(true)}
                className="text-sm transition-colors hover:underline"
                style={{ color: '#D4AF37', background: 'none', border: 'none', cursor: 'pointer' }}
              >
                Forgot Password?
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
              style={{
                padding: '14px',
                background: 'linear-gradient(135deg, #D4AF37 0%, #F0D060 60%, #C49F2F 100%)',
                color: '#2e1a0e',
                borderRadius: '10px',
                border: 'none',
                fontSize: '15px',
                fontWeight: '600',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                boxShadow: '0 2px 16px rgba(212,175,55,0.4)',
                fontFamily: 'inherit',
              }}
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="mt-8 text-center">
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px' }}>
              Don't have an account?{' '}
              <Link
                to="/signup"
                className="hover:underline"
                style={{ color: '#D4AF37' }}
              >
                Sign Up
              </Link>
            </p>
          </div>

          {/* Demo Credentials */}
          <div
            className="mt-6 p-4 rounded-xl"
            style={{
              background: 'rgba(212,175,55,0.07)',
              border: '1px solid rgba(212,175,55,0.2)',
            }}
          >
            <p style={{ fontSize: '11px', color: 'rgba(212,175,55,0.55)', textAlign: 'center', marginBottom: '6px' }}>
              Demo Credentials:
            </p>
            <p style={{ fontSize: '11px', color: 'rgba(212,175,55,0.75)', textAlign: 'center', lineHeight: '1.6' }}>
              User: any email | Admin: admin@lexiconnect.com
              <br />
              Password: any password
            </p>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <Link
            to="/"
            className="transition-colors hover:underline"
            style={{ color: 'rgba(212,175,55,0.55)' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#D4AF37')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(212,175,55,0.55)')}
          >
            ← Back to Home
          </Link>
        </div>
      </div>

      {/* Forgot Password Modal — rendered outside the card so it overlays the full screen */}
      {showForgotPassword && (
        <ForgotPasswordModal onClose={() => setShowForgotPassword(false)} />
      )}
    </div>
  );
}
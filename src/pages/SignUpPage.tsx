import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Scale, User, Mail, Phone, Lock, AlertCircle, CheckCircle } from 'lucide-react';
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const inputStyle = {
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
  width: '100%',
  outline: 'none',
  transition: 'all 0.2s',
};

const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
  e.currentTarget.style.border = '1px solid rgba(212,175,55,0.6)';
  e.currentTarget.style.background = 'rgba(255,255,255,0.09)';
};

const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
  e.currentTarget.style.border = '1px solid rgba(212,175,55,0.25)';
  e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
};

export function SignUpPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<'details' | 'otp'>('details');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmitDetails = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.name || !formData.email || !formData.phone || !formData.password) {
      setError('Please fill in all fields');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    // ✅ NEW - Send OTP to email
    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE}/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email })
      });
      if (!res.ok) throw new Error('Failed to send OTP');
      setStep('otp');
    } catch (err) {
      setError('Failed to send OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (otp.length !== 6) {
      setError('Please enter a valid 6-digit OTP');
      setIsLoading(false);
      return;
    }

    try {
      // ✅ Step 1 - Verify OTP
      const verifyRes = await fetch(`${API_BASE}/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, otp })
      });

      if (!verifyRes.ok) {
        const data = await verifyRes.json();
        setError(data.detail || 'Invalid OTP');
        setIsLoading(false);
        return;
      }

      // ✅ Step 2 - Create account
      const signupRes = await fetch(`${API_BASE}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          password: formData.password
        })
      });

      if (!signupRes.ok) {
        const data = await signupRes.json();
        setError(data.detail || 'Failed to create account');
      } else {
        navigate('/login'); // ✅ Go to login after signup
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
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
        <Scale className="absolute top-20 right-10 w-48 h-48 text-[#D4AF37] rotate-12" />
        <Scale className="absolute bottom-32 left-20 w-40 h-40 text-[#D4AF37] -rotate-12" />
      </div>

      {/* Sign Up Card */}
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
            Create Account
          </h1>
          <p className="text-center mb-8" style={{ color: 'rgba(255,255,255,0.4)', fontSize: '15px' }}>
            Join LexiConnect for legal assistance
          </p>

          {/* Progress Indicator */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center gap-2">
              {/* Step 1 */}
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium"
                style={
                  step === 'details'
                    ? { background: 'linear-gradient(135deg, #D4AF37, #F0D060)', color: '#2e1a0e' }
                    : { background: 'rgba(212,175,55,0.2)', border: '1px solid rgba(212,175,55,0.5)', color: '#D4AF37' }
                }
              >
                {step === 'otp' ? <CheckCircle className="w-4 h-4" /> : '1'}
              </div>

              {/* Connector */}
              <div
                style={{
                  width: '64px',
                  height: '1px',
                  background: step === 'otp'
                    ? 'linear-gradient(90deg, rgba(212,175,55,0.6), rgba(212,175,55,0.3))'
                    : 'rgba(255,255,255,0.1)',
                }}
              />

              {/* Step 2 */}
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium"
                style={
                  step === 'otp'
                    ? { background: 'linear-gradient(135deg, #D4AF37, #F0D060)', color: '#2e1a0e' }
                    : { background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.3)' }
                }
              >
                2
              </div>
            </div>
          </div>

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

          {step === 'details' ? (
            <form onSubmit={handleSubmitDetails} className="space-y-5">

              {/* Name */}
              <div>
                <label htmlFor="name" className="block mb-2" style={{ color: 'rgba(212,175,55,0.8)', fontSize: '14px' }}>
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: 'rgba(212,175,55,0.45)' }} />
                  <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange}
                    placeholder="John Doe" required style={inputStyle} onFocus={handleFocus} onBlur={handleBlur} />
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block mb-2" style={{ color: 'rgba(212,175,55,0.8)', fontSize: '14px' }}>
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: 'rgba(212,175,55,0.45)' }} />
                  <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange}
                    placeholder="your.email@example.com" required style={inputStyle} onFocus={handleFocus} onBlur={handleBlur} />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block mb-2" style={{ color: 'rgba(212,175,55,0.8)', fontSize: '14px' }}>
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: 'rgba(212,175,55,0.45)' }} />
                  <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleInputChange}
                    placeholder="+92-300-1234567" required style={inputStyle} onFocus={handleFocus} onBlur={handleBlur} />
                </div>
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block mb-2" style={{ color: 'rgba(212,175,55,0.8)', fontSize: '14px' }}>
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: 'rgba(212,175,55,0.45)' }} />
                  <input type="password" id="password" name="password" value={formData.password} onChange={handleInputChange}
                    placeholder="At least 6 characters" required style={inputStyle} onFocus={handleFocus} onBlur={handleBlur} />
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label htmlFor="confirmPassword" className="block mb-2" style={{ color: 'rgba(212,175,55,0.8)', fontSize: '14px' }}>
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: 'rgba(212,175,55,0.45)' }} />
                  <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange}
                    placeholder="Re-enter password" required style={inputStyle} onFocus={handleFocus} onBlur={handleBlur} />
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full transition-all hover:scale-[1.02] active:scale-95 mt-2"
                style={{
                  padding: '14px',
                  background: 'linear-gradient(135deg, #D4AF37 0%, #F0D060 60%, #C49F2F 100%)',
                  color: '#2e1a0e',
                  borderRadius: '10px',
                  border: 'none',
                  fontSize: '15px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  boxShadow: '0 2px 16px rgba(212,175,55,0.4)',
                  fontFamily: 'inherit',
                }}
              >
                Continue to Verification
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOTP} className="space-y-6">
              <div className="text-center mb-6">
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px', marginBottom: '8px' }}>
                  We've sent a verification code to:
                </p>
                <p style={{ color: 'rgba(212,175,55,0.85)', fontSize: '14px' }}>{formData.email}</p>
                <p style={{ color: 'rgba(212,175,55,0.85)', fontSize: '14px' }}>{formData.phone}</p>
              </div>

              {/* OTP Field */}
              <div>
                <label
                  htmlFor="otp"
                  className="block mb-2 text-center"
                  style={{ color: 'rgba(212,175,55,0.8)', fontSize: '14px' }}
                >
                  Enter 6-Digit OTP
                </label>
                <input
                  type="text"
                  id="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="000000"
                  maxLength={6}
                  required
                  className="outline-none transition-all"
                  style={{
                    width: '100%',
                    padding: '16px',
                    textAlign: 'center',
                    fontSize: '24px',
                    letterSpacing: '0.3em',
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(212,175,55,0.25)',
                    borderRadius: '10px',
                    color: 'rgba(255,255,255,0.9)',
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

              {/* Resend OTP */}
              <div className="text-center">
                <button
                  type="button"
                  onClick={async () => {
                    setError('');
                    try {
                      await fetch(`${API_BASE}/send-otp`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ email: formData.email })
                      });
                      setOtp('');
                    } catch {
                      setError('Failed to resend OTP');
                    }
                  }}
                  className="text-sm hover:underline"
                  style={{ color: '#D4AF37', background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  Resend OTP
                </button>
              </div>

              {/* Verify Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
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
                {isLoading ? 'Sending OTP...' : 'Continue to Verification'}
              </button>

              {/* Back Button */}
              <button
                type="button"
                onClick={() => setStep('details')}
                className="w-full py-3 transition-colors"
                style={{
                  color: 'rgba(255,255,255,0.35)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontFamily: 'inherit',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.65)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.35)')}
              >
                ← Back to Details
              </button>
            </form>
          )}

          {/* Login Link */}
          <div className="mt-8 text-center">
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px' }}>
              Already have an account?{' '}
              <Link to="/login" className="hover:underline" style={{ color: '#D4AF37' }}>
                Sign In
              </Link>
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
    </div>
  );
}

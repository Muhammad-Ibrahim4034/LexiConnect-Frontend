import { useState } from 'react';
import { X, Mail, Lock, KeyRound, CheckCircle, AlertCircle, ArrowRight, RefreshCw } from 'lucide-react';

type Step = 'email' | 'otp' | 'password' | 'success';

interface ForgotPasswordModalProps {
  onClose: () => void;
}

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export function ForgotPasswordModal({ onClose }: ForgotPasswordModalProps) {
  const [step, setStep] = useState<Step>('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  const startResendCooldown = () => {
    setResendCooldown(60);
    const interval = setInterval(() => {
      setResendCooldown(prev => {
        if (prev <= 1) { clearInterval(interval); return 0; }
        return prev - 1;
      });
    }, 1000);
  };

  const handleSendOtp = async () => {
    if (!email) { setError('Please enter your email address'); return; }
    setError('');
    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE}/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.detail || 'Failed to send OTP');
      }
      setStep('otp');
      startResendCooldown();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp || otp.length !== 6) { setError('Please enter the 6-digit OTP'); return; }
    setError('');
    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE}/verify-otp-reset`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.detail || 'Invalid OTP');
      }
      setStep('password');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!newPassword || newPassword.length < 8) {
      setError('Password must be at least 8 characters'); return;
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match'); return;
    }
    setError('');
    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE}/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, new_password: newPassword }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.detail || 'Failed to reset password');
      }
      setStep('success');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px 16px',
    background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(212,175,55,0.25)',
    borderRadius: '10px',
    color: 'rgba(255,255,255,0.85)',
    fontSize: '14px',
    fontFamily: 'inherit',
    outline: 'none',
    boxSizing: 'border-box',
  };

  const btnStyle: React.CSSProperties = {
    width: '100%',
    padding: '13px',
    background: 'linear-gradient(135deg, #D4AF37 0%, #F0D060 60%, #C49F2F 100%)',
    color: '#2e1a0e',
    borderRadius: '10px',
    border: 'none',
    fontSize: '15px',
    fontWeight: '600',
    cursor: isLoading ? 'not-allowed' : 'pointer',
    opacity: isLoading ? 0.7 : 1,
    fontFamily: 'inherit',
    marginTop: '8px',
  };

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)',
        padding: '16px',
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        style={{
          width: '100%', maxWidth: '420px',
          background: 'linear-gradient(160deg, rgba(46,26,14,0.97) 0%, rgba(30,15,8,0.99) 100%)',
          border: '1px solid rgba(212,175,55,0.3)',
          borderRadius: '20px', padding: '36px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
          position: 'relative',
        }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: '16px', right: '16px',
            background: 'none', border: 'none', cursor: 'pointer',
            color: 'rgba(255,255,255,0.4)',
          }}
        >
          <X size={20} />
        </button>

        {/* STEP 1: Email */}
        {step === 'email' && (
          <>
            <div style={{ textAlign: 'center', marginBottom: '28px' }}>
              <div style={{
                width: '56px', height: '56px', borderRadius: '50%',
                background: 'rgba(212,175,55,0.12)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 16px',
              }}>
                <Mail size={24} color="#D4AF37" />
              </div>
              <h2 style={{ color: 'rgba(255,255,255,0.93)', fontSize: '22px', fontFamily: 'serif', margin: '0 0 8px' }}>
                Forgot Password?
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px', margin: 0 }}>
                Enter your registered email and we'll send you an OTP to reset your password.
              </p>
            </div>

            {error && <ErrorBox message={error} />}

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: 'rgba(212,175,55,0.8)', fontSize: '14px' }}>
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSendOtp()}
                placeholder="your.email@example.com"
                style={inputStyle}
                onFocus={e => e.currentTarget.style.border = '1px solid rgba(212,175,55,0.6)'}
                onBlur={e => e.currentTarget.style.border = '1px solid rgba(212,175,55,0.25)'}
              />
            </div>

            <button onClick={handleSendOtp} disabled={isLoading} style={btnStyle}>
              {isLoading ? 'Sending OTP...' : 'Send OTP'} {!isLoading && <ArrowRight size={16} style={{ display: 'inline', marginLeft: '6px' }} />}
            </button>
          </>
        )}

        {/* STEP 2: OTP */}
        {step === 'otp' && (
          <>
            <div style={{ textAlign: 'center', marginBottom: '28px' }}>
              <div style={{
                width: '56px', height: '56px', borderRadius: '50%',
                background: 'rgba(212,175,55,0.12)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 16px',
              }}>
                <KeyRound size={24} color="#D4AF37" />
              </div>
              <h2 style={{ color: 'rgba(255,255,255,0.93)', fontSize: '22px', fontFamily: 'serif', margin: '0 0 8px' }}>
                Enter OTP
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px', margin: 0 }}>
                We sent a 6-digit code to <span style={{ color: '#D4AF37' }}>{email}</span>. It expires in 10 minutes.
              </p>
            </div>

            {error && <ErrorBox message={error} />}

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: 'rgba(212,175,55,0.8)', fontSize: '14px' }}>
                OTP Code
              </label>
              <input
                type="text"
                value={otp}
                onChange={e => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                onKeyDown={e => e.key === 'Enter' && handleVerifyOtp()}
                placeholder="123456"
                style={{ ...inputStyle, letterSpacing: '8px', fontSize: '20px', textAlign: 'center' }}
                onFocus={e => e.currentTarget.style.border = '1px solid rgba(212,175,55,0.6)'}
                onBlur={e => e.currentTarget.style.border = '1px solid rgba(212,175,55,0.25)'}
              />
            </div>

            <button onClick={handleVerifyOtp} disabled={isLoading} style={btnStyle}>
              {isLoading ? 'Verifying...' : 'Verify OTP'}
            </button>

            <div style={{ textAlign: 'center', marginTop: '16px' }}>
              {resendCooldown > 0 ? (
                <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '13px' }}>
                  Resend in {resendCooldown}s
                </p>
              ) : (
                <button
                  onClick={async () => {
                    setError('');
                    setIsLoading(true);
                    try {
                      await fetch(`${API_BASE}/send-otp`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ email }),
                      });
                      startResendCooldown();
                    } catch { setError('Failed to resend OTP'); }
                    finally { setIsLoading(false); }
                  }}
                  style={{ background: 'none', border: 'none', color: '#D4AF37', cursor: 'pointer', fontSize: '13px' }}
                >
                  <RefreshCw size={12} style={{ marginRight: '4px', display: 'inline' }} />
                  Resend OTP
                </button>
              )}
            </div>

            <button
              onClick={() => { setStep('email'); setOtp(''); setError(''); }}
              style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.3)', cursor: 'pointer', fontSize: '13px', width: '100%', marginTop: '8px' }}
            >
              ← Change email
            </button>
          </>
        )}

        {/* STEP 3: New Password */}
        {step === 'password' && (
          <>
            <div style={{ textAlign: 'center', marginBottom: '28px' }}>
              <div style={{
                width: '56px', height: '56px', borderRadius: '50%',
                background: 'rgba(212,175,55,0.12)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 16px',
              }}>
                <Lock size={24} color="#D4AF37" />
              </div>
              <h2 style={{ color: 'rgba(255,255,255,0.93)', fontSize: '22px', fontFamily: 'serif', margin: '0 0 8px' }}>
                New Password
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px', margin: 0 }}>
                Choose a strong password for your account.
              </p>
            </div>

            {error && <ErrorBox message={error} />}

            <div style={{ marginBottom: '14px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: 'rgba(212,175,55,0.8)', fontSize: '14px' }}>
                New Password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                placeholder="Minimum 8 characters"
                style={inputStyle}
                onFocus={e => e.currentTarget.style.border = '1px solid rgba(212,175,55,0.6)'}
                onBlur={e => e.currentTarget.style.border = '1px solid rgba(212,175,55,0.25)'}
              />
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: 'rgba(212,175,55,0.8)', fontSize: '14px' }}>
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleResetPassword()}
                placeholder="Re-enter password"
                style={inputStyle}
                onFocus={e => e.currentTarget.style.border = '1px solid rgba(212,175,55,0.6)'}
                onBlur={e => e.currentTarget.style.border = '1px solid rgba(212,175,55,0.25)'}
              />
            </div>

            <button onClick={handleResetPassword} disabled={isLoading} style={btnStyle}>
              {isLoading ? 'Resetting...' : 'Reset Password'}
            </button>
          </>
        )}

        {/* STEP 4: Success */}
        {step === 'success' && (
          <div style={{ textAlign: 'center', padding: '12px 0' }}>
            <div style={{
              width: '64px', height: '64px', borderRadius: '50%',
              background: 'rgba(34,197,94,0.12)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 20px',
            }}>
              <CheckCircle size={32} color="#4ade80" />
            </div>
            <h2 style={{ color: 'rgba(255,255,255,0.93)', fontSize: '22px', fontFamily: 'serif', margin: '0 0 10px' }}>
              Password Reset!
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px', marginBottom: '28px' }}>
              Your password has been updated successfully. You can now sign in with your new password.
            </p>
            <button onClick={onClose} style={btnStyle}>
              Back to Sign In
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function ErrorBox({ message }: { message: string }) {
  return (
    <div style={{
      marginBottom: '16px', padding: '12px 14px', borderRadius: '10px',
      background: 'rgba(220,38,38,0.12)', border: '1px solid rgba(220,38,38,0.35)',
      display: 'flex', alignItems: 'flex-start', gap: '10px',
    }}>
      <AlertCircle size={16} color="rgba(252,165,165,0.9)" style={{ flexShrink: 0, marginTop: '1px' }} />
      <p style={{ fontSize: '13px', color: 'rgba(252,165,165,0.9)', margin: 0 }}>{message}</p>
    </div>
  );
}
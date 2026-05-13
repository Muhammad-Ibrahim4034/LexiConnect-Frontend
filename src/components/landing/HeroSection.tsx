import { Link } from 'react-router-dom';
import { Scale, Building2, ScrollText } from 'lucide-react';

export function HeroSection() {
  return (
    <section
      className="relative overflow-hidden text-white min-h-screen"
      style={{
        background: 'linear-gradient(170deg, #2e1a0e 0%, #3B2319 30%, #5a3420 55%, #2e1a0e 80%, #1a0f08 100%)',
      }}
    >
      {/* Background Legal Icons */}
      <div className="absolute inset-0 overflow-hidden" style={{ opacity: 0.04 }}>
        <Scale className="absolute top-20 left-10 w-48 h-48 rotate-12" style={{ color: '#D4AF37' }} />
        <Building2 className="absolute top-60 right-32 w-56 h-56 -rotate-6" style={{ color: '#D4AF37' }} />
        <ScrollText className="absolute bottom-32 left-1/3 w-52 h-52 rotate-45" style={{ color: '#D4AF37' }} />
        <Scale className="absolute bottom-48 right-20 w-40 h-40 -rotate-12" style={{ color: '#D4AF37' }} />
        <Building2 className="absolute top-1/3 left-1/4 w-44 h-44 rotate-12" style={{ color: '#D4AF37' }} />
      </div>

      {/* Navigation */}
      <nav
        className="relative z-10 container mx-auto px-12 py-8 flex items-center justify-between max-w-[1800px]"
        style={{ borderBottom: '1px solid rgba(212,175,55,0.1)' }}
      >
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{
              background: 'linear-gradient(135deg, #D4AF37, #F0D060)',
              boxShadow: '0 2px 10px rgba(212,175,55,0.4)',
            }}
          >
            <Scale className="w-6 h-6" style={{ color: '#2e1a0e' }} />
          </div>
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
        </div>

        {/* Nav Links */}
        <div className="flex items-center gap-10 text-lg">
          {[
            { label: 'Features', href: '#features', isAnchor: true },
            { label: 'About Us', href: '/about', isAnchor: false },
            { label: 'How It Works', href: '#how-it-works', isAnchor: true },
            { label: 'Use Cases', href: '#use-cases', isAnchor: true },
          ].map((item) =>
            item.isAnchor ? (
              <a
                key={item.label}
                href={item.href}
                className="transition-colors"
                style={{ color: 'rgba(255,255,255,0.6)', fontSize: '16px' }}
                onMouseEnter={(e) => { e.currentTarget.style.color = '#D4AF37'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; }}
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.label}
                to={item.href}
                className="transition-colors"
                style={{ color: 'rgba(255,255,255,0.6)', fontSize: '16px' }}
                onMouseEnter={(e) => { e.currentTarget.style.color = '#D4AF37'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; }}
              >
                {item.label}
              </Link>
            )
          )}

          <Link to="/login">
            <button
              className="px-8 py-3 rounded-full transition-all"
              style={{
                border: '1px solid rgba(212,175,55,0.5)',
                color: 'rgba(212,175,55,0.9)',
                background: 'transparent',
                fontSize: '15px',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, #D4AF37, #C49F2F)';
                e.currentTarget.style.color = '#2e1a0e';
                e.currentTarget.style.border = '1px solid transparent';
                e.currentTarget.style.boxShadow = '0 2px 12px rgba(212,175,55,0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = 'rgba(212,175,55,0.9)';
                e.currentTarget.style.border = '1px solid rgba(212,175,55,0.5)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              Sign In
            </button>
          </Link>
        </div>
      </nav>

      {/* Hero Content */}
      <div
        className="relative z-10 container mx-auto px-12 py-24 text-center max-w-[1800px] flex flex-col justify-center"
        style={{ minHeight: 'calc(100vh - 120px)' }}
      >
        <h1
          className="text-8xl font-serif mb-8 max-w-5xl mx-auto leading-tight"
          style={{
            background: 'linear-gradient(135deg, #D4AF37 0%, #F0D060 50%, #C49F2F 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Your AI Powered Legal Assistant
        </h1>

        <p
          className="text-3xl mb-12 max-w-4xl mx-auto leading-relaxed"
          style={{ color: 'rgba(255,255,255,0.55)' }}
        >
          Navigate complex legal matters with confidence. Get instant answers, expert guidance,
          and connect with qualified lawyers all in one platform.
        </p>

        <div className="flex gap-6 justify-center items-center mb-8">
          <Link to="/signup">
            <button
              className="px-12 py-5 text-xl rounded-full transition-all"
              style={{
                background: 'linear-gradient(135deg, #D4AF37 0%, #C49F2F 100%)',
                color: '#2e1a0e',
                fontWeight: 500,
                boxShadow: '0 4px 20px rgba(212,175,55,0.4)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 6px 28px rgba(212,175,55,0.6)';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(212,175,55,0.4)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Ask a Legal Question
            </button>
          </Link>
        </div>

      </div>
    </section>
  );
}
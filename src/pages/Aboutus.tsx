import { Link } from 'react-router-dom';
import { Shield, Scale, Users, BookOpen } from 'lucide-react';
import { Footer } from '../components/landing/Footer';

export default function AboutUsPage() {
  return (
    <div
      style={{
        background: 'linear-gradient(135deg, #1a0f08 0%, #2e1a0e 35%, #3B2319 60%, #5a3420 100%)',
        minHeight: '100vh',
      }}
    >
      {/* ── Navbar — identical to HeroSection ── */}
      <nav
        className="relative z-10 container mx-auto px-12 py-8 flex items-center justify-between max-w-[1800px]"
        style={{ borderBottom: '1px solid rgba(212,175,55,0.15)' }}
      >
        <Link to="/" className="flex items-center gap-3">
          <Scale className="w-10 h-10 text-[#D4AF37]" />
          <span className="text-3xl font-serif text-[#D4AF37]">LexiConnect</span>
        </Link>

        <div className="flex items-center gap-10 text-lg" style={{ color: 'rgba(255,255,255,0.85)' }}>
          <a href="/#features" className="hover:text-[#D4AF37] transition-colors">Features</a>
          <Link to="/about" style={{ color: '#D4AF37' }}>About Us</Link>
          <a href="/#how-it-works" className="hover:text-[#D4AF37] transition-colors">How It Works</a>
          <a href="/#use-cases" className="hover:text-[#D4AF37] transition-colors">Use Cases</a>
          <Link to="/login">
            <button className="px-8 py-3 border-2 border-[#D4AF37] text-[#D4AF37] rounded-full hover:bg-[#D4AF37] hover:text-[#3B2319] transition-all">
              Sign In
            </button>
          </Link>
        </div>
      </nav>

      {/* ── Page Content ── */}
      <div className="max-w-5xl mx-auto py-14 px-6">

        {/* Page Header */}
        <div className="mb-12 text-center">
          <h1
            className="text-5xl font-serif mb-4"
            style={{
              background: 'linear-gradient(135deg, #D4AF37 0%, #F0D060 50%, #C49F2F 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            About Us
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.45)', maxWidth: '36rem', margin: '0 auto', fontSize: '15px', lineHeight: '1.7' }}>
            Learn more about our mission, our purpose, and how this AI legal assistant helps users understand Pakistani law.
          </p>
        </div>

        {/* Team Section */}
        <div
          className="rounded-2xl p-8 mb-6"
          style={{
            background: 'linear-gradient(160deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(212,175,55,0.25)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.07)',
          }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{
                background: 'linear-gradient(135deg, #D4AF37, #F0D060)',
                boxShadow: '0 2px 10px rgba(212,175,55,0.4)',
              }}
            >
              <Users className="w-5 h-5" style={{ color: '#2e1a0e' }} />
            </div>
            <h2 className="text-2xl font-serif" style={{ color: 'rgba(255,255,255,0.88)' }}>
              Who We Are
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { initial: 'M', name: 'Muhammad Ibrahim', role: 'Developer & Researcher' },
              { initial: 'H', name: 'Muhammad Hamza Nawaz', role: 'Developer & Researcher' },
              { initial: 'R', name: 'Rameela Hassan', role: 'Research Collaborator' },
            ].map((member) => (
              <div
                key={member.initial}
                className="p-6 rounded-xl text-center"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
                  border: '1px solid rgba(212,175,55,0.18)',
                }}
              >
                <div
                  className="w-20 h-20 mx-auto rounded-full flex items-center justify-center text-3xl font-bold mb-4"
                  style={{
                    background: 'linear-gradient(135deg, #D4AF37, #F0D060)',
                    color: '#2e1a0e',
                    boxShadow: '0 4px 16px rgba(212,175,55,0.35)',
                  }}
                >
                  {member.initial}
                </div>
                <h3 className="text-lg font-serif" style={{ color: 'rgba(255,255,255,0.88)' }}>
                  {member.name}
                </h3>
                <p className="text-sm mt-1" style={{ color: 'rgba(212,175,55,0.7)' }}>
                  {member.role}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* What We Offer */}
        <div
          className="rounded-2xl p-8 mb-6"
          style={{
            background: 'linear-gradient(160deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(212,175,55,0.2)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.05)',
          }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{
                background: 'rgba(212,175,55,0.15)',
                border: '1px solid rgba(212,175,55,0.3)',
              }}
            >
              <BookOpen className="w-5 h-5" style={{ color: '#D4AF37' }} />
            </div>
            <h2 className="text-2xl font-serif" style={{ color: 'rgba(255,255,255,0.88)' }}>
              What We Offer
            </h2>
          </div>

          <ul className="space-y-4">
            {[
              'Reliable explanations of Pakistani laws and rights.',
              'Easy-to-understand answers written in plain language.',
              'Source-based responses drawn from legal texts and verified material.',
              'A safe, user-friendly platform for quick legal guidance.',
            ].map((item, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <div
                  className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{
                    background: 'linear-gradient(135deg, #D4AF37, #C49F2F)',
                    boxShadow: '0 2px 6px rgba(212,175,55,0.3)',
                  }}
                >
                  <Shield className="w-3.5 h-3.5" style={{ color: '#2e1a0e' }} />
                </div>
                <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', lineHeight: '1.65' }}>
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Our Mission */}
        <div
          className="rounded-2xl p-8 mb-6"
          style={{
            background: 'linear-gradient(160deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(212,175,55,0.25)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.07)',
          }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{
                background: 'linear-gradient(135deg, #D4AF37, #F0D060)',
                boxShadow: '0 2px 10px rgba(212,175,55,0.4)',
              }}
            >
              <Users className="w-5 h-5" style={{ color: '#2e1a0e' }} />
            </div>
            <h2 className="text-2xl font-serif" style={{ color: 'rgba(255,255,255,0.88)' }}>
              Our Mission
            </h2>
          </div>
          <p style={{ color: 'rgba(255,255,255,0.65)', lineHeight: '1.75', fontSize: '15px' }}>
            We are a team of researchers and developers dedicated to bridging the gap between the public and the legal system.
            Combining machine learning, law-focused datasets, and a simple interface, we aim to provide clarity where it's needed most.
          </p>
        </div>

        {/* Disclaimer */}
        <div
          className="p-5 rounded-xl flex items-start gap-3 mb-16"
          style={{
            background: 'rgba(212,175,55,0.07)',
            border: '1px solid rgba(212,175,55,0.2)',
          }}
        >
          <Shield className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: 'rgba(212,175,55,0.7)' }} />
          <p style={{ fontSize: '13px', color: 'rgba(212,175,55,0.75)', lineHeight: '1.6' }}>
            This platform provides general legal information only. It is not a substitute for professional legal advice.
            For personal legal matters, please consult a qualified lawyer.
          </p>
        </div>

      </div>

      {/* ── Footer ── */}
      <Footer />
    </div>
  );
}
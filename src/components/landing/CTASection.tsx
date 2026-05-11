import { Link } from 'react-router-dom';
import { ArrowRight, Scale } from 'lucide-react';

export function CTASection() {
  return (
    <section
      className="relative overflow-hidden py-32"
      style={{
        background: 'linear-gradient(135deg, #1a0f08 0%, #2e1a0e 35%, #3B2319 60%, #5a3420 100%)',
      }}
    >
      {/* Top border fade */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.4), transparent)',
        }}
      />

      {/* Background decorative icons */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <Scale className="absolute top-10 right-32 w-56 h-56 text-[#D4AF37] rotate-12" />
        <Scale className="absolute bottom-10 left-32 w-48 h-48 text-[#D4AF37] -rotate-12" />
        <Scale className="absolute top-1/2 left-1/4 w-40 h-40 text-[#D4AF37] rotate-6" />
      </div>

      {/* Glow orb center */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(212,175,55,0.07) 0%, transparent 70%)',
        }}
      />

      <div className="container mx-auto px-12 relative z-10 max-w-[1800px]">
        <div className="max-w-5xl mx-auto text-center">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full"
            style={{
              background: 'rgba(212,175,55,0.1)',
              border: '1px solid rgba(212,175,55,0.3)',
            }}
          >
            <Scale className="w-4 h-4" style={{ color: '#D4AF37' }} />
            <span style={{ color: 'rgba(212,175,55,0.85)', fontSize: '13px', fontWeight: 500 }}>
              Trusted Legal Guidance
            </span>
          </div>

          <h2
            className="text-7xl font-serif mb-8 leading-tight"
            style={{
              background: 'linear-gradient(135deg, #ffffff 0%, rgba(255,255,255,0.85) 50%, #E0C8AF 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Ready to Get the Legal Help You Deserve?
          </h2>

          <p
            className="text-2xl mb-12 max-w-3xl mx-auto leading-relaxed"
            style={{ color: 'rgba(255,255,255,0.5)' }}
          >
            Join thousands who've found clarity and confidence with LexiConnect. Start your journey to legal empowerment today — completely free.
          </p>

          {/* CTA Buttons */}
          <div className="flex gap-6 justify-center items-center mb-10">
            <Link to="/signup">
              <button
                className="flex items-center gap-3 px-14 py-6 text-xl rounded-full transition-all group hover:scale-105 active:scale-95"
                style={{
                  background: 'linear-gradient(135deg, #D4AF37 0%, #F0D060 60%, #C49F2F 100%)',
                  color: '#2e1a0e',
                  fontWeight: 500,
                  boxShadow: '0 4px 24px rgba(212,175,55,0.45), 0 1px 4px rgba(0,0,0,0.3)',
                  border: 'none',
                }}
              >
                Try LexiConnect
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>

            <a href="#features">
              <button
                className="px-14 py-6 text-xl rounded-full transition-all hover:scale-105 active:scale-95"
                style={{
                  background: 'transparent',
                  border: '1px solid rgba(212,175,55,0.4)',
                  color: 'rgba(212,175,55,0.85)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, #D4AF37 0%, #C49F2F 100%)';
                  e.currentTarget.style.color = '#2e1a0e';
                  e.currentTarget.style.border = '1px solid transparent';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(212,175,55,0.35)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = 'rgba(212,175,55,0.85)';
                  e.currentTarget.style.border = '1px solid rgba(212,175,55,0.4)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                Learn More
              </button>
            </a>
          </div>

          {/* Trust line */}
          <div className="flex items-center justify-center gap-6">
            {['No credit card required', 'Get started in under 2 minutes', 'Cancel anytime'].map((item, idx) => (
              <div key={idx} className="flex items-center gap-2">
                {idx > 0 && (
                  <div
                    className="w-1 h-1 rounded-full"
                    style={{ background: 'rgba(212,175,55,0.35)' }}
                  />
                )}
                <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.35)' }}>{item}</span>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Bottom border fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.25), transparent)',
        }}
      />
    </section>
  );
}
import { Link } from 'react-router-dom';
import { MessageCircle, Sparkles, UserCheck } from 'lucide-react';

const steps = [
  {
    icon: MessageCircle,
    step: '1',
    title: 'Describe Your Situation',
    description: 'Share your legal concern in simple terms — our AI understands plain language.'
  },
  {
    icon: Sparkles,
    step: '2',
    title: 'Get AI-Powered Insights',
    description: 'Receive instant guidance, relevant laws, and tailored recommendations for your case.'
  },
  {
    icon: UserCheck,
    step: '3',
    title: 'Connect with a Lawyer',
    description: 'When needed, seamlessly book a consultation with a verified legal expert in your area.'
  }
];

export function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="py-32"
      style={{
        background: 'linear-gradient(180deg, #1a0f08 0%, #2e1a0e 40%, #3B2319 100%)',
      }}
    >
      <div className="container mx-auto px-12 max-w-[1800px]">

        {/* Heading */}
        <div className="text-center mb-20">
          <h2
            className="text-6xl font-serif mb-6"
            style={{
              background: 'linear-gradient(135deg, #D4AF37 0%, #F0D060 50%, #C49F2F 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            How It Works
          </h2>
          <p style={{ fontSize: '1.5rem', color: 'rgba(255,255,255,0.5)', maxWidth: '48rem', margin: '0 auto' }}>
            Legal help simplified in three easy steps
          </p>
        </div>

        {/* Steps */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-3 gap-12 relative">

            {/* Connecting Line */}
            <div
              className="absolute top-12 left-0 right-0 h-px -z-10"
              style={{
                background: 'linear-gradient(to right, rgba(212,175,55,0) 0%, rgba(212,175,55,0.4) 50%, rgba(212,175,55,0) 100%)',
              }}
            />

            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="relative text-center">

                  {/* Step number badge */}
                  <div
                    className="absolute w-7 h-7 rounded-full flex items-center justify-center text-sm font-medium z-20"
                    style={{
                      top: '-4px',
                      left: '50%',
                      transform: 'translateX(calc(-50% + 28px))',
                      background: 'linear-gradient(135deg, #D4AF37, #F0D060)',
                      color: '#2e1a0e',
                      boxShadow: '0 2px 8px rgba(212,175,55,0.5)',
                    }}
                  >
                    {step.step}
                  </div>

                  {/* Icon circle */}
                  <div
                    className="inline-flex items-center justify-center w-24 h-24 rounded-full mb-8 relative z-10"
                    style={{
                      background: 'linear-gradient(160deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.04) 100%)',
                      border: '1px solid rgba(212,175,55,0.35)',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                    }}
                  >
                    <Icon className="w-11 h-11" style={{ color: '#D4AF37' }} />
                  </div>

                  <h3
                    className="text-2xl font-serif mb-4"
                    style={{ color: 'rgba(255,255,255,0.88)' }}
                  >
                    {step.title}
                  </h3>
                  <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.5)', lineHeight: '1.75' }}>
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
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
              Start Free
            </button>
          </Link>
        </div>

      </div>
    </section>
  );
}
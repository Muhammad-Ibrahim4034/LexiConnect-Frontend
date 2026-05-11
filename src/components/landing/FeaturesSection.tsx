import { MessageSquare, Users, Shield } from 'lucide-react';

const features = [
  {
    icon: MessageSquare,
    title: 'Instant AI Legal Guidance',
    description: 'Get immediate answers to your legal questions powered by advanced AI trained on comprehensive legal knowledge. Available 24/7 whenever you need help.'
  },
  {
    icon: Users,
    title: 'Connect with Expert Lawyers',
    description: 'Seamlessly book consultations with verified legal professionals specialized in your specific case. Get matched with the right expert for your needs.'
  },
  {
    icon: Shield,
    title: 'Secure & Confidential',
    description: 'Your privacy matters. All communications are end-to-end encrypted and protected under attorney-client privilege standards. Your data stays yours.'
  }
];

export function FeaturesSection() {
  return (
    <section
      id="features"
      className="py-32"
      style={{
        background: 'linear-gradient(135deg, #1a0f08 0%, #2e1a0e 35%, #3B2319 60%, #5a3420 100%)',
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
            Why Choose LexiConnect?
          </h2>
          <p style={{ fontSize: '1.5rem', color: 'rgba(255,255,255,0.5)', maxWidth: '48rem', margin: '0 auto' }}>
            Empowering you with accessible legal support at your fingertips
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-3 gap-10">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="p-10 rounded-2xl transition-all"
                style={{
                  background: 'linear-gradient(160deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '1px solid rgba(212,175,55,0.2)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.border = '1px solid rgba(212,175,55,0.55)';
                  e.currentTarget.style.boxShadow = '0 8px 36px rgba(0,0,0,0.4)';
                  const iconBox = e.currentTarget.querySelector('.icon-box') as HTMLElement;
                  if (iconBox) {
                    iconBox.style.background = 'linear-gradient(135deg, #D4AF37, #F0D060)';
                    const icon = iconBox.querySelector('svg') as SVGElement;
                    if (icon) icon.style.color = '#2e1a0e';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.border = '1px solid rgba(212,175,55,0.2)';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.25)';
                  const iconBox = e.currentTarget.querySelector('.icon-box') as HTMLElement;
                  if (iconBox) {
                    iconBox.style.background = 'rgba(212,175,55,0.12)';
                    const icon = iconBox.querySelector('svg') as SVGElement;
                    if (icon) icon.style.color = '#D4AF37';
                  }
                }}
              >
                {/* Icon box */}
                <div
                  className="icon-box w-16 h-16 rounded-xl flex items-center justify-center mb-8 transition-all"
                  style={{
                    background: 'rgba(212,175,55,0.12)',
                    border: '1px solid rgba(212,175,55,0.25)',
                  }}
                >
                  <Icon
                    className="w-8 h-8 transition-colors"
                    style={{ color: '#D4AF37' }}
                  />
                </div>

                <h3
                  className="text-3xl font-serif mb-4"
                  style={{ color: 'rgba(255,255,255,0.88)' }}
                >
                  {feature.title}
                </h3>
                <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.55)', lineHeight: '1.75' }}>
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
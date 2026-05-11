import { Briefcase, Home, Heart, Car, Shield, Plane } from 'lucide-react';

const useCases = [
  {
    icon: Briefcase,
    title: 'Workplace Harassment',
    description: 'Know your rights and get guidance on dealing with workplace discrimination and harassment claims.'
  },
  {
    icon: Home,
    title: 'Tenant Disputes',
    description: 'Navigate rental agreements, eviction notices, and landlord-tenant conflicts with confidence.'
  },
  {
    icon: Heart,
    title: 'Domestic Violence Rights',
    description: 'Understand protection orders, safety resources, and your legal options in difficult situations.'
  },
  {
    icon: Car,
    title: 'Traffic Fines',
    description: 'Contest tickets, understand violations, and learn about your rights on the road.'
  },
  {
    icon: Shield,
    title: 'Cyber Complaints',
    description: 'Address online fraud, identity theft, and digital privacy violations effectively.'
  },
  {
    icon: Plane,
    title: 'Visa & Immigration',
    description: 'Get clarity on visa applications, citizenship processes, and immigration rights.'
  }
];

export function UseCasesSection() {
  return (
    <section
      id="use-cases"
      className="py-32"
      style={{
        background: 'linear-gradient(135deg, #1a0f08 0%, #2e1a0e 35%, #3B2319 60%, #5a3420 100%)',
      }}
    >
      <div className="container mx-auto px-12 max-w-[1800px]">
        <div className="text-center mb-20">
          <h2
            className="text-6xl font-serif mb-6"
            style={{
              background: 'linear-gradient(135deg, #D4AF37 0%, #F0D060 50%, #C49F2F 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              letterSpacing: '-0.5px',
            }}
          >
            How Can We Help You?
          </h2>
          <p className="text-2xl max-w-3xl mx-auto" style={{ color: 'rgba(255,255,255,0.45)' }}>
            Expert guidance across a wide range of legal matters
          </p>
        </div>

        <div className="grid grid-cols-3 gap-8 max-w-6xl mx-auto">
          {useCases.map((useCase, index) => {
            const Icon = useCase.icon;
            return (
              <div
                key={index}
                className="group cursor-pointer transition-all hover:scale-[1.02] active:scale-95"
                style={{
                  background: 'linear-gradient(160deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.04) 100%)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '1px solid rgba(212,175,55,0.25)',
                  borderRadius: '16px',
                  padding: '32px',
                  boxShadow: '0 8px 40px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.08)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.border = '1px solid rgba(212,175,55,0.55)';
                  e.currentTarget.style.boxShadow = '0 8px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(212,175,55,0.15), inset 0 1px 0 rgba(255,255,255,0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.border = '1px solid rgba(212,175,55,0.25)';
                  e.currentTarget.style.boxShadow = '0 8px 40px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.08)';
                }}
              >
                <div className="flex items-start gap-5">
                  <div
                    className="w-14 h-14 rounded-lg flex items-center justify-center flex-shrink-0 transition-all"
                    style={{
                      background: 'rgba(212,175,55,0.1)',
                      border: '1px solid rgba(212,175,55,0.2)',
                    }}
                  >
                    <Icon className="w-7 h-7" style={{ color: '#D4AF37' }} />
                  </div>
                  <div>
                    <h3
                      className="text-xl font-serif mb-3"
                      style={{ color: 'rgba(255,255,255,0.9)' }}
                    >
                      {useCase.title}
                    </h3>
                    <p
                      className="text-base leading-relaxed"
                      style={{ color: 'rgba(255,255,255,0.45)' }}
                    >
                      {useCase.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

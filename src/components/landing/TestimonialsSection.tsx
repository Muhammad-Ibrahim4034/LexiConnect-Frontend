import { Quote } from 'lucide-react';

const testimonials = [
  {
    quote: "LexiConnect helped me understand my tenant rights when I was facing an unfair eviction. The AI explained everything clearly, and I was able to connect with a lawyer within hours. Absolutely invaluable.",
    author: "Sarah Mitchell",
    role: "Small Business Owner"
  },
  {
    quote: "As someone with limited legal knowledge, I was overwhelmed by a workplace harassment situation. LexiConnect gave me the confidence and guidance I needed to take the right steps. The platform is incredibly user-friendly.",
    author: "James Rodriguez",
    role: "Marketing Professional"
  },
  {
    quote: "The immigration process felt impossible to navigate alone. LexiConnect's AI broke down each step, and connecting with an immigration lawyer was seamless. I can't recommend this enough.",
    author: "Priya Sharma",
    role: "Software Engineer"
  }
];

export function TestimonialsSection() {
  return (
    <section
      className="py-32"
      style={{
        background: 'linear-gradient(180deg, #3B2319 0%, #2e1a0e 50%, #1a0f08 100%)',
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
            Trusted by Thousands
          </h2>
          <p style={{ fontSize: '1.5rem', color: 'rgba(255,255,255,0.5)', maxWidth: '48rem', margin: '0 auto' }}>
            Real stories from people who found clarity and confidence
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-3 gap-10 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="p-10 rounded-2xl transition-all flex flex-col"
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
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.border = '1px solid rgba(212,175,55,0.2)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.25)';
              }}
            >
              <Quote
                className="w-10 h-10 mb-6"
                style={{ color: '#D4AF37', opacity: 0.5 }}
              />

              <p
                className="italic leading-relaxed flex-1 mb-8"
                style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.65)' }}
              >
                "{testimonial.quote}"
              </p>

              <div
                className="pt-6"
                style={{ borderTop: '1px solid rgba(212,175,55,0.15)' }}
              >
                <p
                  className="font-medium"
                  style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.88)' }}
                >
                  {testimonial.author}
                </p>
                <p
                  style={{ fontSize: '0.9rem', color: 'rgba(212,175,55,0.65)', marginTop: '2px' }}
                >
                  {testimonial.role}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
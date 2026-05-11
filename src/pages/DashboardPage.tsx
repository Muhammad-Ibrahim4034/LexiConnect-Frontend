import { Link } from 'react-router-dom';
import { MessageSquare, BookOpen, Users, History, Scale, User, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { DashboardLayout } from '../components/DashboardLayout';

export function DashboardPage() {
  const { user } = useAuth();

  const quickActions = [
    {
      icon: MessageSquare,
      title: 'AI Legal Chat',
      description: 'Get instant answers to your legal questions',
      link: '/chat',
      color: 'bg-blue-500'
    },
    {
      icon: BookOpen,
      title: 'Legal Information',
      description: 'Browse laws and regulations',
      link: '/legal-info',
      color: 'bg-green-500'
    },
    {
      icon: Users,
      title: 'Lawyer Directory',
      description: 'Find verified legal professionals',
      link: '/lawyers',
      color: 'bg-purple-500'
    },
    {
      icon: History,
      title: 'Chat History',
      description: 'View your previous conversations',
      link: '/history',
      color: 'bg-orange-500'
    }
  ];

  const recentActivity = [
    { type: 'chat', title: 'Asked about traffic violations', time: '2 hours ago' },
    { type: 'info', title: 'Viewed Domestic Violence Laws', time: '1 day ago' },
    { type: 'lawyer', title: 'Contacted Lawyer - Ahmed Khan', time: '3 days ago' }
  ];

  return (
    <DashboardLayout>
      <div
        className="min-h-screen"
        style={{
          background: 'linear-gradient(135deg, #1a0f08 0%, #2e1a0e 35%, #3B2319 60%, #5a3420 100%)',
          padding: '32px 24px',
        }}
      >
        <div className="max-w-7xl mx-auto">

          {/* Welcome Section */}
          <div className="mb-10">
            <h1
              className="text-5xl font-serif mb-3"
              style={{
                background: 'linear-gradient(135deg, #D4AF37 0%, #F0D060 50%, #C49F2F 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                letterSpacing: '-0.5px',
              }}
            >
              Welcome back, {user?.name}
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '18px' }}>
              How can we assist you with your legal needs today?
            </p>
          </div>

          {/* Quick Actions Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <Link
                  key={index}
                  to={action.link}
                  className="group transition-all hover:scale-[1.02] active:scale-95"
                  style={{
                    background: 'linear-gradient(160deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.04) 100%)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    border: '1px solid rgba(212,175,55,0.25)',
                    borderRadius: '16px',
                    padding: '24px',
                    boxShadow: '0 8px 40px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.08)',
                    textDecoration: 'none',
                    display: 'block',
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
                  <div
                    className={`w-14 h-14 ${action.color} rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110`}
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3
                    className="text-xl font-serif mb-2"
                    style={{ color: 'rgba(255,255,255,0.9)' }}
                  >
                    {action.title}
                  </h3>
                  <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)' }}>
                    {action.description}
                  </p>
                </Link>
              );
            })}
          </div>

          {/* Two Column Layout */}
          <div className="grid lg:grid-cols-3 gap-6">

            {/* Recent Activity */}
            <div
              className="lg:col-span-2"
              style={{
                background: 'linear-gradient(160deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.04) 100%)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(212,175,55,0.25)',
                borderRadius: '16px',
                padding: '32px',
                boxShadow: '0 8px 40px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.08)',
              }}
            >
              <h2
                className="text-2xl font-serif mb-6"
                style={{ color: 'rgba(255,255,255,0.9)' }}
              >
                Recent Activity
              </h2>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-4 rounded-xl transition-all"
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(212,175,55,0.12)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(212,175,55,0.08)';
                      e.currentTarget.style.border = '1px solid rgba(212,175,55,0.25)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                      e.currentTarget.style.border = '1px solid rgba(212,175,55,0.12)';
                    }}
                  >
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{
                        background: 'rgba(212,175,55,0.15)',
                        border: '1px solid rgba(212,175,55,0.3)',
                      }}
                    >
                      {activity.type === 'chat' && <MessageSquare className="w-5 h-5" style={{ color: '#D4AF37' }} />}
                      {activity.type === 'info' && <BookOpen className="w-5 h-5" style={{ color: '#D4AF37' }} />}
                      {activity.type === 'lawyer' && <Users className="w-5 h-5" style={{ color: '#D4AF37' }} />}
                    </div>
                    <div className="flex-1">
                      <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '14px' }}>{activity.title}</p>
                      <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '12px', marginTop: '2px' }}>{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div
              style={{
                background: 'linear-gradient(135deg, rgba(212,175,55,0.15) 0%, rgba(212,175,55,0.05) 100%)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(212,175,55,0.35)',
                borderRadius: '16px',
                padding: '32px',
                boxShadow: '0 8px 40px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.08)',
              }}
            >
              <h2
                className="text-2xl font-serif mb-6"
                style={{ color: 'rgba(255,255,255,0.9)' }}
              >
                Your Stats
              </h2>
              <div className="space-y-6">
                <div>
                  <p style={{ color: 'rgba(212,175,55,0.75)', fontSize: '13px', marginBottom: '4px' }}>Total Chats</p>
                  <p
                    style={{
                      fontSize: '40px',
                      fontWeight: '300',
                      background: 'linear-gradient(135deg, #D4AF37 0%, #F0D060 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    24
                  </p>
                </div>
                <div
                  style={{
                    height: '1px',
                    background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.3), transparent)',
                  }}
                />
                <div>
                  <p style={{ color: 'rgba(212,175,55,0.75)', fontSize: '13px', marginBottom: '4px' }}>Laws Viewed</p>
                  <p
                    style={{
                      fontSize: '40px',
                      fontWeight: '300',
                      background: 'linear-gradient(135deg, #D4AF37 0%, #F0D060 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    12
                  </p>
                </div>
                <div
                  style={{
                    height: '1px',
                    background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.3), transparent)',
                  }}
                />
                <div>
                  <p style={{ color: 'rgba(212,175,55,0.75)', fontSize: '13px', marginBottom: '4px' }}>Lawyers Contacted</p>
                  <p
                    style={{
                      fontSize: '40px',
                      fontWeight: '300',
                      background: 'linear-gradient(135deg, #D4AF37 0%, #F0D060 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    3
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Emergency Help Banner */}
          <div
            className="mt-10"
            style={{
              background: 'linear-gradient(160deg, rgba(220,38,38,0.15) 0%, rgba(220,38,38,0.07) 100%)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(220,38,38,0.35)',
              borderRadius: '16px',
              padding: '24px',
              boxShadow: '0 8px 40px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)',
            }}
          >
            <h3
              className="text-xl font-serif mb-2"
              style={{ color: 'rgba(252,165,165,0.95)' }}
            >
              Need Emergency Legal Help?
            </h3>
            <p style={{ color: 'rgba(252,165,165,0.7)', marginBottom: '16px', fontSize: '14px' }}>
              If you're facing an emergency situation, contact these helplines immediately:
            </p>
            <div className="flex flex-wrap gap-4">
              {[
                { label: 'Domestic Violence', number: '1099' },
                { label: 'Police Emergency', number: '15' },
                { label: 'Legal Aid', number: '0800-12345' },
              ].map((item, i) => (
                <div
                  key={i}
                  style={{
                    background: 'rgba(220,38,38,0.12)',
                    border: '1px solid rgba(220,38,38,0.3)',
                    borderRadius: '10px',
                    padding: '8px 16px',
                  }}
                >
                  <p style={{ fontSize: '11px', color: 'rgba(252,165,165,0.6)', marginBottom: '2px' }}>{item.label}</p>
                  <p style={{ color: 'rgba(252,165,165,0.95)', fontWeight: '500', fontSize: '15px' }}>{item.number}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
}

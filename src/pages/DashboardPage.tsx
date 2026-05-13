import { Link } from 'react-router-dom';
import { MessageSquare, BookOpen, Users, History } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { DashboardLayout } from '../components/DashboardLayout';
import { useEffect, useState } from 'react';

// ── Change this to your backend base URL if you use an env var ──
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export function DashboardPage() {
  const { user } = useAuth();

  const [recentActivity, setRecentActivity] = useState([]);
  const [loadingActivity, setLoadingActivity] = useState(true);
  const [activityError, setActivityError] = useState(null);

  useEffect(() => {
    async function fetchActivity() {
      try {
        setLoadingActivity(true);
        setActivityError(null);

        const token = localStorage.getItem("authToken");
        const res = await fetch(`${API_BASE}/activity/recent?limit=5`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error(`Server error: ${res.status}`);

        const data = await res.json();
        setRecentActivity(data);
      } catch (err) {
        console.error('Failed to load recent activity:', err);
        setActivityError('Could not load recent activity.');
      } finally {
        setLoadingActivity(false);
      }
    }

    fetchActivity();
  }, []);

  const quickActions = [
    {
      icon: MessageSquare,
      title: 'AI Legal Chat',
      description: 'Get instant answers to your legal questions',
      link: '/chat',
      color: 'bg-blue-500',
    },
    {
      icon: BookOpen,
      title: 'Legal Information',
      description: 'Browse laws and regulations',
      link: '/legal-info',
      color: 'bg-green-500',
    },
    {
      icon: Users,
      title: 'Lawyer Directory',
      description: 'Find verified legal professionals',
      link: '/lawyers',
      color: 'bg-purple-500',
    },
    {
      icon: History,
      title: 'Chat History',
      description: 'View your previous conversations',
      link: '/history',
      color: 'bg-orange-500',
    },
  ];

  return (
    <DashboardLayout>
      <div
        className="min-h-screen"
        style={{
          background:
            'linear-gradient(135deg, #1a0f08 0%, #2e1a0e 35%, #3B2319 60%, #5a3420 100%)',
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
                    background:
                      'linear-gradient(160deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.04) 100%)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    border: '1px solid rgba(212,175,55,0.25)',
                    borderRadius: '16px',
                    padding: '24px',
                    boxShadow:
                      '0 8px 40px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.08)',
                    textDecoration: 'none',
                    display: 'block',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.border = '1px solid rgba(212,175,55,0.55)';
                    e.currentTarget.style.boxShadow =
                      '0 8px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(212,175,55,0.15), inset 0 1px 0 rgba(255,255,255,0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.border = '1px solid rgba(212,175,55,0.25)';
                    e.currentTarget.style.boxShadow =
                      '0 8px 40px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.08)';
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

          {/* Recent Activity — full width */}
          <div
            style={{
              background:
                'linear-gradient(160deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.04) 100%)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(212,175,55,0.25)',
              borderRadius: '16px',
              padding: '32px',
              boxShadow:
                '0 8px 40px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.08)',
            }}
          >
            <h2
              className="text-2xl font-serif mb-6"
              style={{ color: 'rgba(255,255,255,0.9)' }}
            >
              Recent Activity
            </h2>

            {/* Loading skeleton */}
            {loadingActivity && (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 p-4 rounded-xl animate-pulse"
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(212,175,55,0.12)',
                    }}
                  >
                    <div
                      className="w-10 h-10 rounded-lg flex-shrink-0"
                      style={{ background: 'rgba(212,175,55,0.1)' }}
                    />
                    <div className="flex-1 space-y-2">
                      <div
                        className="h-3 rounded"
                        style={{ background: 'rgba(255,255,255,0.08)', width: '60%' }}
                      />
                      <div
                        className="h-2 rounded"
                        style={{ background: 'rgba(255,255,255,0.05)', width: '30%' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Error state */}
            {!loadingActivity && activityError && (
              <p style={{ color: 'rgba(252,165,165,0.7)', fontSize: '14px' }}>
                {activityError}
              </p>
            )}

            {/* Empty state */}
            {!loadingActivity && !activityError && recentActivity.length === 0 && (
              <div
                className="flex flex-col items-center justify-center py-10"
                style={{ color: 'rgba(255,255,255,0.3)' }}
              >
                <MessageSquare className="w-10 h-10 mb-3" style={{ opacity: 0.3 }} />
                <p style={{ fontSize: '14px' }}>No conversations yet. Start a chat!</p>
              </div>
            )}

            {/* Activity list */}
            {!loadingActivity && !activityError && recentActivity.length > 0 && (
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <Link
                    key={activity.id}
                    to={`/chat/${activity.conversation_id}`}
                    className="flex items-start gap-4 p-4 rounded-xl transition-all"
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(212,175,55,0.12)',
                      textDecoration: 'none',
                      display: 'flex',
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
                      <MessageSquare className="w-5 h-5" style={{ color: '#D4AF37' }} />
                    </div>
                    <div className="flex-1">
                      <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '14px' }}>
                        {activity.title}
                      </p>
                      <p
                        style={{
                          color: 'rgba(255,255,255,0.35)',
                          fontSize: '12px',
                          marginTop: '2px',
                        }}
                      >
                        {activity.time}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Emergency Help Banner */}
          <div
            className="mt-10"
            style={{
              background:
                'linear-gradient(160deg, rgba(220,38,38,0.15) 0%, rgba(220,38,38,0.07) 100%)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(220,38,38,0.35)',
              borderRadius: '16px',
              padding: '24px',
              boxShadow:
                '0 8px 40px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)',
            }}
          >
            <h3
              className="text-xl font-serif mb-2"
              style={{ color: 'rgba(252,165,165,0.95)' }}
            >
              Need Emergency Legal Help?
            </h3>
            <p
              style={{
                color: 'rgba(252,165,165,0.7)',
                marginBottom: '16px',
                fontSize: '14px',
              }}
            >
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
                  <p
                    style={{
                      fontSize: '11px',
                      color: 'rgba(252,165,165,0.6)',
                      marginBottom: '2px',
                    }}
                  >
                    {item.label}
                  </p>
                  <p
                    style={{
                      color: 'rgba(252,165,165,0.95)',
                      fontWeight: '500',
                      fontSize: '15px',
                    }}
                  >
                    {item.number}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
}

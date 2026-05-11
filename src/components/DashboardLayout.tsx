import { ReactNode } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Scale, MessageSquare, BookOpen, Users, History, LayoutDashboard, LogOut, Shield } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: MessageSquare, label: 'AI Chat', path: '/chat' },
    { icon: BookOpen, label: 'Legal Info', path: '/legal-info' },
    { icon: Users, label: 'Lawyers', path: '/lawyers' },
    { icon: History, label: 'History', path: '/history' },
  ];

  if (isAdmin) {
    navItems.push({ icon: Shield, label: 'Admin', path: '/admin' });
  }

  return (
    <div
      className="min-h-screen flex"
      style={{
        background: 'linear-gradient(135deg, #1a0f08 0%, #2e1a0e 35%, #3B2319 60%, #5a3420 100%)',
      }}
    >
      {/* Sidebar — semi-transparent dark overlay so gradient shows through */}
      <aside
        className="w-72 flex flex-col flex-shrink-0 min-h-screen"
        style={{
          background: 'linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.2) 100%)',
          borderRight: '1px solid rgba(212,175,55,0.2)',
        }}
      >
        {/* Logo */}
        <div
          className="p-6"
          style={{ borderBottom: '1px solid rgba(212,175,55,0.15)' }}
        >
          <Link to="/dashboard" className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{
                background: 'linear-gradient(135deg, #D4AF37, #F0D060)',
                boxShadow: '0 2px 10px rgba(212,175,55,0.4)',
              }}
            >
              <Scale className="w-5 h-5" style={{ color: '#2e1a0e' }} />
            </div>
            <span
              className="text-2xl font-serif"
              style={{
                background: 'linear-gradient(135deg, #D4AF37 0%, #F0D060 50%, #C49F2F 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              LexiConnect
            </span>
          </Link>
        </div>

        {/* User Info */}
        <div
          className="p-6"
          style={{ borderBottom: '1px solid rgba(212,175,55,0.15)' }}
        >
          <div className="flex items-center gap-3 mb-2">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-medium"
              style={{
                background: 'linear-gradient(135deg, #D4AF37, #F0D060)',
                color: '#2e1a0e',
                fontSize: '15px',
                boxShadow: '0 2px 8px rgba(212,175,55,0.35)',
              }}
            >
              {user?.name.charAt(0)}
            </div>
            <div className="overflow-hidden">
              <p
                className="font-medium truncate"
                style={{ color: 'rgba(255,255,255,0.88)', fontSize: '14px' }}
              >
                {user?.name}
              </p>
              <p
                className="truncate"
                style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px' }}
              >
                {user?.email}
              </p>
            </div>
          </div>

          {isAdmin && (
            <div
              className="mt-2 inline-block px-2 py-1 rounded-md"
              style={{
                background: 'rgba(212,175,55,0.12)',
                border: '1px solid rgba(212,175,55,0.25)',
                color: 'rgba(212,175,55,0.85)',
                fontSize: '11px',
                letterSpacing: '0.3px',
              }}
            >
              Admin Account
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all"
                    style={
                      isActive
                        ? {
                            background: 'linear-gradient(135deg, #D4AF37 0%, #C49F2F 100%)',
                            color: '#2e1a0e',
                            boxShadow: '0 2px 10px rgba(212,175,55,0.35)',
                            fontWeight: 500,
                          }
                        : {
                            color: 'rgba(255,255,255,0.5)',
                            background: 'transparent',
                          }
                    }
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.background = 'rgba(212,175,55,0.08)';
                        e.currentTarget.style.color = 'rgba(255,255,255,0.85)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.color = 'rgba(255,255,255,0.5)';
                      }
                    }}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    <span style={{ fontSize: '14px' }}>{item.label}</span>

                    {isActive && (
                      <div
                        className="ml-auto w-1.5 h-1.5 rounded-full"
                        style={{ background: '#2e1a0e', opacity: 0.5 }}
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Logout */}
        <div
          className="p-4"
          style={{ borderTop: '1px solid rgba(212,175,55,0.15)' }}
        >
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all"
            style={{ color: 'rgba(255,255,255,0.45)', fontSize: '14px' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(212,175,55,0.08)';
              e.currentTarget.style.color = 'rgba(255,255,255,0.8)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = 'rgba(255,255,255,0.45)';
            }}
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content — no background, inherits page gradient seamlessly */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
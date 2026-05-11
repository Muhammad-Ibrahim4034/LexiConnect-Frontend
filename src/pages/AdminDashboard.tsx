import { useState } from 'react';
import { Users, UserPlus, Trash2, Edit, Shield, Activity, MessageSquare, BookOpen } from 'lucide-react';
import { DashboardLayout } from '../components/DashboardLayout';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  joinDate: Date;
  totalChats: number;
  status: 'active' | 'suspended';
}

interface LawyerEntry {
  id: string;
  name: string;
  specialization: string[];
  city: string;
  verified: boolean;
}

const glassCard: React.CSSProperties = {
  background: 'linear-gradient(160deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  border: '1px solid rgba(212,175,55,0.25)',
  boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.07)',
  borderRadius: '16px',
};

const glassCardSubtle: React.CSSProperties = {
  background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
  border: '1px solid rgba(212,175,55,0.15)',
  borderRadius: '12px',
};

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'lawyers' | 'logs'>('overview');

  const [users] = useState<User[]>([
    { id: '1', name: 'John Doe', email: 'john.doe@example.com', phone: '+92-300-1234567', joinDate: new Date('2024-11-15'), totalChats: 24, status: 'active' },
    { id: '2', name: 'Sarah Khan', email: 'sarah.khan@example.com', phone: '+92-321-9876543', joinDate: new Date('2024-11-20'), totalChats: 18, status: 'active' },
    { id: '3', name: 'Ahmed Ali', email: 'ahmed.ali@example.com', phone: '+92-333-5551234', joinDate: new Date('2024-12-01'), totalChats: 7, status: 'active' },
  ]);

  const [lawyers, setLawyers] = useState<LawyerEntry[]>([
    { id: '1', name: 'Advocate Ahmed Khan', specialization: ['Criminal Law', 'Family Law'], city: 'Lahore', verified: true },
    { id: '2', name: 'Advocate Sarah Malik', specialization: ['Domestic Violence', 'Women Rights'], city: 'Karachi', verified: true },
    { id: '3', name: 'Advocate Muhammad Raza', specialization: ['Traffic Law'], city: 'Islamabad', verified: false },
  ]);

  const systemStats = {
    totalUsers: users.length,
    activeUsers: users.filter(u => u.status === 'active').length,
    totalLawyers: lawyers.length,
    totalChats: users.reduce((sum, u) => sum + u.totalChats, 0),
    verifiedLawyers: lawyers.filter(l => l.verified).length,
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Activity },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'lawyers', label: 'Lawyers', icon: UserPlus },
    { id: 'logs', label: 'Activity Logs', icon: BookOpen },
  ];

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto px-2 py-8">

        {/* Header */}
        <div className="mb-8 flex items-start gap-4">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{
              background: 'linear-gradient(135deg, #D4AF37, #F0D060)',
              boxShadow: '0 2px 12px rgba(212,175,55,0.45)',
            }}
          >
            <Shield className="w-6 h-6" style={{ color: '#2e1a0e' }} />
          </div>
          <div>
            <h1
              className="text-4xl font-serif mb-1"
              style={{
                background: 'linear-gradient(135deg, #D4AF37 0%, #F0D060 50%, #C49F2F 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Admin Dashboard
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '15px' }}>
              Manage users, lawyers, and monitor system activity
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div
          className="flex gap-2 mb-8 p-2 rounded-xl"
          style={{
            background: 'rgba(0,0,0,0.25)',
            border: '1px solid rgba(212,175,55,0.2)',
          }}
        >
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition-all"
                style={
                  isActive
                    ? {
                        background: 'linear-gradient(135deg, #D4AF37 0%, #C49F2F 100%)',
                        color: '#2e1a0e',
                        fontWeight: 500,
                        boxShadow: '0 2px 10px rgba(212,175,55,0.35)',
                      }
                    : {
                        color: 'rgba(255,255,255,0.45)',
                        background: 'transparent',
                      }
                }
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = 'rgba(212,175,55,0.08)';
                    e.currentTarget.style.color = 'rgba(255,255,255,0.8)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = 'rgba(255,255,255,0.45)';
                  }
                }}
              >
                <Icon className="w-4 h-4" />
                <span style={{ fontSize: '14px' }}>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* ── Overview Tab ── */}
        {activeTab === 'overview' && (
          <div>
            {/* Stats Grid */}
            <div className="grid md:grid-cols-4 gap-5 mb-6">
              {[
                { label: 'Total Users', value: systemStats.totalUsers, sub: `${systemStats.activeUsers} active`, colors: 'from-[#1a3a5c] to-[#0c2240]', accent: 'rgba(56,152,236,0.7)' },
                { label: 'Total Lawyers', value: systemStats.totalLawyers, sub: `${systemStats.verifiedLawyers} verified`, colors: 'from-[#1a3d28] to-[#0e2718]', accent: 'rgba(52,180,100,0.7)' },
                { label: 'Total Chats', value: systemStats.totalChats, sub: 'all time', colors: 'from-[#2e1a4a] to-[#1c0f30]', accent: 'rgba(140,100,220,0.7)' },
                { label: 'System Status', value: 'Online', sub: 'All systems normal', colors: 'from-[#3d2600] to-[#261800]', accent: 'rgba(212,175,55,0.7)' },
              ].map((stat, idx) => (
                <div
                  key={idx}
                  className={`p-6 rounded-2xl bg-gradient-to-br ${stat.colors}`}
                  style={{
                    border: `1px solid ${stat.accent.replace('0.7', '0.3')}`,
                    boxShadow: `0 4px 20px rgba(0,0,0,0.3)`,
                  }}
                >
                  <p style={{ color: stat.accent, fontSize: '12px', marginBottom: '8px', fontWeight: 500, letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                    {stat.label}
                  </p>
                  <p style={{ color: 'rgba(255,255,255,0.92)', fontSize: idx === 3 ? '22px' : '36px', fontWeight: 500, marginBottom: '4px', lineHeight: 1.1 }}>
                    {stat.value}
                  </p>
                  <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '12px' }}>{stat.sub}</p>
                </div>
              ))}
            </div>

            {/* Recent Activity */}
            <div style={glassCard} className="p-6">
              <h2 className="text-xl font-serif mb-5" style={{ color: 'rgba(255,255,255,0.88)' }}>
                Recent Activity
              </h2>
              <div className="space-y-3">
                {[
                  { type: 'user', text: 'New user registered: john.doe@example.com', time: '2 hours ago' },
                  { type: 'chat', text: 'Peak chat activity: 45 concurrent sessions', time: '4 hours ago' },
                  { type: 'lawyer', text: 'Lawyer verified: Advocate Sarah Malik', time: '1 day ago' },
                  { type: 'system', text: 'System backup completed successfully', time: '1 day ago' },
                ].map((activity, idx) => {
                  const dotColor =
                    activity.type === 'user' ? '#378ADD' :
                    activity.type === 'chat' ? '#8B5CF6' :
                    activity.type === 'lawyer' ? '#22C55E' : 'rgba(255,255,255,0.3)';
                  return (
                    <div
                      key={idx}
                      className="flex items-center gap-3 p-3 rounded-xl"
                      style={glassCardSubtle}
                    >
                      <div
                        className="w-2 h-2 rounded-full flex-shrink-0"
                        style={{ background: dotColor, boxShadow: `0 0 6px ${dotColor}` }}
                      />
                      <p className="flex-1" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)' }}>
                        {activity.text}
                      </p>
                      <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', flexShrink: 0 }}>
                        {activity.time}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ── Users Tab ── */}
        {activeTab === 'users' && (
          <div style={{ ...glassCard, overflow: 'hidden' }}>
            <div
              className="p-6 flex items-center justify-between"
              style={{ borderBottom: '1px solid rgba(212,175,55,0.15)' }}
            >
              <h2 className="text-xl font-serif" style={{ color: 'rgba(255,255,255,0.88)' }}>
                User Management
              </h2>
              <button
                className="px-4 py-2 rounded-lg text-sm font-medium transition-all hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, #D4AF37, #C49F2F)',
                  color: '#2e1a0e',
                  boxShadow: '0 2px 10px rgba(212,175,55,0.35)',
                  border: 'none',
                }}
              >
                Export Data
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr style={{ background: 'rgba(0,0,0,0.2)' }}>
                    {['Name', 'Email', 'Phone', 'Join Date', 'Chats', 'Status', 'Actions'].map(h => (
                      <th
                        key={h}
                        className="px-6 py-4 text-left"
                        style={{ fontSize: '12px', color: 'rgba(212,175,55,0.7)', fontWeight: 500, letterSpacing: '0.4px', textTransform: 'uppercase' }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, idx) => (
                    <tr
                      key={user.id}
                      style={{ background: idx % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(212,175,55,0.08)' }}
                    >
                      <td className="px-6 py-4" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.82)' }}>{user.name}</td>
                      <td className="px-6 py-4" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.55)' }}>{user.email}</td>
                      <td className="px-6 py-4" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.55)' }}>{user.phone}</td>
                      <td className="px-6 py-4" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.55)' }}>{user.joinDate.toLocaleDateString()}</td>
                      <td className="px-6 py-4" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.82)' }}>{user.totalChats}</td>
                      <td className="px-6 py-4">
                        <span
                          className="px-3 py-1 rounded-full text-xs font-medium"
                          style={
                            user.status === 'active'
                              ? { background: 'rgba(34,197,94,0.15)', color: 'rgba(134,239,172,0.9)', border: '1px solid rgba(34,197,94,0.25)' }
                              : { background: 'rgba(239,68,68,0.15)', color: 'rgba(252,165,165,0.9)', border: '1px solid rgba(239,68,68,0.25)' }
                          }
                        >
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            className="p-2 rounded-lg transition-all hover:scale-110"
                            style={{ color: '#D4AF37', background: 'rgba(212,175,55,0.08)', border: '1px solid rgba(212,175,55,0.2)' }}
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            className="p-2 rounded-lg transition-all hover:scale-110"
                            style={{ color: 'rgba(252,165,165,0.85)', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)' }}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── Lawyers Tab ── */}
        {activeTab === 'lawyers' && (
          <div style={{ ...glassCard, overflow: 'hidden' }}>
            <div
              className="p-6 flex items-center justify-between"
              style={{ borderBottom: '1px solid rgba(212,175,55,0.15)' }}
            >
              <h2 className="text-xl font-serif" style={{ color: 'rgba(255,255,255,0.88)' }}>
                Lawyer Directory Management
              </h2>
              <button
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, #D4AF37, #C49F2F)',
                  color: '#2e1a0e',
                  boxShadow: '0 2px 10px rgba(212,175,55,0.35)',
                  border: 'none',
                }}
              >
                <UserPlus className="w-4 h-4" />
                Add Lawyer
              </button>
            </div>
            <div className="p-6 space-y-4">
              {lawyers.map(lawyer => (
                <div
                  key={lawyer.id}
                  className="flex items-center justify-between p-5 rounded-xl"
                  style={glassCardSubtle}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 style={{ fontSize: '15px', color: 'rgba(255,255,255,0.88)', fontWeight: 500 }}>
                        {lawyer.name}
                      </h3>
                      {lawyer.verified && (
                        <span
                          className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs"
                          style={{
                            background: 'rgba(34,197,94,0.12)',
                            color: 'rgba(134,239,172,0.9)',
                            border: '1px solid rgba(34,197,94,0.25)',
                          }}
                        >
                          <Shield className="w-3 h-3" />
                          Verified
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {lawyer.specialization.map((spec, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 rounded-md text-xs"
                          style={{
                            background: 'rgba(212,175,55,0.1)',
                            border: '1px solid rgba(212,175,55,0.2)',
                            color: 'rgba(212,175,55,0.8)',
                          }}
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                    <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)' }}>{lawyer.city}</p>
                  </div>
                  <div className="flex gap-2 ml-4">
                    {!lawyer.verified && (
                      <button
                        onClick={() => setLawyers(lawyers.map(l => l.id === lawyer.id ? { ...l, verified: true } : l))}
                        className="px-4 py-2 rounded-lg text-sm font-medium transition-all hover:scale-105"
                        style={{
                          background: 'rgba(34,197,94,0.15)',
                          color: 'rgba(134,239,172,0.9)',
                          border: '1px solid rgba(34,197,94,0.3)',
                        }}
                      >
                        Verify
                      </button>
                    )}
                    <button
                      className="p-2 rounded-lg transition-all hover:scale-110"
                      style={{ color: '#D4AF37', background: 'rgba(212,175,55,0.08)', border: '1px solid rgba(212,175,55,0.2)' }}
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      className="p-2 rounded-lg transition-all hover:scale-110"
                      style={{ color: 'rgba(252,165,165,0.85)', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)' }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Logs Tab ── */}
        {activeTab === 'logs' && (
          <div style={glassCard} className="p-6">
            <h2 className="text-xl font-serif mb-5" style={{ color: 'rgba(255,255,255,0.88)' }}>
              System Activity Logs
            </h2>
            <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
              {[
                { time: '2024-12-10 14:32:15', level: 'INFO', message: 'User login: john.doe@example.com' },
                { time: '2024-12-10 14:28:43', level: 'INFO', message: 'Chat session started: User ID 12' },
                { time: '2024-12-10 14:15:22', level: 'SUCCESS', message: 'Lawyer profile updated: Advocate Ahmed Khan' },
                { time: '2024-12-10 13:58:11', level: 'INFO', message: 'New user registration: sarah.khan@example.com' },
                { time: '2024-12-10 13:45:33', level: 'WARNING', message: 'Failed login attempt: invalid@email.com' },
                { time: '2024-12-10 13:30:00', level: 'INFO', message: 'System backup completed' },
                { time: '2024-12-10 12:15:44', level: 'INFO', message: 'Database maintenance completed' },
              ].map((log, idx) => {
                const levelStyle =
                  log.level === 'INFO'    ? { bg: 'rgba(56,152,236,0.12)', color: 'rgba(147,210,255,0.9)', border: 'rgba(56,152,236,0.25)' } :
                  log.level === 'SUCCESS' ? { bg: 'rgba(34,197,94,0.12)',  color: 'rgba(134,239,172,0.9)', border: 'rgba(34,197,94,0.25)'  } :
                  log.level === 'WARNING' ? { bg: 'rgba(212,175,55,0.12)', color: 'rgba(212,175,55,0.9)',  border: 'rgba(212,175,55,0.25)' } :
                                            { bg: 'rgba(239,68,68,0.12)',  color: 'rgba(252,165,165,0.9)', border: 'rgba(239,68,68,0.25)'  };
                return (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3 rounded-xl font-mono"
                    style={glassCardSubtle}
                  >
                    <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', flexShrink: 0, marginTop: '1px' }}>
                      {log.time}
                    </span>
                    <span
                      className="px-2 py-0.5 rounded flex-shrink-0 text-xs font-medium"
                      style={{ background: levelStyle.bg, color: levelStyle.color, border: `1px solid ${levelStyle.border}` }}
                    >
                      {log.level}
                    </span>
                    <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.65)', flex: 1 }}>
                      {log.message}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </DashboardLayout>
  );
}
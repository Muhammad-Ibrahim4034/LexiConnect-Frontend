import { useEffect } from 'react';
import { DashboardLayout } from '../components/DashboardLayout';
import { useChat } from '../context/ChatContext';
import { MessageSquare, Clock, Trash2, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function ChatHistoryPage() {
  const { conversations, loadConversations, loadConversation, deleteConversation } = useChat();
  const navigate = useNavigate();

  useEffect(() => {
    loadConversations();
  }, [loadConversations]);

  const handleOpenConversation = async (conversationId: number) => {
    await loadConversation(conversationId);
    navigate('/chat');
  };

  const handleDeleteConversation = async (e: React.MouseEvent, conversationId: number) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this conversation?')) {
      await deleteConversation(conversationId);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffInHours < 48) {
      return 'Yesterday';
    } else if (diffInHours < 168) {
      return date.toLocaleDateString([], { weekday: 'long' });
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };

  return (
    <DashboardLayout>
      <div
        className="min-h-screen"
        style={{
          background: 'linear-gradient(135deg, #1a0f08 0%, #2e1a0e 35%, #3B2319 60%, #5a3420 100%)',
          padding: '32px 24px',
        }}
      >
        <div className="max-w-5xl mx-auto">

          {/* Header */}
          <div className="mb-8">
            <h1
              className="text-4xl font-serif mb-2"
              style={{
                background: 'linear-gradient(135deg, #D4AF37 0%, #F0D060 50%, #C49F2F 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                letterSpacing: '-0.5px',
              }}
            >
              Chat History
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '16px' }}>
              View and manage your previous conversations
            </p>
          </div>

          {conversations.length === 0 ? (
            <div
              style={{
                background: 'linear-gradient(160deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.04) 100%)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(212,175,55,0.25)',
                borderRadius: '16px',
                padding: '64px 24px',
                textAlign: 'center',
                boxShadow: '0 8px 40px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.08)',
              }}
            >
              <MessageSquare
                className="w-16 h-16 mx-auto mb-4"
                style={{ color: 'rgba(212,175,55,0.25)' }}
              />
              <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '18px', marginBottom: '8px' }}>
                No conversations yet
              </p>
              <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: '14px' }}>
                Start chatting with the AI Legal Assistant to see your history here
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  onClick={() => handleOpenConversation(conversation.id)}
                  className="group cursor-pointer transition-all hover:scale-[1.005]"
                  style={{
                    background: 'linear-gradient(160deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.04) 100%)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    border: '1px solid rgba(212,175,55,0.2)',
                    borderRadius: '14px',
                    padding: '20px',
                    boxShadow: '0 4px 24px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.06)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.border = '1px solid rgba(212,175,55,0.5)';
                    e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.08)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.border = '1px solid rgba(212,175,55,0.2)';
                    e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.06)';
                  }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <MessageSquare
                          className="w-5 h-5 flex-shrink-0"
                          style={{ color: 'rgba(212,175,55,0.7)' }}
                        />
                        <h3
                          className="text-lg font-medium truncate"
                          style={{ color: 'rgba(255,255,255,0.88)' }}
                        >
                          {conversation.title}
                        </h3>
                      </div>

                      {conversation.last_message && (
                        <p
                          className="text-sm line-clamp-2 mb-3"
                          style={{ color: 'rgba(255,255,255,0.4)' }}
                        >
                          {conversation.last_message}
                        </p>
                      )}

                      <div
                        className="flex items-center gap-4 text-xs"
                        style={{ color: 'rgba(255,255,255,0.3)' }}
                      >
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{formatDate(conversation.updated_at)}</span>
                        </div>
                        <span>•</span>
                        <span>{conversation.message_count} messages</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 ml-4">
                      <button
                        onClick={(e) => handleDeleteConversation(e, conversation.id)}
                        className="p-2 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                        title="Delete conversation"
                        style={{
                          color: 'rgba(248,113,113,0.8)',
                          background: 'transparent',
                          border: 'none',
                          cursor: 'pointer',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'rgba(220,38,38,0.15)';
                          e.currentTarget.style.color = 'rgba(252,165,165,0.95)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'transparent';
                          e.currentTarget.style.color = 'rgba(248,113,113,0.8)';
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                      <ArrowRight
                        className="w-5 h-5 transition-colors"
                        style={{ color: 'rgba(255,255,255,0.2)' }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </DashboardLayout>
  );
}

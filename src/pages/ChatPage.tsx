import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader, AlertCircle, Plus } from 'lucide-react';
import { DashboardLayout } from '../components/DashboardLayout';
import { useChat } from '../context/ChatContext';
import ReactMarkdown from "react-markdown";

export function ChatPage() {
  const { messages, isLoading, sendMessage, createNewConversation, currentConversationId } = useChat();
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setInput('');
    await sendMessage(input);
  };

  const handleNewChat = async () => {
    await createNewConversation();
  };

  const quickQuestions = [
    'How do I file a traffic challan appeal?',
    'What are my rights as a tenant?',
    'How to report domestic violence?',
    'What is the procedure for cyber complaint?'
  ];

  return (
    <DashboardLayout>
      {/* Page background gradient */}
      <style>{`
  .llm-response p { margin: 0 0 10px 0; color: rgba(255,255,255,0.88); }
  .llm-response p:last-child { margin-bottom: 0; }
  .llm-response strong, .llm-response b { color: #F0D060; font-weight: 700; }
  .llm-response em, .llm-response i { color: rgba(255,255,255,0.75); font-style: italic; }
  .llm-response ul { list-style: none; padding: 0; margin: 8px 0; }
  .llm-response ul li { padding-left: 16px; position: relative; margin-bottom: 6px; color: rgba(255,255,255,0.85); }
  .llm-response ul li::before { content: '•'; position: absolute; left: 0; color: #D4AF37; font-weight: bold; }
  .llm-response ol { padding-left: 20px; margin: 8px 0; }
  .llm-response ol li { margin-bottom: 6px; color: rgba(255,255,255,0.85); padding-left: 4px; }
  .llm-response ol li::marker { color: #D4AF37; font-weight: 700; }
  .llm-response h1, .llm-response h2, .llm-response h3, .llm-response h4 {
    color: #F0D060;
    font-weight: 700;
    margin: 14px 0 6px 0;
    line-height: 1.3;
  }
  .llm-response h1 { font-size: 18px; }
  .llm-response h2 { font-size: 16px; }
  .llm-response h3 { font-size: 15px; }
  .llm-response h4 { font-size: 14px; }
  .llm-response code {
    background: rgba(212,175,55,0.15);
    border: 1px solid rgba(212,175,55,0.25);
    border-radius: 4px;
    padding: 1px 6px;
    font-size: 12.5px;
    color: #F0D060;
    font-family: monospace;
  }
  .llm-response pre {
    background: rgba(0,0,0,0.35);
    border: 1px solid rgba(212,175,55,0.2);
    border-radius: 8px;
    padding: 12px 14px;
    overflow-x: auto;
    margin: 10px 0;
  }
  .llm-response pre code {
    background: none;
    border: none;
    padding: 0;
    color: rgba(255,255,255,0.85);
    font-size: 13px;
  }
  .llm-response blockquote {
    border-left: 3px solid #D4AF37;
    margin: 10px 0;
    padding: 6px 12px;
    background: rgba(212,175,55,0.07);
    border-radius: 0 6px 6px 0;
    color: rgba(255,255,255,0.7);
    font-style: italic;
  }
  .llm-response hr {
    border: none;
    border-top: 1px solid rgba(212,175,55,0.2);
    margin: 12px 0;
  }
  .llm-response a { color: #D4AF37; text-decoration: underline; }
  .llm-response table { width: 100%; border-collapse: collapse; margin: 10px 0; font-size: 13px; }
  .llm-response th {
    background: rgba(212,175,55,0.15);
    color: #F0D060;
    font-weight: 700;
    padding: 8px 10px;
    border: 1px solid rgba(212,175,55,0.25);
    text-align: left;
  }
  .llm-response td {
    padding: 7px 10px;
    border: 1px solid rgba(255,255,255,0.08);
    color: rgba(255,255,255,0.8);
  }
  .llm-response tr:nth-child(even) td { background: rgba(255,255,255,0.03); }
`}</style>
      <div
        className="min-h-screen"
        style={{
          background: 'linear-gradient(135deg, #1a0f08 0%, #2e1a0e 35%, #3B2319 60%, #5a3420 100%)',
          padding: '24px',
        }}
      >
        <div className="max-w-5xl mx-auto h-[calc(100vh-80px)] flex flex-col gap-5">

          {/* Header with New Chat Button */}
          <div className="flex items-start justify-between">
            <div>
              <h1
                className="text-4xl font-serif mb-1"
                style={{
                  background: 'linear-gradient(135deg, #D4AF37 0%, #F0D060 50%, #C49F2F 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  letterSpacing: '-0.5px',
                }}
              >
                AI Legal Assistant
              </h1>
              <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '14px' }}>
                Ask any legal question in plain language
              </p>
            </div>

            <button
              onClick={handleNewChat}
              className="flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all hover:scale-105 active:scale-95"
              style={{
                background: 'linear-gradient(135deg, #D4AF37 0%, #F0D060 60%, #C8A030 100%)',
                color: '#2e1a0e',
                fontSize: '13px',
                boxShadow: '0 2px 12px rgba(212,175,55,0.4), 0 1px 3px rgba(0,0,0,0.3)',
                border: 'none',
              }}
            >
              <Plus className="w-4 h-4" />
              New Chat
            </button>
          </div>

          {/* Chat Container — glassmorphism panel */}
          <div
            className="flex-1 flex flex-col overflow-hidden rounded-2xl"
            style={{
              background: 'linear-gradient(160deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.04) 100%)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(212,175,55,0.25)',
              boxShadow: '0 8px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)',
            }}
          >

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {messages.length === 0 ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <Bot
                      className="w-16 h-16 mx-auto mb-4"
                      style={{ color: 'rgba(212,175,55,0.25)' }}
                    />
                    <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '16px' }}>
                      Start a conversation by asking a legal question
                    </p>
                  </div>
                </div>
              ) : (
                messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-4 ${message.type === 'user' ? 'flex-row-reverse' : ''}`}
                  >
                    {/* Avatar */}
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                      style={
                        message.type === 'user'
                          ? {
                            background: 'linear-gradient(135deg, #D4AF37, #F0D060)',
                            boxShadow: '0 2px 8px rgba(212,175,55,0.4)',
                          }
                          : {
                            background: 'linear-gradient(135deg, #2e1a0e, #4a2810)',
                            border: '1px solid rgba(212,175,55,0.4)',
                          }
                      }
                    >
                      {message.type === 'user' ? (
                        <User className="w-4 h-4" style={{ color: '#2e1a0e' }} />
                      ) : (
                        <Bot className="w-4 h-4" style={{ color: '#D4AF37' }} />
                      )}
                    </div>

                    {/* Message Content */}
                    <div className={`flex-1 max-w-2xl ${message.type === 'user' ? 'text-right' : ''}`}>
                      {message.status === 'pending' ? (
                        <div
                          className="inline-flex items-center gap-3 p-4 rounded-2xl"
                          style={{
                            background: 'linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03))',
                            border: '1px solid rgba(212,175,55,0.15)',
                            borderTopLeftRadius: '4px',
                          }}
                        >
                          <Loader
                            className="w-4 h-4 animate-spin"
                            style={{ color: 'rgba(212,175,55,0.7)' }}
                          />
                          <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px' }}>
                            Generating response...
                          </span>
                        </div>
                      ) : message.status === 'failed' ? (
                        <div
                          className="inline-flex items-center gap-2 p-4 rounded-2xl"
                          style={{
                            background: 'rgba(220,38,38,0.1)',
                            border: '1px solid rgba(220,38,38,0.3)',
                            color: 'rgba(252,165,165,0.9)',
                          }}
                        >
                          <AlertCircle className="w-4 h-4" />
                          <span style={{ fontSize: '14px' }}>
                            Failed to generate response. Please try again.
                          </span>
                        </div>
                      ) : (
                        <div
                          className="inline-block p-4 rounded-2xl llm-response"
                          style={{
                            background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                            border: '1px solid rgba(212,175,55,0.2)',
                            color: 'rgba(255,255,255,0.88)',
                            borderTopLeftRadius: '4px',
                            fontSize: '14px',
                            lineHeight: '1.6',
                            maxWidth: '100%',
                          }}
                        >
                          <ReactMarkdown>{message.content}</ReactMarkdown>
                        </div>
                      )}

                      {/* Sources */}
                      {message.status === 'completed' && message.sources && message.sources.length > 0 && (
                        <div className="mt-3">
                          <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)', marginBottom: '6px' }}>
                            Sources:
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {message.sources.map((source, idx) => (
                              <span
                                key={idx}
                                style={{
                                  fontSize: '11px',
                                  padding: '3px 8px',
                                  background: 'rgba(212,175,55,0.1)',
                                  border: '1px solid rgba(212,175,55,0.25)',
                                  borderRadius: '6px',
                                  color: 'rgba(212,175,55,0.8)',
                                }}
                              >
                                {source}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', marginTop: '6px' }}>
                        {new Date(message.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Questions */}
            {messages.length === 0 && (
              <div className="px-6 pb-4">
                <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginBottom: '10px' }}>
                  Try asking:
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {quickQuestions.map((question, idx) => (
                    <button
                      key={idx}
                      onClick={() => setInput(question)}
                      className="text-left transition-all hover:scale-[1.02] active:scale-95"
                      style={{
                        fontSize: '12px',
                        padding: '10px 14px',
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
                        border: '1px solid rgba(212,175,55,0.15)',
                        borderRadius: '10px',
                        color: 'rgba(255,255,255,0.6)',
                        lineHeight: '1.4',
                        cursor: 'pointer',
                      }}
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Divider */}
            <div
              style={{
                height: '1px',
                background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.3), transparent)',
                margin: '0 24px',
              }}
            />

            {/* Input Area */}
            <div className="p-4 pt-4">
              {/* Disclaimer */}
              <div
                className="flex items-start gap-2 mb-3 p-3 rounded-xl"
                style={{
                  background: 'rgba(212,175,55,0.07)',
                  border: '1px solid rgba(212,175,55,0.2)',
                }}
              >
                <AlertCircle
                  className="w-4 h-4 flex-shrink-0 mt-0.5"
                  style={{ color: 'rgba(212,175,55,0.7)' }}
                />
                <p style={{ fontSize: '11.5px', color: 'rgba(212,175,55,0.75)', lineHeight: '1.5' }}>
                  This AI provides general legal information only.
                  For specific legal advice, consult a qualified attorney.
                </p>
              </div>

              {/* Input Row */}
              <form onSubmit={handleSubmit} className="flex gap-3">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your legal question here..."
                  disabled={isLoading}
                  className="flex-1 rounded-xl outline-none transition-all"
                  style={{
                    padding: '12px 16px',
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(212,175,55,0.25)',
                    color: 'rgba(255,255,255,0.85)',
                    fontSize: '13.5px',
                    fontFamily: 'inherit',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.border = '1px solid rgba(212,175,55,0.6)';
                    e.currentTarget.style.background = 'rgba(255,255,255,0.09)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.border = '1px solid rgba(212,175,55,0.25)';
                    e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                  }}
                />

                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="flex items-center justify-center rounded-xl transition-all hover:scale-105 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
                  style={{
                    width: '46px',
                    height: '46px',
                    flexShrink: 0,
                    background: 'linear-gradient(135deg, #D4AF37 0%, #F0D060 60%, #C49F2F 100%)',
                    border: 'none',
                    boxShadow: '0 2px 12px rgba(212,175,55,0.4)',
                    cursor: isLoading || !input.trim() ? 'not-allowed' : 'pointer',
                  }}
                >
                  <Send className="w-4 h-4" style={{ color: '#2e1a0e' }} />
                </button>
              </form>
            </div>

          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
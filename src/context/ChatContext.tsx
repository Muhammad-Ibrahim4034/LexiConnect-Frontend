import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import axios from 'axios';

interface Message {
  id: number;
  type: 'user' | 'assistant';
  content: string | null;
  sources?: string[];
  timestamp: string;
  status: 'pending' | 'completed' | 'failed';
}

interface Conversation {
  id: number;
  title: string;
  created_at: string;
  updated_at: string;
  message_count: number;
  last_message?: string | null;
}

interface ChatContextType {
  messages: Message[];
  conversations: Conversation[];
  currentConversationId: number | null;
  isLoading: boolean;
  sendMessage: (text: string) => Promise<void>;
  loadConversation: (conversationId: number) => Promise<void>;
  createNewConversation: () => Promise<void>;
  loadConversations: () => Promise<void>;
  deleteConversation: (conversationId: number) => Promise<void>;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

const getAuthToken = () => localStorage.getItem('authToken');
const getAuthHeaders = () => {
  const token = getAuthToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversationId, setCurrentConversationId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';

  const loadConversations = useCallback(async () => {
    try {
      const response = await axios.get(`${API_BASE}/conversations`, {
        headers: getAuthHeaders()
      });
      setConversations(response.data);
    } catch (error) {
      console.error('Error loading conversations:', error);
    }
  }, []);

  const connectToMessageStream = useCallback((messageId: number) => {
    const token = getAuthToken();
    const eventSource = new EventSource(
      `${API_BASE}/chat/stream/${messageId}?token=${encodeURIComponent(token || '')}`
    );

    eventSource.onmessage = (event) => {
      const update = JSON.parse(event.data);
      
      setMessages(prev => 
        prev.map(msg => 
          msg.id === messageId
            ? {
                ...msg,
                content: update.content,
                sources: update.sources || [],
                status: update.status,
                timestamp: update.timestamp
              }
            : msg
        )
      );

      if (update.status !== 'pending') {
        eventSource.close();
        setIsLoading(false);
        loadConversations();
      }
    };

    eventSource.onerror = () => {
      eventSource.close();
      setIsLoading(false);
      
      setMessages(prev =>
        prev.map(msg =>
          msg.id === messageId
            ? { ...msg, status: 'failed', content: 'Connection error' }
            : msg
        )
      );
    };

    return eventSource;
  }, [loadConversations, API_BASE]);

  const loadConversation = useCallback(async (conversationId: number) => {
    try {
      const response = await axios.get(`${API_BASE}/conversations/${conversationId}`, {
        headers: getAuthHeaders()
      });
      const conversation = response.data;
      
      setMessages(conversation.messages || []);
      setCurrentConversationId(conversationId);
      
      localStorage.setItem('currentConversationId', conversationId.toString());
      
      const currentUser = localStorage.getItem('user');
      if (currentUser) {
        const user = JSON.parse(currentUser);
        localStorage.setItem('currentUserId', user.id.toString());
      }
      
      const pendingMessages = (conversation.messages || []).filter(
        (msg: Message) => msg.status === 'pending' && msg.type === 'assistant'
      );
      
      if (pendingMessages.length > 0) {
        setIsLoading(true);
        const mostRecentPending = pendingMessages[pendingMessages.length - 1];
        connectToMessageStream(mostRecentPending.id);
      }
    } catch (error) {
      console.error('Error loading conversation:', error);
      setMessages([]);
    }
  }, [connectToMessageStream, API_BASE]);

  const createNewConversation = useCallback(async () => {
    setMessages([]);
    setCurrentConversationId(null);
    localStorage.removeItem('currentConversationId');
    await loadConversations();
  }, [loadConversations]);

  const deleteConversation = useCallback(async (conversationId: number) => {
    try {
      await axios.delete(`${API_BASE}/conversations/${conversationId}`, {
        headers: getAuthHeaders()
      });
      
      if (conversationId === currentConversationId) {
        setMessages([]);
        setCurrentConversationId(null);
        localStorage.removeItem('currentConversationId');
      }
      
      await loadConversations();
    } catch (error) {
      console.error('Error deleting conversation:', error);
    }
  }, [currentConversationId, loadConversations, API_BASE]);

  const sendMessage = useCallback(async (text: string) => {
    setIsLoading(true);

    const userMessage: Message = {
      id: Date.now(),
      type: 'user',
      content: text,
      timestamp: new Date().toISOString(),
      status: 'completed'
    };

    setMessages(prev => [...prev, userMessage]);

    try {
      const response = await axios.post(
        `${API_BASE}/chat`,
        {
          message: text,
          conversation_id: currentConversationId
        },
        {
          headers: getAuthHeaders()
        }
      );

      const { message_id, conversation_id, status } = response.data;

      if (!currentConversationId && conversation_id) {
        setCurrentConversationId(conversation_id);
        localStorage.setItem('currentConversationId', conversation_id.toString());
        loadConversations();
      }

      const pendingMessage: Message = {
        id: message_id,
        type: 'assistant',
        content: null,
        timestamp: new Date().toISOString(),
        status: status
      };

      setMessages(prev => [...prev, pendingMessage]);
      connectToMessageStream(message_id);

    } catch (error) {
      console.error('Error sending message:', error);
      setIsLoading(false);
      
      const errorMessage: Message = {
        id: Date.now() + 1,
        type: 'assistant',
        content: 'Failed to send message. Please try again.',
        timestamp: new Date().toISOString(),
        status: 'failed'
      };
      
      setMessages(prev => [...prev, errorMessage]);
    }
  }, [currentConversationId, loadConversations, connectToMessageStream, API_BASE]);

  // Load conversations when authenticated
  useEffect(() => {
    if (getAuthToken()) {
      loadConversations();
    }
  }, [loadConversations]);

  // Initialize chat on mount - SIMPLE VERSION
  useEffect(() => {
    if (isInitialized) return;

    const token = getAuthToken();
    if (!token) {
      setIsInitialized(true);
      return;
    }

    // ⭐ CHECK FOR LOGIN FLAG - Simple and direct
    const justLoggedIn = sessionStorage.getItem('justLoggedIn');
    
    if (justLoggedIn === 'true') {
      // Fresh login - clear everything
      console.log('🆕 Fresh login detected - clearing chat');
      sessionStorage.removeItem('justLoggedIn');
      setMessages([]);
      setCurrentConversationId(null);
      setIsInitialized(true);
      return;
    }

    // Not a fresh login - try to restore conversation
    const savedConversationId = localStorage.getItem('currentConversationId');
    const savedUserId = localStorage.getItem('currentUserId');
    const currentUser = localStorage.getItem('user');
    
    if (!currentUser) {
      setIsInitialized(true);
      return;
    }
    
    const user = JSON.parse(currentUser);
    
    // Check if user changed
    if (savedUserId && savedUserId !== user.id.toString()) {
      console.log('👤 User changed - clearing chat');
      localStorage.removeItem('currentConversationId');
      localStorage.removeItem('currentUserId');
      setMessages([]);
      setCurrentConversationId(null);
      setIsInitialized(true);
      return;
    }
    
    // Update user ID
    localStorage.setItem('currentUserId', user.id.toString());
    
    // Restore saved conversation
    if (savedConversationId) {
      const conversationId = parseInt(savedConversationId, 10);
      if (!isNaN(conversationId)) {
        console.log('🔄 Restoring conversation:', conversationId);
        loadConversation(conversationId);
        setIsInitialized(true);
        return;
      }
    }
    
    // No saved conversation - empty chat
    console.log('✨ No saved conversation');
    setMessages([]);
    setCurrentConversationId(null);
    setIsInitialized(true);
  }, [isInitialized, loadConversation]);

  return (
    <ChatContext.Provider
      value={{
        messages,
        conversations,
        currentConversationId,
        isLoading,
        sendMessage,
        loadConversation,
        createNewConversation,
        loadConversations,
        deleteConversation
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within ChatProvider');
  }
  return context;
}

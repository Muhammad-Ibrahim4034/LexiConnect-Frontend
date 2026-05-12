import { createContext, useContext, useState, ReactNode } from 'react';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, phone: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // --------------------------
  // LOGIN
  // --------------------------
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const res = await fetch(`${API_BASE}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.user && data.token) {
        // ⭐ CLEAR EVERYTHING - Simple and direct approach
        localStorage.removeItem("currentConversationId");
        localStorage.removeItem("currentUserId");
        sessionStorage.clear(); // Clear all session storage
        
        // Set new user
        setUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("authToken", data.token);
        
        // ⭐ Set login flag for ChatContext
        sessionStorage.setItem("justLoggedIn", "true");
        
        console.log("✅ Login successful - chat will be cleared");
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.error("Login error:", err);
      return false;
    }
  };

  // --------------------------
  // SIGNUP
  // --------------------------
  const signup = async (name: string, email: string, phone: string, password: string): Promise<boolean> => {
    try {
      const res = await fetch(`${API_BASE}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, password }),
      });

      const data = await res.json();

      if (res.ok) {
        // After successful signup, automatically log in
        return await login(email, password);
      } else {
        console.error("Signup failed:", data.detail || "Unknown error");
        return false;
      }
    } catch (err) {
      console.error("Signup error:", err);
      return false;
    }
  };

  // --------------------------
  // LOGOUT
  // --------------------------
  const logout = () => {
    setUser(null);
    
    // ⭐ CLEAR EVERYTHING
    localStorage.clear();
    sessionStorage.clear();
    
    console.log("✅ Logout successful - all data cleared");
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      login,
      signup,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}

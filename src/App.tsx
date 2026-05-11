import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { SignUpPage } from './pages/SignUpPage';
import { DashboardPage } from './pages/DashboardPage';
import { ChatPage } from './pages/ChatPage';
import { LegalInfoPage } from './pages/LegalInfoPage';
import { LawyerDirectoryPage } from './pages/LawyerDirectoryPage';
import { ChatHistoryPage } from './pages/ChatHistoryPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ChatProvider } from "./context/ChatContext";

import AboutUsPage from "./pages/Aboutus";

import './styles/globals.css'; // This path is relative to the file doing the import.

// Protected Route Component
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
}

// Admin Route Component
function AdminRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isAdmin } = useAuth();
  return isAuthenticated && isAdmin ? <>{children}</> : <Navigate to="/dashboard" />;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/about" element={<AboutUsPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
      <Route path="/chat" element={<ProtectedRoute><ChatPage /></ProtectedRoute>} />
      <Route path="/legal-info" element={<ProtectedRoute><LegalInfoPage /></ProtectedRoute>} />
      <Route path="/lawyers" element={<ProtectedRoute><LawyerDirectoryPage /></ProtectedRoute>} />
      <Route path="/history" element={<ProtectedRoute><ChatHistoryPage /></ProtectedRoute>} />
      <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ChatProvider>
      <Router>
        <AppRoutes />
      </Router>
      </ChatProvider>
    </AuthProvider>
  );
}

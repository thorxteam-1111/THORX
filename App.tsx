
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';
import WorkPage from './pages/WorkPage';
import ReferralPage from './pages/ReferralPage';
import PayoutPage from './pages/PayoutPage';
import HelpPage from './pages/HelpPage';
import LoadingScreen from './components/LoadingScreen';
import AIChatbot from './components/AIChatbot';
import { User, UserRole } from './types';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleLogin = (user: User) => {
    // Ensure user has an avatar seed (defaulting to name if not present)
    setCurrentUser({
        ...user,
        avatarSeed: user.avatarSeed || user.name
    });
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  const handleUpdateUser = (updatedData: Partial<User>) => {
    if (currentUser) {
      setCurrentUser({ ...currentUser, ...updatedData });
    }
  };

  if (isLoading) {
    return <LoadingScreen progress={100} />;
  }

  return (
    <HashRouter>
      <div className="min-h-screen bg-[#E5E4D7] text-black">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route 
            path="/auth" 
            element={
              currentUser ? <Navigate to="/dashboard" /> : <AuthPage onLogin={handleLogin} />
            } 
          />
          <Route 
            path="/dashboard" 
            element={
              currentUser ? <Dashboard user={currentUser} onLogout={handleLogout} onUpdateUser={handleUpdateUser} /> : <Navigate to="/auth" />
            } 
          />
          <Route 
            path="/work" 
            element={
              currentUser ? <WorkPage user={currentUser} onLogout={handleLogout} /> : <Navigate to="/auth" />
            } 
          />
          <Route 
            path="/referrals" 
            element={
              currentUser ? <ReferralPage user={currentUser} onLogout={handleLogout} /> : <Navigate to="/auth" />
            } 
          />
          <Route 
            path="/payout" 
            element={
              currentUser ? <PayoutPage user={currentUser} onLogout={handleLogout} /> : <Navigate to="/auth" />
            } 
          />
          <Route 
            path="/help" 
            element={
              currentUser ? <HelpPage user={currentUser} onLogout={handleLogout} /> : <Navigate to="/auth" />
            } 
          />
        </Routes>
        {currentUser && <AIChatbot user={currentUser} />}
      </div>
    </HashRouter>
  );
};

export default App;

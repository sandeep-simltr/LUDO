import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import ActiveLobbies from './components/ActiveLobbies';
import Leaderboard from './components/Leaderboard';
import Footer from './components/Footer';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';

function App() {
  const [user, setUser] = useState(null);
  const [view, setView] = useState('landing'); // 'landing' | 'auth' | 'dashboard'

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setView('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setView('landing');
  };

  const handleUpdateUser = (updatedUser) => {
    setUser(updatedUser);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-indigo-500 selection:text-white">
      {/* Navbar */}
      <Navbar 
        user={user} 
        onLogout={handleLogout} 
        onNavigateToAuth={() => setView('auth')} 
      />

      {/* Main Content View Switcher */}
      <main>
        {view === 'landing' && (
          <>
            {/* Hero Section */}
            <Hero />

            {/* Features / Pillars */}
            <Features />

            {/* Active Lobby List */}
            <ActiveLobbies />

            {/* Global Leaderboard */}
            <Leaderboard />

            {/* Footer */}
            <Footer />
          </>
        )}

        {view === 'auth' && (
          <Auth 
            onLoginSuccess={handleLoginSuccess} 
            onBackToLobby={() => setView('landing')} 
          />
        )}

        {view === 'dashboard' && user && (
          <Dashboard 
            user={user} 
            onUpdateUser={handleUpdateUser} 
          />
        )}
      </main>
    </div>
  );
}

export default App;

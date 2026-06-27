import { useState, useEffect } from 'react';
import { Shield, Zap } from 'lucide-react';

export default function Navbar({ user, onLogout, onNavigateToAuth }) {
  const [serverStatus, setServerStatus] = useState('connecting');

  useEffect(() => {
    fetch('http://localhost:5000/api/health')
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 'success') setServerStatus('online');
        else setServerStatus('error');
      })
      .catch(() => setServerStatus('offline'));
  }, []);

  return (
    <>
      <header className="border-b border-slate-900 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <span className="font-extrabold text-xl tracking-tighter text-white">A</span>
            </div>
            <div>
              <span className="text-lg font-bold bg-gradient-to-r from-white via-slate-100 to-indigo-300 bg-clip-text text-transparent">
                Ludo Arena
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
            <a href="#hero" className="hover:text-indigo-400 transition-colors">Home</a>
            <a href="#features" className="hover:text-indigo-400 transition-colors">Features</a>
            <a href="#lobbies" className="hover:text-indigo-400 transition-colors">Active Lobbies</a>
            <a href="#leaderboard" className="hover:text-indigo-400 transition-colors">Leaderboard</a>
          </nav>

          <div className="flex items-center gap-3">
            
            {user ? (
              <div className="flex items-center gap-3">
                <span className="hidden sm:inline text-xs font-bold text-slate-300">{user.name}</span>
                <button 
                  onClick={onLogout}
                  className="bg-slate-900 hover:bg-slate-800 border border-slate-850 text-slate-350 font-semibold text-xs px-3 py-1.5 rounded-lg transition-all"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button 
                onClick={onNavigateToAuth}
                className="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold text-xs px-3.5 py-1.5 rounded-lg shadow-lg shadow-indigo-500/25 transition-all"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </header>

    </>
  );
}

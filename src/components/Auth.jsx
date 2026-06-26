import { useState } from 'react';
import { Mail, Lock, User, ArrowRight, ShieldCheck } from 'lucide-react';

export default function Auth({ onLoginSuccess, onBackToLobby }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate successful authentication
    const mockUser = {
      name: isLogin ? (name || 'Arena Challenger') : name,
      email: email || 'challenger@ludoarena.com',
      balance: 1000,
      referralCode: 'LA-PLAY-99',
      wins: 12,
      losses: 4,
    };
    onLoginSuccess(mockUser);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-indigo-600/10 blur-[100px] rounded-full pointer-events-none -z-10" />

      <div className="w-full max-w-md bg-slate-900/60 border border-slate-800/80 rounded-3xl p-8 backdrop-blur-md shadow-2xl">
        <div className="text-center mb-8">
          <div className="inline-flex w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-600 items-center justify-center text-white shadow-lg shadow-indigo-500/20 mb-4">
            <ShieldCheck size={26} />
          </div>
          <h2 className="text-2xl font-black text-white">
            {isLogin ? 'Sign In to Ludo Arena' : 'Create Arena Account'}
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            {isLogin ? 'Enter your details to access the lobby' : 'Join thousands of competitive players'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Display Name</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500">
                  <User size={16} />
                </span>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. LudoMaster99"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500/50 text-white rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none transition-all"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Email Address</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500">
                <Mail size={16} />
              </span>
              <input 
                type="email" 
                required
                placeholder="you@ludoarena.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500/50 text-white rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Password</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500">
                <Lock size={16} />
              </span>
              <input 
                type="password" 
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500/50 text-white rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none transition-all"
              />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold py-3.5 rounded-xl mt-6 shadow-lg shadow-indigo-500/25 transition-all active:scale-98"
          >
            <span>{isLogin ? 'Enter Arena' : 'Register Account'}</span>
            <ArrowRight size={16} />
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-slate-800/80 text-center">
          <p className="text-xs text-slate-400">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button 
              onClick={() => setIsLogin(!isLogin)} 
              className="text-indigo-400 font-bold hover:text-indigo-300 transition-colors"
            >
              {isLogin ? 'Sign Up Now' : 'Sign In'}
            </button>
          </p>
          <button 
            onClick={onBackToLobby}
            className="text-[11px] text-slate-550 mt-4 block mx-auto hover:text-slate-400 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

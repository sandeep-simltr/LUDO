import { Shield, Sparkles, MessageSquare, ShieldCheck, Cpu, Globe } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative border-t border-slate-900 bg-slate-950/80 backdrop-blur-md pt-12 pb-10 md:pt-20 md:pb-10 text-slate-500 overflow-hidden">
      {/* Background glow spot */}
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[400px] h-[150px] bg-indigo-500/5 blur-[80px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10 mb-12 md:mb-16">
        {/* Brand Column */}
        <div className="col-span-2 md:col-span-1 space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <span className="font-extrabold text-lg text-white">A</span>
            </div>
            <span className="text-base font-extrabold text-slate-100 tracking-tight">Ludo Arena</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            The world's premium real-time multiplayer board arena. Built on next-gen security and fair-play matchmaking algorithms.
          </p>
          {/* Social Icons */}
          <div className="flex items-center gap-3 pt-2">
            <a href="#" className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-850 flex items-center justify-center text-slate-400 hover:text-indigo-400 hover:border-indigo-500/30 transition-all">
              <MessageSquare size={14} />
            </a>
            <a href="#" className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-850 flex items-center justify-center text-slate-400 hover:text-indigo-400 hover:border-indigo-500/30 transition-all">
              <Globe size={14} />
            </a>
            <a href="#" className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-850 flex items-center justify-center text-slate-400 hover:text-indigo-400 hover:border-indigo-500/30 transition-all">
              <Shield size={14} />
            </a>
          </div>
        </div>

        {/* Links Column 1 */}
        <div className="col-span-1">
          <h4 className="text-xs font-bold text-slate-355 uppercase tracking-widest mb-4">Lobby Nav</h4>
          <ul className="space-y-2.5 text-xs">
            <li><a href="#hero" className="hover:text-indigo-400 transition-colors">Play Arena</a></li>
            <li><a href="#features" className="hover:text-indigo-400 transition-colors">Features Grid</a></li>
            <li><a href="#lobbies" className="hover:text-indigo-400 transition-colors">Active Matches</a></li>
            <li><a href="#leaderboard" className="hover:text-indigo-400 transition-colors">Leaderboard</a></li>
          </ul>
        </div>

        {/* Links Column 2 */}
        <div className="col-span-1">
          <h4 className="text-xs font-bold text-slate-355 uppercase tracking-widest mb-4">Security</h4>
          <ul className="space-y-2.5 text-xs">
            <li><a href="#" className="hover:text-indigo-400 transition-colors">Fair Play Policy</a></li>
            <li><a href="#" className="hover:text-indigo-400 transition-colors">RNG Certifications</a></li>
            <li><a href="#" className="hover:text-indigo-400 transition-colors">Anti-Cheat Rules</a></li>
            <li><a href="#" className="hover:text-indigo-400 transition-colors">Terms of Battle</a></li>
          </ul>
        </div>

        {/* Badges Column */}
        <div className="col-span-2 md:col-span-1 space-y-4">
          <h4 className="text-xs font-bold text-slate-355 uppercase tracking-widest mb-4">Certifications</h4>
          <div className="flex flex-col sm:flex-row md:flex-col gap-3">
            <div className="flex-1 flex items-center gap-2.5 bg-slate-900/60 border border-slate-855 p-2.5 rounded-xl">
              <ShieldCheck size={16} className="text-emerald-400" />
              <div className="text-[10px]">
                <p className="font-bold text-slate-200">100% Secure Audited</p>
                <p className="text-slate-505">JWT & Auth Certified</p>
              </div>
            </div>
            <div className="flex-1 flex items-center gap-2.5 bg-slate-900/60 border border-slate-855 p-2.5 rounded-xl">
              <Cpu size={16} className="text-indigo-400" />
              <div className="text-[10px]">
                <p className="font-bold text-slate-200">MERN Stack Tech</p>
                <p className="text-slate-505">React v19 + Tailwind v4</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-center">
        <p className="text-[10px] text-slate-650">
          © {new Date().getFullYear()} Ludo Arena. All rights reserved. Designed and developed by <span className="text-indigo-400 font-semibold">Sandeep Prasad</span>.
        </p>
        <div className="flex items-center gap-1.5 text-[9px] text-slate-500">
          <Sparkles size={10} className="text-indigo-400" />
          <span>Provably Fair Matchmaking Enabled</span>
        </div>
      </div>
    </footer>
  );
}

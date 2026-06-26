import { useState } from 'react';
import { Play, Users, Sparkles } from 'lucide-react';

export default function Hero() {
  const [diceNumber, setDiceNumber] = useState(6);
  const [rolling, setRolling] = useState(false);

  const rollDice = () => {
    if (rolling) return;
    setRolling(true);
    let counter = 0;
    const interval = setInterval(() => {
      setDiceNumber(Math.floor(Math.random() * 6) + 1);
      counter++;
      if (counter > 8) {
        clearInterval(interval);
        setRolling(false);
      }
    }, 80);
  };

  return (
    <section id="hero" className="relative max-w-6xl mx-auto px-4 pt-20 pb-16 text-center flex flex-col items-center">
      {/* Glow backgrounds */}
      <div className="absolute top-10 left-1/4 w-[300px] h-[300px] bg-indigo-500/10 blur-3xl rounded-full -z-10 animate-pulse" />
      <div className="absolute top-20 right-1/4 w-[350px] h-[350px] bg-violet-500/10 blur-3xl rounded-full -z-10 animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-emerald-400 text-xs font-semibold mb-8 hover:border-indigo-500/30 transition-all duration-300">
        <Sparkles size={14} className="text-amber-400" />
        <span>100% Secure • Instant UPI Withdrawals • Real Cash Games</span>
      </div>

      <h1 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tight mb-6 leading-none">
        Play Ludo Arena,<br />
        <span className="bg-gradient-to-r from-emerald-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent">
          Double Your Cash!
        </span>
      </h1>

      <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
        India's ultimate 1v1 Ludo cash battleground. Challenge players with custom coin stakes, capture tokens, win matches, and cash out double earnings instantly.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 w-full max-w-md">
        <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-bold px-8 py-4 rounded-2xl shadow-xl shadow-emerald-500/20 transition-all duration-300 hover:-translate-y-1">
          <Play size={20} fill="currentColor" />
          <span>Play Cash Games</span>
        </button>
        <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-200 font-bold px-8 py-4 rounded-2xl transition-all duration-300 hover:-translate-y-1">
          <Users size={20} className="text-indigo-400" />
          <span>Host Custom Match</span>
        </button>
      </div>

      {/* Interactive visualizers */}
      <div className="flex flex-col lg:flex-row items-center justify-center gap-8 w-full max-w-4xl">
        {/* Ludo Board Image Showcase */}
        <div className="flex-1 max-w-sm rounded-3xl overflow-hidden border border-slate-800/80 shadow-2xl relative group bg-slate-900/30">
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent z-10" />
          <img 
            src="/ludo_board.png" 
            alt="Ludo Arena Futuristic Board" 
            className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700" 
          />
          <div className="absolute bottom-4 left-4 z-20 text-left">
            <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">Featured Board</span>
            <h4 className="text-white font-bold text-sm">Neon Grid Arena</h4>
          </div>
        </div>

        {/* Interactive Ludo Dice Visualizer */}
        <div className="flex-1 relative group p-8 bg-slate-900/40 border border-slate-800 rounded-3xl backdrop-blur-md max-w-sm w-full shadow-2xl flex flex-col items-center">
          <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 via-violet-500/5 to-sky-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          
          <p className="text-xs uppercase tracking-wider text-slate-500 font-bold mb-4">Roll the Arena Dice</p>
          
          <div 
            onClick={rollDice}
            className={`w-28 h-28 rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 p-0.5 shadow-xl shadow-indigo-500/10 cursor-pointer transition-transform duration-100 ${
              rolling ? 'animate-bounce scale-95' : 'hover:scale-105 active:scale-95'
            }`}
          >
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center relative p-3">
              {/* Render Dice Dots dynamically */}
              <div className="grid grid-cols-3 gap-2.5 w-16 h-16 items-center justify-items-center">
                {/* Dot mapping helper */}
                {diceNumber === 1 && (
                  <>
                    <div /><div /><div />
                    <div /><div className="w-3.5 h-3.5 rounded-full bg-white" /><div />
                    <div /><div /><div />
                  </>
                )}
                {diceNumber === 2 && (
                  <>
                    <div className="w-3 h-3 rounded-full bg-white" /><div /><div />
                    <div /><div /><div />
                    <div /><div /><div className="w-3 h-3 rounded-full bg-white" />
                  </>
                )}
                {diceNumber === 3 && (
                  <>
                    <div className="w-3 h-3 rounded-full bg-white" /><div /><div />
                    <div /><div className="w-3.5 h-3.5 rounded-full bg-white" /><div />
                    <div /><div /><div className="w-3 h-3 rounded-full bg-white" />
                  </>
                )}
                {diceNumber === 4 && (
                  <>
                    <div className="w-3 h-3 rounded-full bg-white" /><div /><div className="w-3 h-3 rounded-full bg-white" />
                    <div /><div /><div />
                    <div className="w-3 h-3 rounded-full bg-white" /><div /><div className="w-3 h-3 rounded-full bg-white" />
                  </>
                )}
                {diceNumber === 5 && (
                  <>
                    <div className="w-3 h-3 rounded-full bg-white" /><div /><div className="w-3 h-3 rounded-full bg-white" />
                    <div /><div className="w-3.5 h-3.5 rounded-full bg-white" /><div />
                    <div className="w-3 h-3 rounded-full bg-white" /><div /><div className="w-3 h-3 rounded-full bg-white" />
                  </>
                )}
                {diceNumber === 6 && (
                  <>
                    <div className="w-3 h-3 rounded-full bg-white" /><div /><div className="w-3 h-3 rounded-full bg-white" />
                    <div className="w-3 h-3 rounded-full bg-white" /><div /><div className="w-3 h-3 rounded-full bg-white" />
                    <div className="w-3 h-3 rounded-full bg-white" /><div /><div className="w-3 h-3 rounded-full bg-white" />
                  </>
                )}
              </div>
            </div>
          </div>

          <button 
            onClick={rollDice}
            className="mt-6 text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            {rolling ? 'Rolling...' : 'Click to Roll'}
          </button>
        </div>
      </div>
    </section>
  );
}

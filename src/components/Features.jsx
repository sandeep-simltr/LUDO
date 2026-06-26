import { Shield, Zap, Users, Trophy } from 'lucide-react';

export default function Features() {
  const list = [
    {
      title: 'Red Arena: High Stakes',
      desc: 'Join rooms with high-coin entries and compete for maximum reward. Safe JWT auth guarantees secure profile balance.',
      color: 'from-slate-900 to-slate-950/40',
      borderColor: 'hover:border-rose-500/30 hover:shadow-rose-500/5',
      iconColor: 'text-rose-400',
      iconBg: 'bg-rose-500/10',
      icon: Shield,
    },
    {
      title: 'Green Arena: Team Matches',
      desc: 'Play classic 2v2 matches with your friends. Synchronized realtime game state updates powered by WebSockets.',
      color: 'from-slate-900 to-slate-950/40',
      borderColor: 'hover:border-emerald-500/30 hover:shadow-emerald-500/5',
      iconColor: 'text-emerald-400',
      iconBg: 'bg-emerald-500/10',
      icon: Users,
    },
    {
      title: 'Yellow Arena: Lightning Dice',
      desc: 'Fast-paced custom modes with unique rules, timers, and auto-skip. Pure React speed with HMR instant sync.',
      color: 'from-slate-900 to-slate-950/40',
      borderColor: 'hover:border-amber-500/30 hover:shadow-amber-500/5',
      iconColor: 'text-amber-400',
      iconBg: 'bg-amber-500/10',
      icon: Zap,
    },
    {
      title: 'Blue Arena: Champion Ladder',
      desc: 'Track your wins on MongoDB. Reach the top of the leaderboards and unlock exclusive avatars, cards, and titles.',
      color: 'from-slate-900 to-slate-950/40',
      borderColor: 'hover:border-indigo-500/30 hover:shadow-indigo-500/5',
      iconColor: 'text-indigo-400',
      iconBg: 'bg-indigo-500/10',
      icon: Trophy,
    },
  ];

  return (
    <section id="features" className="max-w-6xl mx-auto px-4 py-20 relative">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-black mb-4">
          The Four Corners of the Arena
        </h2>
        <p className="text-slate-400 max-w-lg mx-auto">
          Explore customized gameplay features designed for classic board game enthusiasts and modern competitive players alike.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {list.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div 
              key={idx}
              className={`group relative bg-gradient-to-b ${item.color} border border-slate-900 p-8 rounded-3xl backdrop-blur-sm transition-all duration-300 ${item.borderColor} hover:-translate-y-1`}
            >
              <div className={`w-12 h-12 rounded-2xl ${item.iconBg} flex items-center justify-center ${item.iconColor} mb-6 group-hover:scale-115 transition-transform duration-300`}>
                <Icon size={24} />
              </div>
              <h3 className="text-lg font-bold mb-3 text-white group-hover:text-white transition-colors">
                {item.title}
              </h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                {item.desc}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

import { Trophy, Medal, Crown } from 'lucide-react';

export default function Leaderboard() {
  const users = [
    { rank: 1, name: 'Vikram King', wins: 342, rate: '74%', color: 'from-amber-400 to-yellow-500' },
    { rank: 2, name: 'Ananya Sharma', wins: 289, rate: '68%', color: 'from-slate-300 to-slate-400' },
    { rank: 3, name: 'Raj Kumar', wins: 245, rate: '61%', color: 'from-amber-700 to-amber-800' },
    { rank: 4, name: 'Karan Mehra', wins: 210, rate: '58%', color: 'from-rose-500 to-rose-600' },
    { rank: 5, name: 'Divya Sen', wins: 198, rate: '55%', color: 'from-indigo-500 to-indigo-600' }
  ];

  return (
    <section id="leaderboard" className="max-w-4xl mx-auto px-4 py-20">
      <div className="text-center mb-12">
        <div className="inline-flex p-3 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-full mb-4">
          <Trophy size={30} />
        </div>
        <h2 className="text-3xl md:text-5xl font-black mb-2 text-white">Arena Champions</h2>
        <p className="text-slate-400">The most skilled tactical roll controllers in the Ludo Arena.</p>
      </div>

      <div className="bg-slate-900/40 border border-slate-800/80 rounded-3xl overflow-hidden backdrop-blur-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-[10px] sm:text-xs font-semibold text-slate-500 uppercase tracking-wider bg-slate-900/20">
                <th className="py-3 px-3 sm:py-4 sm:px-6">Rank</th>
                <th className="py-3 px-3 sm:py-4 sm:px-6">Player</th>
                <th className="py-3 px-3 sm:py-4 sm:px-6 text-center">Wins</th>
                <th className="py-3 px-3 sm:py-4 sm:px-6 text-right">Win Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-850">
              {users.map((user) => (
                <tr key={user.rank} className="hover:bg-slate-900/30 transition-colors">
                  <td className="py-3 px-3 sm:py-5 sm:px-6 font-bold text-xs sm:text-sm">
                    {user.rank === 1 ? (
                      <Crown size={16} className="text-yellow-500 animate-bounce" />
                    ) : user.rank === 2 ? (
                      <Medal size={16} className="text-slate-300" />
                    ) : user.rank === 3 ? (
                      <Medal size={16} className="text-amber-700" />
                    ) : (
                      <span className="text-slate-500 font-mono">#{user.rank}</span>
                    )}
                  </td>
                  <td className="py-3 px-3 sm:py-5 sm:px-6">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-tr ${user.color} flex items-center justify-center font-bold text-[10px] sm:text-xs text-white`}>
                        {user.name.charAt(0)}
                      </div>
                      <span className="font-bold text-xs sm:text-sm text-slate-200">{user.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-3 sm:py-5 sm:px-6 text-center font-black text-xs sm:text-sm text-slate-100">{user.wins}</td>
                  <td className="py-3 px-3 sm:py-5 sm:px-6 text-right text-[10px] sm:text-xs font-mono text-emerald-400 font-bold">{user.rate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

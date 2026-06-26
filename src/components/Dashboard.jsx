import { useState } from 'react';
import { 
  Gamepad2, Wallet, Share2, HelpCircle, User, 
  Coins, ArrowRight, Copy, Check, MessageSquare, Send,
  UserCheck, Shield, ChevronRight, Trophy, Star, ArrowUpRight, ArrowDownRight,
  Info, Sparkles, CheckCircle2, ShieldAlert
} from 'lucide-react';

export default function Dashboard({ user, onUpdateUser }) {
  const [activeTab, setActiveTab] = useState('play');
  const [copied, setCopied] = useState(false);
  const [betCoins, setBetCoins] = useState(100);
  const [matching, setMatching] = useState(false);
  const [matchFound, setMatchFound] = useState(null);
  
  // Wallet states
  const [addAmount, setAddAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [transactions, setTransactions] = useState([
    { type: 'referral', desc: 'Referral Bonus Reward', amount: 200, date: 'Just Now', isPlus: true },
    { type: 'withdrawal', desc: 'Bank Transfer (Cashout)', amount: -500, date: '1 Day Ago', isPlus: false },
    { type: 'match_win', desc: 'Victory payout vs Player_88', amount: 1000, date: '2 Days Ago', isPlus: true }
  ]);

  // Support states
  const [supportMessage, setSupportMessage] = useState('');
  const [supportSent, setSupportSent] = useState(false);

  // Profile states
  const [profileName, setProfileName] = useState(user.name);

  // Stats
  const winRate = Math.round((user.wins / (user.wins + user.losses)) * 100) || 0;

  const handleCopyReferral = () => {
    navigator.clipboard.writeText(user.referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAddMoney = (e) => {
    e.preventDefault();
    const val = parseInt(addAmount);
    if (val > 0) {
      const updatedUser = { ...user, balance: user.balance + val };
      onUpdateUser(updatedUser);
      setTransactions([{ type: 'deposit', desc: 'Coins Wallet Loaded', amount: val, date: 'Just Now', isPlus: true }, ...transactions]);
      setAddAmount('');
    }
  };

  const handleWithdraw = (e) => {
    e.preventDefault();
    const val = parseInt(withdrawAmount);
    if (val > 0 && val <= user.balance) {
      const updatedUser = { ...user, balance: user.balance - val };
      onUpdateUser(updatedUser);
      setTransactions([{ type: 'withdrawal', desc: 'Bank Transfer (Cashout)', amount: -val, date: 'Just Now', isPlus: false }, ...transactions]);
      setWithdrawAmount('');
    }
  };

  const handleUpdateName = (e) => {
    e.preventDefault();
    if (profileName.trim()) {
      onUpdateUser({ ...user, name: profileName });
      alert("Profile username updated successfully!");
    }
  };

  const startMatchmaking = () => {
    if (user.balance < betCoins) {
      alert("Insufficient coin balance to join this stake lobby.");
      return;
    }
    setMatching(true);
    setMatchFound(null);

    // Simulated matchmaking sequence
    setTimeout(() => {
      setMatchFound({
        name: `Arena_Lord_${Math.floor(Math.random() * 900 + 100)}`,
        rating: '4.9 ★',
        wins: Math.floor(Math.random() * 150) + 70,
        winRate: '72%'
      });
      onUpdateUser({ ...user, balance: user.balance - betCoins });
    }, 4000);
  };

  const cancelMatchmaking = () => {
    setMatching(false);
    setMatchFound(null);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 pb-28 md:pb-12 flex flex-col md:flex-row gap-8">
      
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-72 flex flex-col gap-3 bg-slate-900/30 border border-slate-900 rounded-3xl p-6 h-fit backdrop-blur-xl relative">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/5 to-transparent rounded-3xl pointer-events-none" />
        
        {/* User Card */}
        <div className="relative flex items-center gap-4 mb-6 pb-6 border-b border-slate-800/80">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center font-extrabold text-white text-lg shadow-xl shadow-indigo-500/10">
            {user.name.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-bold text-slate-100 text-sm truncate">{user.name}</h4>
            <div className="flex items-center gap-1.5 mt-1 bg-slate-950/60 px-2 py-0.5 rounded-md border border-slate-850 w-fit">
              <Coins size={12} className="text-amber-400" />
              <span className="text-xs font-black text-slate-350">{user.balance}</span>
            </div>
          </div>
        </div>

        {/* Desktop sidebar list */}
        <div className="flex flex-col gap-2">
          {[
            { id: 'play', label: 'Play Arena', icon: Gamepad2, color: 'text-indigo-400' },
            { id: 'wallet', label: 'My Wallet', icon: Wallet, color: 'text-violet-400' },
            { id: 'referral', label: 'Refer & Earn', icon: Share2, color: 'text-pink-400' },
            { id: 'support', label: 'Help Desk', icon: HelpCircle, color: 'text-sky-400' },
            { id: 'profile', label: 'Profile Settings', icon: User, color: 'text-teal-400' }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative group w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition-all duration-300 ${
                  isActive 
                    ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-500/20' 
                    : 'text-slate-400 hover:bg-slate-900/60 hover:text-slate-200 border border-transparent hover:border-slate-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon size={16} className={isActive ? 'text-white' : tab.color} />
                  <span>{tab.label}</span>
                </div>
                <ChevronRight size={14} className={`opacity-0 group-hover:opacity-100 transition-opacity ${isActive ? 'text-white' : 'text-slate-500'}`} />
              </button>
            );
          })}
        </div>
      </aside>

      {/* Main Tab Panel */}
      <main className="flex-1 bg-slate-900/10 border border-slate-900/80 p-6 md:p-8 rounded-3xl backdrop-blur-xl relative min-h-[520px]">
        <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-indigo-500/5 blur-[80px] rounded-full pointer-events-none" />

        {/* TAB 1: PLAY LUDO ARENA */}
        {activeTab === 'play' && (
          <div>
            {!matching ? (
              <div className="animate-fade-in">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-black text-white flex items-center gap-2">
                      <Gamepad2 size={24} className="text-indigo-400" />
                      Select Battle Stakes
                    </h2>
                    <p className="text-xs text-slate-400 mt-1">Choose entry coins. Match matches 1v1 with real-time players.</p>
                  </div>
                  <div className="hidden lg:flex items-center gap-1.5 px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-full text-xs font-semibold">
                    <Sparkles size={12} />
                    <span>Double rewards active</span>
                  </div>
                </div>

                {/* Stakes Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                  {[50, 100, 200, 500, 1000, 3000].map((coins) => (
                    <div 
                      key={coins}
                      onClick={() => setBetCoins(coins)}
                      className={`group relative cursor-pointer p-5 rounded-2xl border transition-all duration-300 ${
                        betCoins === coins 
                          ? 'bg-slate-900/80 border-indigo-500 shadow-xl shadow-indigo-500/5' 
                          : 'bg-slate-900/30 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      {/* Glow outline on active */}
                      {betCoins === coins && (
                        <div className="absolute inset-0 bg-indigo-500/5 rounded-2xl pointer-events-none" />
                      )}

                      <div className="flex items-center justify-between mb-4">
                        <span className="text-[9px] font-bold text-slate-500 tracking-widest uppercase">STAKE LEVEL</span>
                        <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                          betCoins === coins ? 'border-indigo-500 bg-indigo-500/20' : 'border-slate-800'
                        }`}>
                          {betCoins === coins && <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Coins size={20} className="text-amber-400 group-hover:scale-110 transition-transform" />
                        <span className="text-lg font-black text-white">{coins}</span>
                      </div>
                      
                      <div className="mt-4 pt-3 border-t border-slate-850 flex justify-between items-center text-[10px]">
                        <span className="text-slate-500">Winner pool</span>
                        <span className="font-bold text-emerald-400">{coins * 1.8} Coins</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Matchmaking Selection Summary */}
                <div className="bg-slate-900/40 border border-slate-850 p-6 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
                  <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-indigo-500 to-violet-500" />
                  <div>
                    <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest block">Stakes Selection</span>
                    <h3 className="text-lg font-black text-white mt-1">Lobby entry: {betCoins} Coins</h3>
                    <p className="text-[11px] text-slate-500 mt-0.5">Platform service fee of 10% applies to final match pot pool.</p>
                  </div>
                  
                  <button 
                    onClick={startMatchmaking}
                    className="w-full md:w-auto bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white font-bold text-sm px-8 py-3.5 rounded-2xl shadow-xl shadow-indigo-500/20 transition-all hover:-translate-y-0.5"
                  >
                    Find Player Match
                  </button>
                </div>
              </div>
            ) : (
              /* ADVANCED MATCHMAKING QUEUE OVERLAY */
              <div className="flex flex-col items-center justify-center py-12 text-center min-h-[440px] animate-scale-in">
                {!matchFound ? (
                  <div className="max-w-sm w-full">
                    {/* Ring Pulse Animation */}
                    <div className="relative w-28 h-28 mx-auto mb-8 flex items-center justify-center">
                      <div className="absolute inset-0 border border-indigo-500/30 rounded-full animate-ping pointer-events-none" />
                      <div className="absolute inset-2 border-2 border-indigo-500/20 rounded-full animate-pulse" />
                      <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                        <span className="font-extrabold text-2xl text-white">A</span>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2">Searching Player Database...</h3>
                    <p className="text-xs text-slate-400 mb-8 leading-relaxed">
                      Connecting to lobby nodes. Matching stats for stakes level of <span className="text-amber-400 font-bold">{betCoins} coins</span>.
                    </p>

                    <button 
                      onClick={cancelMatchmaking}
                      className="bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-400 text-xs font-bold px-6 py-3 rounded-xl transition-all"
                    >
                      Cancel Search
                    </button>
                  </div>
                ) : (
                  /* MATCH FOUND PANEL */
                  <div className="w-full max-w-lg p-8 bg-slate-950 border border-indigo-500/20 rounded-3xl relative shadow-2xl overflow-hidden animate-scale-in">
                    <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-500" />
                    
                    <div className="inline-flex px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-xs font-bold mb-8">
                      ✓ Player Found! Battle Ready.
                    </div>
                    
                    {/* Versus Cards */}
                    <div className="flex flex-col sm:flex-row items-center justify-around gap-6 mb-8">
                      
                      {/* Host Card */}
                      <div className="text-center bg-slate-900/40 border border-slate-850 p-4 rounded-2xl w-36">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-indigo-500 to-violet-500 flex items-center justify-center font-bold text-white text-lg mx-auto mb-3 shadow-md">
                          {user.name.charAt(0)}
                        </div>
                        <p className="text-sm font-bold text-white truncate mb-1">{user.name}</p>
                        <div className="flex items-center justify-center gap-1 text-[10px] text-slate-500">
                          <Star size={10} className="text-amber-400" />
                          <span>4.8 Rating</span>
                        </div>
                      </div>

                      <div className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-xs font-black text-indigo-400 shadow-md">
                        VS
                      </div>

                      {/* Opponent Card */}
                      <div className="text-center bg-slate-900/40 border border-slate-850 p-4 rounded-2xl w-36">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-rose-500 to-pink-500 flex items-center justify-center font-bold text-white text-lg mx-auto mb-3 shadow-md">
                          {matchFound.name.charAt(0)}
                        </div>
                        <p className="text-sm font-bold text-white truncate mb-1">{matchFound.name}</p>
                        <div className="flex items-center justify-center gap-1 text-[10px] text-slate-500">
                          <Star size={10} className="text-amber-400" />
                          <span>{matchFound.rating} Rating</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-slate-900/40 p-4 rounded-2xl border border-slate-850 mb-8 flex justify-between items-center text-xs">
                      <span className="text-slate-400">Total Pot Stakes</span>
                      <span className="font-extrabold text-amber-400 text-sm flex items-center gap-1">
                        <Coins size={14} />
                        {betCoins * 2} Coins
                      </span>
                    </div>

                    <div className="flex gap-4">
                      <button 
                        onClick={cancelMatchmaking}
                        className="flex-1 bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-400 font-bold py-3 rounded-xl text-xs transition-all"
                      >
                        Decline
                      </button>
                      <button 
                        onClick={() => alert("Launching Arena Board Simulator... Game initialized.")}
                        className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-bold py-3 rounded-xl text-xs shadow-lg shadow-emerald-500/25 transition-all"
                      >
                        Accept & Play
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: MY WALLET */}
        {activeTab === 'wallet' && (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-black text-white mb-2 flex items-center gap-2">
              <Wallet size={24} className="text-violet-400" />
              Ludo Arena Wallet
            </h2>
            <p className="text-xs text-slate-400 mb-8">Play stakes battles to multiply your coins. Instant deposit and withdraw support.</p>

            {/* Credit Card / Holographic Card UI */}
            <div className="relative w-full max-w-md bg-gradient-to-br from-indigo-700 via-violet-850 to-purple-900 p-6 rounded-3xl overflow-hidden shadow-2xl mb-8 border border-white/10 group">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent pointer-events-none" />
              
              {/* Chip and logo */}
              <div className="flex justify-between items-start mb-10">
                <div className="w-10 h-8 rounded bg-yellow-500/20 border border-yellow-500/30 relative flex items-center justify-center">
                  <div className="grid grid-cols-3 gap-0.5 w-6 h-4 border border-yellow-550/20 opacity-60" />
                </div>
                <div className="text-right">
                  <span className="text-[9px] font-bold text-slate-350 tracking-widest uppercase block">CARD TYPE</span>
                  <span className="text-xs font-black text-white tracking-wider">LUDO ARENA PRO</span>
                </div>
              </div>

              {/* Card Details */}
              <div className="mb-6">
                <span className="text-[10px] text-indigo-250 tracking-widest block uppercase mb-1">AVAILABLE BALANCE</span>
                <span className="text-3xl font-black text-white tracking-tight flex items-center gap-2">
                  <Coins size={28} className="text-yellow-400" />
                  {user.balance} Coins
                </span>
              </div>

              <div className="flex justify-between items-end pt-2">
                <div>
                  <span className="text-[8px] text-indigo-300 block uppercase">CARD HOLDER</span>
                  <span className="text-xs font-bold text-white tracking-wide">{user.name}</span>
                </div>
                <span className="text-xs font-mono text-indigo-200">**** **** **** 1982</span>
              </div>
            </div>

            {/* Add / Withdraw Forms */}
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {/* Load Coins */}
              <form onSubmit={handleAddMoney} className="bg-slate-900/40 border border-slate-850 p-6 rounded-2xl flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-white mb-1 text-sm flex items-center gap-2">
                    <ArrowUpRight size={16} className="text-emerald-400" />
                    Load Coins
                  </h4>
                  <p className="text-[11px] text-slate-500 mb-4">Add play coins to your game card balance.</p>
                  
                  <div className="relative mb-4">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500">
                      <Coins size={14} />
                    </span>
                    <input 
                      type="number" 
                      required
                      min="1"
                      placeholder="e.g. 500"
                      value={addAmount}
                      onChange={(e) => setAddAmount(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl py-3 pl-10 pr-4 text-xs focus:outline-none focus:border-indigo-500/50"
                    />
                  </div>
                </div>
                <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2.5 rounded-xl text-xs transition-all">
                  Deposit Coins
                </button>
              </form>

              {/* Withdraw Coins */}
              <form onSubmit={handleWithdraw} className="bg-slate-900/40 border border-slate-850 p-6 rounded-2xl flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-white mb-1 text-sm flex items-center gap-2">
                    <ArrowDownRight size={16} className="text-rose-400" />
                    Withdraw Coins
                  </h4>
                  <p className="text-[11px] text-slate-500 mb-4">Transfer coin balance to your linked bank cashout account.</p>

                  <div className="relative mb-4">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500">
                      <Coins size={14} />
                    </span>
                    <input 
                      type="number" 
                      required
                      min="1"
                      max={user.balance}
                      placeholder="e.g. 1000"
                      value={withdrawAmount}
                      onChange={(e) => setWithdrawAmount(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl py-3 pl-10 pr-4 text-xs focus:outline-none focus:border-indigo-500/50"
                    />
                  </div>
                </div>
                <button type="submit" className="w-full bg-slate-800 hover:bg-slate-750 text-slate-200 font-bold py-2.5 rounded-xl text-xs transition-all">
                  Withdraw Coins
                </button>
              </form>
            </div>

            {/* Transactions History */}
            <div className="bg-slate-900/20 border border-slate-850 rounded-2xl p-6">
              <h4 className="font-bold text-white mb-4 text-sm">Transaction Logs</h4>
              <div className="space-y-3">
                {transactions.map((t, idx) => (
                  <div key={idx} className="flex justify-between items-center p-3 bg-slate-900/30 rounded-xl border border-slate-850 text-xs">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${t.isPlus ? 'bg-emerald-500/10 text-emerald-450' : 'bg-rose-500/10 text-rose-450'}`}>
                        {t.isPlus ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                      </div>
                      <div>
                        <p className="font-bold text-slate-200">{t.desc}</p>
                        <span className="text-[10px] text-slate-500">{t.date}</span>
                      </div>
                    </div>
                    <span className={`font-extrabold ${t.isPlus ? 'text-emerald-400' : 'text-rose-450'}`}>
                      {t.isPlus ? `+${t.amount}` : t.amount} Coins
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: REFER & EARN */}
        {activeTab === 'referral' && (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-black text-white mb-2 flex items-center gap-2">
              <Share2 size={24} className="text-pink-400" />
              Refer & Earn Rewards
            </h2>
            <p className="text-xs text-slate-400 mb-8">Invite challengers. Receive free coins instantly when they create an account and join matches.</p>

            {/* Voucher Card Design */}
            <div className="relative bg-slate-900/40 border border-slate-800 p-8 rounded-3xl mb-8 flex flex-col lg:flex-row items-center gap-6 overflow-hidden">
              {/* Card Dotted Divider */}
              <div className="absolute inset-y-0 right-[35%] hidden lg:block border-r-2 border-dashed border-slate-800" />

              <div className="flex-1">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-pink-500/10 border border-pink-500/20 text-pink-400 rounded-full text-[10px] font-bold mb-3">
                  <Star size={10} fill="currentColor" />
                  INVITATION VALUE
                </span>
                <h3 className="text-xl font-black text-white mb-2">Claim 200 Free Battle Coins</h3>
                <p className="text-xs text-slate-550 leading-relaxed max-w-md">
                  Earn unlimited coins by sharing your unique voucher coupon. Referred friends also receive 100 startup play coins.
                </p>
              </div>

              <div className="flex flex-col gap-3 w-full lg:w-fit items-center lg:items-end">
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-center justify-between w-full max-w-xs">
                  <div>
                    <span className="text-[8px] uppercase font-bold text-slate-500 block mb-1">PROMO VOUCHER</span>
                    <span className="text-base font-black text-white font-mono tracking-wider">{user.referralCode}</span>
                  </div>
                  <button 
                    onClick={handleCopyReferral}
                    className="p-3 bg-pink-500/10 hover:bg-pink-600 text-pink-400 hover:text-white rounded-xl transition-all"
                  >
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/20 border border-slate-850 rounded-2xl p-6">
              <h4 className="font-bold text-white mb-4 text-sm">Successfully Referred Players</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3.5 bg-slate-900/30 rounded-xl border border-slate-850 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="font-bold text-slate-200">Rohit_Mehra</span>
                  </div>
                  <span className="text-emerald-400 font-extrabold">+200 Coins Credit</span>
                </div>
                <div className="flex justify-between items-center p-3.5 bg-slate-900/30 rounded-xl border border-slate-850 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="font-bold text-slate-200">Kirti_Sen</span>
                  </div>
                  <span className="text-emerald-400 font-extrabold">+200 Coins Credit</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: HELP DESK */}
        {activeTab === 'support' && (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-black text-white mb-2 flex items-center gap-2">
              <HelpCircle size={24} className="text-sky-400" />
              Lobby Help Desk
            </h2>
            <p className="text-xs text-slate-400 mb-8">Encountered game issues? Create a ticket and our support staff will solve it immediately.</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {[
                { title: 'Email Support', info: 'support@ludoarena.com', icon: '📧' },
                { title: 'Live Chat Support', info: 'Average response: 2 mins', icon: '💬' },
                { title: 'Fair Play Policy', info: 'Anti-cheat protection logs', icon: '🛡️' }
              ].map((card, idx) => (
                <div key={idx} className="bg-slate-900/30 border border-slate-850 p-5 rounded-2xl text-center">
                  <span className="text-2xl block mb-2">{card.icon}</span>
                  <h5 className="font-bold text-white text-xs mb-1">{card.title}</h5>
                  <p className="text-[10px] text-slate-500">{card.info}</p>
                </div>
              ))}
            </div>

            {!supportSent ? (
              <form onSubmit={(e) => { e.preventDefault(); setSupportSent(true); }} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Query Details</label>
                  <textarea 
                    required
                    rows="4"
                    placeholder="Enter details here..."
                    value={supportMessage}
                    onChange={(e) => setSupportMessage(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500/50 text-white rounded-xl py-3 px-4 text-xs focus:outline-none transition-all"
                  />
                </div>
                <button type="submit" className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-xl transition-all">
                  <Send size={12} />
                  <span className="text-xs">Submit Query Ticket</span>
                </button>
              </form>
            ) : (
              <div className="bg-slate-900/40 border border-indigo-500/20 rounded-2xl p-8 text-center">
                <div className="inline-flex p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full mb-4">
                  <MessageSquare size={24} />
                </div>
                <h4 className="text-white font-bold text-sm mb-1">Ticket Registered!</h4>
                <p className="text-[11px] text-slate-500 mb-6">Our game support moderator will review your query within a few minutes.</p>
                <button 
                  onClick={() => { setSupportSent(false); setSupportMessage(''); }}
                  className="bg-slate-950 border border-slate-800 hover:bg-slate-800 text-slate-350 text-xs px-4 py-2 rounded-xl"
                >
                  Create another ticket
                </button>
              </div>
            )}
          </div>
        )}

        {/* TAB 5: PROFILE SETTINGS */}
        {activeTab === 'profile' && (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-black text-white mb-2 flex items-center gap-2">
              <User size={24} className="text-teal-400" />
              Arena Profile Settings
            </h2>
            <p className="text-xs text-slate-400 mb-8">Manage display names, account settings, and statistics.</p>

            <div className="flex flex-col sm:flex-row items-center gap-6 bg-slate-900/30 border border-slate-850 p-6 rounded-2xl mb-8">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-500 to-violet-500 flex items-center justify-center font-black text-white text-2xl shadow-xl shadow-indigo-500/10">
                {user.name.charAt(0)}
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h3 className="text-lg font-black text-white">{user.name}</h3>
                <p className="text-[11px] text-slate-550 mt-1">{user.email}</p>
                
                {/* Custom circular stats indicators */}
                <div className="flex flex-wrap gap-4 mt-4 justify-center sm:justify-start">
                  <div className="flex items-center gap-2 bg-slate-950/60 px-3 py-1 rounded-full border border-slate-850 text-[10px]">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="text-slate-400">Wins:</span>
                    <span className="font-extrabold text-slate-200">{user.wins}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-slate-950/60 px-3 py-1 rounded-full border border-slate-850 text-[10px]">
                    <span className="w-2 h-2 rounded-full bg-rose-500" />
                    <span className="text-slate-400">Losses:</span>
                    <span className="font-extrabold text-slate-200">{user.losses}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-slate-950/60 px-3 py-1 rounded-full border border-slate-850 text-[10px]">
                    <span className="w-2 h-2 rounded-full bg-indigo-550" />
                    <span className="text-slate-400">Win Rate:</span>
                    <span className="font-extrabold text-indigo-400">{winRate}%</span>
                  </div>
                </div>
              </div>
            </div>

            <form onSubmit={handleUpdateName} className="space-y-4 max-w-md bg-slate-900/40 border border-slate-850 p-6 rounded-2xl">
              <h4 className="font-bold text-white mb-2 text-xs uppercase tracking-wider text-slate-400">Edit Username</h4>
              <input 
                type="text" 
                required
                placeholder="Enter new name"
                value={profileName}
                onChange={(e) => setProfileName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl py-3 px-4 text-xs focus:outline-none focus:border-indigo-500/50 transition-all mb-4"
              />
              <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2.5 rounded-xl text-xs transition-all">
                Save Username
              </button>
            </form>
          </div>
        )}
      </main>

      {/* Mobile Bottom Navigation Dock */}
      <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[92%] bg-slate-950/95 border border-slate-850/80 backdrop-blur-lg rounded-3xl shadow-2xl px-4 py-3 flex items-center justify-between">
        {[
          { id: 'play', label: 'Play', icon: Gamepad2 },
          { id: 'wallet', label: 'Wallet', icon: Wallet },
          { id: 'referral', label: 'Refer', icon: Share2 },
          { id: 'support', label: 'Support', icon: HelpCircle },
          { id: 'profile', label: 'Profile', icon: User }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center gap-1 text-[9px] font-bold transition-all ${
                isActive ? 'text-indigo-400 scale-105' : 'text-slate-500 hover:text-slate-400'
              }`}
            >
              <Icon size={16} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

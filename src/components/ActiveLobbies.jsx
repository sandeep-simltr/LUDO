import { useState } from 'react';
import { Coins, User, ArrowRight, Plus } from 'lucide-react';

export default function ActiveLobbies() {
  const [rooms, setRooms] = useState([
    { id: 'LA-8291', host: 'Rohan Sharma', players: 3, maxPlayers: 4, entryFee: 500, mode: 'Classic' },
    { id: 'LA-1049', host: 'Sneha Patel', players: 2, maxPlayers: 4, entryFee: 1000, mode: 'Quick' },
    { id: 'LA-5820', host: 'Rahul Verma', players: 1, maxPlayers: 4, entryFee: 100, mode: 'Classic' },
    { id: 'LA-7392', host: 'Pooja Roy', players: 4, maxPlayers: 4, entryFee: 2500, mode: 'Master' }
  ]);

  return (
    <section id="lobbies" className="max-w-6xl mx-auto px-4 py-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
        <div>
          <h2 className="text-3xl md:text-5xl font-black mb-4">Live Game Rooms</h2>
          <p className="text-slate-400">Join an active match or create your own custom game board.</p>
        </div>
        <button className="mt-4 md:mt-0 flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold px-6 py-3 rounded-xl transition-all duration-300">
          <Plus size={18} />
          <span>Host a Room</span>
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {rooms.map((room) => {
          const isFull = room.players >= room.maxPlayers;
          return (
            <div 
              key={room.id}
              className={`bg-slate-905/60 border ${
                isFull ? 'border-slate-900/80 opacity-75' : 'border-slate-800 hover:border-indigo-500/30'
              } p-6 rounded-2xl flex flex-col justify-between transition-all duration-300`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono text-slate-500">{room.id}</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    room.mode === 'Master' ? 'bg-rose-500/10 text-rose-450' :
                    room.mode === 'Quick' ? 'bg-amber-500/10 text-amber-450' :
                    'bg-indigo-500/10 text-indigo-400'
                  }`}>
                    {room.mode}
                  </span>
                </div>

                <h4 className="text-white font-bold text-lg mb-1 flex items-center gap-2">
                  <User size={16} className="text-slate-400" />
                  {room.host}
                </h4>

                <div className="flex items-center justify-between text-xs text-slate-400 mt-4 mb-2">
                  <span>Players joined</span>
                  <span className="font-semibold text-slate-200">
                    {room.players}/{room.maxPlayers}
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden mb-6">
                  <div 
                    className={`h-full rounded-full ${
                      isFull ? 'bg-rose-500' : 'bg-indigo-500'
                    }`}
                    style={{ width: `${(room.players / room.maxPlayers) * 100}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between mt-auto">
                <div className="flex items-center gap-1.5">
                  <Coins size={16} className="text-amber-400" />
                  <span className="text-sm font-black text-white">{room.entryFee}</span>
                </div>

                <button 
                  disabled={isFull}
                  className={`flex items-center justify-center gap-1 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 ${
                    isFull 
                      ? 'bg-slate-950 text-slate-600 cursor-not-allowed' 
                      : 'bg-indigo-500/10 hover:bg-indigo-500 text-indigo-400 hover:text-white border border-indigo-500/20'
                  }`}
                >
                  <span>{isFull ? 'Full' : 'Join'}</span>
                  {!isFull && <ArrowRight size={12} />}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}


import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { User } from '../types';
import { Eye, Target, DollarSign, BarChart3, Play, Volume2, Maximize, Activity, Wifi, ShieldCheck, Info } from 'lucide-react';

interface WorkPageProps {
  user: User;
  onLogout: () => void;
}

const WorkPage: React.FC<WorkPageProps> = ({ user, onLogout }) => {
  const [activeArea, setActiveArea] = useState('Channel 1');
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const stats = [
    { label: 'DAILY GOAL', value: '0 / 50', trend: 'REQUIRED TO WITHDRAW', icon: <Target size={18} /> },
    { label: 'ACTIVE CHANNEL', value: activeArea, trend: 'ONLINE', icon: <Wifi size={18} /> },
    { label: "TODAY'S EARNINGS", value: 'PKR 0.00', trend: 'LIVE UPDATES', icon: <DollarSign size={18} /> },
    { label: 'MY RANK', value: 'USELESS', trend: 'LEVEL UP TO EARN MORE', icon: <Activity size={18} /> },
  ];

  const players = [
    { id: 'Channel 1', label: 'Channel One', color: '#FF5722' },
    { id: 'Channel 2', label: 'Channel Two', color: '#000' },
    { id: 'Channel 3', label: 'Channel Three', color: '#000' },
    { id: 'Channel 4', label: 'Channel Four', color: '#000' },
  ];

  useEffect(() => {
    let interval: any;
    if (isPlaying && progress < 100) {
      interval = setInterval(() => {
        setProgress(prev => Math.min(prev + 5, 100));
      }, 500);
    } else if (progress === 100) {
      setIsPlaying(false);
      // Logic for crediting reward would go here
    }
    return () => clearInterval(interval);
  }, [isPlaying, progress]);

  const handleStartPlay = () => {
    if (!isPlaying) {
      setProgress(0);
      setIsPlaying(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#E5E4D7] pb-20">
      <Sidebar user={user} onLogout={onLogout} />
      
      <main className="max-w-[1100px] mx-auto p-4 md:p-8 space-y-10 mt-6">
        <header className="industrial-border bg-white p-10 md:p-14 text-center relative industrial-shadow">
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-[9px] font-black uppercase tracking-widest">System Online</span>
          </div>
          
          <div className="bg-black text-white px-3 py-1 text-[10px] font-black tracking-widest inline-block mx-auto uppercase mb-4">
            Daily Earning Zone
          </div>
          <h1 className="text-4xl md:text-7xl font-black uppercase leading-none tracking-tighter mb-4">
            Watch & <span className="text-[#FF5722]">Earn.</span>
          </h1>
          <p className="text-gray-500 font-bold uppercase tracking-widest text-xs max-w-lg mx-auto leading-relaxed">
            Watch videos from our partners to earn rewards. Complete your daily goal to unlock withdrawals.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <div key={idx} className="industrial-border bg-white p-6 industrial-shadow-sm hover:translate-y-[-2px] transition-all">
              <div className="flex justify-between items-start mb-6">
                <div className="industrial-border p-2 bg-gray-50 text-black">
                  {stat.icon}
                </div>
                <div className="text-right">
                  <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-1">{stat.label}</span>
                  <span className="text-xl font-black tabular-nums">{stat.value}</span>
                </div>
              </div>
              <div className="text-[8px] font-black text-[#FF5722] uppercase tracking-widest py-1 px-2 bg-[#FFF0E6] inline-block">
                {stat.trend}
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="font-black text-[10px] uppercase tracking-[0.2em] mb-4 text-gray-400">Select Video Channel</h3>
            {players.map((player) => (
              <button
                key={player.id}
                onClick={() => { if (!isPlaying) { setActiveArea(player.id); setProgress(0); } }}
                disabled={isPlaying}
                className={`w-full industrial-border p-4 flex flex-col items-start transition-all relative ${
                  activeArea === player.id 
                    ? 'bg-black text-white industrial-shadow-sm' 
                    : 'bg-white text-black hover:bg-gray-100'
                } ${isPlaying ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <span className="text-[8px] font-black uppercase opacity-60 mb-1">{player.id.replace('Channel ', 'CH_0')}</span>
                <span className="font-black uppercase text-xs tracking-widest">{player.label}</span>
              </button>
            ))}

            <div className="industrial-border bg-[#FFF0E6] p-4 space-y-3 mt-6">
              <div className="flex items-center gap-2 text-[#FF5722]">
                <ShieldCheck size={16} />
                <span className="text-[9px] font-black uppercase">Earning Rules</span>
              </div>
              <p className="text-[9px] font-bold text-gray-600 leading-relaxed uppercase">
                Do not use ad-blockers. Muting the video or switching tabs may pause your earning progress.
              </p>
            </div>
          </div>

          <div className="lg:col-span-3 space-y-6">
            <div className="industrial-border bg-black p-2 industrial-shadow-lg relative">
              <div className="aspect-video bg-[#050B1A] relative flex items-center justify-center p-8 overflow-hidden group">
                <div className="scanline" />
                
                {!isPlaying && progress === 0 ? (
                  <button 
                    onClick={handleStartPlay}
                    className="relative w-24 h-24 border-2 border-[#FF5722] rounded-full flex items-center justify-center text-[#FF5722] hover:bg-[#FF5722] hover:text-white transition-all industrial-shadow"
                  >
                    <Play size={40} fill="currentColor" />
                  </button>
                ) : (
                  <div className="text-center space-y-6 relative z-10">
                    <h4 className="text-5xl font-black text-white uppercase tracking-tighter">
                      {progress}% <span className="text-xs text-[#FF5722] align-middle">COMPLETED</span>
                    </h4>
                    <div className="w-64 h-1 bg-white/10 mx-auto">
                      <div className="h-full bg-[#FF5722] transition-all duration-300 shadow-[0_0_10px_#FF5722]" style={{ width: `${progress}%` }} />
                    </div>
                    <p className="text-[9px] font-black text-white/40 uppercase tracking-[0.4em] animate-pulse">Verifying View...</p>
                  </div>
                )}
                
                <div className="absolute bottom-4 left-4 text-[9px] font-mono text-white/40 uppercase">Watching: {activeArea}</div>
              </div>
            </div>
            
            <div className="flex items-start gap-4 p-6 bg-white industrial-border">
              <Info size={24} className="text-[#FF5722] shrink-0" />
              <div>
                <h5 className="font-black uppercase text-xs tracking-widest mb-1">Daily Bonus: Subscribe & Watch</h5>
                <p className="text-[9px] font-bold text-gray-500 uppercase leading-relaxed">
                  Subscribe to the Thorx Official Channel and watch a video for 30 seconds to qualify for today's payout.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default WorkPage;

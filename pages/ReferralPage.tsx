
import React from 'react';
import Sidebar from '../components/Sidebar';
import { User } from '../types';
import { Share2, Link as LinkIcon, Trophy, Target, TrendingUp, Info, Users, Copy } from 'lucide-react';

interface ReferralPageProps {
  user: User;
  onLogout: () => void;
}

const ReferralPage: React.FC<ReferralPageProps> = ({ user, onLogout }) => {
  return (
    <div className="min-h-screen bg-[#E5E4D7] pb-20">
      <Sidebar user={user} onLogout={onLogout} />
      
      <main className="max-w-[1200px] mx-auto p-6 space-y-10 mt-6">
        <header className="industrial-border bg-white p-10 md:p-16 text-center relative industrial-shadow overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-black" />
          <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black text-white px-4 py-1 text-[10px] font-black tracking-[0.3em] uppercase">
            <Target size={12} className="text-[#FF5722]" /> Referral Program
          </div>
          
          <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-none mb-6">
            Grow Your <span className="text-[#FF5722]">Team.</span>
          </h1>
          <p className="max-w-xl mx-auto text-gray-500 font-bold uppercase tracking-widest text-xs leading-relaxed">
            Invite friends to Thorx.pro. Earn a percentage of their earnings forever. Build your team and increase your passive income.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <RefStatCard label="Direct Friends (Level 1)" value="0" sub="YOU EARN 15%" icon={<Users size={18} />} />
          <RefStatCard label="Team Members (Level 2)" value="0" sub="YOU EARN 7.5%" icon={<Users size={18} />} />
          <RefStatCard label="Bonus Status" value="ACTIVE" sub="AUTO-CREDITED" icon={<TrendingUp size={18} />} highlight />
          <RefStatCard label="My Rank" value="USELESS" sub="LEVEL 01" icon={<Trophy size={18} />} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3 industrial-border bg-white p-10 industrial-shadow space-y-10">
            <div className="flex items-center gap-4 text-black border-b-2 border-black pb-4">
              <Share2 size={24} className="text-[#FF5722]" />
              <h3 className="font-black uppercase tracking-widest text-sm text-gray-400">Invite Friends</h3>
            </div>
            
            <div className="bg-[#F5F5F0] p-1 industrial-border">
               <div className="bg-white p-10 text-center space-y-6">
                  <div className="text-[10px] font-black tracking-[0.4em] text-gray-400 uppercase">Your Unique Referral Code</div>
                  <div className="text-5xl font-black uppercase tracking-tighter text-black">
                    {user.referralCode}
                  </div>
               </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <button className="industrial-border py-5 bg-black text-white font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-[#FF5722] transition-all industrial-shadow-sm active:translate-y-1">
                <Copy size={18} /> Copy Code
              </button>
              <button className="industrial-border py-5 bg-white text-black font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-gray-100 transition-all border-dashed border-2">
                <Share2 size={18} /> Share on WhatsApp
              </button>
            </div>

            <div className="space-y-6 bg-[#F5F5F0] p-8 industrial-border border-l-8 border-l-[#FF5722]">
              <div className="flex justify-between items-center text-xs font-black uppercase tracking-widest">
                <span className="text-gray-500">Level 1 (Direct Invites)</span>
                <span className="text-[#FF5722]">15% Bonus</span>
              </div>
              <div className="w-full h-1.5 bg-gray-200">
                <div className="h-full bg-[#FF5722]" style={{ width: '100%' }} />
              </div>
              <div className="flex justify-between items-center text-xs font-black uppercase tracking-widest">
                <span className="text-gray-500">Level 2 (Friends of Friends)</span>
                <span className="text-black">7.5% Bonus</span>
              </div>
              <div className="w-full h-1.5 bg-gray-200">
                <div className="h-full bg-black" style={{ width: '50%' }} />
              </div>
              <div className="flex items-start gap-3 text-gray-400 text-[9px] font-bold uppercase mt-6 leading-relaxed">
                <Info size={14} className="shrink-0 text-[#FF5722]" />
                <span>NOTE: You receive your referral bonus automatically when your friend successfully withdraws their earnings.</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-8">
            <div className="industrial-border bg-black text-white p-8 industrial-shadow space-y-8">
              <h3 className="font-black uppercase tracking-widest text-sm">User Levels</h3>
              <div className="space-y-4">
                 <LevelProgress name="USELESS" active />
                 <LevelProgress name="WORKER" />
                 <LevelProgress name="SOLDIER" />
                 <LevelProgress name="CAPTAIN" />
                 <LevelProgress name="GENERAL" />
              </div>
            </div>

            <div className="industrial-border bg-white p-8 industrial-shadow space-y-6">
              <h3 className="font-black uppercase tracking-widest text-[9px] text-gray-400 border-b-2 border-black pb-2">How it Works</h3>
              <p className="text-[10px] font-bold text-gray-500 uppercase leading-relaxed tracking-wider">
                Share your code with friends. When they join and start earning, you get a commission every time they withdraw money. There is no limit to how many friends you can invite.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const RefStatCard = ({ label, value, sub, highlight, icon }: any) => (
  <div className={`industrial-border p-6 space-y-4 bg-white industrial-shadow-sm transition-all hover:translate-y-[-2px] ${highlight ? 'border-[#FF5722]' : ''}`}>
    <div className="flex justify-between items-start">
      <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{label}</span>
      <div className={`p-2 industrial-border ${highlight ? 'bg-[#FF5722] text-white border-[#FF5722]' : 'bg-gray-50'}`}>{icon}</div>
    </div>
    <div>
      <div className={`text-2xl font-black ${highlight ? 'text-[#FF5722]' : 'text-black'}`}>{value}</div>
      <div className="text-[8px] font-black tracking-widest text-[#FF5722] uppercase mt-1">{sub}</div>
    </div>
  </div>
);

const LevelProgress = ({ name, active }: any) => (
  <div className="flex items-center justify-between group">
     <span className={`text-[10px] font-black uppercase tracking-widest ${active ? 'text-[#FF5722]' : 'text-gray-600'}`}>
       {name}
     </span>
     {active && <div className="w-2 h-2 bg-[#FF5722] animate-pulse" />}
  </div>
);

export default ReferralPage;

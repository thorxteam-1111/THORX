
import React from 'react';
import Sidebar from '../components/Sidebar';
import { User } from '../types';
import { Share2, Users, Copy, Award, TrendingUp, Info, Zap, Trophy } from 'lucide-react';
import Reveal from '../components/Reveal';

interface ReferralPageProps {
  user: User;
  onLogout: () => void;
}

const ReferralPage: React.FC<ReferralPageProps> = ({ user, onLogout }) => {
  return (
    <div className="min-h-screen bg-[#F5F5F0] pb-24 md:pb-12">
      <Sidebar user={user} onLogout={onLogout} />
      
      <main className="max-w-[1200px] mx-auto p-4 md:p-8 space-y-6 mt-4">
        
        {/* Header */}
        <Reveal width="100%">
          <section className="bg-white p-6 md:p-10 industrial-border industrial-shadow-lg flex flex-col md:flex-row justify-between items-start md:items-end gap-6 relative overflow-hidden">
            <div className="absolute right-0 top-0 p-12 opacity-[0.03]">
               <Users size={200} />
            </div>
            
            <div className="space-y-3 relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-black text-white border border-black rounded-full shadow-lg">
                 <Trophy size={10} className="text-[#FF5722]" />
                 <span className="text-[9px] font-bold uppercase tracking-widest">Top Earner Program</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none">
                Affiliate <span className="text-[#FF5722]">Net</span>
              </h1>
              <p className="text-gray-500 font-medium text-xs md:text-sm max-w-lg">
                Build your team and earn lifetime commissions (15%).
              </p>
            </div>
          </section>
        </Reveal>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { l: "Direct Refs", v: "0", s: "Lvl 1 • 15%", i: <Users size={16}/> },
            { l: "Network", v: "0", s: "Lvl 2 • 7.5%", i: <Share2 size={16}/> },
            { l: "Commission", v: "ACTIVE", s: "Standard", i: <TrendingUp size={16}/>, h: true },
            { l: "Tier", v: "USELESS", s: "Rank 01", i: <Award size={16}/> }
          ].map((item, i) => (
             <Reveal key={i} delay={i*100}>
               <div className={`p-5 bg-white industrial-border industrial-shadow transition-all hover:-translate-y-1 ${item.h ? 'border-b-4 border-b-[#FF5722]' : ''}`}>
                 <div className="flex justify-between mb-3">
                   <div className={`p-2 rounded ${item.h ? 'bg-[#FF5722] text-white' : 'bg-[#F5F5F0] text-black'}`}>{item.i}</div>
                 </div>
                 <div className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">{item.l}</div>
                 <div className="text-xl font-black">{item.v}</div>
                 <div className={`mt-1 text-[8px] font-bold uppercase ${item.h ? 'text-[#FF5722]' : 'text-gray-400'}`}>{item.s}</div>
               </div>
             </Reveal>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          <div className="lg:col-span-7 space-y-6">
             <Reveal>
               <div className="bg-white p-6 md:p-8 industrial-border industrial-shadow">
                  <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
                     <h3 className="font-black uppercase tracking-widest text-xs">Your Invitation Key</h3>
                     <div className="text-[9px] font-bold text-green-500 uppercase tracking-widest flex items-center gap-1">
                       <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" /> Active
                     </div>
                  </div>

                  {/* Perforated Ticket */}
                  <div className="bg-[#F5F5F0] p-1.5 rounded-xl industrial-border border-dashed border-gray-300 relative overflow-hidden group hover:border-black transition-colors">
                     <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-6 bg-white rounded-r-full border-r border-t border-b border-gray-300" />
                     <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-6 bg-white rounded-l-full border-l border-t border-b border-gray-300" />
                     
                     <div className="bg-white rounded-lg p-6 text-center space-y-2">
                        <div className="text-[9px] font-black uppercase tracking-[0.4em] text-gray-400">Referral Code</div>
                        <div className="text-3xl md:text-5xl font-black uppercase tracking-widest text-black font-mono selection:bg-black selection:text-white">
                          {user.referralCode}
                        </div>
                     </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <button className="py-3 bg-black text-white font-black uppercase tracking-widest text-[10px] rounded hover:bg-[#FF5722] transition-colors flex items-center justify-center gap-2 shadow-lg active:scale-95">
                      <Copy size={14} /> Copy Code
                    </button>
                    <button className="py-3 bg-[#F5F5F0] text-black font-black uppercase tracking-widest text-[10px] rounded hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 active:scale-95">
                      <Share2 size={14} /> Share Link
                    </button>
                  </div>
               </div>
             </Reveal>

             <Reveal delay={100}>
               <div className="bg-[#FFF0E6] p-6 industrial-border border-[#FF5722] flex gap-4">
                 <div className="p-2 bg-[#FF5722] text-white rounded shrink-0 h-fit">
                    <Info size={18} />
                 </div>
                 <div className="space-y-1">
                    <h4 className="font-black text-xs uppercase tracking-wide">Commission Info</h4>
                    <p className="text-[10px] font-medium text-gray-700 leading-relaxed">
                      Earn <span className="font-black">15%</span> from direct invites. Credited instantly upon withdrawal.
                    </p>
                 </div>
               </div>
             </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={200} className="h-full">
              <div className="bg-white p-6 md:p-8 industrial-border industrial-shadow h-full flex flex-col">
                <h3 className="font-black uppercase tracking-widest text-xs mb-6">Account Tiers</h3>
                <div className="flex-1 space-y-2">
                   {[
                     {n: "Useless", l: "01", a: true},
                     {n: "Worker", l: "02"},
                     {n: "Soldier", l: "03"},
                     {n: "Captain", l: "04"},
                     {n: "General", l: "05"}
                   ].map((t, i) => (
                     <div key={i} className={`flex items-center justify-between p-3 border rounded transition-all ${t.a ? 'bg-black text-white border-black shadow-md' : 'bg-white border-gray-100 text-gray-400'}`}>
                        <div className="flex items-center gap-3">
                           <span className={`text-[9px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded ${t.a ? 'bg-[#FF5722] text-black' : 'bg-gray-100 text-gray-400'}`}>Lvl {t.l}</span>
                           <span className="font-bold uppercase tracking-wide text-xs">{t.n}</span>
                        </div>
                        {t.a && <Zap size={12} className="text-[#FF5722]" fill="currentColor" />}
                     </div>
                   ))}
                </div>
              </div>
            </Reveal>
          </div>

        </div>
      </main>
    </div>
  );
};

export default ReferralPage;

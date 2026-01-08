
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, ShieldCheck, Zap, Globe, TrendingUp, 
  Cpu, Lock, Database, UserPlus, PlayCircle, ChevronDown,
  Activity, Radio, Terminal as TerminalIcon, Award,
  Users, Wallet, CheckCircle2, PhoneOutgoing, Calculator
} from 'lucide-react';
import Logo from '../components/Logo';

const LandingPage: React.FC = () => {
  const [friends, setFriends] = useState(10);
  const [friendEarnings, setFriendEarnings] = useState(5000);
  const commission = Math.floor((friends * friendEarnings) * 0.15);

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden selection:bg-[#FF5722] selection:text-white scroll-smooth bg-[#F5F5F0]">
      {/* Background Ambience */}
      <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-[#FF5722]/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[40%] bg-black/5 blur-[100px] rounded-full pointer-events-none" />

      {/* Navigation */}
      <header className="p-6 md:p-8 flex justify-between items-center z-50 sticky top-0 bg-[#F5F5F0]/90 backdrop-blur-md border-b border-black/5 transition-all">
        <div className="flex items-center gap-6">
          <Link to="/">
             <Logo size="md" className="shadow-[4px_4px_0px_0px_rgba(255,87,34,1)] hover:shadow-[2px_2px_0px_0px_rgba(255,87,34,1)] hover:translate-x-[2px] hover:translate-y-[2px]" />
          </Link>
          <div className="hidden lg:flex items-center gap-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              <span>Official Platform</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4 md:gap-8">
          <Link to="/auth" className="text-xs font-black uppercase tracking-widest hover:text-[#FF5722] transition-colors">Login</Link>
          <Link to="/auth" className="industrial-border bg-black text-white px-6 py-3 text-xs font-black uppercase tracking-widest hover:bg-[#FF5722] hover:border-[#FF5722] transition-all industrial-shadow-sm flex items-center gap-2 group">
            Register Now <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center text-center px-4 relative z-10 max-w-7xl mx-auto pt-24 pb-32 md:pt-32 md:pb-40">
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 w-full">
          <div className="inline-flex items-center gap-2 bg-[#FFF0E6] text-[#FF5722] px-6 py-2 border-2 border-[#FF5722] rounded-full text-[10px] font-black tracking-widest uppercase mb-10 industrial-shadow-sm hover:scale-105 transition-transform cursor-default">
            <Zap size={14} fill="currentColor" /> Trusted Earning Platform for Pakistan
          </div>
          
          <h1 className="text-6xl md:text-[9rem] lg:text-[11rem] font-black tracking-tighter mb-8 leading-[0.85] uppercase text-black">
            REAL<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#FF5722] to-[#D84315] relative">
              EARNINGS.
              <div className="absolute -bottom-2 md:-bottom-6 left-0 w-full h-4 bg-black/5 -z-10 blur-xl" />
            </span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-lg md:text-2xl font-medium text-gray-600 mb-16 leading-relaxed px-4">
            Thorx is the simplest way to earn online in Pakistan. Watch ads, invite friends, and withdraw <span className="text-black font-black underline underline-offset-4 decoration-[#FF5722] decoration-4">Real Cash (PKR)</span> directly to your account.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full px-4">
            <Link 
              to="/auth" 
              className="w-full sm:w-auto bg-black text-white px-12 py-6 text-xl font-black uppercase tracking-widest border-2 border-black hover:bg-[#FF5722] hover:border-[#FF5722] transition-all group flex items-center justify-center gap-4 industrial-shadow hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
            >
              Start Earning
              <ArrowRight className="group-hover:translate-x-2 transition-transform" strokeWidth={3} />
            </Link>
            <div className="flex flex-col items-start gap-1 p-4 border-l-2 border-black/10">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Platform Status</span>
              <span className="text-xs font-black text-black uppercase tracking-widest flex items-center gap-2">
                <Cpu size={14} className="text-[#FF5722]" /> SYSTEM ONLINE
              </span>
            </div>
          </div>
        </div>
      </main>

      {/* Marquee Ticker */}
      <section className="bg-black py-4 border-y-4 border-[#FF5722] overflow-hidden whitespace-nowrap z-20 shadow-[0_10px_40px_-10px_rgba(255,87,34,0.3)]">
        <div className="flex gap-16 animate-marquee">
          {[1,2,3,4,5,6].map((i) => (
            <div key={i} className="flex items-center gap-8 opacity-80 hover:opacity-100 transition-opacity">
              <span className="flex items-center gap-3 text-white font-mono text-[10px] tracking-widest uppercase">
                <Radio size={14} className="text-[#FF5722]" /> LIVE FEED:
              </span>
              <span className="text-white font-black text-sm uppercase">PAYOUTS ACTIVE</span>
              <span className="text-[#FF5722] font-mono text-[10px]">SECURE CONNECTION</span>
              <div className="w-1 h-1 bg-white/20 rounded-full" />
            </div>
          ))}
        </div>
      </section>

      {/* SECTION: 3 Steps (How it Works) */}
      <section className="py-32 px-6 bg-white relative z-10 border-b-2 border-black">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
            <div className="text-left">
              <div className="text-[10px] font-black text-[#FF5722] uppercase tracking-[0.4em] mb-4 flex items-center gap-2">
                <div className="w-8 h-[2px] bg-[#FF5722]" />
                Simple Process
              </div>
              <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">
                3 STEPS TO<br />SUCCESS
              </h2>
            </div>
            <p className="max-w-md text-gray-500 font-bold uppercase tracking-widest text-xs leading-relaxed text-left md:text-right border-l-4 md:border-l-0 md:border-r-4 border-black pl-4 md:pl-0 md:pr-4">
              A transparent, safe, and easy-to-use platform designed for everyone in Pakistan to earn daily income.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ProtocolCard 
              number="01" 
              title="Create Account" 
              icon={<UserPlus size={28} />} 
              desc="Register easily using your email. We send a simple code to your inbox to keep your account safe and verified."
            />
            <ProtocolCard 
              number="02" 
              title="Watch & Earn" 
              icon={<PlayCircle size={28} />} 
              desc="Go to the Work section and watch videos. Complete simple daily tasks to unlock your earnings."
            />
            <ProtocolCard 
              number="03" 
              title="Get Paid" 
              icon={<TrendingUp size={28} />} 
              desc="Invite friends to earn extra cash (15% bonus). Withdraw your money directly to JazzCash, EasyPaisa, or Bank."
            />
          </div>
        </div>
      </section>

      {/* NEW SECTION: Earning Calculator */}
      <section className="py-32 px-6 bg-black text-white relative overflow-hidden border-b-2 border-[#FF5722]">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 bg-[#FF5722]/10 border border-[#FF5722] text-[#FF5722] px-4 py-1 text-[10px] font-black uppercase tracking-widest rounded-full">
              <Calculator size={14} /> Profit Simulator
            </div>
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">
              CALCULATE<br />YOUR <span className="text-[#FF5722]">BONUS</span>
            </h2>
            <p className="text-gray-400 font-bold uppercase tracking-widest text-xs leading-relaxed max-w-md">
              Invite friends and earn a lifetime 15% commission on their withdrawals. Use the slider to estimate your potential monthly bonus.
            </p>
            
            <div className="p-6 industrial-border border-white/20 bg-white/5 backdrop-blur-sm space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between text-xs font-black uppercase tracking-widest">
                  <span>Friends Invited</span>
                  <span className="text-[#FF5722]">{friends} Friends</span>
                </div>
                <input 
                  type="range" 
                  min="1" 
                  max="100" 
                  value={friends} 
                  onChange={(e) => setFriends(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-[#FF5722]"
                />
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between text-xs font-black uppercase tracking-widest">
                  <span>Avg. Friend Earning</span>
                  <span className="text-gray-400">PKR {friendEarnings} / month</span>
                </div>
                <div className="w-full h-1 bg-gray-800 relative overflow-hidden rounded-full">
                  <div className="absolute top-0 left-0 h-full bg-white/20 w-1/2" />
                </div>
                <p className="text-[9px] text-gray-500 uppercase tracking-wide">Based on average user activity</p>
              </div>
            </div>
          </div>

          <div className="industrial-border bg-white text-black p-10 md:p-14 relative industrial-shadow-lg shadow-[#FF5722]/20">
            <div className="absolute top-0 left-0 w-full h-2 bg-[#FF5722]" />
            <div className="text-center space-y-2 mb-8">
              <div className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">Potential Monthly Bonus</div>
              <div className="text-6xl md:text-8xl font-black tracking-tighter tabular-nums">
                <span className="text-2xl align-top mr-2 text-gray-400 font-bold">PKR</span>
                {commission.toLocaleString()}
              </div>
            </div>
            
            <div className="space-y-4 pt-8 border-t-2 border-gray-100">
              <div className="flex justify-between items-center text-xs font-black uppercase tracking-widest">
                <span className="flex items-center gap-2"><Users size={14} className="text-[#FF5722]" /> Referral Rate</span>
                <span>15% Commission</span>
              </div>
              <div className="flex justify-between items-center text-xs font-black uppercase tracking-widest">
                <span className="flex items-center gap-2"><Wallet size={14} className="text-[#FF5722]" /> Payout Speed</span>
                <span>24-48 Hours</span>
              </div>
            </div>

            <Link to="/auth" className="mt-10 w-full bg-black text-white py-5 text-sm font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-[#FF5722] transition-colors">
              Start Inviting Now
            </Link>
          </div>
        </div>
      </section>

      {/* NEW SECTION: Live Payout Feed */}
      <section className="py-32 px-6 bg-[#E5E4D7] border-b-2 border-black">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-12 items-stretch">
            <div className="flex-1 space-y-8">
               <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none">
                 RECENT<br />WITHDRAWALS
               </h2>
               <p className="text-xs font-bold text-gray-500 uppercase tracking-widest leading-relaxed max-w-sm">
                 Real-time feed of payments processed to users across Pakistan via JazzCash, EasyPaisa, and Bank Transfer.
               </p>
               <div className="flex gap-4">
                 <div className="bg-white p-4 industrial-border flex-1 text-center">
                   <div className="text-2xl font-black">24H</div>
                   <div className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Turnaround</div>
                 </div>
                 <div className="bg-white p-4 industrial-border flex-1 text-center">
                   <div className="text-2xl font-black">100%</div>
                   <div className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Success Rate</div>
                 </div>
               </div>
            </div>

            <div className="flex-[1.5] industrial-border bg-black p-2 shadow-2xl relative overflow-hidden h-[400px]">
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />
              <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-black to-transparent z-10" />
              <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-black to-transparent z-10" />
              
              <div className="bg-[#111] h-full overflow-hidden relative">
                <div className="animate-scroll-vertical space-y-2 p-4">
                  {[...Array(10)].map((_, i) => (
                    <PayoutRow key={i} index={i} />
                  ))}
                  {[...Array(10)].map((_, i) => ( // Duplicate for seamless loop
                    <PayoutRow key={`dup-${i}`} index={i} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NEW SECTION: 'Why Us' Bento Grid */}
      <section className="py-32 px-6 bg-white border-b-2 border-black">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center">
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter">WHY CHOOSE <span className="text-[#FF5722]">THORX?</span></h2>
            <div className="barcode-pattern w-32 mx-auto mt-6 opacity-30" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-2 gap-6 h-auto md:h-[600px]">
            {/* Box 1: Zero Investment */}
            <div className="md:col-span-2 industrial-border bg-[#F5F5F0] p-10 flex flex-col justify-between group hover:bg-black hover:text-white transition-colors duration-500">
              <div className="flex justify-between items-start">
                 <Wallet size={48} strokeWidth={1.5} className="text-gray-300 group-hover:text-[#FF5722] transition-colors" />
                 <span className="text-[10px] font-black uppercase tracking-widest border border-black/10 px-3 py-1 group-hover:border-white/20">Free Access</span>
              </div>
              <div>
                <h3 className="text-4xl font-black uppercase tracking-tight mb-2">No Investment Required</h3>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest group-hover:text-gray-400">Start earning immediately without paying any joining fees or hidden charges.</p>
              </div>
            </div>

            {/* Box 2: Secure */}
            <div className="industrial-border bg-white p-10 flex flex-col justify-center items-center text-center space-y-6 group hover:border-[#FF5722] transition-colors">
              <div className="w-20 h-20 bg-black text-white rounded-full flex items-center justify-center group-hover:bg-[#FF5722] transition-colors">
                <ShieldCheck size={32} />
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tight">100% Secure</h3>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Protected by advanced encryption & email verification.</p>
            </div>

            {/* Box 3: Local Payments */}
            <div className="industrial-border bg-black text-white p-10 flex flex-col justify-center relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-20">
                <PhoneOutgoing size={80} />
              </div>
              <h3 className="text-3xl font-black uppercase tracking-tight mb-4 z-10">Local Payments</h3>
              <div className="flex gap-2 z-10">
                <span className="bg-[#FF5722] px-3 py-1 text-[9px] font-black uppercase tracking-widest">JazzCash</span>
                <span className="bg-green-600 px-3 py-1 text-[9px] font-black uppercase tracking-widest">EasyPaisa</span>
              </div>
            </div>

            {/* Box 4: Support */}
            <div className="md:col-span-2 industrial-border bg-[#FFF0E6] p-10 flex items-center gap-8 group hover:shadow-lg transition-all">
              <div className="hidden md:block">
                 <CheckCircle2 size={64} className="text-[#FF5722]" strokeWidth={1} />
              </div>
              <div>
                <h3 className="text-3xl font-black uppercase tracking-tight mb-2">24/7 System Support</h3>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Our dedicated team is always ready to assist you with any questions or account issues.</p>
              </div>
              <ArrowRight className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity -translate-x-4 group-hover:translate-x-0" />
            </div>
          </div>
        </div>
      </section>

      {/* User Levels Section (Existing but refined) */}
      <section className="py-32 px-6 bg-[#F5F5F0] border-b-2 border-black relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter">USER <span className="text-[#FF5722]">LEVELS</span></h2>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.5em]">Climb the ranks to unlock better rewards</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <RankCard level="01" name="Useless" perk="New User" color="bg-gray-300" />
            <RankCard level="02" name="Worker" perk="Daily Tasks" color="bg-green-500" />
            <RankCard level="03" name="Soldier" perk="Active User" color="bg-blue-600" />
            <RankCard level="04" name="Captain" perk="High Priority" color="bg-purple-600" />
            <RankCard level="05" name="General" perk="Maximum Rewards" color="bg-[#FF5722]" highlight />
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <footer className="bg-[#E5E4D7] py-24 px-6 text-center border-t-2 border-black relative overflow-hidden">
        <div className="max-w-4xl mx-auto space-y-12 relative z-10">
          <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none">
            READY TO <span className="text-transparent bg-clip-text bg-gradient-to-r from-black to-gray-600">EARN?</span>
          </h2>
          <Link 
            to="/auth" 
            className="inline-flex items-center gap-6 bg-black text-white px-16 py-8 text-xl md:text-2xl font-black uppercase tracking-widest industrial-shadow hover:bg-[#FF5722] hover:shadow-[#FF5722]/50 transition-all hover:-translate-y-2 active:translate-y-0 active:shadow-none"
          >
            Create Free Account <ArrowRight strokeWidth={3} />
          </Link>
          <div className="pt-12 flex flex-col gap-4 opacity-40">
            <div className="barcode-pattern w-48 mx-auto" />
            <p className="text-[9px] font-black uppercase tracking-[0.5em]">THORX EARNING PLATFORM © 2025 • THORX.PRO</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

// --- Sub-components ---

const PayoutRow = ({ index }: { index: number }) => {
  const names = ["ALI K.", "ZAIN B.", "OMAR S.", "SARA A.", "BILAL M.", "HAMZA R.", "FATIMA K.", "USMAN T.", "AHMED Y.", "HASSAN J."];
  const methods = ["JAZZCASH", "EASYPAISA", "BANK TRANSFER"];
  const amounts = ["1,500", "2,400", "850", "5,000", "3,200", "900", "12,000", "1,850", "4,100", "750"];
  
  return (
    <div className="flex items-center justify-between bg-[#1a1a1a] p-3 border-l-2 border-[#FF5722] text-xs font-mono">
      <div className="flex items-center gap-3">
        <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse" />
        <span className="text-gray-300 font-bold uppercase">{names[index]}</span>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-[#FF5722] font-bold">PKR {amounts[index]}</span>
        <span className="text-gray-600 text-[9px] uppercase tracking-widest">{methods[index % 3]}</span>
      </div>
    </div>
  );
};

const ProtocolCard = ({ number, title, icon, desc }: any) => (
  <div className="industrial-border bg-white p-8 md:p-10 space-y-8 industrial-shadow hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] transition-all group h-full flex flex-col">
    <div className="flex justify-between items-start">
      <div className="text-6xl font-black text-black/5 group-hover:text-[#FF5722]/20 transition-colors leading-none">{number}</div>
      <div className="industrial-border p-4 bg-gray-50 group-hover:bg-black group-hover:text-white transition-colors">
        {icon}
      </div>
    </div>
    <div className="space-y-4 flex-1">
      <h3 className="text-2xl font-black uppercase tracking-tight">{title}</h3>
      <p className="text-gray-500 font-bold text-sm leading-relaxed uppercase tracking-wide">{desc}</p>
    </div>
  </div>
);

const RankCard = ({ level, name, perk, color, highlight }: any) => (
  <div className={`industrial-border p-8 flex flex-col gap-6 transition-all group cursor-pointer hover:-translate-y-1 ${
    highlight 
      ? 'bg-black text-white industrial-shadow-lg shadow-[#FF5722]/40 border-[#FF5722]' 
      : 'bg-white text-black hover:bg-gray-50'
  }`}>
    <div className="flex items-center justify-between">
      <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 industrial-border ${highlight ? 'bg-[#FF5722] text-white border-[#FF5722]' : 'bg-black text-white'}`}>
        LVL {level}
      </span>
      {highlight && <Award size={16} className="text-[#FF5722]" />}
    </div>
    <div className="space-y-1">
      <div className="text-2xl font-black uppercase tracking-tighter">{name}</div>
      <div className={`text-[9px] font-black uppercase tracking-widest ${highlight ? 'text-[#FF5722]' : 'text-gray-400'}`}>
        {perk}
      </div>
    </div>
  </div>
);

export default LandingPage;

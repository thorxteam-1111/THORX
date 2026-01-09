
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, ShieldCheck, Zap, TrendingUp, 
  Cpu, UserPlus, PlayCircle, ChevronDown,
  Activity, Radio, Award,
  Users, Wallet, CheckCircle2, PhoneOutgoing, Plus
} from 'lucide-react';
import Logo from '../components/Logo';
import Reveal from '../components/Reveal';

const LandingPage: React.FC = () => {
  const [openFaqIndex, setOpenFaqIndex] = React.useState<number | null>(0);
  
  // Ref for Parallax
  const bgRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onScroll = () => {
       if (bgRef.current) {
          bgRef.current.style.transform = `translateY(${window.scrollY * 0.2}px)`;
       }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-x-hidden selection:bg-[#FF5722] selection:text-white scroll-smooth bg-[#F5F5F0]">
      
      {/* Background Ambience */}
      <div ref={bgRef} className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
         <div className="absolute top-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-[#FF5722]/10 blur-[100px] rounded-full" />
         <div className="absolute bottom-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-black/5 blur-[80px] rounded-full" />
      </div>

      {/* Navigation */}
      <header className="px-5 py-4 md:px-8 md:py-6 flex justify-between items-center z-50 sticky top-0 bg-[#F5F5F0]/80 backdrop-blur-xl border-b border-black/5">
        <div className="flex items-center gap-6">
          <Link to="/">
             <Logo size="sm" className="active:scale-95 transition-transform" />
          </Link>
          <div className="hidden lg:flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              <span>Official Platform</span>
          </div>
        </div>
        <div className="flex items-center gap-4 md:gap-8">
          <Link to="/auth" className="text-[10px] md:text-xs font-black uppercase tracking-widest hover:text-[#FF5722] transition-colors py-2 active:scale-95">Login</Link>
          <Link to="/auth" className="industrial-border bg-black text-white px-4 py-2.5 md:px-6 md:py-3 text-[10px] md:text-xs font-black uppercase tracking-widest hover:bg-[#FF5722] hover:border-[#FF5722] transition-all industrial-shadow-sm active:translate-y-[2px] active:shadow-none flex items-center gap-2 group">
            <span className="hidden md:inline">Register Now</span>
            <span className="md:hidden">Join</span>
            <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center text-center px-5 relative z-10 max-w-7xl mx-auto pt-12 pb-20 md:pt-32 md:pb-40 w-full overflow-hidden">
        <Reveal width="100%" className="flex flex-col items-center" duration={1000}>
          
          <div className="inline-flex items-center gap-2 bg-[#FFF0E6] text-[#FF5722] px-4 py-1.5 md:px-6 md:py-2 border-2 border-[#FF5722] rounded-full text-[9px] md:text-[10px] font-black tracking-widest uppercase mb-6 md:mb-10 industrial-shadow-sm hover:scale-105 transition-transform cursor-default select-none">
            <Zap size={12} fill="currentColor" /> <span className="hidden md:inline">Trusted Earning Platform for Pakistan</span><span className="md:hidden">Verified Earning System</span>
          </div>
          
          <h1 className="text-[clamp(3.5rem,13vw,11rem)] font-black tracking-tighter mb-4 md:mb-8 leading-[0.85] uppercase text-black w-full break-words select-none">
            REAL<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#FF5722] to-[#D84315] relative inline-block">
              EARNINGS.
              <div className="absolute -bottom-1 md:-bottom-6 left-0 w-full h-2 md:h-4 bg-black/5 -z-10 blur-lg md:blur-xl" />
            </span>
          </h1>
          
          <p className="max-w-xl mx-auto text-sm md:text-2xl font-medium text-gray-600 mb-8 md:mb-16 leading-relaxed px-2">
            Thorx is the simplest way to earn online in Pakistan. Watch ads, invite friends, and withdraw <span className="text-black font-black underline underline-offset-4 decoration-[#FF5722] decoration-2 md:decoration-4">Real Cash (PKR)</span>.
          </p>
          
          <div className="flex flex-col w-full sm:w-auto sm:flex-row items-center justify-center gap-4 md:gap-6 px-2">
            <Link 
              to="/auth" 
              className="w-full sm:w-auto bg-black text-white px-8 py-5 md:px-12 md:py-6 text-lg md:text-xl font-black uppercase tracking-widest border-2 border-black hover:bg-[#FF5722] hover:border-[#FF5722] transition-all group flex items-center justify-center gap-4 industrial-shadow hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-x-0 active:translate-y-0 active:shadow-none active:scale-[0.98]"
            >
              Start Earning
              <ArrowRight className="group-hover:translate-x-2 transition-transform" strokeWidth={3} />
            </Link>
            <div className="flex flex-row sm:flex-col items-center sm:items-start gap-2 p-3 sm:p-4 border-t-2 sm:border-t-0 sm:border-l-2 border-black/10 w-full sm:w-auto justify-center sm:justify-start mt-2 sm:mt-0">
              <span className="text-[9px] md:text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</span>
              <span className="text-[10px] md:text-xs font-black text-black uppercase tracking-widest flex items-center gap-2">
                <Cpu size={14} className="text-[#FF5722]" /> SYSTEM ONLINE
              </span>
            </div>
          </div>
        </Reveal>
      </main>

      {/* Marquee Ticker */}
      <section className="bg-black py-3 md:py-4 border-y-4 border-[#FF5722] overflow-hidden whitespace-nowrap z-20 shadow-[0_10px_40px_-10px_rgba(255,87,34,0.3)] touch-none select-none">
        <div className="flex gap-8 md:gap-16 animate-marquee will-change-transform">
          {[1,2,3,4,5,6,7,8].map((i) => (
            <div key={i} className="flex items-center gap-4 md:gap-8 opacity-90">
              <span className="flex items-center gap-2 md:gap-3 text-white font-mono text-[9px] md:text-[10px] tracking-widest uppercase">
                <Radio size={12} className="text-[#FF5722]" /> LIVE:
              </span>
              <span className="text-white font-black text-xs md:text-sm uppercase">PAYOUTS ACTIVE</span>
              <span className="text-[#FF5722] font-mono text-[9px] md:text-[10px] hidden sm:inline">SECURE CONNECTION</span>
              <div className="w-1 h-1 bg-white/20 rounded-full" />
            </div>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 md:py-32 px-5 md:px-6 bg-white relative z-10 border-b-2 border-black">
        <div className="max-w-7xl mx-auto">
          <Reveal>
             <h2 className="text-[10vw] md:text-7xl font-black uppercase tracking-tighter leading-none mb-16 md:mb-24">
               How It <span className="text-[#FF5722]">Works</span>
             </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              { num: "01", title: "Create Account", icon: <UserPlus size={24}/>, desc: "Instant registration with no fees. Verify your email to start." },
              { num: "02", title: "Watch & Earn", icon: <PlayCircle size={24}/>, desc: "Complete daily video tasks to build your balance." },
              { num: "03", title: "Get Paid", icon: <TrendingUp size={24}/>, desc: "Withdraw instantly to JazzCash or EasyPaisa." }
            ].map((item, idx) => (
              <Reveal key={idx} delay={idx * 100}>
                <div className="industrial-border bg-white p-6 md:p-10 space-y-6 md:space-y-8 industrial-shadow transition-all hover:-translate-y-2 hover:shadow-xl group">
                  <div className="flex justify-between items-start">
                    <div className="text-5xl md:text-6xl font-black text-black/5 group-hover:text-[#FF5722]/20 transition-colors">{item.num}</div>
                    <div className="industrial-border p-3 md:p-4 bg-gray-50 group-hover:bg-black group-hover:text-white transition-colors">{item.icon}</div>
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight mb-2">{item.title}</h3>
                    <p className="text-gray-500 font-bold text-[10px] md:text-sm uppercase tracking-wide">{item.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 md:py-32 px-5 md:px-6 bg-[#E5E4D7] border-b-2 border-black">
        <div className="max-w-3xl mx-auto">
           <Reveal className="mb-12">
             <h2 className="text-[8vw] md:text-6xl font-black uppercase tracking-tighter leading-none text-center">
               Common <span className="text-[#FF5722]">Questions</span>
             </h2>
           </Reveal>
           
           <div className="space-y-4">
             {[
               { q: "Is it free to join?", a: "Yes, Thorx is 100% free to join. No hidden charges." },
               { q: "How do I withdraw?", a: "Go to Payouts, select JazzCash/EasyPaisa, and enter your number." },
               { q: "Daily earning limit?", a: "Limits depend on your account tier. Higher tiers earn more." }
             ].map((item, idx) => (
               <Reveal key={idx} delay={idx * 50}>
                 <div 
                   onClick={() => toggleFaq(idx)}
                   className={`industrial-border bg-[#F5F5F0] cursor-pointer transition-all active:scale-[0.99] ${openFaqIndex === idx ? 'bg-white border-black shadow-lg' : ''}`}
                 >
                   <div className="p-5 md:p-6 flex justify-between items-center">
                      <span className="font-black text-xs md:text-sm uppercase tracking-wide pr-4">{item.q}</span>
                      <ChevronDown size={16} className={`transition-transform ${openFaqIndex === idx ? 'rotate-180' : ''}`} />
                   </div>
                   {openFaqIndex === idx && (
                     <div className="px-5 md:px-6 pb-6 text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-widest border-t border-gray-200 pt-4">
                       {item.a}
                     </div>
                   )}
                 </div>
               </Reveal>
             ))}
           </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12 px-6 text-center">
         <Reveal>
            <Logo size="lg" className="border-white mb-8" />
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.3em]">
               © 2025 THORX SYSTEM. ALL RIGHTS RESERVED.
            </p>
         </Reveal>
      </footer>
    </div>
  );
};

export default LandingPage;

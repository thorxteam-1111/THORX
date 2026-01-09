
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Briefcase, Users, CreditCard, HelpCircle, LogOut, Wallet, Zap, Edit2, Menu } from 'lucide-react';
import { User } from '../types';
import Logo from './Logo';

interface SidebarProps {
  user: User;
  onLogout: () => void;
  onEditProfile?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ user, onLogout, onEditProfile }) => {
  const location = useLocation();

  const navItems = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { label: 'Work', icon: Briefcase, path: '/work' },
    { label: 'Team', icon: Users, path: '/referrals' },
    { label: 'Withdraw', icon: CreditCard, path: '/payout' },
    { label: 'Help', icon: HelpCircle, path: '/help' },
  ];

  const tickerItems = [
    "Complete daily tasks to unlock withdrawals",
    "Invite friends for 15% lifetime bonus",
    "Upgrade rank to General for max rewards",
    "Watch full ads to ensure earnings count",
    "Withdrawals processed within 24 hours",
    "Work hard to upgrade your level"
  ];

  return (
    <>
      <header className="sticky top-0 z-[50] w-full font-sans">
        
        {/* 1. Marquee Strip */}
        <div className="bg-[#FF5722] text-white text-[9px] md:text-[10px] font-black uppercase tracking-widest py-2 overflow-hidden relative shadow-md z-30 select-none">
           <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
           <div className="flex whitespace-nowrap animate-marquee">
              {[...tickerItems, ...tickerItems, ...tickerItems].map((text, i) => (
                <div key={i} className="mx-4 md:mx-8 flex items-center gap-2 md:gap-3">
                   <span className="bg-black/20 p-1 rounded-full"><Zap size={8} className="text-white" /></span>
                   <span>{text}</span>
                   <span className="w-1 h-1 bg-black rounded-full opacity-50" />
                </div>
              ))}
           </div>
        </div>

        {/* 2. Main Navigation Bar (Desktop) */}
        <div className="bg-[#E5E4D7]/95 backdrop-blur-md border-b-2 border-black h-16 md:h-20 industrial-shadow-sm flex items-center relative z-20 transition-all">
          
          <Link to="/" className="h-full px-4 md:px-8 border-r-2 border-black flex items-center justify-center hover:bg-white transition-colors">
             <Logo compact className="scale-75 md:scale-100 border-none" size="md" />
          </Link>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex flex-1 items-stretch px-6 gap-4 h-full py-3">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex-1 flex items-center justify-center gap-3 relative group overflow-hidden transition-all duration-300 rounded-lg border-2 active:scale-95 ${
                    isActive 
                      ? 'bg-black border-black text-white shadow-[2px_2px_0px_0px_#FF5722]' 
                      : 'bg-transparent border-transparent hover:bg-white hover:border-black hover:text-black text-gray-500'
                  }`}
                >
                  <item.icon 
                    size={16} 
                    className={`relative z-10 transition-colors duration-300 ${isActive ? 'text-[#FF5722]' : 'text-gray-400 group-hover:text-[#FF5722]'}`} 
                    strokeWidth={isActive ? 3 : 2}
                  />
                  <span className="relative z-10 text-[10px] font-black uppercase tracking-widest">
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* User Stats & Profile (Always Visible) */}
          <div className="flex items-center ml-auto px-4 md:px-6 gap-4 md:gap-6 border-l-2 border-black bg-white h-full">
            
            <div className="flex flex-col items-end pr-2 md:pr-4 md:border-r-2 md:border-gray-100">
              <span className="text-[8px] md:text-[9px] font-black text-gray-400 uppercase tracking-widest mb-0.5 flex items-center gap-1">
                <Wallet size={10} /> Bal<span className="hidden md:inline">ance</span>
              </span>
              <span className="text-sm md:text-lg font-black tracking-tight tabular-nums text-black">
                PKR {user.balance.toLocaleString()}
              </span>
            </div>

            <div className="flex items-center gap-3">
               <button 
                  onClick={onEditProfile}
                  className="w-8 h-8 md:w-10 md:h-10 rounded-full industrial-border p-0.5 relative group cursor-pointer hover:bg-[#FF5722] transition-colors overflow-hidden active:scale-90"
                  title="Edit Profile"
               >
                  <div className="w-full h-full bg-gray-200 rounded-full overflow-hidden relative">
                     <img 
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.avatarSeed || user.name}`} 
                      alt="User" 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" 
                     />
                  </div>
               </button>
               
               <button 
                 onClick={onLogout}
                 className="hidden md:flex items-center justify-center w-10 h-10 bg-gray-100 hover:bg-black hover:text-white rounded-full transition-all text-gray-400 border-2 border-transparent hover:border-black active:scale-90"
                 title="Log Out"
               >
                 <LogOut size={16} />
               </button>
            </div>
          </div>
        </div>
      </header>

      {/* 3. Mobile Bottom Nav (Fixed & Safe Area) */}
      <nav className="lg:hidden fixed bottom-0 left-0 w-full bg-white/95 backdrop-blur-lg border-t-2 border-black z-[100] pb-safe flex justify-around items-center h-16 md:h-20 shadow-[0_-5px_20px_rgba(0,0,0,0.05)]">
         {navItems.map((item) => {
           const isActive = location.pathname === item.path;
           return (
             <Link
               key={item.path}
               to={item.path}
               className={`flex flex-col items-center justify-center w-full h-full gap-1 active:scale-90 transition-transform ${isActive ? 'text-black' : 'text-gray-400'}`}
             >
               <div className={`p-1.5 md:p-2 rounded-xl transition-all ${isActive ? 'bg-[#FF5722] text-white shadow-[2px_2px_0px_0px_#000]' : ''}`}>
                 <item.icon size={18} strokeWidth={isActive ? 2.5 : 2} />
               </div>
               <span className={`text-[8px] font-black uppercase tracking-widest ${isActive ? 'text-[#FF5722]' : ''}`}>{item.label}</span>
             </Link>
           );
         })}
      </nav>
      
      {/* Spacer for Mobile Nav */}
      <div className="lg:hidden h-20" />
    </>
  );
};

export default Sidebar;

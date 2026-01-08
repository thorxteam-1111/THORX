
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Briefcase, Users, CreditCard, HelpCircle, LogOut, Wallet, Zap, Edit2 } from 'lucide-react';
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
    { label: 'Work Area', icon: Briefcase, path: '/work' },
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
    <header className="sticky top-0 z-[1000] w-full font-sans">
      
      {/* 1. Creative Top Strip: Motivational / Live Activity */}
      <div className="bg-[#FF5722] text-white text-[10px] font-black uppercase tracking-widest py-2 overflow-hidden relative shadow-md z-30">
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
         <div className="flex whitespace-nowrap animate-marquee">
            {[...tickerItems, ...tickerItems].map((text, i) => (
              <div key={i} className="mx-8 flex items-center gap-3">
                 <span className="bg-black/20 p-1 rounded-full"><Zap size={10} className="text-white" /></span>
                 <span>{text}</span>
                 <span className="w-1.5 h-1.5 bg-black rounded-full opacity-50" />
              </div>
            ))}
         </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <div className="bg-[#E5E4D7]/95 backdrop-blur-md border-b-2 border-black h-20 industrial-shadow-sm flex relative z-20 transition-all">
        
        {/* Brand Logo - Updated to use Logo Component */}
        <Link to="/" className="w-20 md:w-28 shrink-0 border-r-2 border-black">
           <Logo compact className="w-full h-full border-none" size="lg" />
        </Link>

        {/* Desktop Nav Items */}
        <nav className="hidden lg:flex flex-1 items-stretch px-4 gap-4">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex-1 flex items-center justify-center gap-3 relative group overflow-hidden transition-all duration-300 my-4 rounded-lg border-2 ${
                  isActive 
                    ? 'bg-black border-black text-white shadow-[4px_4px_0px_0px_#FF5722]' 
                    : 'bg-transparent border-transparent hover:bg-white hover:border-black hover:text-black text-gray-500'
                }`}
              >
                <item.icon 
                  size={18} 
                  className={`relative z-10 transition-colors duration-300 ${isActive ? 'text-[#FF5722]' : 'text-gray-400 group-hover:text-[#FF5722]'}`} 
                  strokeWidth={isActive ? 3 : 2}
                />
                <span className="relative z-10 text-[11px] font-black uppercase tracking-widest">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* User Stats & Profile */}
        <div className="flex items-center ml-auto px-6 gap-6 border-l-2 border-black bg-white relative h-full">
          
          {/* Balance Widget (Visible on Desktop) */}
          <div className="hidden md:flex flex-col items-end pr-4 border-r-2 border-gray-100">
            <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-0.5 flex items-center gap-1">
              <Wallet size={10} /> My Balance
            </span>
            <span className="text-lg font-black tracking-tight tabular-nums text-black">
              PKR {user.balance.toLocaleString()}
            </span>
          </div>

          {/* Profile Actions */}
          <div className="flex items-center gap-4">
             <button 
                onClick={onEditProfile}
                className="w-10 h-10 rounded-full industrial-border p-0.5 relative group cursor-pointer hover:bg-[#FF5722] transition-colors overflow-hidden"
                title="Edit Profile"
             >
                <div className="w-full h-full bg-gray-200 rounded-full overflow-hidden relative">
                   <img 
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.avatarSeed || user.name}`} 
                    alt="User" 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" 
                   />
                </div>
                {/* Hover overlay hint */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-full">
                    <Edit2 size={12} className="text-white" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full animate-pulse z-10" />
             </button>
             
             <button 
               onClick={onLogout}
               className="hidden md:flex items-center justify-center w-10 h-10 bg-gray-100 hover:bg-black hover:text-white rounded-full transition-all text-gray-400 border-2 border-transparent hover:border-black"
               title="Log Out"
             >
               <LogOut size={18} />
             </button>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Nav (Fixed) */}
      <nav className="lg:hidden fixed bottom-0 left-0 w-full bg-white border-t-2 border-black z-[1000] pb-safe flex justify-around items-center h-20 shadow-[0_-5px_20px_rgba(0,0,0,0.05)]">
         {navItems.map((item) => {
           const isActive = location.pathname === item.path;
           return (
             <Link
               key={item.path}
               to={item.path}
               className={`flex flex-col items-center justify-center w-full h-full gap-1.5 relative ${isActive ? 'text-black' : 'text-gray-400'}`}
             >
               <div className={`p-2 rounded-xl transition-all ${isActive ? 'bg-[#FF5722] text-white shadow-[2px_2px_0px_0px_#000]' : ''}`}>
                 <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} />
               </div>
               <span className={`text-[8px] font-black uppercase tracking-widest ${isActive ? 'text-[#FF5722]' : ''}`}>{item.label}</span>
             </Link>
           );
         })}
      </nav>
      
      {/* Global CSS for marquee */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
      `}</style>
    </header>
  );
};

export default Sidebar;

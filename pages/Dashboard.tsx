
import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { User } from '../types';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Wallet, DollarSign, Users, Award, Zap, TrendingUp, Calendar, Edit2, X, Save } from 'lucide-react';
import Reveal from '../components/Reveal';

interface DashboardProps {
  user: User;
  onLogout: () => void;
  onUpdateUser: (updatedData: Partial<User>) => void;
}

const data = [
  { name: 'Mon', pkr: 120 },
  { name: 'Tue', pkr: 240 },
  { name: 'Wed', pkr: 180 },
  { name: 'Thu', pkr: 460 },
  { name: 'Fri', pkr: 320 },
  { name: 'Sat', pkr: 550 },
  { name: 'Sun', pkr: 490 },
];

const pieData = [
  { name: 'Ads', value: 45, color: '#FF5722' }, 
  { name: 'Refs', value: 30, color: '#1a1a1a' },   
  { name: 'Bonus', value: 25, color: '#a3a3a3' },   
];

const AVATAR_OPTIONS = ['Felix', 'Aneka', 'Zack', 'Molly', 'Garrett', 'Jack', 'Trouble', 'Bandit'];

const Dashboard: React.FC<DashboardProps> = ({ user, onLogout, onUpdateUser }) => {
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [tempName, setTempName] = useState(user.name);
  const [tempAvatarSeed, setTempAvatarSeed] = useState(user.avatarSeed || user.name);

  const handleSaveProfile = () => {
    onUpdateUser({ name: tempName, avatarSeed: tempAvatarSeed });
    setIsEditingProfile(false);
  };

  return (
    <div className="min-h-screen pb-24 md:pb-12 bg-[#F5F5F0]">
      <Sidebar 
        user={user} 
        onLogout={onLogout} 
        onEditProfile={() => {
            setTempName(user.name);
            setTempAvatarSeed(user.avatarSeed || user.name);
            setIsEditingProfile(true);
        }} 
      />
      
      <main className="max-w-[1200px] mx-auto p-4 md:p-8 space-y-6 mt-4">
        
        {/* HERO SECTION */}
        <Reveal width="100%">
          <section className="relative bg-white p-6 md:p-10 industrial-border industrial-shadow-lg flex flex-col md:flex-row justify-between items-start md:items-end gap-6 group overflow-hidden">
            <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none" />
            
            <div className="relative z-10 space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F5F5F0] border border-gray-200 rounded-full">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_#22c55e]" />
                  <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Active Session</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-black leading-[0.9]">
                  Hello, <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF5722] to-orange-700">{user.name.split(' ')[0]}</span>
                </h2>
            </div>

            <div className="relative z-10 flex flex-col items-end gap-3 w-full md:w-auto">
               <button onClick={() => setIsEditingProfile(true)} className="flex items-center gap-2 px-5 py-2.5 bg-black text-white text-[10px] font-black uppercase tracking-widest hover:bg-[#FF5722] transition-all industrial-shadow-sm active:translate-y-[2px] active:shadow-none">
                  <Edit2 size={12} /> Edit Profile
               </button>
               <div className="text-[9px] font-black text-gray-300 uppercase tracking-[0.2em]">ID: {user.thorxId}</div>
            </div>
          </section>
        </Reveal>

        {/* STATS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Total Earnings", val: `PKR ${user.totalEarnings.toLocaleString()}`, icon: <Wallet size={18}/>, sub: "+12% this week" },
            { label: "Current Balance", val: `PKR ${user.balance.toLocaleString()}`, icon: <DollarSign size={18}/>, sub: "Ready to Withdraw", accent: true },
            { label: "Friends Invited", val: user.referrals.toString(), icon: <Users size={18}/>, sub: "Active Team" },
            { label: "Current Rank", val: "CAPTAIN", icon: <Award size={18}/>, rank: 65 }
          ].map((stat, i) => (
            <Reveal key={i} delay={i * 100}>
               <div className={`p-6 bg-white industrial-border industrial-shadow transition-all duration-300 hover:-translate-y-1 hover:shadow-xl h-full flex flex-col justify-between active:scale-[0.99] ${stat.accent ? 'border-b-4 border-b-[#FF5722]' : ''}`}>
                 <div className="flex justify-between items-start mb-4">
                   <div className={`p-2.5 rounded-lg ${stat.accent ? 'bg-[#FF5722] text-white' : 'bg-[#F5F5F0] text-black'}`}>{stat.icon}</div>
                   {stat.accent && <Zap size={14} className="text-[#FF5722] fill-current" />}
                 </div>
                 <div>
                   <span className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] block mb-1">{stat.label}</span>
                   <span className="text-2xl font-black tracking-tight block text-black">{stat.val}</span>
                   {stat.rank ? (
                     <div className="mt-3 w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                       <div className="h-full bg-black rounded-full" style={{ width: `${stat.rank}%` }} />
                     </div>
                   ) : (
                     <div className={`mt-3 inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-wide ${stat.accent ? 'text-[#FF5722]' : 'text-gray-400'}`}>
                       <TrendingUp size={10} /> {stat.sub}
                     </div>
                   )}
                 </div>
               </div>
            </Reveal>
          ))}
        </div>

        {/* ANALYTICS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          
          <Reveal className="lg:col-span-2 h-[350px]">
            <div className="bg-white p-6 industrial-border industrial-shadow flex flex-col h-full">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="font-black uppercase tracking-wide text-sm">Revenue Flow</h3>
                  <p className="text-[9px] text-gray-400 font-bold uppercase mt-0.5">Last 7 Days</p>
                </div>
                <Calendar size={16} className="text-gray-400" />
              </div>
              <div className="flex-1 w-full -ml-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data}>
                    <defs>
                      <linearGradient id="colorPkr" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#FF5722" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#FF5722" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 10, fontWeight: 700}} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 10, fontWeight: 700}} />
                    <Tooltip contentStyle={{ backgroundColor: '#000', border: 'none' }} itemStyle={{ color: '#fff', fontSize: '12px', fontWeight: 'bold' }} />
                    <Area type="monotone" dataKey="pkr" stroke="#FF5722" strokeWidth={3} fill="url(#colorPkr)" activeDot={{ r: 6, fill: '#fff', stroke: '#FF5722', strokeWidth: 3 }} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </Reveal>

          <Reveal className="h-[350px]" delay={200}>
            <div className="bg-white p-6 industrial-border industrial-shadow flex flex-col h-full">
              <h3 className="font-black uppercase tracking-wide text-sm mb-4">Sources</h3>
              <div className="flex-1 relative flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={pieData} innerRadius={55} outerRadius={75} paddingAngle={5} dataKey="value" stroke="none">
                      {pieData.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-2xl font-black text-black">100%</span>
                  <span className="text-[8px] font-bold uppercase text-gray-400 tracking-widest">Efficiency</span>
                </div>
              </div>
              <div className="flex justify-center gap-4 mt-2">
                 {pieData.map(p => (
                   <div key={p.name} className="flex items-center gap-1.5 text-[9px] font-bold uppercase text-gray-500">
                      <div className="w-2 h-2 rounded-full" style={{backgroundColor: p.color}} /> {p.name}
                   </div>
                 ))}
              </div>
            </div>
          </Reveal>
        </div>

        {/* PROFILE MODAL */}
        {isEditingProfile && (
          <div className="fixed inset-0 bg-black/80 z-[2000] flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white w-full max-w-md industrial-border shadow-2xl flex flex-col animate-in zoom-in-95 duration-300">
              <div className="p-5 border-b-2 border-black flex justify-between items-center bg-gray-50">
                 <h3 className="font-black uppercase tracking-tight text-sm">Edit Profile</h3>
                 <button onClick={() => setIsEditingProfile(false)}><X size={20} /></button>
              </div>
              <div className="p-6 space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Display Name</label>
                  <input value={tempName} onChange={(e) => setTempName(e.target.value)} className="w-full p-3 bg-[#F5F5F0] border-2 border-transparent focus:border-black outline-none font-bold text-sm" />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Avatar</label>
                  <div className="grid grid-cols-4 gap-3">
                    {AVATAR_OPTIONS.map((seed) => (
                      <button key={seed} onClick={() => setTempAvatarSeed(seed)} className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${tempAvatarSeed === seed ? 'border-[#FF5722] ring-2 ring-[#FF5722]/20' : 'border-transparent bg-gray-50'}`}>
                         <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="p-5 border-t-2 border-black flex gap-3 bg-gray-50">
                <button onClick={() => setIsEditingProfile(false)} className="flex-1 py-3 font-bold text-xs uppercase tracking-widest text-gray-500 hover:bg-gray-200">Cancel</button>
                <button onClick={handleSaveProfile} className="flex-[2] py-3 bg-black text-white font-black text-xs uppercase tracking-widest hover:bg-[#FF5722] shadow-[2px_2px_0px_0px_#000] flex items-center justify-center gap-2 active:translate-y-[2px] active:shadow-none"><Save size={14} /> Save</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;

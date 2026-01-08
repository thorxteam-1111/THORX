
import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { User } from '../types';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Wallet, DollarSign, Users, ArrowUpRight, ShieldCheck, Activity, Edit2, X, CheckCircle2, Save } from 'lucide-react';

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
  { name: 'Direct Ads', value: 45, color: '#FF5722' },
  { name: 'Partner Referrals', value: 30, color: '#000000' },
  { name: 'Daily Missions', value: 15, color: '#888888' },
  { name: 'Bonus Events', value: 10, color: '#FFFFFF' },
];

const AVATAR_OPTIONS = ['Felix', 'Aneka', 'Zack', 'Molly', 'Garrett', 'Jack', 'Trouble', 'Bandit'];

const Dashboard: React.FC<DashboardProps> = ({ user, onLogout, onUpdateUser }) => {
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [tempName, setTempName] = useState(user.name);
  const [tempAvatarSeed, setTempAvatarSeed] = useState(user.avatarSeed || user.name);

  const handleSaveProfile = () => {
    // Save both name and the specific avatar seed
    onUpdateUser({ 
        name: tempName,
        avatarSeed: tempAvatarSeed 
    });
    setIsEditingProfile(false);
  };

  return (
    <div className="min-h-screen pb-20">
      <Sidebar 
        user={user} 
        onLogout={onLogout} 
        onEditProfile={() => {
            setTempName(user.name);
            setTempAvatarSeed(user.avatarSeed || user.name);
            setIsEditingProfile(true);
        }} 
      />
      
      <main className="max-w-[1200px] mx-auto p-6 space-y-8 mt-4">
        {/* Welcome Section - ALIGNMENT FIXED */}
        <section className="industrial-border bg-white p-8 md:p-12 relative overflow-hidden industrial-shadow">
          <div className="absolute top-0 left-0 w-full h-1 bg-black" />
          
          {/* Decorative Corner Dots */}
          <div className="absolute top-4 right-4 flex gap-1">
            <div className="w-2 h-2 bg-black" />
            <div className="w-2 h-2 bg-black opacity-20" />
            <div className="w-2 h-2 bg-black opacity-10" />
          </div>
          
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div className="space-y-4 max-w-2xl">
                <div className="inline-flex items-center gap-2 bg-black text-white px-3 py-1 text-[10px] font-black tracking-widest uppercase shadow-[2px_2px_0px_#FF5722]">
                    <ShieldCheck size={12} className="text-[#FF5722]" /> Account Verified • Level 03
                </div>
                <h2 className="text-4xl md:text-6xl font-black uppercase leading-[0.9] tracking-tighter">
                    Welcome Back,<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF5722] to-orange-600">
                        {user.name}
                    </span>
                </h2>
                <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px] max-w-lg leading-relaxed pt-2">
                    Monitor your financial performance and network growth in real-time.
                </p>
            </div>

            <div className="w-full md:w-auto flex flex-row md:flex-col items-center md:items-end gap-4">
                 <button 
                   onClick={() => setIsEditingProfile(true)}
                   className="group flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-black hover:text-white transition-all text-[10px] font-black uppercase tracking-widest industrial-border"
                 >
                    <Edit2 size={12} className="text-gray-400 group-hover:text-[#FF5722]" /> Edit Profile
                 </button>
                 <div className="hidden md:block barcode-pattern w-24 opacity-30" />
            </div>
          </div>
        </section>

        {/* Core Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard 
            label="Total Earnings" 
            value={`PKR ${user.totalEarnings.toLocaleString()}`} 
            icon={<Wallet size={18} />} 
            trend="+15.2% VS LAST WEEK"
          />
          <StatCard 
            label="Available Balance" 
            value={`PKR ${user.balance.toLocaleString()}`} 
            icon={<DollarSign size={18} />} 
            trend="ELIGIBLE FOR WITHDRAWAL"
            accent
          />
          <StatCard 
            label="My Network" 
            value={user.referrals.toString()} 
            icon={<Users size={18} />} 
            trend={`PKR ${(user.referrals * 50).toLocaleString()} BONUS EARNED`}
          />
          <StatCard 
            label="System Rank" 
            value="CAPTAIN" 
            icon={<Activity size={18} />} 
            isProgress
            progressValue={65}
          />
        </div>

        {/* Insights & Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 industrial-border bg-white p-8 industrial-shadow relative overflow-hidden">
            <div className="flex justify-between items-center mb-10">
              <div>
                <h3 className="font-black uppercase tracking-widest text-sm flex items-center gap-2">
                  <Activity size={16} className="text-[#FF5722]" /> Revenue Analytics
                </h3>
                <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">7-Day performance tracking</p>
              </div>
              <button className="industrial-border p-2 hover:bg-black hover:text-white transition-colors">
                <ArrowUpRight size={16} />
              </button>
            </div>
            
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#FF5722" stopOpacity={0.25}/>
                      <stop offset="95%" stopColor="#FF5722" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#E5E4D7" />
                  <XAxis 
                    dataKey="name" 
                    stroke="#000" 
                    fontSize={10} 
                    fontWeight={900}
                    axisLine={false} 
                    tickLine={false} 
                  />
                  <YAxis 
                    stroke="#000" 
                    fontSize={10} 
                    fontWeight={900}
                    axisLine={false} 
                    tickLine={false} 
                    tickFormatter={(val) => `Rs ${val}`} 
                  />
                  <Tooltip 
                    contentStyle={{ 
                      background: '#000', 
                      color: '#fff', 
                      borderRadius: '0', 
                      border: 'none', 
                      fontSize: '10px',
                      fontWeight: 'bold',
                      padding: '12px'
                    }} 
                    itemStyle={{ color: '#FF5722' }}
                    cursor={{ stroke: '#000', strokeWidth: 2 }}
                  />
                  <Area 
                    type="stepAfter" 
                    dataKey="pkr" 
                    stroke="#FF5722" 
                    strokeWidth={4} 
                    fillOpacity={1} 
                    fill="url(#chartGradient)" 
                    animationDuration={1500}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="industrial-border bg-white p-8 industrial-shadow flex flex-col">
            <div className="mb-8">
              <h3 className="font-black uppercase tracking-widest text-sm">Income Allocation</h3>
              <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">Source distribution</p>
            </div>
            
            <div className="flex-1 flex flex-col items-center justify-center">
              <div className="h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      innerRadius={50}
                      outerRadius={75}
                      paddingAngle={4}
                      dataKey="value"
                      strokeWidth={2}
                      stroke="#000"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              <div className="w-full space-y-3 mt-6">
                {pieData.map((item) => (
                  <div key={item.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 border-2 border-black" style={{ backgroundColor: item.color }} />
                      <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">{item.name}</span>
                    </div>
                    <span className="text-[10px] font-black">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Edit Profile Modal */}
        {isEditingProfile && (
          <div className="fixed inset-0 bg-black/90 z-[2000] flex items-center justify-center p-4 backdrop-blur-md animate-in fade-in duration-300">
            <div className="bg-[#111] w-full max-w-lg industrial-border border-[#333] industrial-shadow-lg relative flex flex-col overflow-hidden">
              
              {/* Header */}
              <div className="p-6 border-b border-[#333] flex justify-between items-center bg-black">
                <div className="flex items-center gap-3">
                   <div className="p-2 bg-[#FF5722]/10 rounded border border-[#FF5722]/20 text-[#FF5722]">
                     <Edit2 size={18} />
                   </div>
                   <div>
                     <h3 className="text-white font-black uppercase tracking-widest text-sm">Identity Config</h3>
                     <p className="text-[#FF5722] text-[9px] font-bold uppercase tracking-widest">Update your profile signature</p>
                   </div>
                </div>
                <button 
                  onClick={() => setIsEditingProfile(false)}
                  className="text-gray-500 hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Body */}
              <div className="p-8 space-y-8">
                
                {/* Name Input */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 block">System Name</label>
                  <input 
                    value={tempName}
                    onChange={(e) => setTempName(e.target.value)}
                    className="w-full p-4 bg-black border border-[#333] text-white font-bold outline-none focus:border-[#FF5722] transition-colors uppercase tracking-wider text-sm placeholder:text-gray-700"
                    placeholder="ENTER CODENAME"
                  />
                </div>

                {/* Avatar Selection Grid */}
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 block">Select Avatar</label>
                  <div className="grid grid-cols-4 gap-3">
                    {AVATAR_OPTIONS.map((seed) => (
                      <button
                        key={seed}
                        onClick={() => setTempAvatarSeed(seed)}
                        className={`relative aspect-square rounded-lg border-2 overflow-hidden transition-all group ${
                          tempAvatarSeed === seed 
                            ? 'border-[#FF5722] bg-[#FF5722]/20' 
                            : 'border-[#333] hover:border-white bg-black'
                        }`}
                      >
                         <img 
                          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`} 
                          alt={seed}
                          className={`w-full h-full object-cover transition-all duration-300 ${tempAvatarSeed === seed ? 'grayscale-0 scale-110' : 'grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100'}`}
                         />
                         {tempAvatarSeed === seed && (
                           <div className="absolute top-1 right-1 bg-[#FF5722] rounded-full p-0.5">
                             <CheckCircle2 size={10} className="text-black" />
                           </div>
                         )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-[#333] bg-black flex gap-4">
                <button 
                  onClick={() => setIsEditingProfile(false)}
                  className="flex-1 py-4 text-xs font-black uppercase tracking-widest text-gray-500 hover:text-white transition-colors border border-transparent hover:border-[#333]"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSaveProfile}
                  className="flex-[2] py-4 bg-[#FF5722] text-white text-xs font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all flex items-center justify-center gap-2 group"
                >
                  <Save size={16} className="group-hover:scale-110 transition-transform" /> Save Changes
                </button>
              </div>

            </div>
          </div>
        )}

      </main>
    </div>
  );
};

interface StatCardProps {
  label: string;
  value: string;
  icon: React.ReactNode;
  trend?: string;
  accent?: boolean;
  isProgress?: boolean;
  progressValue?: number;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, icon, trend, accent, isProgress, progressValue }) => (
  <div className={`industrial-border p-6 flex flex-col gap-6 bg-white industrial-shadow transition-all hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]`}>
    <div className="flex justify-between items-start">
      <div className="flex flex-col">
        <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.15em] mb-1">{label}</span>
        <span className={`text-2xl font-black tracking-tight ${accent ? 'text-[#FF5722]' : 'text-black'}`}>{value}</span>
      </div>
      <div className="industrial-border p-2 bg-gray-50 text-black">
        {icon}
      </div>
    </div>
    
    {isProgress ? (
      <div className="space-y-3">
        <div className="flex justify-between items-end mb-1">
          <span className="text-[9px] font-black text-gray-400 uppercase">Next Rank: General</span>
          <span className="text-[9px] font-black">{progressValue}%</span>
        </div>
        <div className="w-full h-2 bg-gray-100 border-2 border-black relative overflow-hidden">
          <div 
            className="h-full bg-black transition-all duration-1000 ease-out" 
            style={{ width: `${progressValue}%` }} 
          />
        </div>
      </div>
    ) : (
      <div className={`flex items-center gap-2 text-[9px] font-black tracking-widest uppercase py-1 px-2 inline-block w-fit ${accent ? 'bg-[#FF5722] text-white' : 'bg-gray-100 text-gray-500'}`}>
        <ArrowUpRight size={10} />
        {trend}
      </div>
    )}
  </div>
);

export default Dashboard;

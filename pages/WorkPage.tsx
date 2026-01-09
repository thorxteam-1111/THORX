
import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { User } from '../types';
import { Target, DollarSign, Play, Activity, Wifi, ShieldCheck, PlayCircle, Zap, CheckSquare, Youtube, Instagram, Eye, Lock, ArrowRight, X, ExternalLink, Copy } from 'lucide-react';
import Reveal from '../components/Reveal';

interface WorkPageProps {
  user: User;
  onLogout: () => void;
}

const WorkPage: React.FC<WorkPageProps> = ({ user, onLogout }) => {
  const [activeArea, setActiveArea] = useState('COSMOS 1');
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [sessionTime, setSessionTime] = useState('00:00:00');
  
  // Task Modal State
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [secretCode, setSecretCode] = useState('');
  const [taskStatus, setTaskStatus] = useState({
    youtube: false,
    instagram: false,
    video: false,
    code: false
  });

  const players = [
    { id: 'COSMOS 1', label: 'Main Stream' },
    { id: 'COSMOS 2', label: 'Partner Ads' },
    { id: 'COSMOS 3', label: 'Bonus Feed' },
    { id: 'COSMOS 4', label: 'Premium' },
  ];

  // Session Timer Logic
  useEffect(() => {
    let startTime = sessionStorage.getItem('thorx_session_start');
    if (!startTime) {
      startTime = Date.now().toString();
      sessionStorage.setItem('thorx_session_start', startTime);
    }
    const startTimestamp = parseInt(startTime, 10);

    const updateTimer = () => {
      const now = Date.now();
      const diff = now - startTimestamp;

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      const fmt = (n: number) => n.toString().padStart(2, '0');
      setSessionTime(`${fmt(hours)}:${fmt(minutes)}:${fmt(seconds)}`);
    };

    updateTimer();
    const intervalId = setInterval(updateTimer, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    let interval: any;
    if (isPlaying && progress < 100) {
      interval = setInterval(() => {
        setProgress(prev => Math.min(prev + 2, 100)); 
      }, 100);
    } else if (progress === 100) {
      setIsPlaying(false);
    }
    return () => clearInterval(interval);
  }, [isPlaying, progress]);

  const handleStartPlay = () => {
    if (!isPlaying) {
      setProgress(0);
      setIsPlaying(true);
    }
  };

  const handleVerifyCode = () => {
    if (secretCode.toLowerCase() === 'thorx2025') {
      setTaskStatus(prev => ({ ...prev, code: true }));
      setSecretCode('');
      // Could show success toast here
    }
  };

  const toggleTask = (task: keyof typeof taskStatus) => {
    if (task !== 'code') {
      // Simulate verification delay
      setTimeout(() => {
        setTaskStatus(prev => ({ ...prev, [task]: true }));
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F0] pb-24 md:pb-12">
      <Sidebar user={user} onLogout={onLogout} />
      
      <main className="max-w-[1200px] mx-auto p-4 md:p-8 space-y-6 mt-4">
        
        {/* Header */}
        <Reveal width="100%">
          <section className="bg-white p-6 md:p-10 industrial-border industrial-shadow-lg flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F5F5F0] border border-gray-200 rounded-full">
                 <span className="w-2 h-2 bg-[#FF5722] rounded-full animate-pulse" />
                 <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">Earning Active</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none">
                Task <span className="text-[#FF5722]">Center</span>
              </h1>
              <p className="text-gray-500 font-medium text-xs md:text-sm max-w-lg">
                Complete daily viewings to unlock withdrawal. Consistency boosts your tier.
              </p>
            </div>
            <div className="hidden md:block text-right">
              <div className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-400">Total Session Time</div>
              <div className="text-3xl font-black tracking-tight tabular-nums font-mono text-black">
                {sessionTime}
              </div>
            </div>
          </section>
        </Reveal>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { 
              label: 'Daily Tasks', 
              val: '0 / 50', 
              icon: <CheckSquare size={16} />, 
              trend: 'Tap to View', 
              action: () => setIsTaskModalOpen(true),
              isInteractive: true
            },
            { label: 'Source', val: activeArea, icon: <Wifi size={16} />, trend: 'Strong Signal' },
            { label: 'Profit', val: 'PKR 0.00', icon: <DollarSign size={16} />, trend: 'Live Est.' },
            { label: 'Tier', val: 'USELESS', icon: <Activity size={16} />, trend: 'Upgrade' },
          ].map((s, i) => (
            <Reveal key={i} delay={i*100}>
              <div 
                onClick={s.action}
                className={`p-4 bg-white industrial-border industrial-shadow h-full flex flex-col justify-between transition-all duration-300 ${s.isInteractive ? 'cursor-pointer hover:bg-black hover:text-white group active:scale-[0.98]' : ''}`}
              >
                 <div className="flex justify-between mb-3">
                   <div className={`p-2 rounded transition-colors ${s.isInteractive ? 'bg-[#F5F5F0] text-black group-hover:bg-[#FF5722] group-hover:text-white' : 'bg-[#F5F5F0]'}`}>
                     {s.icon}
                   </div>
                   <Zap size={12} className={`transition-colors ${s.isInteractive ? 'text-[#FF5722] group-hover:text-white' : 'text-[#FF5722]'}`} fill="currentColor" />
                 </div>
                 <div>
                   <div className={`text-[9px] font-black uppercase tracking-widest mb-1 transition-colors ${s.isInteractive ? 'text-gray-400 group-hover:text-gray-400' : 'text-gray-400'}`}>
                     {s.label}
                   </div>
                   <div className="text-lg font-black">{s.val}</div>
                   {s.isInteractive && (
                      <div className="mt-2 text-[8px] font-bold uppercase tracking-widest text-[#FF5722] animate-pulse flex items-center gap-1">
                        View Required <ArrowRight size={8} />
                      </div>
                   )}
                 </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Player Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          <div className="lg:col-span-4 space-y-4">
             <Reveal>
               <div className="bg-white p-5 industrial-border industrial-shadow space-y-3">
                 <h3 className="font-black text-xs uppercase tracking-widest mb-4 flex items-center gap-2">
                   <PlayCircle size={14} /> Available Channels
                 </h3>
                 {players.map((p) => (
                   <button
                     key={p.id}
                     onClick={() => { if (!isPlaying) { setActiveArea(p.id); setProgress(0); } }}
                     disabled={isPlaying}
                     className={`w-full p-3 border-l-4 transition-all flex items-center justify-between text-left active:scale-[0.98] ${
                       activeArea === p.id 
                         ? 'bg-[#F5F5F0] border-[#FF5722]' 
                         : 'bg-white border-transparent hover:bg-gray-50'
                     } ${isPlaying ? 'opacity-50 cursor-not-allowed' : ''}`}
                   >
                     <div>
                       <div className="text-[8px] font-black uppercase text-gray-400">{p.id}</div>
                       <div className="font-bold text-xs uppercase">{p.label}</div>
                     </div>
                   </button>
                 ))}
               </div>
             </Reveal>

             <Reveal delay={200}>
               <div className="bg-[#FFF0E6] p-5 industrial-border border-[#FF5722] flex gap-3">
                 <ShieldCheck size={20} className="text-[#FF5722] shrink-0" />
                 <p className="text-[9px] font-bold text-gray-700 leading-relaxed">
                   Ad-blockers prevent earnings. Ensure sound is ON for full credit.
                 </p>
               </div>
             </Reveal>
          </div>

          <div className="lg:col-span-8">
             <Reveal delay={100} className="h-full">
               <div className="bg-black p-2 industrial-border industrial-shadow-lg relative h-full min-h-[300px] flex flex-col">
                  {/* Screen */}
                  <div className="flex-1 bg-[#111] relative flex items-center justify-center overflow-hidden border border-[#333]">
                     
                     <div className="scanline" />
                     <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />

                     {!isPlaying && progress === 0 ? (
                       <button onClick={handleStartPlay} className="relative z-20 w-16 h-16 bg-[#FF5722] rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform shadow-[0_0_30px_rgba(255,87,34,0.4)] active:scale-95">
                         <Play size={24} fill="currentColor" className="ml-1" />
                       </button>
                     ) : (
                       <div className="w-full max-w-xs px-6 relative z-20 text-center space-y-6">
                          <div className="flex justify-between items-end">
                            <span className="text-[9px] font-black uppercase text-gray-500 tracking-widest">Buffering</span>
                            <span className="text-4xl font-black text-white tracking-tighter tabular-nums">{progress}%</span>
                          </div>
                          <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                             <div className="h-full bg-[#FF5722] transition-all duration-100 ease-linear shadow-[0_0_10px_#FF5722]" style={{ width: `${progress}%` }} />
                          </div>
                          <div className="text-[9px] font-mono text-[#FF5722] animate-pulse">
                             PROCESSING_REWARD_BLOCK...
                          </div>
                       </div>
                     )}

                     {/* UI Overlays */}
                     <div className="absolute top-3 left-3 flex items-center gap-2 z-20">
                        <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                        <span className="text-[9px] font-mono text-white/60 uppercase">REC • {activeArea}</span>
                     </div>
                  </div>
               </div>
             </Reveal>
          </div>
        </div>
      </main>

      {/* MISSION CONTROL MODAL - OPTIMIZED FOR DESKTOP & MOBILE */}
      {isTaskModalOpen && (
        <div className="fixed inset-0 z-[2000] flex items-end md:items-center justify-center p-0 md:p-6">
           {/* Backdrop */}
           <div 
             className="absolute inset-0 bg-black/80 backdrop-blur-md animate-in fade-in duration-300"
             onClick={() => setIsTaskModalOpen(false)}
           />
           
           {/* Modal Content */}
           <div className="relative w-full md:max-w-3xl bg-[#F5F5F0] industrial-border md:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] animate-in slide-in-from-bottom-10 md:zoom-in-95 duration-300 flex flex-col max-h-[85vh] md:max-h-[85vh] overflow-hidden rounded-t-3xl md:rounded-none border-t-2 md:border-2 border-black">
              
              {/* Header with decorative elements */}
              <div className="shrink-0 flex justify-between items-center p-5 md:p-6 border-b-2 border-black bg-white relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FF5722] via-black to-[#FF5722]" />
                  
                  {/* Desktop Pattern */}
                  <div className="hidden md:block absolute right-0 top-0 h-full w-32 bg-[repeating-linear-gradient(-45deg,transparent,transparent_5px,#f3f4f6_5px,#f3f4f6_10px)] opacity-50" />
                  
                  <div className="absolute -right-4 -top-4 text-black/5 rotate-12 md:opacity-100 opacity-50">
                      <ShieldCheck size={80} />
                  </div>
                  
                  <div className="relative z-10 flex items-center gap-4">
                      <div className="w-12 h-12 bg-black text-white flex items-center justify-center industrial-shadow-sm rounded-xl md:rounded-none">
                          <CheckSquare size={24} />
                      </div>
                      <div>
                          <h3 className="font-black uppercase tracking-tighter text-xl leading-none">Daily Missions</h3>
                          <div className="flex items-center gap-2 mt-1">
                              <div className="w-1.5 h-1.5 bg-[#FF5722] rounded-full animate-pulse" />
                              <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">Reset in 14:23:45</p>
                          </div>
                      </div>
                  </div>
                  <button 
                      onClick={() => setIsTaskModalOpen(false)}
                      className="relative z-10 w-10 h-10 flex items-center justify-center bg-[#F5F5F0] hover:bg-[#FF5722] hover:text-white transition-all border-2 border-transparent hover:border-black rounded-full active:scale-90"
                  >
                      <X size={20} />
                  </button>
              </div>

              {/* Scrollable Body */}
              <div className="flex-1 overflow-y-auto p-5 md:p-8 space-y-6 no-scrollbar bg-[#F5F5F0]">
                  
                  {/* Progress Bar Section */}
                  <div className="bg-white p-5 md:p-6 border-2 border-black shadow-[4px_4px_0px_0px_#ddd] md:shadow-[6px_6px_0px_0px_#ddd]">
                      <div className="flex justify-between items-end mb-2">
                          <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Mission Progress</span>
                          <span className="text-xl font-black text-black">
                              {Math.round((Object.values(taskStatus).filter(Boolean).length / 4) * 100)}%
                          </span>
                      </div>
                      <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden border border-gray-200">
                          <div 
                              className="h-full bg-[#FF5722] transition-all duration-500 ease-out" 
                              style={{ width: `${(Object.values(taskStatus).filter(Boolean).length / 4) * 100}%` }} 
                          />
                      </div>
                  </div>

                  {/* Desktop Grid Layout */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    
                    {/* Social Tasks Group */}
                    <div className="space-y-4">
                        <SectionHeader title="Social Verification" />
                        
                        <TaskItem 
                            icon={<Youtube size={24} />}
                            label="Subscribe Channel"
                            subLabel="Official YouTube"
                            actionLabel="Subscribe"
                            isCompleted={taskStatus.youtube}
                            onClick={() => toggleTask('youtube')}
                            color="bg-[#FF0000]"
                        />

                        <TaskItem 
                            icon={<Instagram size={24} />}
                            label="Follow Instagram"
                            subLabel="@ThorxOfficial"
                            actionLabel="Follow"
                            isCompleted={taskStatus.instagram}
                            onClick={() => toggleTask('instagram')}
                            color="bg-[#E1306C]"
                        />
                    </div>

                    {/* Engagement Tasks Group */}
                    <div className="space-y-4">
                        <SectionHeader title="Engagement Protocol" />

                        <TaskItem 
                            icon={<Eye size={24} />}
                            label="Watch Briefing"
                            subLabel="Find Code at 00:45"
                            actionLabel="Watch Video"
                            isCompleted={taskStatus.video}
                            onClick={() => toggleTask('video')}
                            color="bg-[#000000]"
                        />

                        {/* Secure Code Input - Moved inside grid for better desktop layout */}
                        <div className={`transition-all duration-300 h-full ${taskStatus.code ? 'opacity-50 grayscale' : 'opacity-100'}`}>
                            <div className="bg-black text-white p-5 border-2 border-black relative overflow-hidden group rounded-xl md:rounded-none h-full flex flex-col justify-between">
                                {/* Matrix effect bg */}
                                <div className="absolute inset-0 bg-[linear-gradient(0deg,transparent_24%,rgba(255,87,34,.3)_25%,rgba(255,87,34,.3)_26%,transparent_27%,transparent_74%,rgba(255,87,34,.3)_75%,rgba(255,87,34,.3)_76%,transparent_77%,transparent),linear-gradient(90deg,transparent_24%,rgba(255,87,34,.3)_25%,rgba(255,87,34,.3)_26%,transparent_27%,transparent_74%,rgba(255,87,34,.3)_75%,rgba(255,87,34,.3)_76%,transparent_77%,transparent)] bg-[size:30px_30px] opacity-20" />
                                
                                <div className="relative z-10 flex flex-col gap-4">
                                    <div className="flex items-start gap-3">
                                        <div className="p-2 bg-[#FF5722] text-black rounded">
                                            <Lock size={20} />
                                        </div>
                                        <div>
                                            <h4 className="font-black text-sm uppercase tracking-wider text-white">Security Clearance</h4>
                                            <p className="text-[10px] text-gray-400 font-mono">Enter the 8-digit code from video</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-2 mt-auto">
                                        <input 
                                            value={secretCode}
                                            onChange={(e) => setSecretCode(e.target.value)}
                                            placeholder="ENTER_CODE"
                                            disabled={taskStatus.code}
                                            className="flex-1 bg-white/10 border-2 border-white/20 p-2 md:p-3 text-center font-mono text-base md:text-lg font-bold tracking-[0.2em] uppercase text-[#FF5722] placeholder:text-gray-700 focus:border-[#FF5722] focus:bg-black outline-none transition-all"
                                        />
                                    </div>
                                    <button 
                                        onClick={handleVerifyCode}
                                        disabled={taskStatus.code || !secretCode}
                                        className={`w-full py-3 font-black uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-2 rounded md:rounded-none ${
                                            taskStatus.code 
                                                ? 'bg-green-500 text-black cursor-default' 
                                                : 'bg-[#FF5722] text-white hover:bg-white hover:text-black active:scale-[0.98]'
                                        }`}
                                    >
                                        {taskStatus.code ? <><CheckSquare size={14} /> Verified</> : 'Verify Protocol'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                  </div>
              </div>

              {/* Footer Actions */}
              <div className="shrink-0 p-5 md:p-6 bg-white border-t-2 border-black flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                  <div className="flex items-center justify-center md:justify-start gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                      <ShieldCheck size={14} />
                      <span>Verification required for payout</span>
                  </div>
                  <button 
                      onClick={() => setIsTaskModalOpen(false)}
                      className="w-full md:w-auto md:px-8 py-4 md:py-3 bg-black text-white font-black uppercase tracking-[0.2em] text-xs hover:bg-[#FF5722] transition-colors flex items-center justify-center gap-2 active:scale-95 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] hover:shadow-none rounded-xl md:rounded-none"
                  >
                      Close Panel
                  </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

// Helper Components
const SectionHeader = ({ title }: { title: string }) => (
  <div className="flex items-center gap-4 py-2">
    <div className="h-px bg-gray-300 flex-1" />
    <span className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em]">{title}</span>
    <div className="h-px bg-gray-300 flex-1" />
  </div>
);

const TaskItem = ({ icon, label, subLabel, actionLabel, isCompleted, onClick, color }: any) => (
  <div 
    onClick={!isCompleted ? onClick : undefined}
    className={`group relative overflow-hidden bg-white border-2 transition-all duration-300 rounded-xl md:rounded-none ${
        isCompleted 
            ? 'border-green-500 opacity-80' 
            : 'border-black hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] cursor-pointer'
    }`}
  >
     {/* Status Bar */}
     <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${isCompleted ? 'bg-green-500' : color}`} />
     
     <div className="flex items-center justify-between p-4 pl-6">
        <div className="flex items-center gap-4">
           <div className={`w-10 h-10 rounded flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-110 ${isCompleted ? 'bg-green-500' : color}`}>
              {isCompleted ? <CheckSquare size={20} /> : icon}
           </div>
           <div>
              <div className="font-black text-xs uppercase tracking-tight flex items-center gap-2">
                  {label}
                  {isCompleted && <span className="text-[8px] bg-green-100 text-green-700 px-1.5 rounded">DONE</span>}
              </div>
              <div className="text-[10px] font-bold text-gray-400 mt-0.5">{subLabel}</div>
           </div>
        </div>
        
        {!isCompleted && (
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-gray-100 text-black text-[9px] font-black uppercase tracking-widest group-hover:bg-black group-hover:text-white transition-colors rounded md:rounded-none">
                {actionLabel} <ArrowRight size={10} />
            </div>
        )}
        {!isCompleted && (
            <div className="sm:hidden text-gray-300 group-hover:text-black">
                <ExternalLink size={18} />
            </div>
        )}
     </div>
  </div>
);

export default WorkPage;


import React, { useEffect, useState } from 'react';
import { Cpu } from 'lucide-react';

interface LoadingScreenProps {
  progress: number;
}

const BOOT_LOGS = [
  "INITIALIZING_CORE...",
  "ESTABLISHING_SECURE_LINK...",
  "VERIFYING_IDENTITY...",
  "LOADING_ASSETS...",
  "SYNCING_FINANCIAL_DATA...",
  "SYSTEM_READY"
];

const LoadingScreen: React.FC<LoadingScreenProps> = ({ progress }) => {
  const [logIndex, setLogIndex] = useState(0);

  useEffect(() => {
    if (logIndex < BOOT_LOGS.length - 1) {
      const timeout = setTimeout(() => {
        setLogIndex(prev => prev + 1);
      }, 300); // Cycle logs every 300ms
      return () => clearTimeout(timeout);
    }
  }, [logIndex]);

  return (
    <div className="fixed inset-0 bg-[#050505] z-[9999] flex flex-col items-center justify-center overflow-hidden font-mono text-white">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
      
      <div className="relative z-10 flex flex-col items-center gap-8 w-full max-w-xs px-6">
         {/* Main Icon */}
         <div className="w-24 h-24 border-2 border-[#FF5722] rounded-full flex items-center justify-center relative animate-pulse shadow-[0_0_30px_rgba(255,87,34,0.3)]">
            <Cpu size={48} className="text-[#FF5722]" strokeWidth={1.5} />
            <div className="absolute inset-0 border-t-2 border-[#FF5722] rounded-full animate-spin" />
         </div>

         {/* Progress Bar */}
         <div className="w-full space-y-2">
            <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-gray-500">
               <span>Loading</span>
               <span className="text-[#FF5722]">{Math.min(progress, 100)}%</span>
            </div>
            <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
               <div 
                 className="h-full bg-[#FF5722] transition-all duration-100 ease-out" 
                 style={{ width: `${progress}%` }} 
               />
            </div>
         </div>

         {/* Boot Logs */}
         <div className="h-6 overflow-hidden flex flex-col items-center">
            <div key={logIndex} className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 animate-in slide-in-from-bottom-2 fade-in duration-300">
               {BOOT_LOGS[logIndex]}
            </div>
         </div>
      </div>
    </div>
  );
};

export default LoadingScreen;

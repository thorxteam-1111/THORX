
import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { User } from '../types';
import { PhoneOutgoing, ShieldCheck, ArrowUpRight, CheckCircle2, History, User as UserIcon, Wallet, AlertCircle } from 'lucide-react';
import Reveal from '../components/Reveal';

interface PayoutPageProps {
  user: User;
  onLogout: () => void;
}

const PayoutPage: React.FC<PayoutPageProps> = ({ user, onLogout }) => {
  const [method, setMethod] = useState<'JazzCash' | 'EasyPaisa'>('JazzCash');
  const [amount, setAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const feePercentage = 2.5;
  const numericAmount = parseFloat(amount) || 0;
  const feeAmount = (numericAmount * feePercentage) / 100;
  const netAmount = Math.max(0, numericAmount - feeAmount);

  const methods = [
    { 
      id: 'JazzCash', 
      // Using Logo.wine for high availability and correct branding
      logo: 'https://download.logo.wine/logo/JazzCash/JazzCash-Logo.wine.png', 
      label: 'JazzCash',
    },
    { 
      id: 'EasyPaisa', 
      // Using Logo.wine for high availability and correct branding
      logo: 'https://download.logo.wine/logo/Easypaisa/Easypaisa-Logo.wine.png', 
      label: 'EasyPaisa',
    },
  ];

  const handleLiquidation = () => {
    if (numericAmount < 500) return;
    setIsProcessing(true);
    setTimeout(() => setIsProcessing(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#F5F5F0] pb-24 md:pb-12">
      <Sidebar user={user} onLogout={onLogout} />
      
      <main className="max-w-[1200px] mx-auto p-4 md:p-8 space-y-8 mt-4">
        
        {/* Header */}
        <Reveal width="100%">
          <section className="bg-white p-6 md:p-10 industrial-border industrial-shadow-lg flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div className="space-y-3">
               <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F5F5F0] border border-gray-200 rounded-full">
                 <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                 <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">Payouts Active</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none">
                Withdraw <span className="text-[#FF5722]">Funds</span>
              </h1>
              <p className="text-gray-500 font-medium text-xs md:text-sm max-w-lg">
                Transfer your available balance securely. 24h Processing.
              </p>
            </div>
          </section>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          <div className="lg:col-span-8 space-y-6">
            
            {/* Method Selection */}
            <Reveal delay={100}>
              <section className="bg-white p-6 md:p-8 industrial-border industrial-shadow">
                <h3 className="font-black uppercase tracking-widest text-xs mb-6">Transfer Method</h3>
                <div className="grid grid-cols-2 gap-4">
                  {methods.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => setMethod(m.id as any)}
                      className={`relative p-4 border-2 rounded-xl flex flex-col items-center justify-center gap-4 transition-all active:scale-[0.98] group overflow-hidden ${
                        method === m.id 
                          ? 'border-black bg-gray-50 shadow-md' 
                          : 'border-transparent bg-[#F5F5F0] hover:bg-gray-100'
                      }`}
                    >
                      {/* Logo Container - White background and specific padding to handle different logo aspect ratios */}
                      <div className="h-24 w-full flex items-center justify-center p-2 bg-white rounded-lg border border-gray-100 select-none overflow-hidden relative">
                         {/* Fallback to text if image fails, but try to load image first */}
                         <img 
                            src={m.logo} 
                            alt={m.label} 
                            className="w-full h-full object-contain relative z-10"
                            onError={(e) => {
                                // Fallback if Logo.wine fails (rare)
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                                target.parentElement!.innerHTML = `<span class='font-black text-xl'>${m.label}</span>`;
                            }}
                         />
                      </div>
                      
                      {method === m.id && (
                        <div className="absolute top-2 right-2">
                           <CheckCircle2 size={16} className="text-[#FF5722]" fill="currentColor" color="white" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </section>
            </Reveal>

            {/* Input Details */}
            <Reveal delay={200}>
              <section className="bg-white p-6 md:p-8 industrial-border industrial-shadow space-y-6">
                <div className="flex justify-between items-center">
                   <h3 className="font-black uppercase tracking-widest text-xs">Recipient Details</h3>
                   <div className="text-[9px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1">
                     <ShieldCheck size={12} className="text-[#FF5722]" /> 256-bit Encrypted
                   </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2 group">
                    <label className="text-[9px] font-black uppercase tracking-widest text-gray-500">Account No</label>
                    <div className="relative">
                      <input className="w-full p-3 pl-10 bg-[#F5F5F0] rounded-lg outline-none font-bold text-sm transition-all focus:bg-white focus:ring-2 focus:ring-black/5" placeholder="03XXXXXXXXX" />
                      <PhoneOutgoing size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    </div>
                  </div>
                  <div className="space-y-2 group">
                    <label className="text-[9px] font-black uppercase tracking-widest text-gray-500">Account Name</label>
                    <div className="relative">
                      <input className="w-full p-3 pl-10 bg-[#F5F5F0] rounded-lg outline-none font-bold text-sm transition-all focus:bg-white focus:ring-2 focus:ring-black/5" placeholder="Full Name" />
                      <UserIcon size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    </div>
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-gray-100">
                  <label className="text-[9px] font-black uppercase tracking-widest text-gray-500">Withdrawal Amount</label>
                  <div className="relative">
                     <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl font-black text-gray-300">PKR</span>
                     <input 
                        type="tel"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="0.00"
                        className="w-full pl-16 pr-4 py-4 bg-[#F5F5F0] rounded-xl text-3xl font-black text-black outline-none focus:ring-2 focus:ring-black/5 transition-all placeholder:text-gray-300 tabular-nums"
                     />
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4 p-4 bg-gray-50 rounded-lg text-[10px] font-medium text-gray-600">
                     <div className="flex justify-between flex-1">
                        <span>Service Fee ({feePercentage}%)</span>
                        <span className="font-bold text-red-500">- Rs {feeAmount.toLocaleString()}</span>
                     </div>
                     <div className="w-px h-3 bg-gray-300 hidden sm:block" />
                     <div className="flex justify-between flex-1">
                        <span>Receivable</span>
                        <span className="font-black text-black">Rs {netAmount.toLocaleString()}</span>
                     </div>
                  </div>
                </div>

                <button 
                  disabled={numericAmount < 500 || isProcessing}
                  onClick={handleLiquidation}
                  className={`w-full py-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center justify-center gap-3 shadow-lg active:scale-95 ${
                    numericAmount >= 500 
                      ? 'bg-black text-white hover:bg-[#FF5722]' 
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
                  }`}
                >
                  {isProcessing ? 'Processing...' : 'Confirm Withdrawal'}
                  {!isProcessing && <ArrowUpRight size={16} />}
                </button>
              </section>
            </Reveal>
          </div>

          <div className="lg:col-span-4 space-y-6">
            <Reveal delay={300}>
              <div className="bg-black text-white p-6 rounded-none industrial-border relative overflow-hidden group">
                 <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-40 transition-opacity">
                    <Wallet size={64} />
                 </div>
                 <div className="relative z-10 space-y-1">
                   <h4 className="text-[9px] font-black uppercase tracking-[0.2em] text-[#FF5722]">Available Funds</h4>
                   <div className="text-4xl font-black tracking-tighter tabular-nums">
                     <span className="text-lg text-gray-500 mr-1">PKR</span>{user.balance.toLocaleString()}
                   </div>
                 </div>
                 <div className="relative z-10 mt-6 pt-4 border-t border-white/10 text-[9px] font-bold text-gray-400 uppercase tracking-widest flex justify-between">
                   <span>Min Withdraw</span>
                   <span className="text-white">PKR 500</span>
                 </div>
              </div>
            </Reveal>

            <Reveal delay={400}>
              <div className="bg-white p-6 industrial-border industrial-shadow">
                 <h3 className="font-black uppercase tracking-widest text-xs mb-4 flex items-center gap-2">
                   <History size={14} /> Recent Activity
                 </h3>
                 <div className="space-y-4">
                    <TransactionRow date="Oct 24" amount="1,540" method="JazzCash" status="Paid" />
                    <TransactionRow date="Oct 12" amount="850" method="EasyPaisa" status="Paid" />
                 </div>
              </div>
            </Reveal>

            <Reveal delay={500}>
              <div className="p-4 bg-[#FFF0E6] border-l-4 border-[#FF5722] rounded-r-lg">
                 <div className="flex gap-3">
                    <AlertCircle size={18} className="text-[#FF5722] shrink-0" />
                    <p className="text-[10px] font-medium text-gray-600 leading-relaxed">
                      Ensure account title matches your ID. Mismatch causes failed transfers.
                    </p>
                 </div>
              </div>
            </Reveal>
          </div>
        </div>
      </main>
    </div>
  );
};

const TransactionRow = ({ date, amount, method, status }: any) => (
  <div className="flex justify-between items-center group cursor-default">
    <div className="flex items-center gap-3">
       <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-black group-hover:text-white transition-colors">
          <ArrowUpRight size={14} />
       </div>
       <div>
         <div className="text-xs font-bold text-black uppercase">PKR {amount}</div>
         <div className="text-[8px] font-bold text-gray-400 uppercase tracking-wide">{date} • {method}</div>
       </div>
    </div>
    <div className="px-2 py-0.5 bg-green-50 text-green-600 text-[8px] font-black uppercase tracking-widest rounded">
      {status}
    </div>
  </div>
);

export default PayoutPage;

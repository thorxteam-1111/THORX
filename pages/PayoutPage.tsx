
import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { User } from '../types';
import { 
  CreditCard, Landmark, PhoneOutgoing, ShieldCheck, 
  AlertCircle, ArrowUpRight, CheckCircle2, History, 
  Banknote, Cpu, Activity, Info, ChevronRight,
  TrendingDown, Zap
} from 'lucide-react';

interface PayoutPageProps {
  user: User;
  onLogout: () => void;
}

const PayoutPage: React.FC<PayoutPageProps> = ({ user, onLogout }) => {
  const [method, setMethod] = useState<'JazzCash' | 'EasyPaisa' | 'Bank'>('JazzCash');
  const [amount, setAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const feePercentage = 2.5;
  const numericAmount = parseFloat(amount) || 0;
  const feeAmount = (numericAmount * feePercentage) / 100;
  const netAmount = Math.max(0, numericAmount - feeAmount);

  const methods = [
    { id: 'JazzCash', icon: PhoneOutgoing, label: 'JazzCash', color: 'bg-yellow-400' },
    { id: 'EasyPaisa', icon: CreditCard, label: 'EasyPaisa', color: 'bg-green-500' },
    { id: 'Bank', icon: Landmark, label: 'Bank Transfer', color: 'bg-blue-600' },
  ];

  const handleLiquidation = () => {
    if (numericAmount < 500) return;
    setIsProcessing(true);
    setTimeout(() => setIsProcessing(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#E5E4D7] pb-20 selection:bg-[#FF5722] selection:text-white">
      <Sidebar user={user} onLogout={onLogout} />
      
      <main className="max-w-[1300px] mx-auto p-4 md:p-8 space-y-12 mt-6">
        {/* Payout Hero */}
        <header className="industrial-border bg-white p-10 md:p-20 text-center relative industrial-shadow overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-black" />
          <div className="absolute top-6 left-6 flex items-center gap-2">
            <div className="w-2 h-2 bg-[#FF5722] rounded-full animate-ping" />
            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-400">Withdrawals Active</span>
          </div>
          
          <div className="bg-black text-white px-5 py-2 text-[11px] font-black tracking-[0.4em] inline-block mx-auto uppercase mb-8 shadow-[4px_4px_0px_0px_rgba(255,87,34,1)]">
            Official Payout Channel
          </div>
          <h1 className="text-5xl md:text-[8rem] font-black uppercase tracking-tighter leading-none mb-8 text-black">
            Get <span className="text-[#FF5722]">Paid.</span>
          </h1>
          <p className="text-gray-500 font-bold uppercase tracking-widest text-xs max-w-xl mx-auto leading-relaxed">
            Transfer your earnings directly to your bank or mobile wallet. Fast, secure, and reliable processing for all users in Pakistan.
          </p>
          
          <div className="flex justify-center gap-12 mt-12 opacity-30">
            <div className="barcode-pattern w-32" />
            <div className="barcode-pattern w-32" />
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Withdrawal Interface */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Step 1: Select Method */}
            <section className="industrial-border bg-white p-10 industrial-shadow relative">
              <div className="flex items-center justify-between border-b-2 border-black pb-6 mb-10">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 industrial-border bg-black text-[#FF5722] flex items-center justify-center font-black">01</div>
                  <h3 className="font-black uppercase tracking-[0.2em] text-sm">Select Payment Method</h3>
                </div>
                <div className="hidden sm:flex items-center gap-2 text-[10px] font-black text-green-500 uppercase tracking-widest">
                  <Activity size={12} /> Status: Online
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {methods.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setMethod(m.id as any)}
                    className={`industrial-border p-10 flex flex-col items-center gap-8 transition-all relative group ${
                      method === m.id 
                        ? 'bg-black text-white industrial-shadow-sm' 
                        : 'bg-[#F5F5F0] hover:bg-gray-100'
                    }`}
                  >
                    <div className={`p-5 industrial-border ${m.color} text-white transition-transform group-hover:scale-110 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]`}>
                      <m.icon size={32} strokeWidth={2.5} />
                    </div>
                    <div className="text-center">
                      <span className="font-black uppercase text-[11px] tracking-[0.2em] block">{m.label}</span>
                      <span className="text-[8px] font-bold text-gray-500 uppercase tracking-widest mt-1">Time: 24 Hours</span>
                    </div>
                    {method === m.id && (
                      <div className="absolute top-3 right-3 flex gap-1">
                        <div className="w-1.5 h-1.5 bg-[#FF5722]" />
                        <div className="w-1.5 h-1.5 bg-[#FF5722] opacity-50" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </section>

            {/* Step 2: Details */}
            <section className="industrial-border bg-white p-10 industrial-shadow">
              <div className="flex items-center justify-between border-b-2 border-black pb-6 mb-10">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 industrial-border bg-black text-[#FF5722] flex items-center justify-center font-black">02</div>
                  <h3 className="font-black uppercase tracking-[0.2em] text-sm">Account Details</h3>
                </div>
                <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  <ShieldCheck size={12} className="text-[#FF5722]" /> Secure Form
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-4">
                  <PayoutInput label="Account Number / Mobile No" placeholder={method === 'Bank' ? 'IBAN / Account Number' : '03XXXXXXXXX'} icon={<PhoneOutgoing size={16} />} />
                  <PayoutInput label="Account Title / Name" placeholder="Full Name on Account" icon={<UserIcon size={16} />} />
                </div>

                <div className="space-y-6">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 block">Amount to Withdraw (PKR)</label>
                  <div className="relative group">
                    <input 
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full p-8 industrial-border bg-[#FFF0E6] focus:bg-white outline-none font-black text-5xl tabular-nums transition-all placeholder:text-gray-200"
                      placeholder="0.00"
                    />
                    <div className="absolute right-8 top-1/2 -translate-y-1/2 font-black text-[#FF5722] text-2xl group-focus-within:animate-pulse">PKR</div>
                  </div>
                  
                  {/* Real-time Ledger */}
                  <div className="bg-black text-white p-6 space-y-4 font-mono text-[10px] uppercase tracking-widest industrial-border border-gray-800">
                    <div className="flex justify-between">
                      <span>Withdrawal Amount:</span>
                      <span className="text-gray-400">Rs {numericAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-[#FF5722]">
                      <span>Service Fee ({feePercentage}%):</span>
                      <span>- Rs {feeAmount.toLocaleString()}</span>
                    </div>
                    <div className="h-[1px] bg-white/10" />
                    <div className="flex justify-between text-lg font-black font-sans tracking-tight">
                      <span>You Receive:</span>
                      <span className="text-[#FF5722]">Rs {netAmount.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Final Confirmation Button */}
            <button 
              disabled={numericAmount < 500 || isProcessing}
              onClick={handleLiquidation}
              className={`w-full py-12 text-3xl font-black uppercase tracking-[0.6em] industrial-border transition-all flex items-center justify-center gap-10 relative overflow-hidden group ${
                numericAmount >= 500 
                  ? 'bg-[#FF5722] text-white industrial-shadow-lg hover:bg-black hover:shadow-[#FF5722]/40 active:translate-y-1' 
                  : 'bg-gray-100 text-gray-300 cursor-not-allowed'
              }`}
            >
              {isProcessing && <div className="absolute inset-0 bg-white/20 animate-pulse" />}
              <span className="relative z-10">{isProcessing ? 'Processing Request...' : 'Confirm Withdrawal'}</span>
              {!isProcessing && <ArrowUpRight size={40} strokeWidth={4} className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />}
            </button>
          </div>

          {/* Side Panels / Status */}
          <div className="lg:col-span-4 space-y-8 sticky top-24">
            
            {/* Balance Card */}
            <div className="industrial-border bg-black text-white p-10 industrial-shadow space-y-8 overflow-hidden relative">
              <div className="scanline opacity-10" />
              <div className="absolute top-0 right-0 p-4">
                <div className="w-12 h-12 border-t-2 border-r-2 border-[#FF5722]/30" />
              </div>
              
              <div className="space-y-1">
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#FF5722]">Available Balance</span>
                <div className="text-6xl font-black tracking-tighter tabular-nums">PKR {user.balance.toLocaleString()}</div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 p-4 border border-white/10">
                  <div className="text-[8px] font-black text-gray-500 uppercase tracking-widest mb-1">Min Withdraw</div>
                  <div className="text-lg font-black">PKR 500</div>
                </div>
                <div className="bg-white/5 p-4 border border-white/10">
                  <div className="text-[8px] font-black text-gray-500 uppercase tracking-widest mb-1">Status</div>
                  <div className="text-lg font-black text-green-500">VERIFIED</div>
                </div>
              </div>

              <div className="pt-6 border-t border-white/10 flex items-center gap-4">
                <div className="p-3 industrial-border border-[#FF5722] bg-[#FF5722]/10 text-[#FF5722]">
                  <ShieldCheck size={20} />
                </div>
                <p className="text-[9px] font-black uppercase text-gray-400 leading-relaxed tracking-widest">
                  Secure Connection: Your transfer is protected by end-to-end encryption.
                </p>
              </div>
            </div>

            {/* Payout History */}
            <section className="industrial-border bg-white p-10 industrial-shadow space-y-8">
              <div className="flex items-center justify-between border-b-2 border-black pb-4">
                <h3 className="font-black uppercase tracking-widest text-[11px] text-gray-400 flex items-center gap-2">
                  <History size={16} /> Withdrawal History
                </h3>
              </div>
              <div className="space-y-8">
                <LedgerItem date="OCT 24, 2024" amount="1,540.00" method="JAZZCASH" status="COMPLETED" id="TXN_77412" />
                <LedgerItem date="OCT 12, 2024" amount="850.00" method="EASYPAISA" status="COMPLETED" id="TXN_66190" />
                <LedgerItem date="OCT 01, 2024" amount="2,400.00" method="BANK" status="COMPLETED" id="TXN_55011" />
              </div>
              <button className="w-full py-4 text-center text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-black hover:bg-gray-50 transition-all border-t-2 border-dashed border-black/10 mt-6">
                View All Transactions
              </button>
            </section>

            {/* System Warnings */}
            <div className="p-6 industrial-border bg-[#FFF0E6] flex gap-5 border-l-[12px] border-l-[#FF5722]">
              <AlertCircle className="text-[#FF5722] shrink-0" size={28} />
              <div className="space-y-1">
                <h4 className="text-[11px] font-black uppercase tracking-tight text-black">Important Note</h4>
                <p className="text-[9px] font-bold uppercase text-gray-600 leading-relaxed tracking-wide">
                  Please double-check your account details. Transfers cannot be reversed once processed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const PayoutInput = ({ label, placeholder, icon }: any) => (
  <div className="space-y-3 group">
    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block transition-colors group-focus-within:text-black">{label}</label>
    <div className="relative">
      <input 
        className="w-full p-5 industrial-border bg-[#F5F5F0] focus:bg-white outline-none font-black text-sm transition-all tracking-tight"
        placeholder={placeholder}
      />
      <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#FF5722] transition-colors">
        {icon}
      </div>
    </div>
  </div>
);

const LedgerItem = ({ date, amount, status, method, id }: any) => (
  <div className="flex justify-between items-center group cursor-pointer hover:bg-gray-50 -mx-2 px-2 py-1 transition-colors">
    <div className="space-y-1">
      <div className="flex items-center gap-2">
        <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{date}</span>
        <div className="w-1 h-1 bg-gray-300 rounded-full" />
        <span className="text-[8px] font-mono font-bold text-gray-300">{id}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm font-black tabular-nums">PKR {amount}</span>
        <span className="text-[8px] font-black bg-black text-white px-1.5 py-0.5">{method}</span>
      </div>
    </div>
    <div className="flex items-center gap-2 text-green-600">
      <div className="flex flex-col items-end">
        <span className="text-[9px] font-black uppercase tracking-widest">{status}</span>
        <span className="text-[7px] font-bold text-gray-300 uppercase">Verified</span>
      </div>
      <CheckCircle2 size={18} strokeWidth={3} />
    </div>
  </div>
);

const UserIcon = ({ size, className }: any) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

export default PayoutPage;

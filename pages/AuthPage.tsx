
import React, { useState, useEffect } from 'react';
import { User, UserRole } from '../types';
import { 
  Mail, Lock, User as UserIcon, Phone, 
  ShieldCheck, ArrowRight, CheckCircle2,
  Zap, ChevronLeft, Trophy, KeyRound,
  Activity, BarChart3, CreditCard
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from '../components/Logo';
import Reveal from '../components/Reveal';

interface AuthPageProps {
  onLogin: (user: User) => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ onLogin }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [otpValue, setOtpValue] = useState(['', '', '', '', '', '']);
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    referral: ''
  });

  // Clear errors when toggling modes
  useEffect(() => {
    setError(null);
    setShowOTP(false);
    setOtpValue(['', '', '', '', '', '']);
  }, [isRegistering]);

  const handleInitialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (isRegistering) {
      if (!formData.name || !formData.email || !formData.password) {
        setError("Please fill in all required fields to continue.");
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match. Please try again.");
        return;
      }
    } else {
      if (!formData.email || !formData.password) {
        setError("Please enter your email and password.");
        return;
      }
    }

    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setShowOTP(true);
    }, 1500);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return; 
    const newOtp = [...otpValue];
    newOtp[index] = value;
    setOtpValue(newOtp);

    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otpValue[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus();
    }
  };

  const handleOTPSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const code = otpValue.join('');

    if (code.length !== 6) {
      setError("Please enter the complete 6-digit code.");
      return;
    }

    setIsVerifying(true);
    setTimeout(() => {
      if (code === '123456' || code.length === 6) {
        const mockUser: User = {
          id: 'thorx_' + Math.random().toString(36).substr(2, 9),
          thorxId: `TX-${Math.floor(10000 + Math.random() * 89999)}`,
          name: formData.name || formData.email.split('@')[0],
          email: formData.email,
          role: UserRole.USER,
          balance: 0,
          totalEarnings: 0,
          referrals: 0,
          referralCode: `THORX-${Math.floor(1000 + Math.random() * 8999)}`
        };
        onLogin(mockUser);
      } else {
        setIsVerifying(false);
        setError("Incorrect code. Please check your email and try again.");
      }
    }, 2000);
  };

  return (
    <div className="min-h-screen flex bg-[#F5F5F0] relative overflow-hidden font-sans">
      
      {/* LEFT PANEL: Authentication Form */}
      <div className="w-full lg:w-[45%] flex flex-col justify-between p-6 md:p-12 z-20 bg-white border-r-2 border-black relative">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <Link to="/" className="group flex items-center gap-3 text-gray-500 hover:text-black transition-colors active:scale-95">
             <div className="w-8 h-8 rounded-full border-2 border-gray-200 flex items-center justify-center group-hover:border-black group-hover:bg-black group-hover:text-white transition-all">
               <ChevronLeft size={16} />
             </div>
             <span className="text-[10px] font-bold uppercase tracking-widest">Back</span>
          </Link>
          <Logo size="sm" />
        </div>

        {/* Content Area */}
        <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full relative">
          
          {/* Loading Overlay */}
          {isVerifying && (
            <div className="absolute inset-0 z-50 bg-white/95 flex flex-col items-center justify-center text-center animate-in fade-in duration-300">
               <div className="relative mb-6">
                 <div className="w-16 h-16 border-4 border-gray-100 border-t-[#FF5722] rounded-full animate-spin" />
                 <ShieldCheck className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-black" size={20} />
               </div>
               <h3 className="text-xl font-black uppercase tracking-tight">Securing...</h3>
            </div>
          )}

          {!showOTP ? (
            <Reveal>
              {/* Title Section */}
              <div className="mb-10 space-y-3">
                <div className="inline-flex items-center gap-2 bg-[#FF5722]/10 text-[#FF5722] px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border border-[#FF5722]/20">
                  <Zap size={10} fill="currentColor" /> Official Portal
                </div>
                <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-[0.9]">
                  {isRegistering ? 'Start Earning' : 'Welcome Back'}
                </h1>
                <p className="text-gray-500 font-medium text-xs md:text-sm leading-relaxed">
                  {isRegistering 
                    ? "Join thousands of users in Pakistan earning daily rewards." 
                    : "Access your dashboard to view earnings and withdraw funds."}
                </p>
              </div>

              {/* Toggle Switch */}
              <div className="flex p-1 bg-[#F2F2F0] rounded-xl mb-8 relative border-2 border-[#E5E5E0]">
                <div 
                  className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white rounded-lg border-2 border-black shadow-sm transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] ${isRegistering ? 'left-[calc(50%+2px)]' : 'left-1'}`} 
                />
                <button 
                  onClick={() => setIsRegistering(false)}
                  className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest z-10 transition-colors ${!isRegistering ? 'text-black' : 'text-gray-400'}`}
                >
                  Sign In
                </button>
                <button 
                  onClick={() => setIsRegistering(true)}
                  className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest z-10 transition-colors ${isRegistering ? 'text-black' : 'text-gray-400'}`}
                >
                  Create Account
                </button>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-100 p-4 rounded-lg flex items-center gap-3 mb-6 animate-shake">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                  <span className="text-xs font-bold text-red-600 uppercase tracking-wide">{error}</span>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleInitialSubmit} className="space-y-4">
                {isRegistering && (
                  <InputField 
                    label="Full Name" 
                    placeholder="Enter your name" 
                    icon={<UserIcon size={16} />} 
                    value={formData.name}
                    onChange={(val) => setFormData({...formData, name: val})}
                  />
                )}

                <InputField 
                  label="Email Address" 
                  type="email" 
                  placeholder="name@example.com" 
                  icon={<Mail size={16} />} 
                  value={formData.email}
                  onChange={(val) => setFormData({...formData, email: val})}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField 
                    label="Password" 
                    type="password" 
                    placeholder="••••••••" 
                    icon={<Lock size={16} />} 
                    value={formData.password}
                    onChange={(val) => setFormData({...formData, password: val})}
                  />
                  {isRegistering && (
                    <InputField 
                      label="Confirm" 
                      type="password" 
                      placeholder="••••••••" 
                      icon={<ShieldCheck size={16} />} 
                      value={formData.confirmPassword}
                      onChange={(val) => setFormData({...formData, confirmPassword: val})}
                    />
                  )}
                </div>

                {isRegistering && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField 
                      label="Phone" 
                      placeholder="+92 3XX..." 
                      icon={<Phone size={16} />} 
                      value={formData.phone}
                      onChange={(val) => setFormData({...formData, phone: val})}
                    />
                    <InputField 
                      label="Referral" 
                      placeholder="Optional" 
                      icon={<Trophy size={16} />} 
                      value={formData.referral}
                      onChange={(val) => setFormData({...formData, referral: val})}
                      optional
                    />
                  </div>
                )}

                <button 
                  type="submit"
                  className="w-full bg-black text-white py-4 md:py-5 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-[#FF5722] transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.2)] hover:translate-x-[2px] hover:translate-y-[2px] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none flex items-center justify-center gap-3 group mt-4 relative overflow-hidden"
                >
                  {isRegistering ? 'Create Free Account' : 'Access Dashboard'}
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            </Reveal>
          ) : (
            <div className="animate-in zoom-in-95 duration-500">
              <div className="text-center mb-10">
                <div className="w-16 h-16 bg-[#FFF0E6] rounded-full flex items-center justify-center mx-auto mb-6 text-[#FF5722] border-2 border-[#FF5722]">
                  <KeyRound size={24} />
                </div>
                <h2 className="text-2xl font-black uppercase tracking-tight mb-2">Verify Email</h2>
                <p className="text-gray-500 text-xs font-medium">
                  Code sent to <span className="text-black font-bold border-b border-[#FF5722]">{formData.email}</span>
                </p>
              </div>

              {error && (
                <div className="text-center mb-6">
                   <span className="bg-red-50 text-red-600 px-3 py-1 rounded text-[10px] font-black uppercase tracking-widest border border-red-100">
                     {error}
                   </span>
                </div>
              )}

              <form onSubmit={handleOTPSubmit} className="space-y-8">
                <div className="flex justify-center gap-2">
                  {otpValue.map((digit, index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      type="tel"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      className={`w-10 h-14 md:w-14 md:h-16 text-center text-xl font-black bg-[#F5F5F0] border-2 rounded-lg outline-none transition-all
                        ${digit ? 'border-black bg-white text-black' : 'border-[#E5E5E0] text-gray-400'}
                        focus:border-[#FF5722] focus:bg-white focus:text-[#FF5722] focus:scale-105 z-10 relative
                      `}
                    />
                  ))}
                </div>

                <button 
                  type="submit"
                  className="w-full bg-[#FF5722] text-white py-5 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-black transition-all shadow-[4px_4px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000] active:shadow-none active:translate-x-[4px] active:translate-y-[4px] flex items-center justify-center gap-3"
                >
                  Verify & Login <CheckCircle2 size={16} />
                </button>

                <div className="flex justify-between items-center px-2 text-[10px] font-bold uppercase tracking-wide">
                   <button type="button" onClick={() => setShowOTP(false)} className="text-gray-400 hover:text-black transition-colors">
                     Back
                   </button>
                   <button type="button" className="text-[#FF5722] hover:text-[#D84315] transition-colors">
                     Resend Code
                   </button>
                </div>
              </form>
            </div>
          )}
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-100 text-center text-[9px] font-bold text-gray-400 uppercase tracking-widest">
          Secured by Thorx Identity • v3.5
        </div>
      </div>

      {/* RIGHT PANEL: Desktop Visual */}
      <div className="hidden lg:flex w-[55%] bg-[#050505] relative flex-col justify-center items-center text-white overflow-hidden p-12">
          <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-[#FF5722]/5 blur-[150px] rounded-full pointer-events-none" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none" />
          
          <div className="relative z-10 w-full max-w-md perspective-[2000px] group">
              <div className="absolute top-0 left-0 w-full h-72 bg-[#1a1a1a] rounded-3xl border border-white/5 transform translate-x-6 translate-y-4 -rotate-2 opacity-40 transition-transform duration-700 group-hover:translate-x-8 group-hover:rotate-[-4deg]"></div>
              
              <div className="relative w-full bg-gradient-to-br from-[#0A0A0A] to-[#000] rounded-3xl border border-[#333] p-10 shadow-2xl flex flex-col justify-between h-72 overflow-hidden transition-all duration-700 transform hover:scale-[1.02] hover:-translate-y-2 hover:shadow-[#FF5722]/20">
                  <div className="flex justify-between items-start z-10">
                      <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-2xl bg-[#FF5722] flex items-center justify-center text-black shadow-lg shadow-[#FF5722]/20">
                              <Activity size={24} strokeWidth={2.5} />
                          </div>
                          <div>
                              <div className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-500 mb-1">System Status</div>
                              <div className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2">
                                   Operational <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#22c55e]"></span>
                              </div>
                          </div>
                      </div>
                  </div>

                  <div className="z-10 mt-auto mb-6">
                      <div className="flex items-end justify-between mb-2">
                         <div className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Total Payouts</div>
                      </div>
                      <div className="text-5xl md:text-6xl font-black tracking-tighter text-white tabular-nums leading-none">
                          <span className="text-2xl align-top text-gray-600 mr-1">PKR</span>45k<span className="text-[#FF5722]">.00</span>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
};

const InputField = ({ label, type = "text", placeholder, icon, value, onChange, optional }: any) => {
  const [focused, setFocused] = useState(false);

  return (
    <div className="group space-y-2">
      <div className="flex justify-between items-center px-1">
        <label className={`text-[9px] font-black uppercase tracking-[0.2em] transition-colors duration-300 ${focused ? 'text-[#FF5722]' : 'text-gray-400'}`}>
          {label}
        </label>
        {optional && <span className="text-[8px] text-gray-400 font-bold uppercase tracking-wider bg-gray-100 px-2 py-0.5 rounded">Optional</span>}
      </div>
      
      <div className={`relative flex items-center bg-[#F5F5F0] border-2 rounded-xl overflow-hidden transition-all duration-300 ease-out ${
          focused 
            ? 'bg-white border-[#FF5722] shadow-md scale-[1.02]' 
            : 'border-[#E5E5E0]'
        }`}>
          
          <div className={`pl-4 pr-3 flex items-center justify-center transition-colors duration-300 ${focused ? 'text-[#FF5722]' : 'text-gray-400'}`}>
              {icon}
          </div>

          <input 
            type={type}
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className="w-full py-3.5 px-2 bg-transparent outline-none text-xs font-bold text-black placeholder:text-gray-300 placeholder:font-bold placeholder:text-[10px] placeholder:uppercase placeholder:tracking-widest transition-all"
            placeholder={placeholder}
          />
      </div>
    </div>
  );
};

export default AuthPage;

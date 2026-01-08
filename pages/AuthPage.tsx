
import React, { useState, useEffect, useRef } from 'react';
import { User, UserRole } from '../types';
import { 
  Mail, Lock, User as UserIcon, Phone, 
  ShieldCheck, ArrowRight, CheckCircle2,
  Zap, ChevronLeft, Trophy, KeyRound,
  CreditCard, Activity, BarChart3
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from '../components/Logo';

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
    // Simulate network request
    setTimeout(() => {
      setIsVerifying(false);
      setShowOTP(true);
    }, 1500);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return; // Prevent multiple chars
    const newOtp = [...otpValue];
    newOtp[index] = value;
    setOtpValue(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otpValue[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
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
      // Simulate success for demo (or specific code '123456')
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
      <div className="w-full lg:w-[45%] flex flex-col justify-between p-6 md:p-12 z-20 bg-white border-r border-gray-200 shadow-2xl relative">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <Link to="/" className="group flex items-center gap-3 text-gray-500 hover:text-black transition-colors">
             <div className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center group-hover:border-black group-hover:bg-black group-hover:text-white transition-all">
               <ChevronLeft size={16} />
             </div>
             <span className="text-[11px] font-bold uppercase tracking-widest">Back</span>
          </Link>
          <Logo size="md" />
        </div>

        {/* Content Area */}
        <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full relative">
          
          {/* Loading Overlay */}
          {isVerifying && (
            <div className="absolute inset-0 z-50 bg-white/90 backdrop-blur-sm flex flex-col items-center justify-center text-center animate-in fade-in duration-300">
               <div className="relative mb-6">
                 <div className="w-20 h-20 border-4 border-gray-100 border-t-[#FF5722] rounded-full animate-spin" />
                 <ShieldCheck className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-black" size={24} />
               </div>
               <h3 className="text-xl font-black uppercase tracking-tight">Securing Connection</h3>
               <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-2">Please wait...</p>
            </div>
          )}

          {!showOTP ? (
            <div className="animate-in slide-in-from-bottom-4 duration-500">
              {/* Title Section */}
              <div className="mb-10 space-y-3">
                <div className="inline-flex items-center gap-2 bg-[#FF5722]/10 text-[#FF5722] px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                  <Zap size={12} fill="currentColor" /> Official Portal
                </div>
                <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-[0.9]">
                  {isRegistering ? 'Start Earning' : 'Welcome Back'}
                </h1>
                <p className="text-gray-500 font-medium text-sm leading-relaxed">
                  {isRegistering 
                    ? "Join thousands of users in Pakistan earning daily rewards." 
                    : "Access your dashboard to view earnings and withdraw funds."}
                </p>
              </div>

              {/* Toggle Switch */}
              <div className="flex p-1.5 bg-[#F2F2F0] rounded-2xl mb-8 relative border border-gray-200">
                <div 
                  className={`absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-white rounded-xl shadow-md border border-gray-100 transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] ${isRegistering ? 'left-[calc(50%+3px)]' : 'left-1.5'}`} 
                />
                <button 
                  onClick={() => setIsRegistering(false)}
                  className={`flex-1 py-3 text-xs font-black uppercase tracking-widest z-10 transition-colors ${!isRegistering ? 'text-black' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  Sign In
                </button>
                <button 
                  onClick={() => setIsRegistering(true)}
                  className={`flex-1 py-3 text-xs font-black uppercase tracking-widest z-10 transition-colors ${isRegistering ? 'text-black' : 'text-gray-400 hover:text-gray-600'}`}
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
              <form onSubmit={handleInitialSubmit} className="space-y-5">
                {isRegistering && (
                  <InputField 
                    label="Full Name" 
                    placeholder="Enter your name" 
                    icon={<UserIcon size={18} />} 
                    value={formData.name}
                    onChange={(val) => setFormData({...formData, name: val})}
                  />
                )}

                <InputField 
                  label="Email Address" 
                  type="email" 
                  placeholder="name@example.com" 
                  icon={<Mail size={18} />} 
                  value={formData.email}
                  onChange={(val) => setFormData({...formData, email: val})}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <InputField 
                    label="Password" 
                    type="password" 
                    placeholder="••••••••" 
                    icon={<Lock size={18} />} 
                    value={formData.password}
                    onChange={(val) => setFormData({...formData, password: val})}
                  />
                  {isRegistering && (
                    <InputField 
                      label="Confirm Password" 
                      type="password" 
                      placeholder="••••••••" 
                      icon={<ShieldCheck size={18} />} 
                      value={formData.confirmPassword}
                      onChange={(val) => setFormData({...formData, confirmPassword: val})}
                    />
                  )}
                </div>

                {isRegistering && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <InputField 
                      label="Phone Number" 
                      placeholder="+92 3XX..." 
                      icon={<Phone size={18} />} 
                      value={formData.phone}
                      onChange={(val) => setFormData({...formData, phone: val})}
                    />
                    <InputField 
                      label="Referral Code" 
                      placeholder="Optional" 
                      icon={<Trophy size={18} />} 
                      value={formData.referral}
                      onChange={(val) => setFormData({...formData, referral: val})}
                      optional
                    />
                  </div>
                )}

                <button 
                  type="submit"
                  className="w-full bg-black text-white py-5 rounded-xl text-sm font-black uppercase tracking-widest hover:bg-[#FF5722] transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 active:translate-y-0 flex items-center justify-center gap-3 group mt-4 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  {isRegistering ? 'Create Free Account' : 'Access Dashboard'}
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            </div>
          ) : (
            <div className="animate-in zoom-in-95 duration-500">
              {/* OTP Verification Design */}
              <div className="text-center mb-10">
                <div className="w-20 h-20 bg-[#FFF0E6] rounded-full flex items-center justify-center mx-auto mb-6 text-[#FF5722] shadow-[0_0_30px_rgba(255,87,34,0.2)]">
                  <KeyRound size={32} />
                </div>
                <h2 className="text-3xl font-black uppercase tracking-tight mb-2">Verify Your Email</h2>
                <p className="text-gray-500 text-sm font-medium">
                  We've sent a 6-digit code to <br />
                  <span className="text-black font-bold">{formData.email}</span>
                </p>
              </div>

              {error && (
                <div className="text-center mb-6">
                   <span className="bg-red-50 text-red-600 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest">
                     {error}
                   </span>
                </div>
              )}

              <form onSubmit={handleOTPSubmit} className="space-y-8">
                <div className="flex justify-center gap-2 sm:gap-4">
                  {otpValue.map((digit, index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      className={`w-12 h-16 sm:w-16 sm:h-20 text-center text-2xl sm:text-3xl font-black bg-[#F2F2F0] border-2 rounded-xl outline-none transition-all duration-300 transform shadow-sm
                        ${digit ? 'border-black bg-white text-black scale-100' : 'border-[#E5E5E0] text-gray-400'}
                        focus:border-[#FF5722] focus:bg-white focus:text-[#FF5722] focus:scale-110 focus:shadow-[0_10px_30px_-10px_rgba(255,87,34,0.3)] z-10 relative
                      `}
                    />
                  ))}
                </div>

                <button 
                  type="submit"
                  className="w-full bg-[#FF5722] text-white py-5 rounded-xl text-sm font-black uppercase tracking-widest hover:bg-black transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-3 active:scale-[0.98]"
                >
                  Verify & Login <CheckCircle2 size={18} />
                </button>

                <div className="flex justify-between items-center px-2 text-xs font-bold uppercase tracking-wide">
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
        
        {/* Simple Footer */}
        <div className="mt-8 pt-6 border-t border-gray-100 text-center text-[10px] font-bold text-gray-400 uppercase tracking-widest">
          Secured by Thorx Identity • v3.5
        </div>
      </div>

      {/* RIGHT PANEL: Minimal Sleek Design */}
      <div className="hidden lg:flex w-[55%] bg-[#050505] relative flex-col justify-center items-center text-white overflow-hidden p-12">
          
          {/* Ambient Light & Texture */}
          <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-[#FF5722]/5 blur-[150px] rounded-full pointer-events-none" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none" />
          
          {/* Tech Grid Background */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_100%,transparent_0%)] pointer-events-none" />

          {/* Central 3D Card Stack */}
          <div className="relative z-10 w-full max-w-md perspective-[2000px] group">
              {/* Card 1 (Ghost Back) */}
              <div className="absolute top-0 left-0 w-full h-72 bg-[#1a1a1a] rounded-3xl border border-white/5 transform translate-x-6 translate-y-4 -rotate-2 opacity-40 transition-transform duration-700 group-hover:translate-x-8 group-hover:rotate-[-4deg]"></div>
              
              {/* Card 2 (Main Status) */}
              <div className="relative w-full bg-gradient-to-br from-[#0A0A0A] to-[#000] rounded-3xl border border-[#333] p-10 shadow-2xl flex flex-col justify-between h-72 overflow-hidden transition-all duration-700 transform hover:scale-[1.02] hover:-translate-y-2 hover:shadow-[#FF5722]/20">
                  {/* Decorative Glow */}
                  <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#FF5722]/10 rounded-full blur-3xl pointer-events-none" />
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#FF5722] to-transparent opacity-50"></div>
                  
                  {/* Top Row: Identification */}
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
                      <div className="flex flex-col items-end">
                          <CreditCard size={20} className="text-gray-600 mb-1" />
                          <div className="text-[10px] font-mono text-gray-500">**** 8842</div>
                      </div>
                  </div>

                  {/* Middle Content: Earnings Visualization */}
                  <div className="z-10 mt-auto mb-6">
                      <div className="flex items-end justify-between mb-2">
                         <div className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Total Payouts</div>
                         <div className="flex gap-1">
                             <div className="w-1 h-3 bg-[#FF5722] rounded-full"></div>
                             <div className="w-1 h-5 bg-gray-700 rounded-full"></div>
                             <div className="w-1 h-4 bg-gray-700 rounded-full"></div>
                             <div className="w-1 h-6 bg-gray-700 rounded-full"></div>
                         </div>
                      </div>
                      <div className="text-5xl md:text-6xl font-black tracking-tighter text-white tabular-nums leading-none">
                          <span className="text-2xl align-top text-gray-600 mr-1">PKR</span>45k<span className="text-[#FF5722]">.00</span>
                      </div>
                  </div>

                  {/* Bottom Row: Tags */}
                   <div className="flex gap-3 z-10">
                       <div className="px-3 py-1.5 bg-white/5 rounded-lg border border-white/10 text-[9px] font-bold uppercase text-gray-400 flex items-center gap-2">
                          <BarChart3 size={10} /> Analytics
                       </div>
                        <div className="px-3 py-1.5 bg-[#FF5722]/10 rounded-lg border border-[#FF5722]/20 text-[9px] font-bold uppercase text-[#FF5722] flex items-center gap-2">
                          <ShieldCheck size={10} /> Verified
                       </div>
                   </div>
              </div>
          </div>

          {/* Minimal Text Below */}
          <div className="mt-16 text-center space-y-6 max-w-md relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
              <h2 className="text-4xl font-black uppercase tracking-tighter leading-none">
                  Built for <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#FF5722] to-orange-800">Performance</span>
              </h2>
              <div className="w-16 h-1 bg-[#333] mx-auto rounded-full" />
              <p className="text-gray-500 text-xs font-bold uppercase tracking-widest leading-relaxed">
                  Join the most advanced earning ecosystem in Pakistan. Secure payouts, real-time analytics, and industrial-grade reliability.
              </p>
          </div>
      </div>

    </div>
  );
};

// --- Sub-components for Clean Code ---

const InputField = ({ label, type = "text", placeholder, icon, value, onChange, optional }: any) => {
  const [focused, setFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  useEffect(() => {
    setHasValue(!!value);
  }, [value]);

  return (
    <div className="group space-y-2">
      <div className="flex justify-between items-center px-1">
        <label className={`text-[10px] font-black uppercase tracking-[0.2em] transition-colors duration-300 ${focused ? 'text-[#FF5722]' : 'text-gray-400'}`}>
          {label}
        </label>
        {optional && <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider bg-gray-100 px-2 py-0.5 rounded">Optional</span>}
      </div>
      
      <div className="relative isolate">
        {/* Motion Graphic: Animated border glow */}
        <div 
          className={`absolute -inset-[1px] rounded-xl bg-gradient-to-r from-[#FF5722] via-purple-500 to-[#FF5722] opacity-0 transition-opacity duration-500 blur-sm ${focused ? 'opacity-30' : ''}`} 
          style={{ backgroundSize: '200% 200%' }}
        />

        <div className={`relative flex items-center bg-[#F2F2F0] border-2 rounded-xl overflow-hidden transition-all duration-300 ease-out transform ${
          focused 
            ? 'bg-white border-[#FF5722] shadow-[0_10px_30px_-10px_rgba(255,87,34,0.15)] scale-[1.01]' 
            : 'border-[#E5E5E0] hover:border-gray-300 hover:bg-[#EAEAE8]'
        }`}>
          
          {/* Icon Area */}
          <div className={`pl-5 pr-4 flex items-center justify-center transition-colors duration-300 ${focused ? 'text-[#FF5722]' : 'text-gray-400'}`}>
            <div className={`transition-transform duration-300 ${focused ? 'scale-110 rotate-0' : 'rotate-0'}`}>
              {icon}
            </div>
          </div>

          {/* Divider */}
          <div className={`w-[2px] h-6 bg-gray-200 transition-colors duration-300 ${focused ? 'bg-[#FF5722]/10' : ''}`} />

          {/* Input Area */}
          <input 
            type={type}
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className="w-full py-4 px-4 bg-transparent outline-none text-sm font-bold text-black placeholder:text-gray-400 placeholder:font-semibold placeholder:text-[11px] placeholder:uppercase placeholder:tracking-widest transition-all"
            placeholder={placeholder}
          />

          {/* Activity Indicator (Right) */}
          <div className={`absolute right-4 flex items-center gap-2 pointer-events-none transition-all duration-500 ${focused || hasValue ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}>
             {focused && <div className="w-1.5 h-1.5 bg-[#FF5722] rounded-full animate-pulse shadow-[0_0_8px_#FF5722]" />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;

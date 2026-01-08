
import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { User } from '../types';
import { 
  HelpCircle, ShieldCheck, Mail, Headphones, ChevronRight, 
  Search, Terminal as TerminalIcon, Cpu, BookOpen, 
  Settings, MessageSquare, ExternalLink, Activity,
  Info, ArrowRight, Zap, Target
} from 'lucide-react';

interface HelpPageProps {
  user: User;
  onLogout: () => void;
}

const faqs = [
  {
    id: 'Q1',
    category: 'HOW TO EARN',
    question: 'How do I start earning money?',
    answer: "You can earn cash in PKR by watching video ads in the 'Work Area'. You can also invite friends to join Thorx and earn a commission from their withdrawals."
  },
  {
    id: 'Q2',
    category: 'WITHDRAWALS',
    question: 'Why can I not withdraw my money?',
    answer: 'To withdraw, you must first complete your daily tasks. This usually means watching a certain number of ads or subscribing to our official YouTube channel.'
  },
  {
    id: 'Q3',
    category: 'REFERRALS',
    question: 'When do I get my referral bonus?',
    answer: 'You earn a 15% bonus (Level 1) or 7.5% bonus (Level 2) whenever your friend requests a withdrawal. The money is added to your account after their request is processed.'
  },
  {
    id: 'Q4',
    category: 'USER LEVELS',
    question: 'What are the different Ranks?',
    answer: 'Ranks like Worker, Captain, and General show your progress. As you level up by being active, you unlock more tasks and can earn more money each day.'
  },
  {
    id: 'Q5',
    category: 'SECURITY',
    question: 'Is my account secure?',
    answer: "Yes. We use email verification codes (OTP) for login and withdrawals to ensure only you can access your funds."
  }
];

const HelpPage: React.FC<HelpPageProps> = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('FAQ');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-[#E5E4D7] pb-20 selection:bg-[#FF5722] selection:text-white">
      <Sidebar user={user} onLogout={onLogout} />
      
      <main className="max-w-[1200px] mx-auto p-4 md:p-10 space-y-12 mt-6">
        <header className="industrial-border bg-white p-12 md:p-20 text-center relative industrial-shadow overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-black" />
          <div className="bg-black text-white px-5 py-2 text-[10px] font-black tracking-[0.4em] inline-block uppercase shadow-[4px_4px_0px_0px_rgba(255,87,34,1)]">
            Support Center
          </div>
          <h1 className="text-5xl md:text-[7rem] font-black uppercase tracking-tighter leading-none mb-8 text-black">
            Help & <span className="text-[#FF5722]">Support.</span>
          </h1>
          <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px] max-w-2xl mx-auto leading-relaxed">
            Find answers to common questions about earning, levels, and withdrawals.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <aside className="lg:col-span-3 space-y-3">
             <NavButton active={activeTab === 'FAQ'} onClick={() => setActiveTab('FAQ')} icon={<BookOpen size={16} />} label="Frequently Asked Questions" />
             <NavButton active={activeTab === 'AI'} onClick={() => setActiveTab('AI')} icon={<MessageSquare size={16} />} label="Ask AI Assistant" />
             <NavButton active={activeTab === 'CONTACT'} onClick={() => setActiveTab('CONTACT')} icon={<Mail size={16} />} label="Contact Support" />
             
             <div className="p-6 industrial-border bg-[#FFF0E6] mt-10">
               <span className="text-[9px] font-black uppercase tracking-widest text-[#FF5722] block mb-2">Notice</span>
               <p className="text-[9px] font-bold text-gray-500 leading-relaxed uppercase">Withdrawals via JazzCash, EasyPaisa, and Bank Transfer are processed within 24 hours.</p>
             </div>
          </aside>

          <div className="lg:col-span-9">
            {activeTab === 'FAQ' && (
              <section className="industrial-border bg-white p-10 industrial-shadow animate-in fade-in duration-500">
                <div className="space-y-10">
                  {faqs.map((faq) => (
                    <div key={faq.id} className="group border-b border-black/5 pb-10 last:border-0">
                      <div className="flex items-center gap-4 mb-4">
                        <span className="bg-black text-white px-2 py-0.5 text-[8px] font-black uppercase tracking-widest">{faq.category}</span>
                      </div>
                      <h3 className="text-xl font-black uppercase mb-4 group-hover:text-[#FF5722] transition-colors">{faq.question}</h3>
                      <p className="text-sm font-medium text-gray-600 leading-relaxed uppercase bg-[#F5F5F0] p-6 industrial-border border-black/5">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {activeTab === 'AI' && (
              <div className="industrial-border bg-black text-[#FF5722] p-20 industrial-shadow text-center">
                <TerminalIcon size={48} className="mx-auto mb-6" />
                <h2 className="text-2xl font-black uppercase tracking-[0.4em] text-white">AI Assistant</h2>
                <p className="text-[10px] font-black uppercase tracking-widest mt-4 text-gray-500">Click the chat icon in the bottom right corner to talk to our AI assistant for instant help.</p>
              </div>
            )}

            {activeTab === 'CONTACT' && (
              <div className="industrial-border bg-white p-12 industrial-shadow text-center space-y-8">
                <Mail size={48} className="mx-auto text-[#FF5722]" />
                <h2 className="text-3xl font-black uppercase">Contact Us</h2>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest leading-relaxed max-w-md mx-auto">Send us a message directly. Our team usually responds within 24-48 hours.</p>
                <div className="max-w-md mx-auto space-y-4">
                  <input className="w-full p-4 industrial-border bg-[#F5F5F0] text-xs font-black uppercase" placeholder="Subject" />
                  <textarea className="w-full p-4 industrial-border bg-[#F5F5F0] text-xs font-black uppercase h-32" placeholder="Your Message" />
                  <button className="w-full bg-black text-white py-4 font-black uppercase tracking-widest text-xs hover:bg-[#FF5722] transition-all">Send Message</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

const NavButton = ({ active, onClick, icon, label }: any) => (
  <button
    onClick={onClick}
    className={`w-full industrial-border p-5 flex items-center gap-4 transition-all ${
      active ? 'bg-black text-white industrial-shadow-sm' : 'bg-white hover:bg-gray-100'
    }`}
  >
    <div className={`p-2 industrial-border ${active ? 'bg-[#FF5722] border-[#FF5722]' : 'bg-gray-50'}`}>{icon}</div>
    <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
  </button>
);

export default HelpPage;

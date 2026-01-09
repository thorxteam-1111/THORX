
import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { User } from '../types';
import { HelpCircle, Mail, MessageSquare, BookOpen, Terminal, ChevronDown, ChevronUp, Send } from 'lucide-react';
import Reveal from '../components/Reveal';

interface HelpPageProps {
  user: User;
  onLogout: () => void;
}

const faqs = [
  { id: 'Q1', category: 'Getting Started', question: 'How do I start earning money?', answer: "Visit the 'Work' tab and complete daily viewing targets. Invite friends to boost income." },
  { id: 'Q2', category: 'Withdrawals', question: 'Why is my withdrawal pending?', answer: 'Standard processing time is 24 hours. Contact support if >48 hours.' },
  { id: 'Q3', category: 'Affiliates', question: 'When do I get my referral bonus?', answer: 'Commissions are credited instantly when your referral withdraws.' },
  { id: 'Q4', category: 'Account', question: 'How do I upgrade my Tier?', answer: 'Tiers upgrade automatically based on consistency and referrals.' },
];

const HelpPage: React.FC<HelpPageProps> = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('FAQ');
  const [openFaq, setOpenFaq] = useState<string | null>('Q1');

  return (
    <div className="min-h-screen bg-[#F5F5F0] pb-24 md:pb-12">
      <Sidebar user={user} onLogout={onLogout} />
      
      <main className="max-w-[1200px] mx-auto p-4 md:p-8 space-y-6 mt-4">
        
        {/* Header */}
        <Reveal width="100%">
          <section className="bg-white p-8 md:p-12 industrial-border industrial-shadow-lg text-center">
            <div className="inline-flex items-center gap-2 bg-[#F5F5F0] px-4 py-1.5 rounded-full mb-4">
               <HelpCircle size={12} className="text-[#FF5722]" />
               <span className="text-[9px] font-black uppercase tracking-widest text-gray-500">Knowledge Base</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-2">
              Support <span className="text-[#FF5722]">Hub</span>
            </h1>
            <p className="text-gray-500 font-medium text-xs md:text-sm max-w-lg mx-auto">
               Find answers, troubleshooting tips, and direct lines to support.
            </p>
          </section>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          <aside className="lg:col-span-3 space-y-2">
             <NavButton active={activeTab === 'FAQ'} onClick={() => setActiveTab('FAQ')} icon={<BookOpen size={16} />} label="Common Questions" />
             <NavButton active={activeTab === 'AI'} onClick={() => setActiveTab('AI')} icon={<Terminal size={16} />} label="AI Assistant" />
             <NavButton active={activeTab === 'CONTACT'} onClick={() => setActiveTab('CONTACT')} icon={<Mail size={16} />} label="Contact Team" />
             
             <Reveal delay={200}>
               <div className="mt-6 p-5 bg-black text-white rounded-lg industrial-border">
                  <h4 className="font-black text-[9px] uppercase tracking-widest mb-1 text-[#FF5722]">Support Hours</h4>
                  <p className="text-[9px] font-medium text-gray-400">
                     Mon - Sat<br />09:00 AM - 06:00 PM
                  </p>
               </div>
             </Reveal>
          </aside>

          <div className="lg:col-span-9">
            {activeTab === 'FAQ' && (
              <Reveal>
                <div className="bg-white p-6 md:p-8 industrial-border industrial-shadow">
                  <h3 className="font-black uppercase tracking-widest text-xs mb-6">Frequently Asked Questions</h3>
                  <div className="space-y-3">
                    {faqs.map((faq) => (
                      <div 
                        key={faq.id} 
                        className={`border rounded-xl transition-all overflow-hidden active:scale-[0.99] ${openFaq === faq.id ? 'border-black bg-gray-50' : 'border-gray-100 bg-white'}`}
                      >
                        <button 
                          onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                          className="w-full flex items-center justify-between p-5 text-left"
                        >
                           <div>
                              <span className="text-[8px] font-black uppercase tracking-widest text-gray-400 block mb-1">{faq.category}</span>
                              <span className="font-bold text-xs uppercase">{faq.question}</span>
                           </div>
                           {openFaq === faq.id ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                        </button>
                        
                        {openFaq === faq.id && (
                          <div className="px-5 pb-5 pt-0">
                             <div className="h-px w-full bg-gray-200 mb-3" />
                             <p className="text-xs text-gray-600 leading-relaxed font-medium">{faq.answer}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            )}

            {activeTab === 'AI' && (
              <Reveal>
                <div className="bg-[#111] text-white p-10 industrial-border industrial-shadow text-center flex flex-col items-center justify-center min-h-[300px]">
                  <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4 border border-white/10">
                     <MessageSquare size={24} className="text-[#FF5722]" />
                  </div>
                  <h2 className="text-xl font-black uppercase tracking-widest mb-2">Live Assistant</h2>
                  <p className="text-gray-400 text-xs max-w-md mx-auto mb-6">
                    Our AI is trained to answer questions about earnings instantly.
                  </p>
                  <div className="text-[9px] font-black uppercase tracking-[0.2em] bg-[#FF5722] text-black px-4 py-2 rounded-full animate-pulse">
                     Tap Bot Icon Bottom Right
                  </div>
                </div>
              </Reveal>
            )}

            {activeTab === 'CONTACT' && (
              <Reveal>
                <div className="bg-white p-6 md:p-10 industrial-border industrial-shadow">
                  <h3 className="font-black uppercase tracking-widest text-xs mb-6">Send Message</h3>
                  <div className="space-y-4 max-w-lg">
                     <div className="space-y-1">
                        <label className="text-[9px] font-black uppercase tracking-widest text-gray-500">Subject</label>
                        <input className="w-full p-3 bg-[#F5F5F0] rounded-lg font-bold text-xs outline-none focus:ring-2 focus:ring-black/5" placeholder="e.g., Payment Issue" />
                     </div>
                     <div className="space-y-1">
                        <label className="text-[9px] font-black uppercase tracking-widest text-gray-500">Details</label>
                        <textarea className="w-full p-3 bg-[#F5F5F0] rounded-lg font-bold text-xs outline-none focus:ring-2 focus:ring-black/5 h-32 resize-none" placeholder="Describe your issue..." />
                     </div>
                     <button className="w-full py-4 bg-black text-white font-black uppercase tracking-widest text-[10px] rounded-lg hover:bg-[#FF5722] transition-colors flex items-center justify-center gap-2 active:scale-95 shadow-lg">
                        Send Message <Send size={12} />
                     </button>
                  </div>
                </div>
              </Reveal>
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
    className={`w-full p-3 rounded-lg flex items-center gap-3 transition-all text-left active:scale-95 ${
      active ? 'bg-white text-black shadow-lg border border-gray-100' : 'text-gray-500 hover:bg-white/50'
    }`}
  >
    <div className={`p-1.5 rounded ${active ? 'bg-black text-white' : 'bg-gray-200 text-gray-500'}`}>{icon}</div>
    <span className="text-[9px] font-black uppercase tracking-widest">{label}</span>
  </button>
);

export default HelpPage;

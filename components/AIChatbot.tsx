
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Terminal, Send, X, Minimize2, Maximize2, Bot, Cpu, Move } from 'lucide-react';
import { User } from '../types';

interface AIChatbotProps {
  user: User;
}

const AIChatbot: React.FC<AIChatbotProps> = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; text: string }[]>([
    { role: 'assistant', text: `Hello ${user.name}. I am the Thorx AI Assistant. I can help you with withdrawals, daily tasks, or earning more money. How can I assist you today?` }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // Draggable State
  const [position, setPosition] = useState({ x: 0, y: 0 }); // Relative offset
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  // Handle Dragging
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - dragStart.x;
      const dy = e.clientY - dragStart.y;
      setPosition(prev => ({ x: prev.x + dx, y: prev.y + dy }));
      setDragStart({ x: e.clientX, y: e.clientY });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    const handleTouchMove = (e: TouchEvent) => {
        if (!isDragging) return;
        const touch = e.touches[0];
        const dx = touch.clientX - dragStart.x;
        const dy = touch.clientY - dragStart.y;
        setPosition(prev => ({ x: prev.x + dx, y: prev.y + dy }));
        setDragStart({ x: touch.clientX, y: touch.clientY });
        e.preventDefault(); // Prevent scrolling while dragging
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove, { passive: false });
      window.addEventListener('touchend', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging, dragStart]);

  const startDrag = (e: React.MouseEvent | React.TouchEvent) => {
    // Only allow dragging from header
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;
    
    setIsDragging(true);
    setDragStart({ x: clientX, y: clientY });
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMessage,
        config: {
          systemInstruction: `YOU ARE THE THORX OFFICIAL SUPPORT ASSISTANT.
          
          YOUR GOAL: Help users understand how to use the website to earn money in Pakistan (PKR).
          
          KEY INFORMATION:
          1. EARNING: Users earn by watching videos in the 'Work Area'.
          2. DAILY TASKS: Users must complete tasks (watching ads) to withdraw money.
          3. PAYOUTS: Minimum withdrawal is PKR 500. We support JazzCash, EasyPaisa, and Bank Transfer. Payouts take 24 hours.
          4. REFERRALS: Invite friends to earn a 15% commission on their withdrawals.
          5. LEVELS: Ranking up (Worker -> General) helps you earn more.
          
          TONE: Friendly, professional, clear, and direct. Do NOT use complex technical or industrial jargon. Speak in simple English.
          
          If asked about anything outside of Thorx earning, politely bring the conversation back to helping them earn on the platform.`,
          temperature: 0.4,
        }
      });

      const botResponse = response.text || "I'm having trouble connecting right now. Please check your internet or try again later.";
      setMessages(prev => [...prev, { role: 'assistant', text: botResponse }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', text: "Connection error. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 industrial-border bg-black text-white p-4 hover:bg-[#FF5722] transition-all industrial-shadow group z-[2000] hover:scale-105 active:scale-95"
      >
        <div className="relative">
          <Bot size={32} />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 border-2 border-black rounded-full" />
        </div>
      </button>
    );
  }

  return (
    <div 
      ref={chatRef}
      style={{ 
        transform: `translate(${position.x}px, ${position.y}px)`,
        touchAction: 'none' // Important for touch dragging
      }}
      className={`fixed bottom-8 right-8 w-full max-w-md industrial-border bg-white industrial-shadow-lg flex flex-col z-[2000] transition-height duration-300 ${isMinimized ? 'h-14 overflow-hidden' : 'h-[550px]'}`}
    >
      <div className="scanline opacity-10 pointer-events-none" />
      
      {/* Draggable Header */}
      <div 
        onMouseDown={startDrag}
        onTouchStart={startDrag}
        className="bg-black text-white p-4 flex justify-between items-center border-b-2 border-black relative cursor-move select-none active:bg-gray-900"
      >
        <div className="flex items-center gap-3 pointer-events-none">
          <div className="w-8 h-8 industrial-border border-white/20 bg-white/5 flex items-center justify-center">
            <Cpu size={16} className="text-[#FF5722]" />
          </div>
          <div className="flex flex-col">
            <span className="font-black text-[10px] tracking-[0.2em] uppercase leading-none text-[#FF5722]">AI SUPPORT</span>
            <span className="text-[8px] font-bold text-green-500 uppercase tracking-widest mt-1">ONLINE</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
            <Move size={14} className="text-gray-500 mr-2" />
          <button onClick={() => setIsMinimized(!isMinimized)} className="p-1 hover:bg-white/10 transition-colors">
            {isMinimized ? <Maximize2 size={14} /> : <Minimize2 size={14} />}
          </button>
          <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-red-500 transition-colors">
            <X size={14} />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 text-[10px] bg-[#F5F5F0] no-scrollbar font-bold uppercase tracking-tight">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 industrial-border shadow-sm relative ${
                  msg.role === 'user' ? 'bg-[#FF5722] text-white border-[#FF5722]' : 'bg-white text-black'
                }`}>
                  <div className={`text-[8px] font-black uppercase tracking-widest mb-2 opacity-50`}>
                    {msg.role === 'user' ? 'YOU' : 'AI ASSISTANT'}
                  </div>
                  <div className="leading-relaxed whitespace-pre-wrap">{msg.text}</div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-black text-[#FF5722] p-4 industrial-border animate-pulse font-black text-[8px] uppercase tracking-widest">
                  THINKING...
                </div>
              </div>
            )}
          </div>

          <div className="p-4 border-t-2 border-black bg-white">
            <div className="flex gap-2">
              <input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                className="flex-1 p-4 industrial-border bg-[#F5F5F0] focus:bg-white outline-none font-black text-[10px] uppercase tracking-widest transition-all"
                placeholder="ASK A QUESTION..."
              />
              <button 
                onClick={handleSend}
                disabled={isLoading}
                className="bg-black text-white px-5 industrial-border hover:bg-[#FF5722] transition-all"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AIChatbot;

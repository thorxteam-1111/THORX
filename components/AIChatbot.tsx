
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
    { role: 'assistant', text: `Greetings ${user.name}. I am the Thorx AI. I can assist with payouts, tasks, and account upgrades. How may I help?` }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // Draggable State
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  
  // Auto-scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages, isOpen, isMinimized]);

  // Drag Handlers
  useEffect(() => {
    const handleMove = (clientX: number, clientY: number) => {
      if (!isDragging) return;
      const dx = clientX - dragStart.x;
      const dy = clientY - dragStart.y;
      setPosition(prev => ({ x: prev.x + dx, y: prev.y + dy }));
      setDragStart({ x: clientX, y: clientY });
    };

    const handleMouseMove = (e: MouseEvent) => handleMove(e.clientX, e.clientY);
    const handleTouchMove = (e: TouchEvent) => {
      handleMove(e.touches[0].clientX, e.touches[0].clientY);
      e.preventDefault(); 
    };
    const handleEnd = () => setIsDragging(false);

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('touchmove', handleTouchMove, { passive: false });
      window.addEventListener('mouseup', handleEnd);
      window.addEventListener('touchend', handleEnd);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('mouseup', handleEnd);
      window.removeEventListener('touchend', handleEnd);
    };
  }, [isDragging, dragStart]);

  const startDrag = (clientX: number, clientY: number) => {
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
          systemInstruction: `You are the Thorx Platform Assistant. Be helpful, concise, and professional. 
          Focus on: Earning via tasks, Withdrawals (JazzCash/EasyPaisa), and Affiliate referrals.
          Keep answers short and direct.`,
        }
      });

      const botResponse = response.text || "Connection interrupted. Please retry.";
      setMessages(prev => [...prev, { role: 'assistant', text: botResponse }]);
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', text: "Network error. Try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 md:bottom-10 right-6 industrial-border bg-black text-white p-4 hover:bg-[#FF5722] transition-all industrial-shadow group z-[1000] active:scale-95"
      >
        <div className="relative">
          <Bot size={28} />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 border-2 border-black rounded-full animate-pulse" />
        </div>
      </button>
    );
  }

  return (
    <div 
      style={{ transform: `translate(${position.x}px, ${position.y}px)`, touchAction: 'none' }}
      className={`fixed bottom-24 md:bottom-10 right-6 w-[90vw] md:w-96 industrial-border bg-white industrial-shadow-lg flex flex-col z-[2000] transition-all duration-300 ${isMinimized ? 'h-14 overflow-hidden' : 'h-[500px]'}`}
    >
      {/* Header */}
      <div 
        onMouseDown={(e) => startDrag(e.clientX, e.clientY)}
        onTouchStart={(e) => startDrag(e.touches[0].clientX, e.touches[0].clientY)}
        className="bg-black text-white p-3 flex justify-between items-center border-b-2 border-black cursor-move select-none"
      >
        <div className="flex items-center gap-3 pointer-events-none">
          <Cpu size={16} className="text-[#FF5722]" />
          <span className="font-black text-[10px] tracking-[0.2em] uppercase text-[#FF5722]">AI SUPPORT</span>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={() => setIsMinimized(!isMinimized)} className="p-2 hover:bg-white/10 rounded transition-colors">
            {isMinimized ? <Maximize2 size={12} /> : <Minimize2 size={12} />}
          </button>
          <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-red-600 rounded transition-colors">
            <X size={12} />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#F5F5F0]">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 duration-300`}>
                <div className={`max-w-[85%] p-3 industrial-border text-xs font-bold uppercase leading-relaxed ${
                  msg.role === 'user' ? 'bg-[#FF5722] text-white border-[#FF5722]' : 'bg-white text-black border-black'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                 <div className="bg-black text-[#FF5722] px-3 py-2 industrial-border text-[8px] font-black uppercase tracking-widest animate-pulse">
                    Computing...
                 </div>
              </div>
            )}
          </div>

          <div className="p-3 bg-white border-t-2 border-black flex gap-2">
            <input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1 p-3 bg-[#F5F5F0] border-2 border-transparent focus:border-black outline-none font-bold text-xs uppercase tracking-wider"
              placeholder="Ask a question..."
            />
            <button onClick={handleSend} disabled={isLoading} className="bg-black text-white px-4 hover:bg-[#FF5722] transition-colors active:scale-95">
              <Send size={16} />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AIChatbot;

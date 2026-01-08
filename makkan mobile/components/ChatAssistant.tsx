
import React, { useState, useRef, useEffect } from 'react';
import { getGeminiAssistant } from '../services/geminiService';
import { Message } from '../types';

const ChatAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Welcome to Makka Naturals! I\'m your health guide. Ask me anything about our Kidney & Bladder combo or how to use it.' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatRef = useRef<any>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      if (!chatRef.current) {
        chatRef.current = getGeminiAssistant();
      }

      const response = await chatRef.current.sendMessage({ message: input });
      const aiText = response.text || "I'm sorry, I couldn't process that.";
      setMessages(prev => [...prev, { role: 'model', text: aiText }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', text: "Connection issues. Please try again soon." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-[#800000] rounded-full shadow-2xl flex items-center justify-center text-white z-50 hover:scale-110 active:scale-95 transition-transform"
      >
        <i className={`fas ${isOpen ? 'fa-times' : 'fa-hand-holding-medical'} text-2xl`}></i>
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 left-6 md:left-auto md:w-96 bg-white rounded-3xl shadow-2xl z-50 overflow-hidden flex flex-col border border-gray-100 max-h-[70vh]">
          <div className="bg-[#800000] p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <i className="fas fa-notes-medical"></i>
              </div>
              <div>
                <h3 className="font-bold text-sm">Naturals Assistant</h3>
                <p className="text-[10px] text-red-200 uppercase tracking-widest font-bold">Herbal Expert</p>
              </div>
            </div>
          </div>

          <div 
            ref={scrollRef}
            className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50 hide-scrollbar min-h-[300px]"
          >
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] px-4 py-2 rounded-2xl text-sm ${
                  msg.role === 'user' 
                    ? 'bg-[#800000] text-white rounded-tr-none shadow-md' 
                    : 'bg-white text-gray-800 shadow-sm border border-gray-100 rounded-tl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100 flex gap-1">
                  <div className="w-1.5 h-1.5 bg-[#800000] rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-[#800000] rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-1.5 h-1.5 bg-[#800000] rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 border-t border-gray-100 bg-white">
            <div className="relative flex items-center">
              <input 
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about dosage, ingredients..."
                className="w-full pl-4 pr-12 py-3 bg-gray-100 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#800000] transition-all"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading}
                className="absolute right-2 p-2 text-[#800000] hover:text-[#600000] disabled:opacity-50"
              >
                <i className="fas fa-paper-plane text-lg"></i>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatAssistant;

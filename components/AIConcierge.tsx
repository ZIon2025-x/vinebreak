import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, User, Sprout, Feather } from 'lucide-react';
import { sendMessageStream } from '../services/geminiService';
import { ChatMessage } from '../types';
import { GenerateContentResponse } from '@google/genai';

export const AIConcierge: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: "Greetings. I am Terra. I can help you discover the raw ingredients that resonate with your skin's nature. How may I assist your ritual today?"
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // 仅滚动聊天容器内部到底部，绝不触动页面滚动（不用 scrollIntoView）
  const scrollChatToBottom = () => {
    const el = messagesContainerRef.current;
    if (!el) return;
    const threshold = 80;
    const isNearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < threshold;
    if (isNearBottom) {
      el.scrollTop = el.scrollHeight;
    }
  };

  useEffect(() => {
    scrollChatToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: inputValue
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    try {
      const responseStream = await sendMessageStream(userMsg.text);
      
      const modelMsgId = (Date.now() + 1).toString();
      setMessages(prev => [...prev, { id: modelMsgId, role: 'model', text: '', isStreaming: true }]);

      let fullText = '';
      
      for await (const chunk of responseStream) {
        const c = chunk as GenerateContentResponse;
        const newText = c.text || '';
        fullText += newText;
        
        setMessages(prev => prev.map(msg => 
          msg.id === modelMsgId 
            ? { ...msg, text: fullText } 
            : msg
        ));
      }

      setMessages(prev => prev.map(msg => 
        msg.id === modelMsgId 
          ? { ...msg, isStreaming: false } 
          : msg
      ));

    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'model',
        text: "My connection to the vine is momentarily faint. Please forgive me and try again."
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="concierge" className="py-32 relative bg-brand-950 overflow-hidden">
      {/* Background Texture - Dark Earthy Feel */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
      
      <div className="container mx-auto px-6 relative z-10 flex flex-col lg:flex-row gap-20 items-center justify-center">
        
        {/* Left Side: Editorial Pitch */}
        <div className="w-full lg:w-5/12 space-y-10 text-center lg:text-left">
          <div className="inline-flex items-center gap-3 text-brand-400 border-b border-brand-800 pb-2">
            <Feather size={14} /> 
            <span className="text-xs tracking-[0.3em] uppercase font-bold">Personal Apothecary</span>
          </div>
          
          <h2 className="text-5xl md:text-7xl text-brand-50 leading-none font-serif">
            Unearth Your <br />
            <span className="text-brand-400 italic font-light">True Ritual</span>
          </h2>
          
          <p className="text-brand-200 font-light text-xl leading-relaxed opacity-80 max-w-md mx-auto lg:mx-0">
            Terra is attuned to the subtle rhythms of the seasons. 
            Begin a dialogue to curate a regimen grounded in the vitality of the vine.
          </p>

           <div className="hidden lg:block pt-4">
             <div className="h-px w-24 bg-brand-800 mb-6"></div>
             <p className="text-xs text-brand-600 tracking-widest uppercase">Powered by Botanical Intelligence</p>
           </div>
        </div>

        {/* Right Side: The "Stationery" Chat Interface */}
        <div className="w-full lg:w-6/12">
          <div className="bg-brand-50 rounded-[2px] shadow-2xl overflow-hidden border border-brand-200 relative max-w-xl mx-auto transform transition-transform hover:scale-[1.005] duration-700">
             
             {/* Paper Grain Overlay */}
             <div className="absolute inset-0 bg-brand-900/5 pointer-events-none mix-blend-multiply"></div>

             {/* Header */}
             <div className="bg-brand-100/80 p-6 border-b border-brand-200 flex justify-between items-center backdrop-blur-sm relative z-10">
               <div className="flex items-center gap-5">
                 <div className="w-12 h-12 bg-brand-200 rounded-full flex items-center justify-center text-brand-900 border border-brand-300 shadow-sm">
                    <Sprout size={22} strokeWidth={1.5} />
                 </div>
                 <div>
                   <h3 className="font-serif text-2xl text-brand-950 italic">Terra</h3>
                   <div className="flex items-center gap-2 mt-0.5">
                     <span className="w-1.5 h-1.5 bg-brand-600 rounded-full animate-pulse"></span>
                     <span className="text-[10px] text-brand-500 uppercase tracking-widest font-bold">Consultant Online</span>
                   </div>
                 </div>
               </div>
               <div className="text-brand-300 opacity-50">
                 <Sparkles size={20} strokeWidth={1} />
               </div>
             </div>

             {/* Chat Messages Area - 仅在此 div 内滚动，不触发 window 滚动 */}
             <div ref={messagesContainerRef} className="h-[500px] overflow-y-auto p-8 space-y-8 bg-brand-50 relative z-10 scrollbar-hide">
               {messages.map((msg) => (
                 <div 
                   key={msg.id} 
                   className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                 >
                   {/* Avatar */}
                   <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center mt-4 border ${
                     msg.role === 'user' 
                       ? 'bg-brand-900 text-brand-50 border-brand-900' 
                       : 'bg-brand-100 text-brand-800 border-brand-200'
                   }`}>
                     {msg.role === 'user' ? <User size={14} /> : <Sprout size={14} />}
                   </div>

                   {/* Bubble */}
                   <div 
                     className={`max-w-[85%] p-6 text-sm leading-relaxed shadow-sm relative ${
                       msg.role === 'user' 
                         ? 'bg-brand-900 text-brand-50 rounded-tl-sm rounded-bl-sm rounded-br-sm' 
                         : 'bg-brand-100 text-brand-900 rounded-tr-sm rounded-br-sm rounded-bl-sm border border-brand-200'
                     }`}
                   >
                     {msg.text}
                     {msg.isStreaming && <span className="inline-block w-1.5 h-3 ml-2 align-middle bg-brand-400 animate-pulse"/>}
                   </div>
                 </div>
               ))}
             </div>

             {/* Input Area */}
             <div className="p-6 bg-brand-50 border-t border-brand-200 relative z-10">
               <div className="relative flex items-center group">
                 <input
                   type="text"
                   value={inputValue}
                   onChange={(e) => setInputValue(e.target.value)}
                   onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                   placeholder="Ask about skin, soil, or seasonality..."
                   className="w-full bg-transparent border-b border-brand-300 py-4 pr-12 text-brand-900 placeholder-brand-400/70 focus:outline-none focus:border-brand-800 transition-colors font-light tracking-wide"
                   disabled={isLoading}
                 />
                 <button 
                   onClick={handleSend}
                   disabled={isLoading}
                   className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-brand-400 hover:text-brand-900 transition-colors disabled:opacity-30"
                 >
                   <Send size={20} strokeWidth={1.5} />
                 </button>
               </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};
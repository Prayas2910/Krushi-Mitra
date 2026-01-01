
import React, { useState, useEffect, useRef } from 'react';
import { Language, translations } from '../types';
import { getExpertAdvice } from '../services/geminiService';

interface Message {
  role: 'user' | 'model';
  content: string;
  imageUrl?: string;
}

interface ForumProps {
  language: Language;
}

const Forum: React.FC<ForumProps> = ({ language }) => {
  const t = translations[language];
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSend = async () => {
    if (!input.trim() && !selectedImage) return;
    
    const userMsg = input.trim();
    const userImg = selectedImage || undefined;
    
    setInput('');
    setSelectedImage(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    
    setMessages(prev => [...prev, { 
      role: 'user', 
      content: userMsg || (language === Language.ENGLISH ? "Sent an image" : "एक फोटो पाठवला"),
      imageUrl: userImg 
    }]);
    
    setIsTyping(true);

    try {
      const base64Data = userImg ? userImg.split(',')[1] : undefined;
      const advice = await getExpertAdvice(userMsg || "Please analyze this image.", messages, language, base64Data);
      setMessages(prev => [...prev, { role: 'model', content: advice }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'model', content: language === Language.ENGLISH ? "Error connecting to AI." : "एआयशी जोडताना त्रुटी." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col h-[calc(100vh-140px)] shadow-xl rounded-[40px] overflow-hidden bg-white border border-slate-100">
      <header className="bg-green-900 p-6 text-white">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-green-700 rounded-2xl flex items-center justify-center shadow-inner">
             <svg className="w-7 h-7 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
          </div>
          <div>
            <h2 className="text-xl font-bold">{t.consulting}</h2>
            <p className="text-xs text-green-300">{t.consultingSub}</p>
          </div>
        </div>
      </header>

      <div ref={scrollRef} className="flex-1 bg-slate-50 overflow-y-auto p-6 space-y-4">
        {messages.length === 0 && (
          <div className="text-center py-10 opacity-60">
            <p className="text-slate-500 font-medium italic">{language === Language.ENGLISH ? "Ask anything about farming..." : "शेतीबद्दल काहीही विचारा..."}</p>
          </div>
        )}

        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-4 rounded-3xl shadow-sm ${m.role === 'user' ? 'bg-green-600 text-white rounded-br-none' : 'bg-white text-slate-800 rounded-bl-none border border-slate-100'}`}>
              {m.imageUrl && (
                <img src={m.imageUrl} alt="User sent" className="w-full max-w-[240px] h-auto rounded-2xl mb-3 border border-white/20" />
              )}
              <div className="text-sm whitespace-pre-wrap leading-relaxed">{m.content}</div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white border border-slate-100 p-4 rounded-3xl rounded-bl-none shadow-sm flex space-x-1">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
            </div>
          </div>
        )}
      </div>

      <footer className="p-4 bg-white border-t border-slate-100 relative">
        {/* Image Preview Overlay */}
        {selectedImage && (
          <div className="absolute bottom-full left-4 mb-4 p-2 bg-white rounded-2xl shadow-xl border border-slate-200 flex items-center animate-in slide-in-from-bottom-2">
            <div className="relative">
              <img src={selectedImage} alt="To upload" className="w-20 h-20 object-cover rounded-xl" />
              <button 
                onClick={removeImage}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="ml-3 pr-4">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Selected Image</p>
              <p className="text-xs text-slate-600 font-medium">Ready to send...</p>
            </div>
          </div>
        )}

        <div className="flex items-center space-x-2">
          {/* Image Upload Button */}
          <button
            onClick={() => fileInputRef.current?.click()}
            className="bg-slate-100 text-slate-600 p-4 rounded-2xl hover:bg-slate-200 transition-all flex items-center justify-center shrink-0"
            title="Attach Image"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept="image/*" 
            className="hidden" 
          />
          
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={t.chatPlaceholder}
            className="flex-1 bg-slate-50 border-none rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-green-500 transition-all shadow-inner"
          />
          
          <button
            onClick={handleSend}
            disabled={(!input.trim() && !selectedImage) || isTyping}
            className="bg-green-600 text-white p-4 rounded-2xl hover:bg-green-700 disabled:opacity-50 shadow-lg shadow-green-100 transition-all active:scale-95"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
          </button>
        </div>
      </footer>
    </div>
  );
};

export default Forum;


import React from 'react';
import { Page, CropScan, WeatherData, Language, translations } from '../types';

interface DashboardProps {
  weather: WeatherData | null;
  navigate: (p: Page) => void;
  history: CropScan[];
  language: Language;
}

const Dashboard: React.FC<DashboardProps> = ({ weather, navigate, history, language }) => {
  const t = translations[language] || translations[Language.ENGLISH];

  return (
    <div className="space-y-6">
      <header className="flex flex-col items-center text-center py-4">
        <h1 className="text-3xl font-bold text-slate-900">{t.welcome}</h1>
        <p className="text-slate-500 mt-1">
          {language === Language.ENGLISH 
            ? "Check your farm's health and market prices today." 
            : "आज तुमच्या शेतीची प्रगती आणि बाजार भाव तपासा."}
        </p>
      </header>

      {/* Primary Action */}
      <div 
        onClick={() => navigate(Page.SCANNER)}
        className="bg-green-600 p-8 rounded-[40px] text-white flex flex-col items-center justify-center text-center shadow-2xl shadow-green-200 cursor-pointer hover:bg-green-700 transition-all active:scale-95"
      >
        <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-4">
           {/* Improved Modern Camera Icon */}
           <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
           </svg>
        </div>
        <h2 className="text-2xl font-bold">{t.newScan}</h2>
        <p className="text-green-100 text-sm mt-1">
          {language === Language.ENGLISH ? "Identify diseases from photos instantly." : "फोटोवरून रोग त्वरित ओळखा."}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Mandi Widget */}
        <div 
          onClick={() => navigate(Page.MANDI)}
          className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm flex items-center justify-between cursor-pointer hover:border-blue-200 transition-all"
        >
          <div>
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">{t.mandi}</span>
            <div className="mt-2 space-y-1">
              <p className="text-lg font-bold text-slate-800">
                {language === Language.HINDI ? "गेहूं: ₹2,450" : language === Language.MARATHI ? "गहू: ₹2,450" : "Wheat: ₹2,450"}
              </p>
              <p className="text-sm text-slate-500">
                {language === Language.ENGLISH ? "View detailed rates" : "तपशीलवार दर पहा"} &rarr;
              </p>
            </div>
          </div>
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
        </div>

        {/* History Widget */}
        <div 
          onClick={() => navigate(Page.HISTORY)}
          className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm flex items-center justify-between cursor-pointer hover:border-amber-200 transition-all"
        >
          <div>
            <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">{t.history}</span>
            <div className="mt-2">
              <p className="text-lg font-bold text-slate-800">
                {history.length} {language === Language.ENGLISH ? "Saved Scans" : "जतन केलेले रेकॉर्ड"}
              </p>
              <p className="text-sm text-slate-500">
                {language === Language.ENGLISH ? "Track crop health" : "आरोग्याचा मागोवा घ्या"} &rarr;
              </p>
            </div>
          </div>
          <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
        </div>
      </div>

      {/* Community / Expert Chat Shortcut */}
      <div 
        onClick={() => navigate(Page.FORUM)}
        className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm flex items-center space-x-4 cursor-pointer hover:bg-slate-50 transition-all"
      >
        <div className="w-14 h-14 bg-green-100 text-green-700 rounded-2xl flex items-center justify-center shrink-0">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
        </div>
        <div>
          <h3 className="font-bold text-slate-800">{t.chat}</h3>
          <p className="text-sm text-slate-500">{t.askExpert}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

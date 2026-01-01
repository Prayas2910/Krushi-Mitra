
import React, { useState, useEffect } from 'react';
import { getMandiRates } from '../services/geminiService';
import { Language, translations } from '../types';

interface MandiRatesProps {
  location: { lat: number, lng: number } | null;
  language: Language;
}

const MandiRates: React.FC<MandiRatesProps> = ({ location, language }) => {
  const t = translations[language] || translations[Language.ENGLISH];
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMandiRates(location, language).then(res => {
      setData(res);
      setLoading(false);
    });
  }, [location, language]);

  return (
    <div className="space-y-6">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">{t.mandi}</h2>
          <p className="text-slate-500">
            {language === Language.ENGLISH ? "Real-time market prices in your region." : "तुमच्या भागातील थेट बाजार भाव."}
          </p>
        </div>
        <div className="bg-white px-4 py-2 rounded-2xl shadow-sm border border-slate-100 flex items-center space-x-2 w-fit">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
          <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">{t.liveUpdates}</span>
        </div>
      </header>

      {loading ? (
        <div className="space-y-4">
          <div className="h-64 bg-white animate-pulse rounded-[40px] border border-slate-100"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="h-32 bg-white animate-pulse rounded-[32px] border border-slate-100"></div>
            <div className="h-32 bg-white animate-pulse rounded-[32px] border border-slate-100"></div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* External Link Section - Highlighted for users wanting official portal */}
          <div className="bg-blue-600 text-white p-6 rounded-[32px] shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
             <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                </div>
                <div>
                   <p className="font-bold text-lg leading-tight">{t.externalMandi}</p>
                   <p className="text-blue-100 text-xs mt-1">Check rates directly on the Govt Agmarknet Portal</p>
                </div>
             </div>
             <a 
               href="https://agmarknet.gov.in/" 
               target="_blank" 
               rel="noopener noreferrer"
               className="bg-white text-blue-600 px-6 py-2 rounded-full font-bold hover:bg-blue-50 transition-colors shrink-0"
             >
               Visit Site &rarr;
             </a>
          </div>

          <div className="bg-white p-8 rounded-[40px] shadow-sm border border-slate-100">
             <div className="prose prose-slate max-w-none">
               <h3 className="text-xl font-bold mb-4 text-green-800">{t.marketIntel}</h3>
               <div className="whitespace-pre-wrap text-slate-600 leading-relaxed font-medium">
                 {data.text}
               </div>
             </div>
             
             {data.sources && data.sources.length > 0 && (
               <div className="mt-8 pt-6 border-t border-slate-100">
                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">{t.verifiedSources}</p>
                 <div className="flex flex-wrap gap-2">
                   {data.sources.map((src: any, i: number) => (
                     <a 
                      key={i} 
                      href={src.web?.uri} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-slate-50 hover:bg-slate-100 px-3 py-1.5 rounded-lg text-xs text-blue-600 font-medium border border-slate-200 transition-colors"
                     >
                       {src.web?.title || 'Source'}
                     </a>
                   ))}
                 </div>
               </div>
             )}
          </div>
          
          <div className="bg-amber-50 p-6 rounded-[32px] border border-amber-100">
            <p className="text-xs text-amber-800 leading-relaxed font-medium">
              Note: Market rates are estimated based on regional APMC reports and are subject to quality variations.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MandiRates;

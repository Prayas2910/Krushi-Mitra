
import React from 'react';
import { Language, translations, CropScan } from '../types';

interface ProfileProps {
  language: Language;
  history: CropScan[];
  resetLang: () => void;
}

const Profile: React.FC<ProfileProps> = ({ language, history, resetLang }) => {
  const t = translations[language] || translations[Language.ENGLISH];

  return (
    <div className="space-y-6">
      <header className="bg-white p-6 -mx-4 shadow-sm flex items-center space-x-4">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center border-4 border-white shadow-sm overflow-hidden">
          <svg className="w-10 h-10 text-slate-300" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>
        </div>
        <div>
           <h2 className="text-xl font-bold text-slate-800">किसान भाई</h2>
           <p className="text-xs text-slate-500">+91 98XXX XXXXX</p>
        </div>
      </header>

      <section className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="p-4 border-b border-slate-100 font-bold text-slate-700">सेटिंग्स</div>
        <div className="divide-y divide-slate-100">
           <button 
             onClick={resetLang}
             className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors"
           >
             <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" /></svg>
                <span className="text-sm font-medium">भाषा बदलें (Change Language)</span>
             </div>
             <span className="text-xs text-blue-600 font-bold uppercase">{language}</span>
           </button>
           
           <div className="p-4 flex items-center justify-between">
             <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                <span className="text-sm font-medium text-slate-600">प्राइवेसी और सुरक्षा</span>
             </div>
           </div>
        </div>
      </section>

      <section className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="p-4 border-b border-slate-100 font-bold text-slate-700">आपका रिकॉर्ड</div>
        <div className="p-6 text-center">
           <p className="text-3xl font-bold text-blue-600">{history.length}</p>
           <p className="text-xs text-slate-400 uppercase tracking-widest font-bold mt-1">कुल फसल जाँच</p>
        </div>
      </section>

      <div className="text-center py-4">
        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Version 2.4.0 (Farmers Friend)</p>
      </div>
    </div>
  );
};

export default Profile;

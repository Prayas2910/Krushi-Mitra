
import React, { useState, useRef } from 'react';
import { CropScan, Language, CROPS, translations } from '../types';
import { analyzeCropDisease } from '../services/geminiService';

interface ScannerProps {
  addScan: (s: CropScan) => void;
  location: { lat: number, lng: number } | null;
  language: Language;
}

const Scanner: React.FC<ScannerProps> = ({ addScan, location, language }) => {
  const t = translations[language];
  const [selectedCrop, setSelectedCrop] = useState(CROPS[0]);
  const [isScanning, setIsScanning] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
        setResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleScan = async () => {
    if (!previewUrl) return;
    setIsScanning(true);
    setResult(null);

    try {
      const base64Data = previewUrl.split(',')[1];
      const analysis = await analyzeCropDisease(base64Data, selectedCrop, location || undefined, language);
      
      const diseaseMatch = analysis.match(/Disease:?\s*([^\n]+)/i);
      const disease = diseaseMatch ? diseaseMatch[1] : "Condition Detected";

      const newScan: CropScan = {
        id: Math.random().toString(36).substr(2, 9),
        timestamp: Date.now(),
        cropType: selectedCrop,
        disease,
        confidence: 0.95,
        imageUrl: previewUrl,
        location: location || undefined,
        analysis
      };

      setResult(analysis);
      addScan(newScan);
    } catch (error) {
      setResult(language === Language.ENGLISH ? "Error! Please try again." : "त्रुटी! कृपया पुन्हा प्रयत्न करा.");
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <div className="bg-white p-6 rounded-[32px] shadow-sm border border-slate-100">
        <h2 className="text-2xl font-bold text-center text-slate-800">{t.newScan}</h2>
        
        <p className="mt-4 font-bold text-slate-600 mb-2">{t.chooseCrop}</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {CROPS.map(c => (
            <button
              key={c}
              onClick={() => setSelectedCrop(c)}
              className={`py-3 px-1 rounded-xl text-xs font-bold transition-all border ${selectedCrop === c ? 'bg-green-600 text-white border-green-600' : 'bg-white text-slate-500 border-slate-200'}`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="mt-6">
          <p className="font-bold text-slate-600 mb-2">{t.uploadPhoto}</p>
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-slate-300 rounded-[32px] h-64 flex flex-col items-center justify-center bg-slate-50 cursor-pointer overflow-hidden relative group"
          >
            {previewUrl ? (
              <img src={previewUrl} className="w-full h-full object-cover" alt="Preview" />
            ) : (
              <div className="text-center">
                {/* Modern High-Visibility Camera Icon */}
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-inner">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <p className="font-bold text-slate-700 text-lg">{t.clickCamera}</p>
              </div>
            )}
            <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
          </div>
        </div>

        {previewUrl && !result && (
          <button 
            onClick={handleScan} 
            disabled={isScanning} 
            className={`mt-6 w-full py-5 rounded-[24px] font-bold text-xl text-white shadow-xl transition-all ${isScanning ? 'bg-slate-400' : 'bg-green-600 hover:bg-green-700 active:scale-95'}`}
          >
            {isScanning ? t.checking : t.startNow}
          </button>
        )}
      </div>

      {result && (
        <div className="bg-white p-6 rounded-[32px] shadow-sm border border-slate-100 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center space-x-2 mb-4 border-b pb-4">
             <div className="w-10 h-10 bg-green-100 text-green-700 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.64.304 1.24.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
             </div>
             <h3 className="text-xl font-bold text-slate-800">{t.verdict}</h3>
          </div>
          
          <div className="text-slate-700 whitespace-pre-wrap leading-relaxed prose prose-slate">
            {result}
          </div>
          
          {/* New Prohibited Actions / Prevention Section */}
          <div className="mt-8 bg-red-50 border border-red-100 p-6 rounded-[24px]">
             <div className="flex items-center space-x-2 mb-3">
               <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
               <h4 className="font-bold text-red-900">{t.prevention}</h4>
             </div>
             <p className="text-sm text-red-800 italic leading-relaxed">
               {language === Language.ENGLISH 
                 ? "Review the analysis above for specific 'What NOT to do' bullet points to ensure this problem doesn't get worse." 
                 : language === Language.HINDI 
                 ? "यह समस्या और न बढ़े, इसके लिए ऊपर दी गई विश्लेषण में 'क्या न करें' के बिंदुओं को ध्यान से देखें।" 
                 : "ही समस्या आणखी वाढू नये यासाठी वरील विश्लेषणामध्ये दिलेल्या 'काय करू नये' या मुद्द्यांकडे लक्ष द्या."}
             </p>
          </div>
          
          <div className="mt-4 bg-green-900 text-white p-6 rounded-[24px]">
            <h4 className="font-bold text-lg mb-2">{t.buyMedicine}</h4>
            <p className="text-sm text-green-200 mb-4">{t.getRemedies.replace('{crop}', selectedCrop)}</p>
            <a 
              href={`https://www.agrostar.in/search?q=${selectedCrop.split(' ')[0]}+pesticide`} 
              target="_blank" 
              className="block w-full text-center bg-white text-green-900 py-3 rounded-xl font-bold hover:bg-green-50 shadow-lg"
            >
              {t.orderAgroStar} &rarr;
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Scanner;

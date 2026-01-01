
import React, { useState, useEffect } from 'react';
import { Page, CropScan, WeatherData, Language, translations } from './types';
import Dashboard from './pages/Dashboard';
import Scanner from './pages/Scanner';
import History from './pages/History';
import Forum from './pages/Forum';
import MandiRates from './pages/MandiRates';
import Navbar from './components/Navbar';

const App: React.FC = () => {
  const [language, setLanguage] = useState<Language | null>(null);
  const [currentPage, setCurrentPage] = useState<Page>(Page.DASHBOARD);
  const [history, setHistory] = useState<CropScan[]>([]);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [location, setLocation] = useState<{lat: number, lng: number} | null>(null);

  useEffect(() => {
    const savedLang = localStorage.getItem('ff_lang');
    if (savedLang) setLanguage(savedLang as Language);

    const savedHistory = localStorage.getItem('ff_history');
    if (savedHistory) setHistory(JSON.parse(savedHistory));

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setWeather({
          temp: 28,
          condition: 'Partly Cloudy',
          humidity: 65,
          description: 'Mild weather, suitable for field work.'
        });
      });
    }
  }, []);

  const handleLangSelect = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('ff_lang', lang);
  };

  useEffect(() => {
    localStorage.setItem('ff_history', JSON.stringify(history));
  }, [history]);

  if (!language) {
    return (
      <div className="min-h-screen bg-green-800 flex flex-col items-center justify-center p-6 text-white overflow-hidden">
        {/* Farmer Mascot Illustration */}
        <div className="relative mb-8 group animate-in zoom-in duration-700">
          <div className="absolute inset-0 bg-white/20 blur-3xl rounded-full scale-150 group-hover:bg-white/30 transition-all"></div>
          <div className="w-48 h-48 md:w-56 md:h-56 bg-white rounded-full flex items-center justify-center shadow-2xl ring-8 ring-white/10 relative overflow-hidden">
            <img 
              src="https://raw.githubusercontent.com/StackBlitz/stackblitz-images/main/farmer-mascot.png" 
              alt="Farmer Mascot" 
              className="w-full h-full object-contain p-2"
              onError={(e) => {
                // Fallback if image fails to load
                e.currentTarget.style.display = 'none';
                e.currentTarget.parentElement!.innerHTML = `<svg class="w-24 h-24 text-green-700" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" /></svg>`;
              }}
            />
          </div>
        </div>
        
        <div className="text-center mb-8 animate-in slide-in-from-bottom-4 duration-700 delay-200">
          <h1 className="text-4xl md:text-5xl font-bold mb-2 tracking-tight">Farmers Friend</h1>
          <p className="text-green-200 font-medium text-lg">आपका सच्चा साथी | Your True Companion</p>
        </div>
        
        <div className="grid grid-cols-2 gap-3 w-full max-w-md animate-in slide-in-from-bottom-8 duration-1000 delay-500">
          {Object.values(Language).map((l) => (
            <button 
              key={l}
              onClick={() => handleLangSelect(l as Language)} 
              className="bg-white/10 hover:bg-white/20 active:scale-95 py-5 rounded-2xl border border-white/20 transition-all font-bold text-lg backdrop-blur-sm"
            >
              {l === Language.HINDI ? 'हिन्दी' : l === Language.MARATHI ? 'मराठी' : l === Language.TELUGU ? 'తెలుగు' : l === Language.TAMIL ? 'தமிழ்' : l === Language.KANNADA ? 'ಕನ್ನಡ' : 'English'}
            </button>
          ))}
        </div>
      </div>
    );
  }

  const addScan = (scan: CropScan) => setHistory(prev => [scan, ...prev]);

  const renderPage = () => {
    switch (currentPage) {
      case Page.DASHBOARD: return <Dashboard weather={weather} navigate={setCurrentPage} history={history} language={language} />;
      case Page.SCANNER: return <Scanner addScan={addScan} location={location} language={language} />;
      case Page.HISTORY: return <History history={history} />;
      case Page.FORUM: return <Forum language={language} />;
      case Page.MANDI: return <MandiRates location={location} language={language} />;
      default: return <Dashboard weather={weather} navigate={setCurrentPage} history={history} language={language} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-50">
      <Navbar current={currentPage} setPage={setCurrentPage} language={language} resetLang={() => setLanguage(null)} />
      <main className="flex-1 overflow-y-auto pb-20 md:pb-0">
        <div className="max-w-4xl mx-auto px-4 py-6">
          {renderPage()}
        </div>
      </main>
    </div>
  );
};

export default App;

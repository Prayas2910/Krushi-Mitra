
import React, { useState, useEffect } from 'react';
import { getLatestOutbreaks } from '../services/geminiService';

const Education: React.FC = () => {
  const [news, setNews] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getLatestOutbreaks().then(res => {
      setNews(res);
      setLoading(false);
    });
  }, []);

  const resources = [
    { title: 'Integrated Pest Management (IPM)', source: 'FAO', type: 'Article', color: 'bg-green-100 text-green-700' },
    { title: 'Sustainable Irrigation Techniques', source: 'AgroUni', type: 'Video', color: 'bg-blue-100 text-blue-700' },
    { title: 'Organic Tomato Blight Control', source: 'BioFarming', type: 'Tutorial', color: 'bg-amber-100 text-amber-700' },
    { title: 'Crop Rotation Best Practices', source: 'USDA', type: 'PDF', color: 'bg-purple-100 text-purple-700' }
  ];

  return (
    <div className="space-y-8">
      <header>
        <h2 className="text-2xl font-bold text-slate-800">Learning Center</h2>
        <p className="text-slate-500">Expert resources to boost your farm's productivity sustainably.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <section className="space-y-4">
          <h3 className="font-bold text-lg text-slate-800 flex items-center space-x-2">
            <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" /></svg>
            <span>Disease Outbreak Alerts (Live Search)</span>
          </h3>
          <div className="bg-white p-6 rounded-3xl border border-red-100 shadow-sm">
            {loading ? (
              <div className="animate-pulse space-y-3">
                <div className="h-4 bg-slate-100 rounded w-3/4"></div>
                <div className="h-4 bg-slate-100 rounded w-full"></div>
                <div className="h-4 bg-slate-100 rounded w-5/6"></div>
              </div>
            ) : (
              <div className="prose prose-sm prose-slate">
                <p className="text-slate-600 mb-4">{news?.text || "No recent outbreaks found."}</p>
                {news?.sources && news.sources.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-slate-100">
                    <p className="text-[10px] font-bold uppercase text-slate-400 mb-2 tracking-widest">Grounding Sources</p>
                    <ul className="space-y-1">
                      {news.sources.map((src: any, i: number) => (
                        <li key={i} className="text-xs text-blue-600 hover:underline">
                          <a href={src.web?.uri} target="_blank" rel="noopener noreferrer">{src.web?.title || 'External Source'}</a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="font-bold text-lg text-slate-800 flex items-center space-x-2">
            <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5s3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
            <span>Library</span>
          </h3>
          <div className="grid grid-cols-1 gap-4">
            {resources.map((res, i) => (
              <div key={i} className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between group hover:border-green-300 transition-all cursor-pointer">
                <div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-widest ${res.color}`}>
                    {res.type}
                  </span>
                  <h4 className="font-bold text-slate-900 mt-2">{res.title}</h4>
                  <p className="text-xs text-slate-500">Source: {res.source}</p>
                </div>
                <svg className="w-5 h-5 text-slate-300 group-hover:text-green-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Education;

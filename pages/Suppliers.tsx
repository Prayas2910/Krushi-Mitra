
import React, { useState, useEffect } from 'react';
import { searchSuppliers } from '../services/geminiService';

interface SuppliersProps {
  location: { lat: number, lng: number } | null;
}

const Suppliers: React.FC<SuppliersProps> = ({ location }) => {
  const [stores, setStores] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (location) {
      setLoading(true);
      searchSuppliers('General Agriculture', location).then(res => {
        setStores(res);
        setLoading(false);
      });
    }
  }, [location]);

  if (!location) {
    return (
      <div className="text-center py-20 bg-white rounded-3xl border border-slate-100">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
        </div>
        <h3 className="text-xl font-bold text-slate-800">Location Access Required</h3>
        <p className="text-slate-500 mt-2">Please allow location access to find agricultural suppliers near you.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-2xl font-bold text-slate-800">Local Ag Suppliers</h2>
        <p className="text-slate-500">Finding nearby seed banks, biopesticide stores, and ag-tech shops.</p>
      </header>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1,2,3,4].map(i => (
            <div key={i} className="animate-pulse bg-white p-6 rounded-3xl border border-slate-100 h-32"></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 col-span-1 md:col-span-2">
            <h3 className="font-bold text-lg mb-4">Recommended for your area</h3>
            <div className="prose prose-sm max-w-none text-slate-600">
              {stores?.text ? stores.text : "Searching for local recommendations..."}
            </div>
          </div>
          
          {stores?.chunks && stores.chunks.map((chunk: any, i: number) => (
            chunk.maps && (
              <a 
                key={i}
                href={chunk.maps.uri}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:border-green-300 transition-all group"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-bold text-slate-900 group-hover:text-green-700 transition-colors">{chunk.maps.title || "Local Supplier"}</h4>
                    <p className="text-sm text-slate-500 mt-1 line-clamp-2">{chunk.maps.uri}</p>
                  </div>
                  <svg className="w-5 h-5 text-slate-300 group-hover:text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                </div>
                <div className="mt-4 flex items-center space-x-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-green-600 bg-green-50 px-2 py-0.5 rounded">Verified Provider</span>
                </div>
              </a>
            )
          ))}
        </div>
      )}
    </div>
  );
};

export default Suppliers;

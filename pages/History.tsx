
import React from 'react';
import { CropScan } from '../types';

interface HistoryProps {
  history: CropScan[];
}

const History: React.FC<HistoryProps> = ({ history }) => {
  return (
    <div className="space-y-6">
      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Scan History</h2>
          <p className="text-slate-500">Track your crop health journey over time.</p>
        </div>
        <div className="text-right">
          <span className="text-3xl font-bold text-green-600">{history.length}</span>
          <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Total Detections</p>
        </div>
      </header>

      {history.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
          <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
          </div>
          <p className="text-slate-400 font-medium">Your health log is empty.</p>
          <button className="mt-4 text-green-600 font-bold hover:underline">Start your first scan &rarr;</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {history.map(scan => (
            <div key={scan.id} className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-shadow">
              <img src={scan.imageUrl} className="h-48 w-full object-cover" alt="Scan" />
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg">{scan.cropType}</h3>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${scan.confidence > 0.8 ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                    {Math.round(scan.confidence * 100)}% Match
                  </span>
                </div>
                <p className="text-red-600 font-semibold text-sm mb-4 line-clamp-1">{scan.disease}</p>
                <div className="flex items-center text-xs text-slate-400 space-x-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  <span>{new Date(scan.timestamp).toLocaleString()}</span>
                </div>
                <button className="mt-6 w-full py-2 bg-slate-50 text-slate-600 text-xs font-bold rounded-xl hover:bg-slate-100 transition-colors">View Details</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;

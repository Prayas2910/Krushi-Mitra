
import React from 'react';

const Blueprint: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-20">
      <header className="text-center">
        <h1 className="text-4xl font-bold text-slate-900">AgroGuard AI: Technical Blueprint</h1>
        <p className="text-slate-500 mt-4 max-w-2xl mx-auto text-lg">A full-stack architecture for sustainable agricultural disease detection and management.</p>
      </header>

      <section className="bg-white p-8 rounded-[40px] shadow-sm border border-slate-100">
        <h2 className="text-2xl font-bold mb-6 text-green-800">1. Tech Stack</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <h3 className="font-bold text-slate-700">Frontend</h3>
            <ul className="text-slate-600 text-sm list-disc pl-4 space-y-1">
              <li>React.js (v18+) for SPA architecture</li>
              <li>Tailwind CSS for responsive, mobile-first design</li>
              <li>Lucide React for consistent iconography</li>
              <li>PWA integration for offline remote access</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h3 className="font-bold text-slate-700">AI & Integration</h3>
            <ul className="text-slate-600 text-sm list-disc pl-4 space-y-1">
              <li>Gemini 3 Flash/Pro for Vision & Reasoning</li>
              <li>Google Maps/Search Grounding for accurate local data</li>
              <li>OpenWeatherMap API for climate context</li>
              <li>D3.js for agricultural analytics</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-green-900 text-white p-8 rounded-[40px] shadow-xl">
        <h2 className="text-2xl font-bold mb-6">2. Database Schema (Draft)</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-green-800 p-4 rounded-2xl">
            <h3 className="font-bold mb-2">User Profile</h3>
            <code className="text-xs text-green-200">
              id: UUID<br/>
              name: String<br/>
              location: LatLng<br/>
              crop_preferences: Array<br/>
              history: ScanID[]
            </code>
          </div>
          <div className="bg-green-800 p-4 rounded-2xl">
            <h3 className="font-bold mb-2">Crop Scan</h3>
            <code className="text-xs text-green-200">
              id: UUID<br/>
              user_id: FK<br/>
              image_url: URL<br/>
              disease_label: String<br/>
              confidence: Float
            </code>
          </div>
          <div className="bg-green-800 p-4 rounded-2xl">
            <h3 className="font-bold mb-2">Forum Thread</h3>
            <code className="text-xs text-green-200">
              id: UUID<br/>
              topic: String<br/>
              posts: PostID[]<br/>
              ai_summary: Text
            </code>
          </div>
        </div>
      </section>

      <section className="bg-white p-8 rounded-[40px] shadow-sm border border-slate-100">
        <h2 className="text-2xl font-bold mb-6 text-slate-800">3. AI Integration Flow</h2>
        <div className="relative border-l-2 border-green-200 ml-4 space-y-8 pl-8">
          <div className="relative">
            <div className="absolute -left-[41px] bg-green-500 w-4 h-4 rounded-full border-4 border-white"></div>
            <h3 className="font-bold">Image Capture</h3>
            <p className="text-sm text-slate-600">Client-side compression of high-res mobile photos to base64 for fast API transmission.</p>
          </div>
          <div className="relative">
            <div className="absolute -left-[41px] bg-green-500 w-4 h-4 rounded-full border-4 border-white"></div>
            <h3 className="font-bold">Inference (Gemini 3 Flash)</h3>
            <p className="text-sm text-slate-600">Visual tokens are matched against agricultural datasets. Multi-modal prompt includes crop type + location.</p>
          </div>
          <div className="relative">
            <div className="absolute -left-[41px] bg-green-500 w-4 h-4 rounded-full border-4 border-white"></div>
            <h3 className="font-bold">Reasoning (Gemini 3 Pro)</h3>
            <p className="text-sm text-slate-600">The detected disease is passed to the 'Thinking' agent to generate customized, sustainable IPM strategies.</p>
          </div>
          <div className="relative">
            <div className="absolute -left-[41px] bg-green-500 w-4 h-4 rounded-full border-4 border-white"></div>
            <h3 className="font-bold">Grounding</h3>
            <p className="text-sm text-slate-600">Maps Grounding finds actual nearby stores. Search Grounding checks for regional outbreaks.</p>
          </div>
        </div>
      </section>

      <section className="bg-amber-50 p-8 rounded-[40px] border border-amber-100">
        <h2 className="text-2xl font-bold mb-6 text-amber-900">4. Sustainability & Monetization</h2>
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <div className="bg-amber-200 p-2 rounded-lg text-amber-900 font-bold text-xs">Sustainability</div>
            <p className="text-sm text-amber-800">Prioritizing biopesticides and organic alternatives in all AI-generated remedies to promote regenerative farming practices.</p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="bg-amber-200 p-2 rounded-lg text-amber-900 font-bold text-xs">Monetization</div>
            <p className="text-sm text-amber-800">Affiliate links to sustainable ag-supply marketplaces, premium detailed soil analysis reports, and corporate dashboard for research agencies.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blueprint;

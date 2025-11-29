import React from 'react';
import { SearchResult } from '../types';
import { ExternalLink, ShoppingBag, Sparkles } from 'lucide-react';

interface ResultsPanelProps {
  result: SearchResult | null;
  loading: boolean;
}

const ResultsPanel: React.FC<ResultsPanelProps> = ({ result, loading }) => {
  if (loading) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 text-center bg-white rounded-xl shadow-sm border border-slate-200">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
        <h3 className="text-lg font-semibold text-slate-800 mb-2">Finding your items...</h3>
        <p className="text-slate-500 max-w-xs">Our AI is analyzing your sketch and searching global stores for matches.</p>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 text-center bg-slate-50 rounded-xl border border-dashed border-slate-300">
        <div className="bg-indigo-100 p-4 rounded-full mb-4">
            <Sparkles className="text-indigo-600" size={32} />
        </div>
        <h3 className="text-lg font-semibold text-slate-800">Ready to Design</h3>
        <p className="text-slate-500 mt-2 max-w-sm">
          Sketch your idea and describe it. We'll find real furniture that matches your vision.
        </p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-4 border-b border-slate-100 bg-indigo-50/50">
        <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
          <ShoppingBag size={20} className="text-indigo-600" />
          Found Matches
        </h2>
      </div>
      
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* AI Analysis Text */}
        <div className="prose prose-slate prose-sm max-w-none">
          <div className="whitespace-pre-wrap text-slate-700 leading-relaxed">
            {result.text}
          </div>
        </div>

        {/* Sources / Links */}
        {result.groundingMetadata?.groundingChunks && result.groundingMetadata.groundingChunks.length > 0 && (
          <div className="mt-6 pt-6 border-t border-slate-100">
            <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">
              Where to Buy
            </h3>
            <div className="grid gap-3">
              {result.groundingMetadata.groundingChunks.map((chunk, idx) => {
                if (!chunk.web?.uri) return null;
                return (
                  <a
                    key={idx}
                    href={chunk.web.uri}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-lg border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 transition-all group"
                  >
                    <div className="flex-1 min-w-0 mr-4">
                      <p className="text-sm font-medium text-slate-900 truncate">
                        {chunk.web.title || "Product Link"}
                      </p>
                      <p className="text-xs text-slate-500 truncate">{new URL(chunk.web.uri).hostname}</p>
                    </div>
                    <ExternalLink size={16} className="text-slate-400 group-hover:text-indigo-600" />
                  </a>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultsPanel;
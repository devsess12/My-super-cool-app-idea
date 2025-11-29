
import React from 'react';
import { COLORS, PATTERNS } from '../constants/styles';
import { X } from 'lucide-react';

interface StylePickerProps {
  currentColor: string;
  currentPattern?: string;
  onColorChange: (color: string) => void;
  onPatternChange: (patternId: string | undefined) => void;
  onClose: () => void;
}

const StylePicker: React.FC<StylePickerProps> = ({ 
  currentColor, 
  currentPattern, 
  onColorChange, 
  onPatternChange,
  onClose 
}) => {
  return (
    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white rounded-xl shadow-xl border border-slate-200 p-4 w-72 z-50">
      <div className="flex justify-between items-center mb-3">
        <h4 className="text-sm font-bold text-slate-700">Customize Style</h4>
        <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
          <X size={16} />
        </button>
      </div>

      <div className="space-y-4 max-h-[300px] overflow-y-auto pr-1 scrollbar-hide">
        {/* Colors */}
        {Object.entries(COLORS).map(([category, colors]) => (
          <div key={category}>
            <p className="text-[10px] uppercase text-slate-400 font-bold mb-1">{category}</p>
            <div className="flex flex-wrap gap-2">
              {colors.map(c => (
                <button
                  key={c.id}
                  onClick={() => onColorChange(c.value)}
                  title={c.label}
                  className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 ${
                    currentColor === c.value && !currentPattern ? 'border-slate-800 ring-1 ring-slate-800' : 'border-slate-100'
                  }`}
                  style={{ backgroundColor: c.value }}
                />
              ))}
            </div>
          </div>
        ))}

        {/* Patterns */}
        <div>
          <p className="text-[10px] uppercase text-slate-400 font-bold mb-1">Patterns</p>
          <div className="flex flex-wrap gap-2">
            <button
                onClick={() => onPatternChange(undefined)}
                className={`w-8 h-8 rounded-md border-2 flex items-center justify-center text-[10px] font-medium text-slate-500 bg-slate-50 ${
                  !currentPattern ? 'border-indigo-600 bg-indigo-50' : 'border-slate-200'
                }`}
            >
              None
            </button>
            {PATTERNS.map(p => (
              <button
                key={p.id}
                onClick={() => onPatternChange(p.id)}
                title={p.name}
                className={`w-8 h-8 rounded-md border-2 overflow-hidden relative ${
                  currentPattern === p.id ? 'border-indigo-600 ring-1 ring-indigo-600' : 'border-slate-200'
                }`}
              >
                {/* Preview SVG */}
                <svg width="100%" height="100%" viewBox="0 0 20 20">
                    <defs dangerouslySetInnerHTML={{ __html: p.def }} />
                    {/* Use white bg then pattern on top */}
                    <rect width="20" height="20" fill="white"/>
                    <rect width="20" height="20" fill={`url(#${p.id})`} className="text-slate-500" />
                </svg>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StylePicker;

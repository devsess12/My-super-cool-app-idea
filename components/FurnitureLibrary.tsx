
import React, { useState } from 'react';
import { FURNITURE_CATALOG } from '../constants/furniture';
import { Sofa, Coffee, Box, Lamp, Sprout, Tv, Home, BedDouble } from 'lucide-react';

const CATEGORIES = [
  { id: 'structure', icon: Home, label: 'Structure' },
  { id: 'bedroom', icon: BedDouble, label: 'Bedroom' },
  { id: 'seating', icon: Sofa, label: 'Seating' },
  { id: 'tables', icon: Coffee, label: 'Tables' },
  { id: 'storage', icon: Box, label: 'Storage' },
  { id: 'lighting', icon: Lamp, label: 'Lighting' },
  { id: 'decor', icon: Sprout, label: 'Decor' },
  { id: 'appliances', icon: Tv, label: 'Appliances' },
];

const FurnitureLibrary: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('structure');

  const handleDragStart = (e: React.DragEvent, item: any) => {
    e.dataTransfer.setData('furniture_id', item.id);
    e.dataTransfer.effectAllowed = 'copy';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-full">
      <div className="p-3 bg-slate-50 border-b border-slate-200">
        <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wide">Furniture Library</h3>
      </div>
      
      {/* Categories */}
      <div className="flex overflow-x-auto p-2 gap-2 border-b border-slate-100 scrollbar-hide">
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`flex flex-col items-center justify-center p-2 min-w-[60px] rounded-lg transition-colors ${
              activeCategory === cat.id 
                ? 'bg-indigo-100 text-indigo-700' 
                : 'hover:bg-slate-100 text-slate-500'
            }`}
          >
            <cat.icon size={20} />
            <span className="text-[10px] mt-1 font-medium">{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Items Grid */}
      <div className="flex-1 overflow-y-auto p-3 bg-slate-50">
        <div className="grid grid-cols-2 gap-3">
          {FURNITURE_CATALOG.filter(item => item.category === activeCategory).map(item => (
            <div
              key={item.id}
              draggable
              onDragStart={(e) => handleDragStart(e, item)}
              className="bg-white p-2 rounded-lg border border-slate-200 hover:border-indigo-400 hover:shadow-md cursor-grab active:cursor-grabbing transition-all flex flex-col items-center"
            >
              <div 
                className="w-16 h-16 flex items-center justify-center mb-2 pointer-events-none"
                dangerouslySetInnerHTML={{ __html: item.svg }} 
              />
              <span className="text-xs text-slate-600 font-medium text-center">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="p-3 bg-indigo-50 border-t border-indigo-100 text-xs text-indigo-700 text-center">
        Drag items onto the canvas
      </div>
    </div>
  );
};

export default FurnitureLibrary;
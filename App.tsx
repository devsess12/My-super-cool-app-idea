
import React, { useState, useRef } from 'react';
import DrawingCanvas, { DrawingCanvasRef } from './components/DrawingCanvas';
import ResultsPanel from './components/ResultsPanel';
import FurnitureLibrary from './components/FurnitureLibrary';
import { findFurniture, scanRoomImage } from './services/geminiService';
import { SearchResult, AppState, StickerItem } from './types';
import { FURNITURE_CATALOG } from './constants/furniture';
import { ArrowRight, Palette, RotateCcw, Wand2 } from 'lucide-react';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.DESIGNING);
  const [prompt, setPrompt] = useState('');
  const [bgImage, setBgImage] = useState<string | null>(null);
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  
  const canvasRef = useRef<DrawingCanvasRef>(null);

  const handleSearch = async () => {
    if (!canvasRef.current) return;
    
    if (!canvasRef.current.hasContent()) {
        setErrorMessage("Please draw something, drag furniture, or upload a photo first.");
        return;
    }
    
    setAppState(AppState.SEARCHING);
    setErrorMessage(null);

    try {
      // Get composite image from child component
      const compositeImage = await canvasRef.current.exportComposite();
      
      const response = await findFurniture(compositeImage, prompt);
      
      setSearchResult({
        text: response.text || "No detailed description returned.",
        groundingMetadata: response.candidates?.[0]?.groundingMetadata as any
      });
      setAppState(AppState.RESULTS);
    } catch (err: any) {
      console.error(err);
      setErrorMessage("Something went wrong with the search. Please try again.");
      setAppState(AppState.ERROR);
    }
  };

  const handleScanRoom = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsScanning(true);
    setErrorMessage(null);

    const reader = new FileReader();
    reader.onload = async (evt) => {
      const base64 = evt.target?.result as string;
      try {
        const result = await scanRoomImage(base64);
        generateRoomLayout(result.floorType, result.items);
      } catch (err) {
        console.error(err);
        setErrorMessage("Could not scan the room. Please try again.");
      } finally {
        setIsScanning(false);
      }
    };
    reader.readAsDataURL(file);
    
    // Reset input
    e.target.value = '';
  };

  const generateRoomLayout = (floorId: string, itemIds: string[]) => {
      if (!canvasRef.current) return;

      const items: StickerItem[] = [];
      const centerX = 300;
      const centerY = 300;

      // 1. Create Floor Grid (3x3 grid of tiles)
      const floorDef = FURNITURE_CATALOG.find(f => f.id === floorId) || FURNITURE_CATALOG.find(f => f.id === 'floor-wood')!;
      for(let r=0; r<4; r++) {
          for(let c=0; c<4; c++) {
              items.push({
                  id: `floor-${r}-${c}`,
                  type: floorDef.id,
                  svgContent: floorDef.svg,
                  x: centerX + (c - r) * (floorDef.defaultWidth / 2) - 150,
                  y: centerY + (c + r) * (floorDef.defaultHeight / 2) - 150,
                  width: floorDef.defaultWidth,
                  height: floorDef.defaultHeight,
                  rotation: 0,
                  scaleX: 1,
                  color: floorDef.defaultColor
              });
          }
      }

      // 2. Add Back Walls
      const wallDef = FURNITURE_CATALOG.find(w => w.id === 'wall-straight')!;
      // Left Wall
      items.push({
          id: 'wall-left',
          type: wallDef.id,
          svgContent: wallDef.svg,
          x: centerX - 250,
          y: centerY - 150,
          width: wallDef.defaultWidth,
          height: wallDef.defaultHeight,
          rotation: 0,
          scaleX: -1, // Flip for left side perspective
          color: wallDef.defaultColor
      });
      // Right Wall
       items.push({
          id: 'wall-right',
          type: wallDef.id,
          svgContent: wallDef.svg,
          x: centerX + 50,
          y: centerY - 150,
          width: wallDef.defaultWidth,
          height: wallDef.defaultHeight,
          rotation: 0,
          scaleX: 1,
          color: wallDef.defaultColor
      });

      // 3. Place Detected Items randomly in the center area
      itemIds.forEach((id, idx) => {
         const def = FURNITURE_CATALOG.find(i => i.id === id);
         if(def) {
             items.push({
                 id: `scanned-item-${idx}`,
                 type: def.id,
                 svgContent: def.svg,
                 x: centerX + ((idx % 3) * 60) - 60,
                 y: centerY + (Math.floor(idx / 3) * 40) - 50,
                 width: def.defaultWidth,
                 height: def.defaultHeight,
                 rotation: 0,
                 scaleX: 1,
                 color: def.defaultColor
             });
         }
      });

      canvasRef.current.loadScene(items);
      setPrompt("A room with " + itemIds.map(id => id.replace('iso-', '').replace('-', ' ')).join(', '));
  };

  const resetSearch = () => {
    setAppState(AppState.DESIGNING);
    setSearchResult(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-900 font-sans">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="bg-indigo-600 p-2 rounded-lg text-white shadow-md">
            <Palette size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900">DreamDecor AI</h1>
            <p className="text-xs text-slate-500 font-medium">Design Virtual Rooms & Find Real Items</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
             {/* Magic Scan Button */}
             <label className={`
                flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all cursor-pointer border
                ${isScanning 
                    ? 'bg-indigo-50 border-indigo-200 text-indigo-700' 
                    : 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white hover:shadow-md border-transparent'}
             `}>
                 {isScanning ? (
                     <span className="flex items-center gap-2"><div className="w-4 h-4 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div> Scanning Room...</span>
                 ) : (
                     <>
                        <Wand2 size={16} />
                        <span>Scan Room Photo</span>
                        <input type="file" accept="image/*" className="hidden" onChange={handleScanRoom} disabled={isScanning} />
                     </>
                 )}
             </label>

            {appState === AppState.RESULTS && (
            <button 
                onClick={resetSearch}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 hover:text-indigo-600 hover:bg-slate-50 rounded-lg transition-colors border border-transparent hover:border-slate-200"
            >
                <RotateCcw size={16} />
                Start New Design
            </button>
            )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-6 lg:p-6 max-w-[1600px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:h-[calc(100vh-80px)] lg:overflow-hidden h-auto">
        
        {/* Left: Furniture Library (Fixed width on large screens) */}
        <div className="hidden lg:block lg:col-span-2 h-full min-h-0">
            <FurnitureLibrary />
        </div>

        {/* Center: Canvas & Prompt */}
        <div className="lg:col-span-6 flex flex-col gap-4 lg:h-full h-auto min-h-0">
          
          {/* Canvas */}
          <div className="lg:flex-1 h-[500px] lg:h-auto relative min-h-0">
            <DrawingCanvas 
              ref={canvasRef}
              bgImage={bgImage} 
              setBgImage={setBgImage} 
            />
          </div>

          {/* Prompt Area */}
          <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 shrink-0">
            <label htmlFor="prompt" className="block text-sm font-medium text-slate-700 mb-2">
              Describe your room idea
            </label>
            <div className="flex gap-3">
              <input
                id="prompt"
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g., A cozy Scandinavian living room with a green velvet sofa..."
                className="flex-1 px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-400"
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
              <button
                onClick={handleSearch}
                disabled={appState === AppState.SEARCHING || isScanning}
                className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-all shadow-md hover:shadow-lg whitespace-nowrap"
              >
                {appState === AppState.SEARCHING ? 'Searching...' : 'Find Matches'}
                {!appState && <ArrowRight size={18} />}
              </button>
            </div>
            {errorMessage && (
              <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
            )}
          </div>
        </div>

        {/* Right: Results */}
        <div className="lg:col-span-4 h-full min-h-0">
          <ResultsPanel 
            loading={appState === AppState.SEARCHING} 
            result={searchResult} 
          />
        </div>

        {/* Mobile Library (Shown below canvas on small screens) */}
        <div className="lg:hidden col-span-1 block">
             <div className="mb-4">
                 <h3 className="font-bold text-slate-700 mb-2">Items Library</h3>
                 <div className="h-96">
                    <FurnitureLibrary />
                 </div>
             </div>
        </div>

      </main>
    </div>
  );
};

export default App;

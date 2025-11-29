
import React, { useRef, useEffect, useState, useImperativeHandle, forwardRef } from 'react';
import { DrawingTool, StickerItem } from '../types';
import { FURNITURE_CATALOG } from '../constants/furniture';
import { PATTERNS } from '../constants/styles';
import StylePicker from './StylePicker';
import { Eraser, Pen, Trash2, RotateCw, Image as ImageIcon, X, ArrowLeftRight, Grid, Layers, ArrowUp, ArrowDown, PaintBucket } from 'lucide-react';

interface DrawingCanvasProps {
  bgImage: string | null;
  setBgImage: (url: string | null) => void;
}

export interface DrawingCanvasRef {
  exportComposite: () => Promise<string>;
  hasContent: () => boolean;
  loadScene: (newStickers: StickerItem[]) => void;
}

const DrawingCanvas = forwardRef<DrawingCanvasRef, DrawingCanvasProps>(({ bgImage, setBgImage }, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Drawing State
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState<DrawingTool>({ type: 'pen', color: '#000000', width: 4 });
  const [hasDrawn, setHasDrawn] = useState(false);
  const [showGrid, setShowGrid] = useState(true);
  
  // Sticker State
  const [stickers, setStickers] = useState<StickerItem[]>([]);
  const [selectedStickerId, setSelectedStickerId] = useState<string | null>(null);
  const [isDraggingSticker, setIsDraggingSticker] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [showStylePicker, setShowStylePicker] = useState(false);

  // Helper to inject styles into SVG template
  const getStyledSvg = (sticker: StickerItem) => {
      let content = sticker.svgContent;
      
      // If a pattern is selected, we need to inject the <defs> and reference it
      if (sticker.pattern) {
          const patternDef = PATTERNS.find(p => p.id === sticker.pattern);
          if (patternDef) {
              // Create a unique ID for this instance to prevent conflicts if we had multiple
              const uniquePatternId = `${sticker.pattern}-${sticker.id}`;
              const defWithId = patternDef.def.replace(`id="${sticker.pattern}"`, `id="${uniquePatternId}"`);
              
              // Add Defs to start of SVG
              content = content.replace('<svg', `<svg`); // No-op, just to find insertion point?
              // Better: Insert after first >
              const firstTagEnd = content.indexOf('>');
              if(firstTagEnd > -1) {
                  content = content.slice(0, firstTagEnd + 1) + `<defs>${defWithId}</defs>` + content.slice(firstTagEnd + 1);
              }
              
              // Replace Fill with Pattern URL, set Text Color (currentColor) to sticker.color
              // We use the sticker.color as the "ink" for the pattern lines (via currentColor in pattern def)
              content = content.replace(/__FILL__/g, `url(#${uniquePatternId})`);
              
              // Wrap in a group to set color context for pattern
              // Or inject style="color: ..." into svg
               content = content.replace('<svg', `<svg style="color: ${sticker.color};"`);
          }
      } else {
          // Solid Color
          content = content.replace(/__FILL__/g, sticker.color);
      }
      
      return content;
  };

  // Expose methods to parent
  useImperativeHandle(ref, () => ({
    hasContent: () => hasDrawn || !!bgImage || stickers.length > 0,
    loadScene: (newStickers: StickerItem[]) => {
        setStickers(newStickers);
        setHasDrawn(false);
        setBgImage(null); 
    },
    exportComposite: async () => {
      // 1. Create a temporary canvas
      const tempCanvas = document.createElement('canvas');
      const width = canvasRef.current?.width || 800;
      const height = canvasRef.current?.height || 600;
      tempCanvas.width = width;
      tempCanvas.height = height;
      const ctx = tempCanvas.getContext('2d');
      if (!ctx) return '';

      // 2. Draw Background
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, width, height);

      if (bgImage) {
        await new Promise<void>((resolve) => {
          const img = new Image();
          img.crossOrigin = "anonymous";
          img.src = bgImage;
          img.onload = () => {
             const scale = Math.min(width / img.width, height / img.height);
             const x = (width / 2) - (img.width / 2) * scale;
             const y = (height / 2) - (img.height / 2) * scale;
             ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
             resolve();
          };
          img.onerror = () => resolve(); 
        });
      }
      
      // 3. Draw Stickers
      for (const sticker of stickers) {
          const finalSvg = getStyledSvg(sticker);
          const svgBlob = new Blob([finalSvg], {type: 'image/svg+xml;charset=utf-8'});
          const url = URL.createObjectURL(svgBlob);
          
          await new Promise<void>((resolve) => {
              const img = new Image();
              img.src = url;
              img.onload = () => {
                  ctx.save();
                  ctx.translate(sticker.x + sticker.width / 2, sticker.y + sticker.height / 2);
                  ctx.rotate((sticker.rotation * Math.PI) / 180);
                  ctx.scale(sticker.scaleX || 1, 1);
                  ctx.drawImage(img, -sticker.width / 2, -sticker.height / 2, sticker.width, sticker.height);
                  ctx.restore();
                  URL.revokeObjectURL(url);
                  resolve();
              };
              img.onerror = () => resolve();
          });
      }

      // 4. Draw Freehand Sketches on top
      if (canvasRef.current) {
        ctx.drawImage(canvasRef.current, 0, 0);
      }

      return tempCanvas.toDataURL('image/png');
    }
  }));

  // Resize listener
  useEffect(() => {
    const resizeCanvas = () => {
      if (containerRef.current && canvasRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        const data = canvasRef.current.toDataURL();
        canvasRef.current.width = width;
        canvasRef.current.height = height;
        const img = new Image();
        img.src = data;
        img.onload = () => canvasRef.current?.getContext('2d')?.drawImage(img, 0, 0);
      }
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  // -- Drawing Logic --
  const getCoordinates = (event: React.MouseEvent | React.TouchEvent) => {
    if (!canvasRef.current) return { x: 0, y: 0 };
    const rect = canvasRef.current.getBoundingClientRect();
    const clientX = 'touches' in event ? event.touches[0].clientX : (event as React.MouseEvent).clientX;
    const clientY = 'touches' in event ? event.touches[0].clientY : (event as React.MouseEvent).clientY;
    return { x: clientX - rect.left, y: clientY - rect.top };
  };

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    if (isDraggingSticker) return;
    if (selectedStickerId) {
        setSelectedStickerId(null);
        setShowStylePicker(false);
    }

    setIsDrawing(true);
    setHasDrawn(true);
    const { x, y } = getCoordinates(e);
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx) {
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.strokeStyle = tool.type === 'eraser' ? '#ffffff' : tool.color;
      ctx.lineWidth = tool.type === 'eraser' ? 20 : tool.width;
    }
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing || !canvasRef.current) return;
    e.preventDefault();
    const { x, y } = getCoordinates(e);
    const ctx = canvasRef.current.getContext('2d');
    if (ctx) {
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  };

  const stopDrawing = () => setIsDrawing(false);

  const handleClear = () => {
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx && canvasRef.current) {
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      setHasDrawn(false);
      setStickers([]); 
      setSelectedStickerId(null);
      setShowStylePicker(false);
    }
  };

  // -- Sticker Logic --
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const furnitureId = e.dataTransfer.getData('furniture_id');
    const itemDef = FURNITURE_CATALOG.find(i => i.id === furnitureId);
    
    if (itemDef && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left - (itemDef.defaultWidth / 2);
      const y = e.clientY - rect.top - (itemDef.defaultHeight / 2);
      
      const newSticker: StickerItem = {
        id: Date.now().toString(),
        type: itemDef.id,
        svgContent: itemDef.svg,
        x,
        y,
        width: itemDef.defaultWidth,
        height: itemDef.defaultHeight,
        rotation: 0,
        scaleX: 1,
        color: itemDef.defaultColor,
      };
      
      setStickers(prev => [...prev, newSticker]);
      setSelectedStickerId(newSticker.id);
      setShowStylePicker(false); // Reset picker for new item
    }
  };

  const handleDragOver = (e: React.DragEvent) => e.preventDefault();

  const handleStickerMouseDown = (e: React.MouseEvent, id: string) => {
    e.stopPropagation(); 
    if (selectedStickerId !== id) {
        setSelectedStickerId(id);
        setShowStylePicker(false); // Close previous picker if open
    }
    setIsDraggingSticker(true);
    
    const sticker = stickers.find(s => s.id === id);
    if (sticker && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left - sticker.x,
        y: e.clientY - rect.top - sticker.y
      });
    }
  };

  const handleStickerMouseMove = (e: React.MouseEvent) => {
    if (isDraggingSticker && selectedStickerId && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        setStickers(prev => prev.map(s => {
            if (s.id === selectedStickerId) {
                return {
                    ...s,
                    x: mouseX - dragOffset.x,
                    y: mouseY - dragOffset.y
                };
            }
            return s;
        }));
    }
  };

  const handleStickerMouseUp = () => setIsDraggingSticker(false);

  // Sticker Modifications
  const modifySticker = (id: string, modification: Partial<StickerItem>) => {
      setStickers(prev => prev.map(s => s.id === id ? { ...s, ...modification } : s));
  };

  const rotateSticker = (id: string) => {
    setStickers(prev => prev.map(s => {
        if (s.id === id) {
            return { ...s, rotation: (s.rotation + 45) % 360 };
        }
        return s;
    }));
  };

  const flipSticker = (id: string) => {
    setStickers(prev => prev.map(s => {
        if (s.id === id) {
            return { ...s, scaleX: s.scaleX === 1 ? -1 : 1 };
        }
        return s;
    }));
  };
  
  const moveStickerToBack = (id: string) => {
      setStickers(prev => {
          const item = prev.find(s => s.id === id);
          if (!item) return prev;
          const others = prev.filter(s => s.id !== id);
          return [item, ...others];
      });
  };
  
  const moveStickerToFront = (id: string) => {
      setStickers(prev => {
          const item = prev.find(s => s.id === id);
          if (!item) return prev;
          const others = prev.filter(s => s.id !== id);
          return [...others, item];
      });
  };

  const deleteSticker = (id: string) => {
    setStickers(prev => prev.filter(s => s.id !== id));
    if (selectedStickerId === id) {
        setSelectedStickerId(null);
        setShowStylePicker(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => setBgImage(evt.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const selectedSticker = stickers.find(s => s.id === selectedStickerId);

  return (
    <div className="flex flex-col h-full w-full bg-white rounded-xl shadow-sm overflow-hidden border border-slate-200">
      {/* Toolbar */}
      <div className="flex items-center justify-between p-3 bg-slate-50 border-b border-slate-200">
        <div className="flex gap-2">
          <button 
            onClick={() => setTool({ ...tool, type: 'pen', width: 4 })}
            className={`p-2 rounded-lg transition-colors ${tool.type === 'pen' ? 'bg-indigo-600 text-white' : 'hover:bg-slate-200 text-slate-600'}`}
            title="Pen"
          >
            <Pen size={18} />
          </button>
          <button 
            onClick={() => setTool({ ...tool, type: 'eraser', width: 20 })}
            className={`p-2 rounded-lg transition-colors ${tool.type === 'eraser' ? 'bg-indigo-600 text-white' : 'hover:bg-slate-200 text-slate-600'}`}
            title="Eraser"
          >
            <Eraser size={18} />
          </button>
          
          <div className="w-px h-6 bg-slate-300 mx-1"></div>

          <button 
            onClick={() => setShowGrid(!showGrid)}
            className={`p-2 rounded-lg transition-colors ${showGrid ? 'bg-indigo-100 text-indigo-600' : 'hover:bg-slate-200 text-slate-600'}`}
            title="Toggle Grid"
          >
            <Grid size={18} />
          </button>

          <label className="p-2 rounded-lg hover:bg-slate-200 text-slate-600 cursor-pointer transition-colors" title="Upload Background Photo">
            <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
            <ImageIcon size={18} />
          </label>
          
           <button 
            onClick={handleClear}
            className="p-2 rounded-lg hover:bg-red-100 text-red-500 transition-colors"
            title="Clear All"
          >
            <Trash2 size={18} />
          </button>
        </div>
        
        <div className="flex items-center gap-2">
            <div className="flex gap-1">
                {['#000000', '#EF4444', '#3B82F6', '#10B981', '#F59E0B'].map(color => (
                    <button
                        key={color}
                        onClick={() => setTool({ ...tool, type: 'pen', color })}
                        className={`w-6 h-6 rounded-full border-2 ${tool.color === color && tool.type === 'pen' ? 'border-slate-800 scale-110' : 'border-transparent'}`}
                        style={{ backgroundColor: color }}
                    />
                ))}
            </div>
        </div>
      </div>

      {/* Canvas Area */}
      <div 
        className="relative flex-1 bg-slate-100 touch-none cursor-crosshair overflow-hidden user-select-none" 
        ref={containerRef}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onMouseMove={handleStickerMouseMove}
        onMouseUp={handleStickerMouseUp}
        onMouseLeave={handleStickerMouseUp}
      >
        {/* Isometric Grid Background */}
        {showGrid && (
           <div 
             className="absolute inset-0 pointer-events-none opacity-20 z-0"
             style={{
               backgroundImage: `linear-gradient(30deg, #94a3b8 1px, transparent 1px), linear-gradient(150deg, #94a3b8 1px, transparent 1px)`,
               backgroundSize: '40px 23px' // Isometric grid ratio approx
             }}
           ></div>
        )}

        {/* Background Image Layer */}
        {bgImage && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                 <img src={bgImage} alt="Background" className="max-w-full max-h-full object-contain opacity-50" />
            </div>
        )}

        {/* Empty State Hint */}
        {!bgImage && !hasDrawn && stickers.length === 0 && (
             <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-slate-400 z-0">
                <p className="text-sm bg-white/50 px-3 py-1 rounded-full">Draw here or drag items from the library</p>
             </div>
        )}

        {/* Freehand Canvas Layer (Z-Index 10) */}
        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0 w-full h-full z-10"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        />

        {/* Stickers Layer (Z-Index 20 - above drawing for selection) */}
        {stickers.map(sticker => (
            <div
                key={sticker.id}
                className={`absolute group cursor-move ${selectedStickerId === sticker.id ? 'z-30' : 'z-20'}`}
                style={{
                    left: sticker.x,
                    top: sticker.y,
                    width: sticker.width,
                    height: sticker.height,
                    transform: `rotate(${sticker.rotation}deg) scaleX(${sticker.scaleX || 1})`,
                    transformOrigin: 'center center'
                }}
                onMouseDown={(e) => handleStickerMouseDown(e, sticker.id)}
            >
                {/* Visual */}
                <div 
                    className={`w-full h-full transition-all ${selectedStickerId === sticker.id ? 'drop-shadow-xl' : ''}`}
                    dangerouslySetInnerHTML={{ __html: getStyledSvg(sticker) }}
                />
                
                {/* Controls (Only visible when selected) */}
                {selectedStickerId === sticker.id && (
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 flex gap-1 bg-white p-1 rounded-lg shadow-lg border border-slate-200"
                        style={{ transform: `scaleX(${sticker.scaleX === -1 ? -1 : 1})` }} // Counter-flip controls
                    >
                         <button 
                           onClick={(e) => { e.stopPropagation(); setShowStylePicker(!showStylePicker); }}
                           className={`p-1 hover:bg-slate-100 rounded text-slate-600 ${showStylePicker ? 'bg-indigo-50 text-indigo-600' : ''}`}
                           title="Customize Style"
                        >
                            <PaintBucket size={14} />
                        </button>
                        <div className="w-px h-4 bg-slate-200 my-auto mx-1"></div>
                        <button 
                           onClick={(e) => { e.stopPropagation(); moveStickerToBack(sticker.id); }}
                           className="p-1 hover:bg-slate-100 rounded text-slate-600"
                           title="Send to Back"
                        >
                            <ArrowDown size={14} />
                        </button>
                        <button 
                           onClick={(e) => { e.stopPropagation(); moveStickerToFront(sticker.id); }}
                           className="p-1 hover:bg-slate-100 rounded text-slate-600"
                           title="Bring to Front"
                        >
                            <ArrowUp size={14} />
                        </button>
                        <div className="w-px h-4 bg-slate-200 my-auto mx-1"></div>
                        <button 
                           onClick={(e) => { e.stopPropagation(); rotateSticker(sticker.id); }}
                           className="p-1 hover:bg-slate-100 rounded text-slate-600"
                           title="Rotate"
                        >
                            <RotateCw size={14} />
                        </button>
                         <button 
                           onClick={(e) => { e.stopPropagation(); flipSticker(sticker.id); }}
                           className="p-1 hover:bg-slate-100 rounded text-slate-600"
                           title="Flip Horizontal"
                        >
                            <ArrowLeftRight size={14} />
                        </button>
                        <div className="w-px h-4 bg-slate-200 my-auto mx-1"></div>
                        <button 
                           onClick={(e) => { e.stopPropagation(); deleteSticker(sticker.id); }}
                           className="p-1 hover:bg-red-50 rounded text-red-500"
                           title="Delete"
                        >
                            <X size={14} />
                        </button>

                        {/* Style Picker Popover */}
                        {showStylePicker && (
                            <div onClick={(e) => e.stopPropagation()}>
                                <StylePicker 
                                    currentColor={sticker.color}
                                    currentPattern={sticker.pattern}
                                    onColorChange={(c) => modifySticker(sticker.id, { color: c })}
                                    onPatternChange={(p) => modifySticker(sticker.id, { pattern: p })}
                                    onClose={() => setShowStylePicker(false)}
                                />
                            </div>
                        )}
                    </div>
                )}
                
                {/* Selection Border */}
                {selectedStickerId === sticker.id && (
                    <div className="absolute inset-0 border-2 border-indigo-500 rounded-sm pointer-events-none"></div>
                )}
            </div>
        ))}
      </div>
    </div>
  );
});

export default DrawingCanvas;

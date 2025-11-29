
export interface GroundingChunk {
  web?: {
    uri: string;
    title: string;
  };
}

export interface GroundingMetadata {
  groundingChunks: GroundingChunk[];
  groundingSupports?: any[];
  searchEntryPoint?: any;
}

export interface SearchResult {
  text: string;
  groundingMetadata?: GroundingMetadata;
}

export interface DrawingTool {
  type: 'pen' | 'eraser';
  color: string;
  width: number;
}

export enum AppState {
  DESIGNING = 'DESIGNING',
  SEARCHING = 'SEARCHING',
  RESULTS = 'RESULTS',
  ERROR = 'ERROR'
}

export interface StickerItem {
  id: string;
  type: string;
  svgContent: string; // The raw template
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  scaleX: number; // 1 or -1 for flipping
  color: string; // Hex color
  pattern?: string; // Pattern ID from styles
}

export interface FurnitureDefinition {
  id: string;
  name: string;
  category: 'structure' | 'seating' | 'tables' | 'storage' | 'lighting' | 'decor' | 'appliances' | 'bedroom';
  svg: string;
  defaultWidth: number;
  defaultHeight: number;
  defaultColor: string;
}
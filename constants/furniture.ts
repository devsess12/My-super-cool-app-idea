
import { FurnitureDefinition } from '../types';

export const FURNITURE_CATALOG: FurnitureDefinition[] = [
  // --- Flooring (Base Layer) ---
  {
    id: 'floor-wood',
    name: 'Wood Floor',
    category: 'structure',
    defaultWidth: 100,
    defaultHeight: 58,
    defaultColor: '#d4a373',
    svg: `<svg viewBox="0 0 100 58" fill="none" xmlns="http://www.w3.org/2000/svg">
       <path d="M50 0 L100 29 L50 58 L0 29 L50 0Z" fill="__FILL__" stroke="#a98467" stroke-width="1"/>
       <path d="M10 23 L90 23" stroke="#000000" stroke-width="1" stroke-opacity="0.1"/>
       <path d="M10 35 L90 35" stroke="#000000" stroke-width="1" stroke-opacity="0.1"/>
    </svg>`
  },
  {
    id: 'floor-tile',
    name: 'Tiled Floor',
    category: 'structure',
    defaultWidth: 100,
    defaultHeight: 58,
    defaultColor: '#e2e8f0',
    svg: `<svg viewBox="0 0 100 58" fill="none" xmlns="http://www.w3.org/2000/svg">
       <path d="M50 0 L100 29 L50 58 L0 29 L50 0Z" fill="__FILL__" stroke="#cbd5e1" stroke-width="1"/>
       <path d="M50 0 L50 58" stroke="#cbd5e1"/>
       <path d="M0 29 L100 29" stroke="#cbd5e1"/>
    </svg>`
  },
   {
    id: 'floor-patio',
    name: 'Patio Paving',
    category: 'structure',
    defaultWidth: 100,
    defaultHeight: 58,
    defaultColor: '#94a3b8',
    svg: `<svg viewBox="0 0 100 58" fill="none" xmlns="http://www.w3.org/2000/svg">
       <path d="M50 0 L100 29 L50 58 L0 29 L50 0Z" fill="__FILL__" stroke="#64748b" stroke-width="1"/>
       <path d="M25 14.5 L75 43.5" stroke="#64748b"/>
       <path d="M75 14.5 L25 43.5" stroke="#64748b"/>
    </svg>`
  },

  // --- Walls (Cutaway Style) ---
  {
    id: 'wall-straight',
    name: 'Wall (Straight)',
    category: 'structure',
    defaultWidth: 100,
    defaultHeight: 120,
    defaultColor: '#f8fafc',
    svg: `<svg viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Cutaway Top (Fixed Dark Grey) -->
      <path d="M0 20 L8 16 L100 68 L92 72 L0 20Z" fill="#475569" stroke="#334155"/>
      <!-- Wall Face (Customizable) -->
      <path d="M0 20 L92 72 V120 L0 68 V20Z" fill="__FILL__" stroke="#cbd5e1" stroke-width="2"/>
      <!-- Baseboard (Fixed) -->
      <path d="M0 115 L92 119" stroke="#cbd5e1" stroke-width="2"/>
    </svg>`
  },
  {
    id: 'wall-corner',
    name: 'Wall (Corner)',
    category: 'structure',
    defaultWidth: 100,
    defaultHeight: 120,
    defaultColor: '#f1f5f9',
    svg: `<svg viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Top -->
      <path d="M50 45 L58 41 L8 12 L0 16 L50 45Z" fill="#475569" stroke="#334155"/>
      <path d="M50 45 L42 41 L92 12 L100 16 L50 45Z" fill="#475569" stroke="#334155"/>
      <!-- Faces -->
      <path d="M0 16 L50 45 V120 L0 90 V16Z" fill="__FILL__" stroke="#cbd5e1" stroke-width="2"/>
      <path d="M100 16 L50 45 V120 L100 90 V16Z" fill="__FILL__" stroke="#cbd5e1" stroke-width="2"/>
      <path d="M50 45 V120" stroke="#cbd5e1" stroke-width="1"/>
    </svg>`
  },
  {
    id: 'wall-window-bay',
    name: 'Bay Window',
    category: 'structure',
    defaultWidth: 140,
    defaultHeight: 130,
    defaultColor: '#f8fafc',
    svg: `<svg viewBox="0 0 140 130" fill="none" xmlns="http://www.w3.org/2000/svg">
       <!-- Top shape -->
       <path d="M0 30 L30 15 L70 15 L100 30" fill="none" stroke="#334155" stroke-width="6"/>
       <!-- Glass panels -->
       <path d="M30 15 L30 85 L70 85 L70 15" fill="#bfdbfe" opacity="0.6"/>
       <path d="M0 30 L30 15 L30 85 L0 100 Z" fill="#93c5fd" opacity="0.6"/>
       <path d="M70 15 L100 30 L100 100 L70 85 Z" fill="#93c5fd" opacity="0.6"/>
       <!-- Frames -->
       <path d="M30 15 V85" stroke="white" stroke-width="2"/>
       <path d="M70 15 V85" stroke="white" stroke-width="2"/>
       <!-- Base Wall below window -->
       <path d="M0 100 L30 85 L70 85 L100 100 V130 L70 115 L30 115 L0 130 V100Z" fill="__FILL__" stroke="#cbd5e1"/>
    </svg>`
  },
  {
    id: 'wall-door-open',
    name: 'Open Doorway',
    category: 'structure',
    defaultWidth: 100,
    defaultHeight: 120,
    defaultColor: '#f8fafc',
    svg: `<svg viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg">
       <!-- Top Lintels -->
       <path d="M0 20 L30 37 L25 40 L0 25 V20Z" fill="#475569"/>
       <path d="M70 59 L100 76 V71 L75 57 L70 59Z" fill="#475569"/>
       <!-- Wall Columns -->
       <path d="M0 20 L25 35 V120 L0 105 V20Z" fill="__FILL__" stroke="#cbd5e1"/>
       <path d="M75 62 L100 76 V120 L75 105 V62Z" fill="__FILL__" stroke="#cbd5e1"/>
       <!-- Frame -->
       <path d="M25 35 L75 62" stroke="#cbd5e1" stroke-width="4"/>
       <path d="M25 35 V120" stroke="#cbd5e1" stroke-width="2"/>
       <path d="M75 62 V120" stroke="#cbd5e1" stroke-width="2"/>
    </svg>`
  },
  {
    id: 'wall-door-closed',
    name: 'Closed Door',
    category: 'structure',
    defaultWidth: 100,
    defaultHeight: 120,
    defaultColor: '#8e5d3b',
    svg: `<svg viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg">
       <path d="M0 20 L8 16 L100 68 L92 72 L0 20Z" fill="#475569" stroke="#334155"/>
       <path d="M0 20 L92 72 V120 L0 68 V20Z" fill="#f8fafc" stroke="#cbd5e1"/>
       <!-- Door (Customizable) -->
       <path d="M30 37 L70 59 V110 L30 88 V37Z" fill="__FILL__"/>
       <path d="M35 42 L65 59 V105 L35 88 V42Z" fill="#000000" fill-opacity="0.1" stroke="#5d3b24" stroke-opacity="0.2"/>
       <circle cx="60" cy="80" r="2" fill="#fbbf24"/>
    </svg>`
  },

  // --- Bedroom (NEW) ---
  {
    id: 'iso-bed-double',
    name: 'Double Bed',
    category: 'bedroom',
    defaultWidth: 140,
    defaultHeight: 110,
    defaultColor: '#f8fafc',
    svg: `<svg viewBox="0 0 140 110" fill="none" xmlns="http://www.w3.org/2000/svg">
       <!-- Base -->
       <path d="M10 50 L130 50 L110 100 L0 90 Z" fill="#94a3b8"/>
       <!-- Mattress/Sheets (Customizable) -->
       <path d="M10 40 L130 40 L110 90 L0 80 Z" fill="__FILL__" stroke="rgba(0,0,0,0.1)"/>
       <path d="M0 80 L110 90 L110 100 L0 90 Z" fill="__FILL__" style="filter: brightness(0.8)"/>
       <!-- Headboard -->
       <path d="M10 20 L130 20 L130 50 L10 50 Z" fill="#475569"/>
       <!-- Pillows -->
       <path d="M20 45 L60 45 L55 35 L25 35 Z" fill="#ffffff"/>
       <path d="M70 45 L110 45 L105 35 L75 35 Z" fill="#ffffff"/>
    </svg>`
  },
  {
    id: 'iso-bed-single',
    name: 'Single Bed',
    category: 'bedroom',
    defaultWidth: 90,
    defaultHeight: 100,
    defaultColor: '#e2e8f0',
    svg: `<svg viewBox="0 0 90 100" fill="none" xmlns="http://www.w3.org/2000/svg">
       <!-- Base -->
       <path d="M10 40 L80 40 L70 90 L0 80 Z" fill="#94a3b8"/>
       <!-- Mattress (Customizable) -->
       <path d="M10 30 L80 30 L70 80 L0 70 Z" fill="__FILL__" stroke="rgba(0,0,0,0.1)"/>
       <path d="M0 70 L70 80 L70 90 L0 80 Z" fill="__FILL__" style="filter: brightness(0.8)"/>
       <!-- Headboard -->
       <path d="M10 15 L80 15 L80 40 L10 40 Z" fill="#475569"/>
       <!-- Pillow -->
       <path d="M25 35 L65 35 L60 25 L30 25 Z" fill="#ffffff"/>
    </svg>`
  },
  {
    id: 'iso-nightstand',
    name: 'Nightstand',
    category: 'bedroom',
    defaultWidth: 50,
    defaultHeight: 60,
    defaultColor: '#a98467',
    svg: `<svg viewBox="0 0 50 60" fill="none" xmlns="http://www.w3.org/2000/svg">
       <!-- Top -->
       <path d="M10 10 L40 10 L30 20 L0 20 Z" fill="__FILL__" style="filter: brightness(1.1)"/>
       <!-- Front -->
       <path d="M0 20 L30 20 L30 50 L0 50 Z" fill="__FILL__"/>
       <!-- Side -->
       <path d="M30 20 L40 10 L40 40 L30 50 Z" fill="__FILL__" style="filter: brightness(0.8)"/>
       <!-- Drawer Handle -->
       <circle cx="15" cy="28" r="1.5" fill="#fcd34d"/>
    </svg>`
  },

  // --- Seating ---
  {
    id: 'iso-sofa',
    name: 'Modern Sofa',
    category: 'seating',
    defaultWidth: 160,
    defaultHeight: 100,
    defaultColor: '#cbd5e1',
    svg: `<svg viewBox="0 0 160 100" fill="none" xmlns="http://www.w3.org/2000/svg">
       <!-- Base -->
       <path d="M30 60 L130 60 L150 70 L50 70 Z" fill="#475569"/>
       <!-- Seat (Customizable) -->
       <path d="M20 40 L140 40 L160 50 L40 50 Z" fill="__FILL__" stroke="rgba(0,0,0,0.1)"/>
       <path d="M40 50 L160 50 L160 70 L40 70 Z" fill="__FILL__" stroke="rgba(0,0,0,0.1)"/>
       <!-- Back (Customizable) -->
       <path d="M20 10 L140 10 L140 40 L20 40 Z" fill="__FILL__" stroke="rgba(0,0,0,0.1)"/>
       <!-- Arms (Customizable) -->
       <path d="M10 30 L30 30 L40 50 L20 50 Z" fill="__FILL__" stroke="rgba(0,0,0,0.1)"/> 
       <path d="M10 30 L10 50 L20 50 L20 40 Z" fill="__FILL__" style="filter: brightness(0.9)"/>
       <path d="M130 30 L150 30 L160 50 L140 50 Z" fill="__FILL__" stroke="rgba(0,0,0,0.1)"/>
    </svg>`
  },
  {
    id: 'iso-armchair',
    name: 'Armchair',
    category: 'seating',
    defaultWidth: 80,
    defaultHeight: 80,
    defaultColor: '#94a3b8',
    svg: `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 20 L70 20 L70 50 L10 50 Z" fill="__FILL__" stroke="rgba(0,0,0,0.1)" style="filter: brightness(1.1)"/>
      <path d="M10 50 L70 50 L60 60 L20 60 Z" fill="__FILL__" style="filter: brightness(0.9)"/>
      <path d="M20 50 L60 50 L60 70 L20 70 Z" fill="__FILL__"/>
      <path d="M5 30 L15 30 L20 50 L10 50 Z" fill="__FILL__"/>
      <path d="M65 30 L75 30 L70 50 L60 50 Z" fill="__FILL__"/>
    </svg>`
  },
  {
    id: 'iso-dining-chair',
    name: 'Dining Chair',
    category: 'seating',
    defaultWidth: 40,
    defaultHeight: 80,
    defaultColor: '#475569',
    svg: `<svg viewBox="0 0 40 80" fill="none" xmlns="http://www.w3.org/2000/svg">
       <!-- Seat -->
       <path d="M5 40 L35 40 L30 50 L0 50 Z" fill="__FILL__"/>
       <!-- Back -->
       <path d="M5 10 L35 10 L35 40 L5 40 Z" fill="__FILL__" style="filter: brightness(1.1)"/>
       <!-- Legs -->
       <path d="M5 50 L5 75" stroke="#334155" stroke-width="2"/>
       <path d="M30 50 L30 75" stroke="#334155" stroke-width="2"/>
       <path d="M0 50 L0 75" stroke="#334155" stroke-width="2"/>
    </svg>`
  },
  {
    id: 'iso-stool',
    name: 'Pouf / Stool',
    category: 'seating',
    defaultWidth: 50,
    defaultHeight: 40,
    defaultColor: '#f43f5e',
    svg: `<svg viewBox="0 0 50 40" fill="none" xmlns="http://www.w3.org/2000/svg">
       <ellipse cx="25" cy="15" rx="20" ry="10" fill="__FILL__" style="filter: brightness(1.1)"/>
       <path d="M5 15 C5 30 45 30 45 15 V30 C45 40 5 40 5 30 Z" fill="__FILL__"/>
    </svg>`
  },

  // --- Tables ---
  {
    id: 'iso-coffee-table',
    name: 'Coffee Table',
    category: 'tables',
    defaultWidth: 100,
    defaultHeight: 60,
    defaultColor: '#f1f5f9',
    svg: `<svg viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg">
       <path d="M10 20 L90 20 L70 40 L30 40 Z" fill="__FILL__" stroke="#cbd5e1" stroke-width="2"/>
       <path d="M10 20 L10 50" stroke="#475569" stroke-width="2"/>
       <path d="M90 20 L90 50" stroke="#475569" stroke-width="2"/>
       <path d="M30 40 L30 55" stroke="#475569" stroke-width="2"/>
       <path d="M70 40 L70 55" stroke="#475569" stroke-width="2"/>
    </svg>`
  },
  {
    id: 'iso-dining-table',
    name: 'Dining Table',
    category: 'tables',
    defaultWidth: 140,
    defaultHeight: 90,
    defaultColor: '#b45309',
    svg: `<svg viewBox="0 0 140 90" fill="none" xmlns="http://www.w3.org/2000/svg">
       <path d="M10 20 L130 20 L110 50 L30 50 Z" fill="__FILL__" stroke="rgba(0,0,0,0.2)" stroke-width="2"/>
       <path d="M20 35 L20 80" stroke="__FILL__" stroke-width="4" style="filter: brightness(0.6)"/>
       <path d="M120 35 L120 80" stroke="__FILL__" stroke-width="4" style="filter: brightness(0.6)"/>
       <path d="M40 50 L40 70" stroke="__FILL__" stroke-width="4" style="filter: brightness(0.6)"/>
       <path d="M100 50 L100 70" stroke="__FILL__" stroke-width="4" style="filter: brightness(0.6)"/>
    </svg>`
  },
  {
    id: 'iso-round-table',
    name: 'Round Table',
    category: 'tables',
    defaultWidth: 80,
    defaultHeight: 60,
    defaultColor: '#e2e8f0',
    svg: `<svg viewBox="0 0 80 60" fill="none" xmlns="http://www.w3.org/2000/svg">
       <ellipse cx="40" cy="20" rx="35" ry="15" fill="__FILL__" stroke="rgba(0,0,0,0.1)"/>
       <rect x="35" y="20" width="10" height="30" fill="#475569"/>
       <path d="M20 50 L60 50" stroke="#475569" stroke-width="4"/>
    </svg>`
  },
   {
    id: 'iso-desk',
    name: 'Work Desk',
    category: 'tables',
    defaultWidth: 110,
    defaultHeight: 80,
    defaultColor: '#f1f5f9',
    svg: `<svg viewBox="0 0 110 80" fill="none" xmlns="http://www.w3.org/2000/svg">
       <path d="M10 20 L100 20 L80 40 L20 40 Z" fill="__FILL__" stroke="rgba(0,0,0,0.1)"/>
       <!-- Legs -->
       <path d="M10 20 L10 70" stroke="#64748b" stroke-width="2"/>
       <path d="M100 20 L100 70" stroke="#64748b" stroke-width="2"/>
       <path d="M20 40 L20 60" stroke="#64748b" stroke-width="2"/>
       <path d="M80 40 L80 60" stroke="#64748b" stroke-width="2"/>
       <!-- Drawer Unit -->
       <path d="M80 40 L100 20 L100 50 L80 60 Z" fill="#cbd5e1"/>
    </svg>`
  },

  // --- Storage ---
  {
    id: 'iso-cabinet',
    name: 'Cabinet',
    category: 'storage',
    defaultWidth: 100,
    defaultHeight: 80,
    defaultColor: '#cbd5e1',
    svg: `<svg viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 20 L90 20 L80 30 L20 30 Z" fill="__FILL__" style="filter: brightness(1.1)" stroke="rgba(0,0,0,0.1)"/>
      <path d="M20 30 L80 30 L80 70 L20 70 Z" fill="__FILL__" stroke="rgba(0,0,0,0.1)"/>
      <path d="M80 30 L90 20 L90 60 L80 70 Z" fill="__FILL__" style="filter: brightness(0.8)" stroke="rgba(0,0,0,0.1)"/>
      <line x1="50" y1="30" x2="50" y2="70" stroke="rgba(0,0,0,0.3)"/>
    </svg>`
  },
  {
    id: 'iso-bookshelf',
    name: 'Bookshelf',
    category: 'storage',
    defaultWidth: 70,
    defaultHeight: 120,
    defaultColor: '#f1f5f9',
    svg: `<svg viewBox="0 0 70 120" fill="none" xmlns="http://www.w3.org/2000/svg">
       <path d="M10 10 L60 10 L50 20 L20 20 Z" fill="__FILL__" stroke="rgba(0,0,0,0.1)"/>
       <path d="M20 20 L50 20 L50 110 L20 110 Z" fill="__FILL__" style="filter: brightness(0.9)" stroke="rgba(0,0,0,0.1)"/>
       <path d="M50 20 L60 10 L60 100 L50 110 Z" fill="__FILL__" style="filter: brightness(0.8)" stroke="rgba(0,0,0,0.1)"/>
       <path d="M20 40 L50 40 L45 45 L25 45 Z" fill="#ffffff" fill-opacity="0.3"/>
       <path d="M20 65 L50 65 L45 70 L25 70 Z" fill="#ffffff" fill-opacity="0.3"/>
       <path d="M20 90 L50 90 L45 95 L25 95 Z" fill="#ffffff" fill-opacity="0.3"/>
    </svg>`
  },
  {
    id: 'iso-dresser',
    name: 'Dresser',
    category: 'storage',
    defaultWidth: 100,
    defaultHeight: 70,
    defaultColor: '#a98467',
    svg: `<svg viewBox="0 0 100 70" fill="none" xmlns="http://www.w3.org/2000/svg">
       <!-- Top -->
       <path d="M10 10 L90 10 L80 20 L20 20 Z" fill="__FILL__" style="filter: brightness(1.1)"/>
       <!-- Front -->
       <path d="M20 20 L80 20 L80 60 L20 60 Z" fill="__FILL__"/>
       <!-- Side -->
       <path d="M80 20 L90 10 L90 50 L80 60 Z" fill="__FILL__" style="filter: brightness(0.8)"/>
       <!-- Drawers -->
       <line x1="25" y1="33" x2="75" y2="33" stroke="rgba(0,0,0,0.2)"/>
       <line x1="25" y1="46" x2="75" y2="46" stroke="rgba(0,0,0,0.2)"/>
    </svg>`
  },

  // --- Lighting ---
  {
    id: 'iso-floor-lamp',
    name: 'Floor Lamp',
    category: 'lighting',
    defaultWidth: 40,
    defaultHeight: 120,
    defaultColor: '#fbbf24',
    svg: `<svg viewBox="0 0 40 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="20" cy="110" rx="15" ry="5" fill="#475569"/>
      <line x1="20" y1="110" x2="20" y2="40" stroke="#475569" stroke-width="2"/>
      <path d="M10 40 L30 40 L25 20 L15 20 Z" fill="__FILL__" stroke="rgba(0,0,0,0.1)"/>
    </svg>`
  },
  {
    id: 'iso-table-lamp',
    name: 'Table Lamp',
    category: 'lighting',
    defaultWidth: 30,
    defaultHeight: 50,
    defaultColor: '#fbbf24',
    svg: `<svg viewBox="0 0 30 50" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="15" cy="45" rx="8" ry="3" fill="#475569"/>
      <line x1="15" y1="45" x2="15" y2="20" stroke="#475569" stroke-width="2"/>
      <path d="M5 25 L25 25 L20 10 L10 10 Z" fill="__FILL__" stroke="rgba(0,0,0,0.1)"/>
    </svg>`
  },
  {
    id: 'iso-pendant',
    name: 'Pendant Light',
    category: 'lighting',
    defaultWidth: 40,
    defaultHeight: 80,
    defaultColor: '#e2e8f0',
    svg: `<svg viewBox="0 0 40 80" fill="none" xmlns="http://www.w3.org/2000/svg">
       <line x1="20" y1="0" x2="20" y2="50" stroke="#475569"/>
       <path d="M5 60 L35 60 L20 50 Z" fill="__FILL__"/>
       <circle cx="20" cy="65" r="5" fill="#fef3c7" fill-opacity="0.8"/>
    </svg>`
  },

  // --- Decor ---
  {
    id: 'iso-plant',
    name: 'House Plant',
    category: 'decor',
    defaultWidth: 50,
    defaultHeight: 80,
    defaultColor: '#92400e',
    svg: `<svg viewBox="0 0 50 80" fill="none" xmlns="http://www.w3.org/2000/svg">
       <path d="M25 60 L35 55 L35 75 L25 80 Z" fill="__FILL__" style="filter: brightness(1.1)"/>
       <path d="M25 60 L15 55 L15 75 L25 80 Z" fill="__FILL__"/>
       <path d="M15 55 L35 55 L25 60 Z" fill="__FILL__" style="filter: brightness(0.8)"/>
       <circle cx="25" cy="40" r="15" fill="#86efac" stroke="#166534"/>
       <circle cx="15" cy="30" r="10" fill="#4ade80"/>
       <circle cx="35" cy="30" r="10" fill="#4ade80"/>
    </svg>`
  },
  {
    id: 'iso-rug',
    name: 'Rug (Rect)',
    category: 'decor',
    defaultWidth: 140,
    defaultHeight: 80,
    defaultColor: '#f0f9ff',
    svg: `<svg viewBox="0 0 140 80" fill="none" xmlns="http://www.w3.org/2000/svg">
       <path d="M20 40 L120 40 L100 70 L40 70 Z" fill="__FILL__" stroke="rgba(0,0,0,0.2)" stroke-width="2" stroke-dasharray="4 4"/>
    </svg>`
  },
  {
    id: 'iso-rug-round',
    name: 'Rug (Round)',
    category: 'decor',
    defaultWidth: 120,
    defaultHeight: 80,
    defaultColor: '#fbcfe8',
    svg: `<svg viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg">
       <ellipse cx="60" cy="40" rx="50" ry="25" fill="__FILL__" stroke="rgba(0,0,0,0.2)" stroke-dasharray="4 2"/>
    </svg>`
  },
  {
    id: 'iso-mirror-round',
    name: 'Wall Mirror',
    category: 'decor',
    defaultWidth: 60,
    defaultHeight: 60,
    defaultColor: '#f1f5f9',
    svg: `<svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="30" cy="30" r="25" fill="#bfdbfe" stroke="__FILL__" stroke-width="4"/>
      <path d="M20 20 L40 40" stroke="white" stroke-opacity="0.5" stroke-width="2"/>
    </svg>`
  },
  {
    id: 'iso-painting',
    name: 'Wall Art',
    category: 'decor',
    defaultWidth: 60,
    defaultHeight: 80,
    defaultColor: '#1e293b',
    svg: `<svg viewBox="0 0 60 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="10" width="50" height="60" fill="#f8fafc" stroke="__FILL__" stroke-width="4"/>
      <circle cx="30" cy="40" r="10" fill="#f43f5e"/>
      <path d="M10 60 L25 40 L50 60" fill="#22c55e" fill-opacity="0.5"/>
    </svg>`
  },
   {
    id: 'iso-curtains',
    name: 'Curtains',
    category: 'decor',
    defaultWidth: 100,
    defaultHeight: 120,
    defaultColor: '#bae6fd',
    svg: `<svg viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg">
       <rect x="0" y="0" width="100" height="5" fill="#64748b"/>
       <path d="M5 5 C5 5 15 20 15 120 L5 120 Z" fill="__FILL__"/>
       <path d="M20 5 C20 5 30 20 30 120 L20 120 Z" fill="__FILL__" style="filter: brightness(0.9)"/>
       <path d="M80 5 C80 5 70 20 70 120 L80 120 Z" fill="__FILL__" style="filter: brightness(0.9)"/>
       <path d="M95 5 C95 5 85 20 85 120 L95 120 Z" fill="__FILL__"/>
    </svg>`
  },
  {
    id: 'iso-clock',
    name: 'Wall Clock',
    category: 'decor',
    defaultWidth: 40,
    defaultHeight: 40,
    defaultColor: '#475569',
    svg: `<svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="18" fill="#ffffff" stroke="__FILL__" stroke-width="2"/>
      <line x1="20" y1="20" x2="20" y2="10" stroke="black" stroke-width="2"/>
      <line x1="20" y1="20" x2="28" y2="20" stroke="black" stroke-width="2"/>
    </svg>`
  },

  // --- Appliances ---
  {
    id: 'iso-tv',
    name: 'TV Stand',
    category: 'appliances',
    defaultWidth: 100,
    defaultHeight: 90,
    defaultColor: '#e2e8f0',
    svg: `<svg viewBox="0 0 100 90" fill="none" xmlns="http://www.w3.org/2000/svg">
       <path d="M20 60 L80 60 L70 70 L30 70 Z" fill="__FILL__" stroke="#cbd5e1"/>
       <rect x="30" y="70" width="10" height="10" fill="#475569"/>
       <rect x="60" y="70" width="10" height="10" fill="#475569"/>
       <path d="M25 20 L75 20 L75 50 L25 50 Z" fill="#1e293b" stroke="#0f172a"/>
       <path d="M25 50 L75 50 L70 55 L30 55 Z" fill="#334155"/>
    </svg>`
  },
  {
    id: 'iso-fridge',
    name: 'Fridge',
    category: 'appliances',
    defaultWidth: 60,
    defaultHeight: 120,
    defaultColor: '#cbd5e1',
    svg: `<svg viewBox="0 0 60 120" fill="none" xmlns="http://www.w3.org/2000/svg">
       <path d="M10 10 L50 10 L40 20 L20 20 Z" fill="__FILL__" style="filter: brightness(1.1)" stroke="rgba(0,0,0,0.1)"/>
       <path d="M20 20 L40 20 L40 110 L20 110 Z" fill="__FILL__" stroke="rgba(0,0,0,0.1)"/>
       <path d="M40 20 L50 10 L50 100 L40 110 Z" fill="__FILL__" style="filter: brightness(0.8)" stroke="rgba(0,0,0,0.1)"/>
       <line x1="20" y1="50" x2="40" y2="50" stroke="rgba(0,0,0,0.3)"/>
    </svg>`
  },
  {
    id: 'iso-stove',
    name: 'Stove / Oven',
    category: 'appliances',
    defaultWidth: 60,
    defaultHeight: 80,
    defaultColor: '#e2e8f0',
    svg: `<svg viewBox="0 0 60 80" fill="none" xmlns="http://www.w3.org/2000/svg">
       <!-- Top -->
       <path d="M10 20 L50 20 L40 30 L20 30 Z" fill="#1e293b"/>
       <!-- Circles for burners -->
       <circle cx="25" cy="25" r="3" fill="#64748b"/>
       <circle cx="35" cy="25" r="3" fill="#64748b"/>
       <!-- Front -->
       <path d="M20 30 L40 30 L40 70 L20 70 Z" fill="__FILL__"/>
       <!-- Side -->
       <path d="M40 30 L50 20 L50 60 L40 70 Z" fill="__FILL__" style="filter: brightness(0.8)"/>
       <!-- Window -->
       <rect x="25" y="40" width="10" height="15" fill="#1e293b"/>
    </svg>`
  }
];
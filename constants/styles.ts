
export const COLORS = {
  neutrals: [
    { id: 'white', value: '#ffffff', label: 'White' },
    { id: 'off-white', value: '#f8fafc', label: 'Off White' },
    { id: 'cream', value: '#fdfbf7', label: 'Cream' },
    { id: 'beige', value: '#f5f5dc', label: 'Beige' },
    { id: 'wheat', value: '#f3e5ab', label: 'Wheat' },
    { id: 'taupe', value: '#d6d3d1', label: 'Taupe' },
    { id: 'grey-light', value: '#e2e8f0', label: 'Light Grey' },
    { id: 'grey-med', value: '#94a3b8', label: 'Medium Grey' },
    { id: 'grey-dark', value: '#64748b', label: 'Dark Grey' },
    { id: 'charcoal', value: '#334155', label: 'Charcoal' },
    { id: 'black', value: '#1e293b', label: 'Black' },
  ],
  woods: [
    { id: 'wood-birch', value: '#faeec7', label: 'Birch' },
    { id: 'wood-light', value: '#d4a373', label: 'Light Wood' },
    { id: 'wood-med', value: '#a98467', label: 'Medium Wood' },
    { id: 'wood-oak', value: '#855E42', label: 'Oak' },
    { id: 'wood-cherry', value: '#9f5f46', label: 'Cherry' },
    { id: 'wood-dark', value: '#78350f', label: 'Dark Wood' },
    { id: 'wood-walnut', value: '#5D4037', label: 'Walnut' },
    { id: 'wood-red', value: '#92400e', label: 'Mahogany' },
    { id: 'wood-ebony', value: '#3E2723', label: 'Ebony' },
  ],
  vibrant: [
    { id: 'red', value: '#ef4444', label: 'Red' },
    { id: 'coral', value: '#f43f5e', label: 'Coral' },
    { id: 'orange', value: '#f97316', label: 'Orange' },
    { id: 'amber', value: '#f59e0b', label: 'Amber' },
    { id: 'yellow', value: '#eab308', label: 'Yellow' },
    { id: 'lime', value: '#84cc16', label: 'Lime' },
    { id: 'green', value: '#22c55e', label: 'Green' },
    { id: 'emerald', value: '#10b981', label: 'Emerald' },
    { id: 'teal', value: '#14b8a6', label: 'Teal' },
    { id: 'cyan', value: '#06b6d4', label: 'Cyan' },
    { id: 'sky', value: '#0ea5e9', label: 'Sky' },
    { id: 'blue', value: '#3b82f6', label: 'Blue' },
    { id: 'indigo', value: '#6366f1', label: 'Indigo' },
    { id: 'violet', value: '#8b5cf6', label: 'Violet' },
    { id: 'purple', value: '#a855f7', label: 'Purple' },
    { id: 'fuchsia', value: '#d946ef', label: 'Fuchsia' },
    { id: 'pink', value: '#ec4899', label: 'Pink' },
    { id: 'rose', value: '#e11d48', label: 'Rose' },
  ],
  rich: [
    { id: 'navy', value: '#172554', label: 'Navy' },
    { id: 'midnight', value: '#1e1b4b', label: 'Midnight' },
    { id: 'forest', value: '#022c22', label: 'Forest' },
    { id: 'olive', value: '#365314', label: 'Olive' },
    { id: 'maroon', value: '#7f1d1d', label: 'Maroon' },
    { id: 'plum', value: '#581c87', label: 'Plum' },
    { id: 'chocolate', value: '#451a03', label: 'Chocolate' },
    { id: 'gold', value: '#b45309', label: 'Gold' },
    { id: 'slate', value: '#0f172a', label: 'Slate' },
  ],
  pastels: [
    { id: 'pastel-pink', value: '#fbcfe8', label: 'Pale Pink' },
    { id: 'pastel-rose', value: '#ffe4e6', label: 'Pale Rose' },
    { id: 'pastel-peach', value: '#ffedd5', label: 'Peach' },
    { id: 'pastel-cream', value: '#fef3c7', label: 'Cream Yellow' },
    { id: 'pastel-yellow', value: '#fef9c3', label: 'Pale Yellow' },
    { id: 'pastel-lime', value: '#ecfccb', label: 'Pale Lime' },
    { id: 'pastel-green', value: '#dcfce7', label: 'Pale Green' },
    { id: 'pastel-mint', value: '#ccfbf1', label: 'Mint' },
    { id: 'pastel-cyan', value: '#cffafe', label: 'Pale Cyan' },
    { id: 'pastel-blue', value: '#dbeafe', label: 'Pale Blue' },
    { id: 'pastel-indigo', value: '#e0e7ff', label: 'Pale Indigo' },
    { id: 'pastel-purple', value: '#f3e8ff', label: 'Pale Purple' },
  ]
};

export const PATTERNS = [
  {
    id: 'stripes-v',
    name: 'Stripes (V)',
    // A 10x10 pattern with vertical line
    def: `<pattern id="stripes-v" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
            <rect width="10" height="10" fill="currentColor" fill-opacity="0.2"/>
            <line x1="5" y1="0" x2="5" y2="10" stroke="currentColor" stroke-width="2" stroke-opacity="0.5"/>
          </pattern>`
  },
  {
    id: 'stripes-h',
    name: 'Stripes (H)',
    def: `<pattern id="stripes-h" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
             <rect width="10" height="10" fill="currentColor" fill-opacity="0.2"/>
            <line x1="0" y1="5" x2="10" y2="5" stroke="currentColor" stroke-width="2" stroke-opacity="0.5"/>
          </pattern>`
  },
  {
    id: 'dots',
    name: 'Polka Dots',
    def: `<pattern id="dots" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
            <rect width="10" height="10" fill="currentColor" fill-opacity="0.2"/>
            <circle cx="5" cy="5" r="2" fill="currentColor" fill-opacity="0.6"/>
          </pattern>`
  },
  {
    id: 'grid',
    name: 'Grid',
    def: `<pattern id="grid" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
            <rect width="10" height="10" fill="currentColor" fill-opacity="0.1"/>
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" stroke-width="1" stroke-opacity="0.5"/>
          </pattern>`
  },
  {
    id: 'checker',
    name: 'Checker',
    def: `<pattern id="checker" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
             <rect width="20" height="20" fill="currentColor" fill-opacity="0.1"/>
             <rect x="0" y="0" width="10" height="10" fill="currentColor" fill-opacity="0.4"/>
             <rect x="10" y="10" width="10" height="10" fill="currentColor" fill-opacity="0.4"/>
          </pattern>`
  }
];

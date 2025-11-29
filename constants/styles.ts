
export const COLORS = {
  neutrals: [
    { id: 'white', value: '#ffffff', label: 'White' },
    { id: 'grey-light', value: '#e2e8f0', label: 'Light Grey' },
    { id: 'grey-dark', value: '#64748b', label: 'Dark Grey' },
    { id: 'black', value: '#1e293b', label: 'Black' },
    { id: 'beige', value: '#f5f5dc', label: 'Beige' },
  ],
  woods: [
    { id: 'wood-light', value: '#d4a373', label: 'Light Wood' },
    { id: 'wood-med', value: '#a98467', label: 'Medium Wood' },
    { id: 'wood-dark', value: '#78350f', label: 'Dark Wood' },
    { id: 'wood-red', value: '#92400e', label: 'Mahogany' },
  ],
  vibrant: [
    { id: 'red', value: '#ef4444', label: 'Red' },
    { id: 'orange', value: '#f97316', label: 'Orange' },
    { id: 'yellow', value: '#eab308', label: 'Yellow' },
    { id: 'green', value: '#22c55e', label: 'Green' },
    { id: 'teal', value: '#14b8a6', label: 'Teal' },
    { id: 'blue', value: '#3b82f6', label: 'Blue' },
    { id: 'indigo', value: '#6366f1', label: 'Indigo' },
    { id: 'purple', value: '#a855f7', label: 'Purple' },
    { id: 'pink', value: '#ec4899', label: 'Pink' },
  ],
  pastels: [
    { id: 'pastel-pink', value: '#fbcfe8', label: 'Pale Pink' },
    { id: 'pastel-blue', value: '#bae6fd', label: 'Pale Blue' },
    { id: 'pastel-green', value: '#bbf7d0', label: 'Pale Green' },
    { id: 'pastel-yellow', value: '#fef08a', label: 'Pale Yellow' },
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

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        game: {
          dark: '#060a14',
          primary: '#0a0e1a',
          panel: '#111827',
          card: '#1a2236',
          hover: '#212d45',
          gold: '#f0c040',
          text: '#e0e6f0',
          muted: '#8899aa',
          faded: '#556677',
          border: '#1e2a3a',
          light: '#2a3f5f'
        },
        rarity: {
          common: '#9ca3af',
          uncommon: '#22c55e',
          rare: '#3b82f6',
          epic: '#a855f7',
          legendary: '#f59e0b',
          relic: '#ef4444'
        },
        bar: {
          hp: '#e04040',
          mp: '#4080e0',
          xp: '#f0c040',
          luck: '#a855f7'
        }
      },
      fontFamily: {
        title: ['Cinzel', 'serif'],
        body: ['Crimson Text', 'serif'],
        mono: ['Share Tech Mono', 'monospace']
      },
      height: {
        header: '48px',
        nav: '56px'
      }
    }
  },
  plugins: []
};

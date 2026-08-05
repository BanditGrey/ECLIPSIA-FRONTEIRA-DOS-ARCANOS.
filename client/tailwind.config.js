/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        night: { 950: '#04060d', 900: '#070b16', 850: '#0a1020', 800: '#0c1326', 700: '#131c36', 600: '#1c2948', 500: '#2a3a63' },
        gold: { 200: '#fbe8b7', 300: '#f8d886', 400: '#f0c04a', 500: '#d9a52e', 600: '#a87b1f' },
        arcane: { 200: '#a8f5ea', 300: '#7ef0e0', 400: '#3fd9c4', 500: '#17b8a5', 600: '#0e8a7c' },
        violet: { 300: '#c4b5fd', 400: '#a78bfa', 500: '#8b5cf6' },
        game: { dark: '#04060d', primary: '#070b16', panel: '#0a1020', card: '#0f1830', hover: '#17233f', gold: '#f0c04a', text: '#e6ecf7', muted: '#8fa3c2', faded: '#5b6d8c', border: '#1c2948', light: '#2a3a63' },
        rarity: { common: '#9ca3af', uncommon: '#22c55e', rare: '#3b82f6', epic: '#a855f7', legendary: '#f59e0b', relic: '#ef4444' },
        bar: { hp: '#e04040', mp: '#4080e0', xp: '#f0c040', luck: '#a855f7' }
      },
      fontFamily: {
        title: ['Cinzel', 'serif'],
        body: ['Crimson Text', 'serif'],
        mono: ['Share Tech Mono', 'monospace']
      },
      boxShadow: {
        'glow-gold': '0 0 20px rgb(240 192 74 / 0.25)',
        'glow-arcane': '0 0 20px rgb(63 217 196 / 0.25)',
        'glow-sm': '0 0 10px rgb(240 192 74 / 0.18)',
        panel: '0 14px 44px -14px rgb(0 0 0 / 0.85)'
      },
      animation: {
        floaty: 'floaty 6s ease-in-out infinite',
        twinkle: 'twinkle 4s ease-in-out infinite',
        glowpulse: 'glowPulse 2.4s ease-in-out infinite',
        shine: 'shineSweep 3.2s ease-in-out infinite',
        slowspin: 'slowspin 48s linear infinite',
        kenburns: 'kenburns 32s ease-in-out infinite alternate',
        'fade-in': 'fadeIn 180ms ease-out both',
        'slide-up': 'slideUp 240ms ease-out both',
        'eclipsiaShake': 'eclipsiaShake 0.4s cubic-bezier(0.36, 0.07, 0.19, 0.97) both',
        'eclipsiaFloat': 'eclipsiaFloat 1.2s ease-out forwards',
        'breathe': 'breathe 3s ease-in-out infinite',
      },
      keyframes: {
        floaty: { '0%, 100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-6px)' } },
        twinkle: { '0%, 100%': { opacity: '0.3' }, '50%': { opacity: '1' } },
        glowPulse: { '0%, 100%': { opacity: '0.75' }, '50%': { opacity: '1' } },
        shineSweep: { '0%': { transform: 'translateX(-140%)' }, '60%, 100%': { transform: 'translateX(240%)' } },
        slowspin: { to: { transform: 'rotate(360deg)' } },
        kenburns: { '0%': { transform: 'scale(1) translateY(0)' }, '100%': { transform: 'scale(1.08) translateY(-1.5%)' } },
        breathe: {
          '0%, 100%': { transform: 'scale(1) translateY(0)' },
          '50%': { transform: 'scale(1.02) translateY(-2px)' }
        },
        eclipsiaShake: {
          '10%, 90%': { transform: 'translate3d(-2px, 0, 0)' },
          '20%, 80%': { transform: 'translate3d(3px, 0, 0)' },
          '30%, 50%, 70%': { transform: 'translate3d(-5px, 0, 0)' },
          '40%, 60%': { transform: 'translate3d(5px, 0, 0)' }
        },
        eclipsiaFloat: {
          '0%': { transform: 'translateY(0) scale(0.8)', opacity: '1' },
          '100%': { transform: 'translateY(-50px) scale(1.2)', opacity: '0' }
        }
      },
      height: { header: '52px', nav: '60px' }
    }
  },
  plugins: []
};

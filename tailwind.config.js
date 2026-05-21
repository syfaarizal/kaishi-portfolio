/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        kai: {
          red: '#cc1133',
          darkred: '#8b0022',
          crimson: '#ff1144',
          glow: '#ff2255',
          bg: '#080808',
          surface: '#0d0d0d',
          panel: '#110a0d',
          border: '#3d0f1a',
          text: '#e8e0e3',
          muted: '#7a6068',
        }
      },
      fontFamily: {
        pixel: ['"Press Start 2P"', 'monospace'],
        mono: ['"Share Tech Mono"', 'monospace'],
        display: ['"Rajdhani"', 'sans-serif'],
      },
      animation: {
        'float': 'float 4s ease-in-out infinite',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'scanline': 'scanline 3s linear infinite',
        'flicker': 'flicker 4s step-end infinite',
        'spin-slow': 'spin 8s linear infinite',
        'blink': 'blink 1s step-end infinite',
        'slide-in-left': 'slideInLeft 0.6s ease-out forwards',
        'slide-in-right': 'slideInRight 0.6s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.7s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%': { transform: 'translateY(-12px) rotate(-0.5deg)' },
          '66%': { transform: 'translateY(-6px) rotate(0.5deg)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 10px #cc1133, 0 0 20px #cc113366' },
          '50%': { boxShadow: '0 0 20px #ff1144, 0 0 40px #ff114466, 0 0 60px #cc113333' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        flicker: {
          '0%, 95%, 100%': { opacity: '1' },
          '96%': { opacity: '0.4' },
          '97%': { opacity: '1' },
          '98%': { opacity: '0.2' },
          '99%': { opacity: '1' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        slideInLeft: {
          from: { opacity: '0', transform: 'translateX(-40px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          from: { opacity: '0', transform: 'translateX(40px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      backgroundImage: {
        'grid-pattern': 'linear-gradient(rgba(204,17,51,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(204,17,51,0.06) 1px, transparent 1px)',
      },
      backgroundSize: {
        'grid': '40px 40px',
      },
      dropShadow: {
        'glow-red': ['0 0 8px rgba(204,17,51,0.8)', '0 0 20px rgba(204,17,51,0.4)'],
        'glow-red-lg': ['0 0 15px rgba(255,17,68,0.9)', '0 0 40px rgba(204,17,51,0.5)'],
      },
    },
  },
  plugins: [],
}

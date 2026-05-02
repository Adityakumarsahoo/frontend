/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        neon: {
          purple: '#854CE6',
          cyan: '#00C2FF',
          pink: '#FF7AE0',
          ink: '#0B0B14',
        },
      },
      boxShadow: {
        neon: '0 0 0 1px rgba(133,76,230,0.25), 0 22px 72px rgba(0,0,0,0.55), 0 0 44px rgba(0,194,255,0.10)',
      },
      backgroundImage: {
        'neon-sheen':
          'linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,0.14), rgba(255,255,255,0))',
      },
    },
  },
  plugins: [],
};


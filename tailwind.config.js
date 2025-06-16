/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'neon-purple': '#A23AFF',
        'neon-pink': '#FF6B9D',
        'dark-bg': '#0A0A0A',
        'light-bg': '#F8F6F2',
        'dark-gray': '#2C2C2C',
        'medium-gray': '#666666',
        'light-gray': '#CCCCCC',
      },
      borderWidth: {
        '3': '3px',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      backdropBlur: {
        'xs': '2px',
      },
      boxShadow: {
        'neon': '0 0 20px rgba(162, 58, 255, 0.3)',
        'neon-lg': '0 0 40px rgba(162, 58, 255, 0.4)',
      }
    },
  },
  plugins: [],
};
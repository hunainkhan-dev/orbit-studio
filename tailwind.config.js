/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0b0a0d',
        paper: '#f5f3f0',
        blush: '#ec4899',
        plum: '#1c0f18',
      },
      fontFamily: {
        display: ['"Clash Display"', 'Syne', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

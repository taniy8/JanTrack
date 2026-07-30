/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      boxShadow: {
        soft: '0 20px 45px -20px rgba(15, 23, 42, 0.25)',
      },
      colors: {
        brand: {
          50: '#eff6ff',
          500: '#2563eb',
          600: '#1d4ed8',
          700: '#1e40af',
        },
        success: '#059669',
        warning: '#d97706',
        accent: '#f59e0b',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

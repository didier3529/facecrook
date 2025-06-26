/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        // Facebook-inspired color palette
        facebook: {
          50: '#eff3ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#1877f2', // Facebook primary blue
          600: '#166fe5',
          700: '#1058c7',
          800: '#1047a1',
          900: '#0d369b',
        },
        primary: {
          50: '#eff3ff',
          500: '#1877f2',
          600: '#166fe5',
          700: '#1058c7',
        },
        secondary: {
          50: '#f8fafc',
          500: '#64748b',
          600: '#475569',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}


/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: '#0F1A29', soft: '#16273B' },   // existing brand navy
        brand: { DEFAULT: '#3DBBCD', deep: '#0E7C86' },  // existing brand teal; deep = readable on white
        mist: '#F2F6F7',
        ink: '#14202E',
        wa: { DEFAULT: '#0F7A40', dark: '#0C6635' },     // WhatsApp action
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Figtree', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

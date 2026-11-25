/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: '#0F1A29', soft: '#16273B', deep: '#0A121D' },   // brand navy (deep = darker shade for depth)
        brand: { DEFAULT: '#3DBBCD', deep: '#0E7C86' },                   // brand teal; deep = readable on white
        mist: '#F2F6F7',
        foam: '#E4F3F5',                                                  // very light teal tint
        ink: '#14202E',
        wa: { DEFAULT: '#0F7A40', dark: '#0C6635' },                      // WhatsApp action
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Figtree', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        lift: '0 28px 60px -28px rgba(15, 26, 41, 0.45)',
        soft: '0 10px 30px -14px rgba(15, 26, 41, 0.25)',
      },
    },
  },
  plugins: [],
}

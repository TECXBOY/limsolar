/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'solar-yellow': '#FFEB3B',
        'deep-charcoal': '#1A1A1A',
        'matte-black': '#0A0A0A',
        'soft-grey': '#BDBDBD',
        'dark-green': '#2E7D32',
        'electric-blue': '#1E88E5',
      },
    },
  },
  plugins: [],
}

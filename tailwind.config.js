/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ["var(--font-serif)", "serif"],
      },
      colors: {
        gold: '#d4af37',
        maroon: '#7c2b1a',
        cream: '#f8f5f0',
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        current: 'currentColor',
        'secondary-dark': '#0A0B0E',
        'secondary-light': '#D0D2D8'
      }
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        current: "currentColor",
        "secondary-dark": "#0A0B0E",
        "secondary-light": "#D0D2D8",
      },
      gridTemplateColumns: {
        "main-aside": "minmax(0,10fr) minmax(300px,2fr)",
      },
      gridTemplateRows: {
        "main-aside": "minmax(160px,260px) minmax(0,8fr)",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};

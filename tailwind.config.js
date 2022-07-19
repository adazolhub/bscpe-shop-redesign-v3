/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      height: {
        "nav-height": "var(--nav-height)",


      },
      width: {
        "modal-side": "var(--modal-side)",
      },

    },
  },
  plugins: [],
  important: true,
}

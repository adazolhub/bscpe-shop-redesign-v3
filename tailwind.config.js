/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      height: {
        "nav-height": "var(--nav-height)",
        "changable_height": "var(--height-top)",

      },

      width: {
        "modal-side": "var(--modal-side)",
      },

      fontFamily: {
        'sans': ['Raleway', 'sans-serif']
      },
      fontSize: {
        sm: ["clamp(1.00rem, calc(0.92rem + 0.39vw),1.20rem)", "1.4"],
        base: ["clamp(1.13rem, calc(0.98rem + 0.73vw),1.50rem)", "1.5"],
        lg: ["clamp(1.27rem, calc(1.03rem + 1.19vw),1.88rem)", "1.4"],
        xl: ["clamp(1.42rem, calc(1.06rem + 1.80vw),2.34rem)", "1.4"],
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}

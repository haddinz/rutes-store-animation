/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
      },
      keyframes: {
        left: {
          "0%": { transform: "translate3d(calc(-27.5% + 10vw ), 0, 0)" },
          "100%": { transform: "translate3d(calc(-53% + 10vw), 0, 0)" },
        },
        right: {
          "0%": { transform: "translate3d(calc(-52.5% + 10vw ), 0, 0)" },
          "100%": { transform: "translate3d(calc(-28% + 10vw), 0, 0)" },
        },
      },
      animation: {
        left: "left 5s ease-in-out forwards",
        right: "right 5s ease-out forwards",
      },
    },
  },
  plugins: [],
};

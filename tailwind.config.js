/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      animation: {
        animateModel: "animateModel 0.5s ease-in-out",
      },
      keyframes: {
        animateModel: {
          "0%": { top: "-200px", opacity: "0" },
          "100%": { top: "0", opacity: "1" },
        },
      },
    }
  },
  plugins: [],
}
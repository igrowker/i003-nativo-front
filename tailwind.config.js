/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "light-grey": "#F6FAFD",
        "primary-green": "#8EC63F",
        "light-green": "#E1F0D7",
        "secondary-yellow": "#FFC905",
      },
      dropShadow: {
        box: "2px 2px 2px rgba(0, 0, 0, 0.15)",
      },
      fontFamily: {
        lato: ["Lato", "sans-serif"],
      },
    },
  },
  plugins: [],
};

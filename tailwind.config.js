/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#77ada3",
        secondary: "#6da096",
        tertiary: "#f2ffe9",
        quaternary: "#597445",
      },
      screens: {
        xs: "425px",
      },
    },
  },
  plugins: [],
};

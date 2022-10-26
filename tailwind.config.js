/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./docs/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto"],
      },
      colors: {
        primary: "#9a2727",
        dark: "#334155",
        light: "#fff",
        secondary: "#64748b",
      },
    },
  },
  plugins: [],
};

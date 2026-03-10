/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        bg: "#f4f7fc",
        text: "#333333",
        primary: "#1a2238",
        accent: "#f0a500",
        card: "#ffffff",

        darkbg: "#1a1a2e",
        darktext: "#dddddd",
        darkprimary: "#0d0d1f",
        darkcard: "#2a2a40",
      },
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
      },
      boxShadow: {
        card: "0 5px 15px rgba(0,0,0,0.1)",
      },
    },
  },
  plugins: [],
};

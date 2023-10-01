/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },

    fontFamily: {
      sans: ["SF UI Text", "sans-serif"],
      TT: ["TT Norms Pro Regular, sans-serif"],
      serif: ["Merriweather", "serif"],
      cursive: [
        "cursive",
        "Gill Sans",
        "Gill Sans MT",
        "Calibri",
        "Trebuchet MS",
        "sans-serif",
      ],
    },
    extend: {
      colors: {
        lightBgColor: "#D9DCDF",
        lightSecBgColor: "#AEB6BE",
        lightFontColor: "#2e3b47",
        lightSecFontColor: "#5f5f5f",
        darkBgColor: "#111C3E",
        darkSecBgColor: "#203553",
        darkFontColor: "#c7cef4",
        darkSecFontColor: "#cccccc",
        tetiaryColor: "#ffac7f",
        blue: "#1fb6ff",
        purple: "#7e5bef",
        pink: "#ff49db",
        orange: "#ff7849",
        green: "#13ce66",
        yellow: "#ffc82c",
        "gray-dark": "#273444",
        gray: "#8492a6",
        "gray-light": "#d3dce6",
      },
    },
  },
  plugins: [],
};

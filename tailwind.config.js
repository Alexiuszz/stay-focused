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
    colors: {
      lightBgColor: "#D9DCDF",
      lightSecBgColor: "#AEB6BE",
      lightFontColor: "#283541",
      lightSecFontColor: "#81909E",
      darkBgColor: "#111C3E",
      darkSecBgColor: "#023a8f",
      darkFontColor: "#b9c3ff",
      darkSecFontColor: "#cccccc",
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
    fontFamily: {
      sans: ["SF UI Text", "sans-serif"],
      serif: ["Merriweather", "serif"],
    },
    extend: {
    },
  },
  plugins: [],
};

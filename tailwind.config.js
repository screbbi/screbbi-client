/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        buttonPurple: "#6861F2",
        whatNewText: "#111729",
        whatNewBorder: "#FF6F26",
        grey: "#7C8899",
        closeBlack: "#1E1E1E",
      },
    },
  },
  plugins: [],
};

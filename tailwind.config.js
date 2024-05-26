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
        faqBorder: "#D9D9D9",
        lightGrey: "#F7F8FA",
        lightButton: "#F5F5F5",
        darkBlue: "#1F243C",
        offWhite: "#EBF8F6",
        selectText: "#A5A5A5",
      },
      gridTemplateColumns: {
        pageLayout: "15rem 1fr",
      },
      screens: {
        story: "900px",
      },
    },
  },
  plugins: [],
};

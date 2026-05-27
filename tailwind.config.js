export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "Arial", "sans-serif"]
      },
      boxShadow: {
        glow: "0 24px 90px rgba(56, 189, 248, 0.26)",
        deep: "0 24px 80px rgba(2, 8, 23, 0.42)"
      }
    }
  },
  plugins: []
};

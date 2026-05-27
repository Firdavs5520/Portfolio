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
      },
      keyframes: {
        shine: {
          "0%": { transform: "translateX(-140%) skewX(-18deg)" },
          "100%": { transform: "translateX(240%) skewX(-18deg)" }
        },
        pulseLine: {
          "0%, 100%": { opacity: "0.35", transform: "scaleX(0.55)" },
          "50%": { opacity: "1", transform: "scaleX(1)" }
        }
      },
      animation: {
        shine: "shine 2.8s ease-in-out infinite",
        pulseLine: "pulseLine 2.4s ease-in-out infinite"
      }
    }
  },
  plugins: []
};

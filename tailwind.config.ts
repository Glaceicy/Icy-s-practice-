import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        dyslexic: ["var(--font-dyslexic)", "system-ui", "sans-serif"]
      },
      colors: {
        brand: {
          50: "#eff9ff",
          100: "#dbf1ff",
          200: "#b8e4ff",
          300: "#83d1ff",
          400: "#46b8ff",
          500: "#1a9bff",
          600: "#0a7de6",
          700: "#0863b8",
          800: "#0c5391",
          900: "#0f4676"
        },
        sunny: {
          400: "#ffcb47",
          500: "#ffb800",
          600: "#e69f00"
        },
        leaf: {
          400: "#6cd68a",
          500: "#3fbf68",
          600: "#2ea656"
        },
        berry: {
          400: "#ff8fa3",
          500: "#ff6b85",
          600: "#e6506b"
        }
      },
      borderRadius: {
        xl2: "1.25rem"
      },
      keyframes: {
        "pop-in": {
          "0%": { transform: "scale(0.85)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" }
        },
        confetti: {
          "0%": { transform: "translateY(0) rotate(0deg)", opacity: "1" },
          "100%": { transform: "translateY(120px) rotate(240deg)", opacity: "0" }
        }
      },
      animation: {
        "pop-in": "pop-in 0.25s ease-out",
        confetti: "confetti 1.1s ease-in forwards"
      }
    }
  },
  plugins: []
};

export default config;

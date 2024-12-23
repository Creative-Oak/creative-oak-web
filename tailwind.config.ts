import { type Config } from "tailwindcss";


export default {
  content: [
    "{routes,islands,components}/**/*.{ts,tsx,js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          white: "#fdfdff",
          yellow: "#ffe51b",
          black: "#333740",
          blue: "#62929e",
          purple: "#bd9cf7",
          red: "#ef767a",
        },
      },
      textColor: {
        DEFAULT: "#333740",
      },
      container: {
        center: true,
        padding: "1rem",
        screens: {
          sm: "640px",
          md: "768px",
          lg: "1024px",
          xl: "1280px",
          "2xl": "1440px",
        },
      },
      boxShadow: {
        "custom-black": "4px 4px 0 0 #333740", // Directly using the color value
      },
      fontFamily: {
        lexend: ["Lexend Deca", "sans-serif"],
        sans: ["Poppins", "serif"],
      },
    },
  },
  plugins: [
  ]
} satisfies Config;

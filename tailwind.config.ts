export default {
  content: [
    "./routes/**/*.{ts,tsx,js,jsx}",
    "./islands/**/*.{ts,tsx,js,jsx}",
    "./components/**/*.{ts,tsx,js,jsx}",
    "./static/**/*.{html,css}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          white: "#fdfdff",
          yellow: "#ffe51b",

          black: {
            100: "#d6d7d9",
            200: "#adafb3",
            300: "#85878c",
            400: "#5c5f66",
            500: "#333740",
            600: "#292c33",
            700: "#1f2126",
            800: "#14161a",
            900: "#0a0b0d",
            DEFAULT: "#333740", // Original black
          },
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
        padding: {
          DEFAULT: "1.5rem", // This will be the padding for mobile/small devices
          sm: "1rem", // From 640px up, padding will be 1rem
          md: "1rem",
          lg: "1rem",
          xl: "1rem",
          "2xl": "1rem",
        },
        screens: {
          sm: "40rem",
          md: "48rem",
          lg: "64rem",
          xl: "80rem",
          "2xl": "90rem",
        },
      },
      boxShadow: {
        "custom-black-400": "4px 4px 0 0 #4a4e58", // Lighter shadow
        "custom-black-500": "4px 4px 0 0 #3c4049", // Slightly darker shadow
        "custom-black": "4px 4px 0 0 #333740", // Original
        "custom-black-sm": "2px 2px 0 0 #5c5f66", // Shorter
      },
      fontFamily: {
        lexend: ["Lexend Deca", "sans-serif"],
        sans: ["Poppins", "serif"],
      },
    },
  },
  plugins: [],
};

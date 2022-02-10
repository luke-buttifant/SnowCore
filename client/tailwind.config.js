module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "white-smoke": "#F9FAF4",
        "deep-space-sparkle": "#4A6163",
        "sandy-brown": "#F9A66C",
        "pastel-orange": "#FFC94B",
        "light-coral": "#F17A7E",
      },
    },
    fontFamily: {
      Sora: ["Sora", "sans-serif"],
    },
    container: {
      center: true,
      padding: "1rem",
      screens: {
        lg: "1124px", 
        xl: "1124px", 
        "2xl": "1124px",
      },
    },
  },
  plugins: [],
}

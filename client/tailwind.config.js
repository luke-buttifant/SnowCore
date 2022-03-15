module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "dark-mode": "#26252A",
        "primary": "#41416E",
        "secondary": '#EF6D58',
        "accent-green": "#C6FAD2"
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

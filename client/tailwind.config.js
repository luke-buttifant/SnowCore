module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'login-illustration': "url('./images/loginIllustration.jpg')",
        'background': "url('./images/background.png')"
      },
      colors: {
        "dark-mode": "#26252A",
        "primary": "#41416E",
        "secondary": '#EF6D58',
        "accent-green": "#C6FAD2",
        "dark-mode-secondary": "#161616",
      },
    },
    fontFamily: {
      Sora: ["Sora", "sans-serif"],
    },
    container: {
      center: true,
      padding: "1rem",
    },
  },
  plugins: [],
}

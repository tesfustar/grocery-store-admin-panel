/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        "dark-bg": "#161b22",
        "dark-gray": "#2C2C37",
        "main-bg": "#34d399",
      },
      colors: {
        "main-color": "#34d399",
        "dark-color": "#161b22",
        "dark-gray": "#1f2937",
      },
    },
  },
  plugins: [
    // require('@tailwindcss/line-clamp'), require('tailwind-scrollbar-hide')
  ],
};

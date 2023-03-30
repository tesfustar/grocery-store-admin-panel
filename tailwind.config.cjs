/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        "dark-bg": "#161b22",
        "dark-gray": "#2C2C37",
        "red-bg": "#f05454",
        "main-bg":"#34d399",
        "blue-bg":"#30475e",
      },
      colors: {
        "red-color": "#f05454",
        "dark-color": "#161b22",
        "dark-gray": "#1f2937",
        "main-color":"#34d399",
        "blue-color":"#30475e",
      },
    },
  },
  plugins: [
    // require('@tailwindcss/line-clamp'),
     require('tailwind-scrollbar-hide')
  ],
};

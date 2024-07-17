/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        barlow: ['"Barlow Condensed"','sans-serif']
      },
      colors: {
        primary: '#008cba',
        secondary: '#e8e8e8',
        tertiary: '#1174f5',
        quaternary: '#fff',
      },
      zIndex: {
        'nav': '9999',
      },
      boxShadow: {
        'card': '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
        'login': '0px 0px 17px 2px rgba(0,0,0,1)',
      },
    },
  },
  plugins: [],
}


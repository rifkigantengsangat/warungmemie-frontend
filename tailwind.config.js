/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')
module.exports = {
  content: 
    ["./pages/**/*.js", "./Components/**/*.js"]
  ,
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['"Poppins"', 'sans-serif'],
        'monserrat':['"Montserrat"', 'sans-serif'], 
      },
    },
  },
  plugins: [
  ],
}

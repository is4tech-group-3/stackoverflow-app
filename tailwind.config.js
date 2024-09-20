/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        'dark-gunmetal': '#222831',
        'charcoal': '#31363F',
        'verdigris': '#76ABAE',
        'bright-gray': '#EEEEEE',
        'red-white': '#FEF3F2',
        'garnet': '#821E13'
      },
    },
  },
  plugins: [],
}

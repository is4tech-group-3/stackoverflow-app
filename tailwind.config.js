/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      spacing: {
        'full-screen': 'calc(100vh - 50px)',
      },
      colors: {
        'dark-gunmetal': '#222831',
        'charcoal': '#31363F',
        'verdigris': '#4fb9af',
        'bright-gray': '#EEEEEE',
        'red-white': '#FEF3F2',
        'garnet': '#821E13'
      },
    },
  },
  plugins: [],
}

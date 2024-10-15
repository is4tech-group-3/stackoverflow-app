/** @type {import('tailwindcss').Config} */
const fullScreenHeight = 'calc(100vh - 56px)'
module.exports = {
  important: true,
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      spacing: {
        128: '32rem',
        108: '28rem',
        98: '26rem',
      },
      height: {
        'full-screen': fullScreenHeight,
      },
      minHeight: {
        'full-screen': fullScreenHeight,
      },
      maxHeight: {
        'full-screen': fullScreenHeight,
      },
      backgroundImage: {
        galaxy: 'url(assets/img/home.jpg)',
      },

      colors: {
        'dark-gunmetal': '#222831',
        'metallic-blue': '#30475E',
        'light-gray': '#DDDDDD',
        'deep-aqua': {
          100: '#cfeae7',
          200: '#9ed4cf',
          300: '#6ebfb8',
          400: '#3da9a0',
          500: '#0d9488',
          600: '#0a766d',
          700: '#085952',
          800: '#053b36',
          900: '#031e1b',
        },
        'sunset-orange': {
          100: '#fcdddd',
          200: '#f9bbbb',
          300: '#f69898',
          400: '#f37676',
          500: '#f05454',
          600: '#c04343',
          700: '#903232',
          800: '#602222',
          900: '#301111',
        },
      },
    },
  },
  plugins: [],
}

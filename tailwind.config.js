/** @type {import('tailwindcss').Config} */
const fullScreenHeight = 'calc(100vh - 56px)';
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

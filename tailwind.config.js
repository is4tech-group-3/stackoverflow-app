/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      spacing: {
        128: '32rem',
      },
      height: {
        'full-screen': 'calc(100vh - 56px)',
      },
      backgroundImage: {
        galaxy: 'url(assets/img/home.jpg)',
      },

      colors: {
        'dark-gunmetal': '#222831', // nuevo
        'metallic-blue': '#30475E', // nuevo
        'light-gray': '#DDDDDD', // nuevo
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

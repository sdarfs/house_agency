/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./static/**/*.{js,css}",
    "./views/**/*.ejs",
  ],
  theme: {
    fontFamily: {
      'sans': ['Inter', 'sans-serif']
    },
    extend: {
      textColor: {
        black: '#020617'
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      }
    }
  },
  plugins: [
  ],
}


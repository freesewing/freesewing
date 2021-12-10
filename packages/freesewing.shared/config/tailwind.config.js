module.exports = {
  content: [
    './pages/*.js',
    './pages/**/*.js',
  ],
  theme: {
    extend: {
      colors: require('daisyui/colors'),
    },
  },
  plugins: [
    require('daisyui'),
  ],
}

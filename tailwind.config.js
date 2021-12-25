module.exports = {
  content: ['./app/**/*.{ts,tsx}'],
  theme: {
    colors: {
      primary: '#4ECCA3',
      secondary: '#EEEEEE',
      background: '#393E46',
      black: '#232931'
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/aspect-ratio')
  ]
};

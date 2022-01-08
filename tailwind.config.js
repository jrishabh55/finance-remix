module.exports = {
  content: ['./app/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    colors: {
      primary: '#4ECCA3',
      secondary: '#EEEEEE',
      background: '#393E46',
      black: '#232931',
      error: '#F44336',
      warning: '#FF9800'
    },
    extend: {
      boxShadow: {
        input: `5px 5px 0px #21262e,
        -5px -5px 0px #252c34`
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/aspect-ratio')
  ]
};

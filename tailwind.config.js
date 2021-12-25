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
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/aspect-ratio')
  ]
};

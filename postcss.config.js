export default {
  plugins: {
    'tailwindcss/nesting': {},
    'tailwindcss': {},
    'autoprefixer': {},
    'postcss-import': {},
    'postcss-preset-env': {
      features: { 'nesting-rules': false }
    }
  }
} 
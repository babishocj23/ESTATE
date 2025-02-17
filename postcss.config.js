export default {
  plugins: {
    'postcss-import': {},
    'tailwindcss/nesting': 'postcss-nesting',
    'tailwindcss': {},
    'autoprefixer': {},
    'postcss-preset-env': {
      features: {
        'nesting-rules': false,
        'custom-properties': false,
        'color-mod-function': { unresolved: 'warn' }
      },
      browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'not dead'],
      stage: 3
    }
  }
} 
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          DEFAULT: '#0ea5e9'
        },
        dark: {
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
          footer: '#121826'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      backgroundImage: {
        'hero-pattern': "linear-gradient(rgba(17, 24, 39, 0.8), rgba(17, 24, 39, 0.8)), url('/hero-bg.jpg')",
      },
      ringColor: {
        DEFAULT: '#0ea5e9',
        primary: '#0ea5e9',
      },
      ringOffsetColor: {
        dark: {
          900: '#111827'
        }
      },
      transitionProperty: {
        'all': 'all',
      },
      transitionDuration: {
        '200': '200ms',
        '300': '300ms',
      },
      transitionTimingFunction: {
        'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      backdropBlur: {
        md: '12px',
      },
      scale: {
        '95': '0.95',
      },
      translate: {
        '-1': '-0.25rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
  safelist: [
    {
      pattern: /(bg|text|border|ring|ring-offset|shadow)-(primary|dark)-(50|100|200|300|400|500|600|700|800|900|footer)/,
    },
    {
      pattern: /(bg|text|border)-(white|gray|red|green|blue)-(50|100|200|300|400|500|600|700|800|900)/,
    },
    {
      pattern: /grid-cols-(1|2|3|4|5|6)/,
    },
    {
      pattern: /gap-(1|2|3|4|5|6|8|10|12)/,
    },
    'text-white',
    'text-gray-400',
    'bg-dark-800',
    'bg-dark-900',
    'min-h-screen',
    'container',
    'mx-auto',
    'px-4',
    'py-8',
    'rounded-lg',
    'rounded-xl',
    'rounded-2xl',
    'rounded-3xl',
    'ring-2',
    'ring-primary',
    'ring-offset-2',
    'ring-offset-dark-900',
    'focus:ring-2',
    'focus:ring-primary',
    'focus:ring-offset-2',
    'focus:ring-offset-dark-900',
  ]
} 
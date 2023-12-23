import * as defaultTheme from 'tailwindcss/defaultTheme'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    'node_modules/preline/dist/*.js'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans]
      },
      minHeight: {
        screen: '100dvh'
      },
      gridTemplateColumns: {
        ram: 'repeat(auto-fill, minmax(250px, 1fr))'
      }
    }
  },
  plugins: [require('preline/plugin'), require('@tailwindcss/forms')]
}

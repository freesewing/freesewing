// Handle themes
import { themes } from '../themes/index.mjs'

const colors = [
  'red',
  'orange',
  'yellow',
  'lime',
  'green',
  'teal',
  'cyan',
  'blue',
  'indigo',
  'violet',
  'purple',
]

const rainbow = {
  rainbow: 'hsl(var(--rb))',
}
for (let r = 0; r < colors.length; r++) {
  rainbow[`rainbow-${colors[r]}`] = `var(--rb-${colors[r]})`
}

export default {
  content: [
    './pages/*.mjs',
    './pages/*.js',
    './pages/**/*.mjs',
    './pages/**/*.js',
    './components/*.mjs',
    './components/**/*.mjs',
    './page-templates/*.mjs',
    '../shared/components/**/*.mjs',
    '../shared/config/tailwind-force.html',
  ],
  plugins: [require('daisyui'), require('tailwindcss/nesting')],
  daisyui: {
    styled: true,
    themes: [themes],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
  },
  theme: {
    extend: {
      aspectRatio: {
        '9/16': '9 / 16',
      },
      colors: rainbow,
    },
  },
}

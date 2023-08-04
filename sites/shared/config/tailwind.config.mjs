// Handle themes
import { themes } from '../themes/index.mjs'
import { colord } from 'colord'

// A color converter that only converts our custom colors to HSL
const toHSL = (key, color) => {
  const parser = colord(color)
  // only parse it if it's a color that daisyUI doesn't want anything to do with
  if (!parser.isValid() || !key.match(/^--fs/)) return color
  const hslArray = parser.toHsl()
  return `${hslArray.h} ${hslArray.s}% ${hslArray.l}%`
}

// convert all the colors to HSL so our little themed rainbow hack will work with opacities
// this is all because tailwind gives us their default color palate in hex, a very unhelpful format
// it's obnoxious to do this little bit of pre-processing, but it saves a lot of headache on
// importing themed colors into components later.
// Preserves the feel of putting colors into themes and styling html with semantic classes
const parsedThemes = {}
for (const theme in themes) {
  parsedThemes[theme] = {}

  for (const c in themes[theme]) {
    parsedThemes[theme][c] = toHSL(c, themes[theme][c])
  }
}

// this is how Daisy UI hands colors to Tailwind, but they only process their set names and we have more we want to use
const toTWColor = (varName) => `hsl(var(--fs-${varName}) /  <alpha-value>)`
const customColors = {}
for (let r = 0; r < 11; r++) {
  customColors[`spectrum-${r}`] = toTWColor(`sp-${r}`)
  customColors[`spectrum-focus-${r}`] = toTWColor(`spf-${r}`)
  if (r < 5) customColors[`rating-${r}`] = toTWColor(`rt-${r}`)
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
    themes: [parsedThemes],
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
      colors: customColors,
    },
  },
}

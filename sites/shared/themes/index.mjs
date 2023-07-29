// This is CJS because Tailwind does not (yet) support ESM
import { theme as light, spectrum as lightSpectrum, rating as lightRating } from './light.mjs'
import { theme as dark, spectrum as darkSpectrum, rating as darkRating } from './dark.mjs'
import { theme as hax0r, spectrum as hax0rSpectrum, rating as hax0rRating } from './hax0r.mjs'
import { theme as lgbtq, spectrum as lgbtqSpectrum, rating as lgbtqRating } from './lgbtq.mjs'
import { theme as pastel, spectrum as pastelSpectrum, rating as pastelRating } from './pastel.mjs'
import { theme as aqua, spectrum as aquaSpectrum, rating as aquaRating } from './aqua.mjs'
import {
  theme as monochrome,
  spectrum as monochromeSpectrum,
  rating as monochromeRating,
} from './monochrome.mjs'

export const themes = {
  light,
  dark,
  aqua,
  hax0r,
  lgbtq,
  monochrome,
  pastel,
}

export const spectrum = {
  light: lightSpectrum,
  dark: darkSpectrum,
  aqua: aquaSpectrum,
  hax0r: hax0rSpectrum,
  lgbtq: lgbtqSpectrum,
  monochrome: monochromeSpectrum,
  pastel: pastelSpectrum,
}

export const rating = {
  light: lightRating,
  dark: darkRating,
  aqua: aquaRating,
  hax0r: hax0rRating,
  lgbtq: lgbtqRating,
  monochrome: monochromeRating,
  pastel: pastelRating,
}

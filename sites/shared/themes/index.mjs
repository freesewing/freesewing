//  __SDEFILE__ - This file is a dependency for the stand-alone environment
// This is CJS because Tailwind does not (yet) support ESM
import {
  theme as light,
  spectrum as lightSpectrum,
  rating as lightRating,
  graph as lightGraph,
} from './light.mjs'
import {
  theme as dark,
  spectrum as darkSpectrum,
  rating as darkRating,
  graph as darkGraph,
} from './dark.mjs'
import {
  theme as hax0r,
  spectrum as hax0rSpectrum,
  rating as hax0rRating,
  graph as hax0rGraph,
} from './hax0r.mjs'
import {
  theme as lgbtq,
  spectrum as lgbtqSpectrum,
  rating as lgbtqRating,
  graph as lgbtqGraph,
} from './lgbtq.mjs'
import {
  theme as pastel,
  spectrum as pastelSpectrum,
  rating as pastelRating,
  graph as pastelGraph,
} from './pastel.mjs'
import {
  theme as aqua,
  spectrum as aquaSpectrum,
  rating as aquaRating,
  graph as aquaGraph,
} from './aqua.mjs'
import {
  theme as monochrome,
  spectrum as monochromeSpectrum,
  rating as monochromeRating,
  graph as monochromeGraph,
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

export const graph = {
  light: lightGraph,
  dark: darkGraph,
  aqua: aquaGraph,
  hax0r: hax0rGraph,
  lgbtq: lgbtqGraph,
  monochrome: monochromeGraph,
  pastel: pastelGraph,
}

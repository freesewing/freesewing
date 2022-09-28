import { Design } from '@freesewing/core'
import { data } from '../data.mjs'
import { banner } from './plugin-banner.mjs'
import { bartack } from './plugin-bartack.mjs'
import { buttons } from './plugin-buttons.mjs'
import { cutonfold } from './plugin-cutonfold.mjs'
import { dimension } from './plugin-dimension.mjs'
import { flip } from './plugin-flip.mjs'
import { gore } from './plugin-gore.mjs'
import { grainline } from './plugin-grainline.mjs'
import { i18n } from './plugin-i18n.mjs'
import { logo } from './plugin-logo.mjs'
import { measurements } from './plugin-measurements.mjs'
import { mirror } from './plugin-mirror.mjs'
import { notches } from './plugin-notches.mjs'
import { round } from './plugin-round.mjs'
import { scalebox } from './plugin-scalebox.mjs'
import { sprinkle } from './plugin-sprinkle.mjs'
import { title } from './plugin-title.mjs'

// Setup our new design
const Plugintest = new Design({
  data,
  parts: [
    banner,
    bartack,
    buttons,
    cutonfold,
    dimension,
    flip,
    gore,
    grainline,
    i18n,
    logo,
    measurements,
    mirror,
    notches,
    round,
    scalebox,
    sprinkle,
    title,
  ],
})

// Named exports
export {
  banner,
  bartack,
  buttons,
  cutonfold,
  dimension,
  flip,
  gore,
  grainline,
  i18n,
  logo,
  measurements,
  mirror,
  notches,
  round,
  scalebox,
  sprinkle,
  title,
  Plugintest,
}

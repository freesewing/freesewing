import { Design } from '@freesewing/core'
import { data } from '../data.mjs'
import { annotations } from './plugin-annotations.mjs'
import { flip } from './plugin-flip.mjs'
import { gore } from './plugin-gore.mjs'
import { i18n } from './plugin-i18n.mjs'
import { logo } from './plugin-logo.mjs'
import { measurements } from './plugin-measurements.mjs'
import { mirror } from './plugin-mirror.mjs'
import { round } from './plugin-round.mjs'
import { sewtogether } from './plugin-sewtogether.mjs'
import { sprinkle } from './plugin-sprinkle.mjs'
import { title } from './plugin-title.mjs'

// Setup our new design
const Plugintest = new Design({
  data,
  parts: [
    annotations,
    flip,
    gore,
    i18n,
    logo,
    measurements,
    mirror,
    round,
    //sewtogether,
    sprinkle,
    //title,
  ],
})

// Named exports
export {
  annotations,
  //banner,
  //bartack,
  //buttons,
  //crossbox,
  //cutonfold,
  //dimension,
  flip,
  gore,
  //grainline,
  i18n,
  logo,
  measurements,
  mirror,
  //notches,
  //pleat,
  round,
  //scalebox,
  //sewtogether,
  sprinkle,
  //title,
  Plugintest,
}

import { Design } from '@freesewing/core'
import { data } from '../data.mjs'
import { annotations } from './plugin-annotations.mjs'
import { flip } from './plugin-flip.mjs'
import { gore } from './plugin-gore.mjs'
import { i18n } from './plugin-i18n.mjs'
import { measurements } from './plugin-measurements.mjs'
import { mirror } from './plugin-mirror.mjs'
import { round } from './plugin-round.mjs'
import { sprinkle } from './plugin-sprinkle.mjs'

// Setup our new design
const Plugintest = new Design({
  data,
  parts: [annotations, flip, gore, i18n, measurements, mirror, round, sprinkle],
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
  //logo,
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

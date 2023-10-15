import { Design } from '@freesewing/core'
import { data } from '../data.mjs'
import { i18n } from '../i18n/index.mjs'
import { annotations } from './plugin-annotations.mjs'
import { flip } from './plugin-flip.mjs'
import { gore } from './plugin-gore.mjs'
import { i18n as i18nStack } from './plugin-i18n.mjs'
import { measurements } from './plugin-measurements.mjs'
import { mirror } from './plugin-mirror.mjs'
import { round } from './plugin-round.mjs'
import { sprinkle } from './plugin-sprinkle.mjs'

// Setup our new design
const Plugintest = new Design({
  data,
  parts: [annotations, flip, gore, i18nStack, measurements, mirror, round, sprinkle],
})

// Named exports
export {
  annotations,
  flip,
  gore,
  i18nStack,
  measurements,
  mirror,
  round,
  sprinkle,
  Plugintest,
  i18n,
}

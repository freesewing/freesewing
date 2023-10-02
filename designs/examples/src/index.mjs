import { Design } from '@freesewing/core'
import { gorePlugin } from '@freesewing/plugin-gore'
import { data } from '../data.mjs'
import { i18n } from '../i18n/index.mjs'

// Stacks
import {
  stacks_top,
  stacks_left,
  stacks_right,
  stacks_bottom,
  stacks_leftEye,
  stacks_rightEye,
  stacks_mouth,
} from './stacks.mjs'

// Settings
import { settings_sa } from './settings.mjs'

// Setup our new design
const Examples = new Design({
  data,
  parts: [
    // Stacks
    stacks_top,
    stacks_left,
    stacks_right,
    stacks_bottom,
    stacks_leftEye,
    stacks_rightEye,
    stacks_mouth,

    // Settings
    settings_sa,
  ],
  plugins: [gorePlugin],
})

// Named exports
export {
  // Stacks
  stacks_top,
  stacks_left,
  stacks_right,
  stacks_bottom,
  stacks_leftEye,
  stacks_rightEye,
  stacks_mouth,

  // Settings
  settings_sa,
  Examples,

  // Translation
  i18n,
}

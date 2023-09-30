import { Design, mergeI18n } from '@freesewing/core'
import { i18n as brianI18n } from '@freesewing/brian'
import { i18n as aaronI18n } from '../i18n/index.mjs'
import { data } from '../data.mjs'
import { back } from './back.mjs'
import { front } from './front.mjs'
import { armBinding } from './arm-binding.mjs'
import { neckBinding } from './neck-binding.mjs'

// Setup our new design
const Aaron = new Design({
  data,
  parts: [back, front, armBinding, neckBinding],
})

// Merge translations
const i18n = mergeI18n([brianI18n, aaronI18n], {
  p: { keep: ['front', 'back', 'armBinding', 'neckBinding'] },
  o: {
    keep: [
      ...Object.keys(back.options),
      ...Object.keys(front.options),
      'cuffEase',
      's3Collar',
      's3Armhole',
      'legacyArmholeDepth',
      'legacyArmholeDepthNo',
      'legacyArmholeDepthYes',
      'armholeDepth',
    ],
  },
  s: { drop: [] },
})

// Named exports
export { back, front, Aaron, i18n }

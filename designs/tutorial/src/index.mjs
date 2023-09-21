import { Design } from '@freesewing/core'
import { data } from '../data.mjs'
import { i18n } from '../i18n/index.mjs'
import { step1, step2, step3, step4 } from './step1-4.mjs'
import { step5, step6, step7, step8 } from './step5-8.mjs'
import { step9, step10, step11 } from './step9-11.mjs'
import { bib } from './bib.mjs'

// Setup our new design
const Tutorial = new Design({
  data,
  parts: [step1, step2, step3, step4, step5, step6, step7, step8, step9, step10, step11, bib],
})

// Named exports
export {
  step1,
  step2,
  step3,
  step4,
  step5,
  step6,
  step7,
  step8,
  step9,
  step10,
  step11,
  bib,
  Tutorial,
  i18n,
}

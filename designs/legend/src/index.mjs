import { Design } from '@freesewing/core'
import { data } from '../data.mjs'
import { i18n } from '../i18n/index.mjs'
import { fabricLines, saLines, otherLines, lineWidths, lineStrokes } from './lines.mjs'
import { notches } from './notches.mjs'
import { buttons } from './buttons.mjs'
import { snaps } from './snaps.mjs'
import { logo } from './logo.mjs'
import { cutonfold } from './cutonfold.mjs'
import { grainline } from './grainline.mjs'
import { title } from './title.mjs'
import { scalebox } from './scalebox.mjs'
import { textSize } from './textsize.mjs'
import { bartack } from './bartack.mjs'
import { dimension } from './dimension.mjs'
import { sa } from './sa.mjs'

// Setup our new design
const Legend = new Design({
  data,
  parts: [
    fabricLines,
    saLines,
    otherLines,
    lineWidths,
    lineStrokes,
    notches,
    buttons,
    snaps,
    logo,
    cutonfold,
    grainline,
    title,
    scalebox,
    textSize,
    bartack,
    dimension,
    sa,
  ],
})

// Named exports
export {
  fabricLines,
  saLines,
  otherLines,
  lineWidths,
  lineStrokes,
  notches,
  buttons,
  snaps,
  logo,
  cutonfold,
  grainline,
  title,
  scalebox,
  textSize,
  bartack,
  dimension,
  sa,
  Legend,
  i18n,
}

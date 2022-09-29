import { Design } from '@freesewing/core'
import { data } from '../data.mjs'
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
  Legend,
}

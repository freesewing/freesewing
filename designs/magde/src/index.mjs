//

import { Design } from '@freesewing/core'
import { data } from '../data.mjs'
// Parts
import { bodyLiner } from './bodyLiner.mjs'
import { frontPanel } from './frontPanel.mjs'
import { frontOrganiserBase } from './frontOrganiserBase.mjs'
import { frontOrganiserFront } from './frontOrganiserFront.mjs'
import { backPanel } from './backPanel.mjs'
import { lidOnePiece } from './lidOnePiece.mjs'
import { twoPieceLidTop } from './twoPieceLidTop.mjs'
import { twoPieceLidBottom } from './twoPieceLidBottom.mjs'
import { lidLiner } from './lidLiner.mjs'
import { strapAttachments } from './strapAttachments.mjs'

// Create new design
const Magde = new Design({
  data,
  parts: [
    backPanel,
    frontPanel,
    frontOrganiserBase,
    frontOrganiserFront,
    lidOnePiece,
    twoPieceLidTop,
    twoPieceLidBottom,
    strapAttachments,
    bodyLiner,
    lidLiner,
  ],
})

// Named exports
export { bodyLiner, Magde }

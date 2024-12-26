import { Design } from '@freesewing/core'
import about from '../about.json' with { type: 'json' }
import { i18n } from '../i18n/index.mjs'
// Parts
import { bodyLiner } from './bodyLiner.mjs'
import { frontPanel } from './frontPanel.mjs'
import { frontOrganiserBase } from './frontOrganiserBase.mjs'
import { frontOrganiserFront } from './frontOrganiserFront.mjs'
import { backPanel } from './backPanel.mjs'
import { lidOnePiece } from './lidOnePiece.mjs'
import { twoPieceLidTop } from './twoPieceLidTop.mjs'
import { twoPieceLidBottom } from './twoPieceLidBottom.mjs'
import { sidePanel } from './sidePanel.mjs'
import { internalOrganiser } from './internalOrganiser.mjs'
import { strapAttachments } from './strapAttachments.mjs'

// Create new design
const Magde = new Design({
  data: about,
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
    sidePanel,
    internalOrganiser,
  ],
})

// Named exports
export {
  backPanel,
  frontPanel,
  frontOrganiserBase,
  frontOrganiserFront,
  lidOnePiece,
  twoPieceLidTop,
  twoPieceLidBottom,
  strapAttachments,
  bodyLiner,
  sidePanel,
  internalOrganiser,
  Magde,
  i18n,
  about,
}

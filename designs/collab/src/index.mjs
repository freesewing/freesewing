import { Design } from '@freesewing/core'
import { data } from '../data.mjs'
// Parts
import { shared } from './shared.mjs'
import { back } from './back.mjs'
import { frontBase } from './front-base.mjs'
import { frontLeft } from './front-left.mjs'
import { frontRight } from './front-right.mjs'
import { waistband } from './waistband.mjs'
import { flyShield } from './fly-shield.mjs'
import { frontPocketBag } from './front-pocket-bag.mjs'
import { frontPocketFacing } from './front-pocket-facing.mjs'
import { frontAttachment } from './front-attachment.mjs'
import { frontAttachmentFacing } from './front-attachment-facing.mjs'
import { backPocket } from './back-pocket.mjs'
import { backPocketFlap } from './back-pocket-flap.mjs'
import { backAttachmentBack } from './back-attachment-back.mjs'
import { backAttachmentFront } from './back-attachment-front.mjs'
import { backAttachmentFlap } from './back-attachment-flap.mjs'
//import { backAttachmentSide } from './back-attachment-side.mjs'

// Create new design
const Collab = new Design({
  data,
  parts: [
    shared,
    back,
    frontBase,
    frontLeft,
    frontRight,
    waistband,
    flyShield,
    frontPocketBag,
    frontPocketFacing,
    frontAttachment,
    frontAttachmentFacing,
    backPocket,
    backPocketFlap,
    backAttachmentBack,
    backAttachmentFront,
    backAttachmentFlap,
    //backAttachmentSide
  ],
})

// Named exports
export {
  shared,
  back,
  frontBase,
  frontLeft,
  frontRight,
  waistband,
  flyShield,
  frontPocketBag,
  frontPocketFacing,
  frontAttachment,
  frontAttachmentFacing,
  backPocket,
  backPocketFlap,
  backAttachmentBack,
  backAttachmentFront,
  backAttachmentFlap,
  //backAttachmentSide,
  Collab,
}

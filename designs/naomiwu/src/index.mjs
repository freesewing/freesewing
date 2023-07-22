import { Design } from '@freesewing/core'
import { data } from '../data.mjs'
import { i18n } from '../i18n/index.mjs'
// Parts
import { shared } from './shared.mjs'
import { back } from './back.mjs'
import { frontBase } from './front-base.mjs'
import { frontFlySide } from './front-fly-side.mjs'
import { frontNoFlySide } from './front-nofly-side.mjs'
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

/*
 * Create new design
 */
const Naomiwu = new Design({
  data,
  parts: [
    shared,
    back,
    frontBase,
    frontFlySide,
    frontNoFlySide,
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

/*
 * Note that we are creating this above as 'Naomiwu' and not 'NaomiWu', which
 * would be the correctly camel-cased name of the person it's named after.
 *
 * The reason is that when discussing the name with Naomi, she originally
 * suggested 'Open Cargo Skirt'. After explaining that we typically use
 * first-names for our designs because we provide a website in multiple
 * languages and want to have a name that does not need translation, she
 * suggested either 'Wu Cargo Skirt' or 'Naomi Wu Cargo Skirt'.
 *
 * So we landed on 'Naomi Wu Cargo Skirt' which makes the short name of this
 * pattern (as used in the NPM package and URLs) 'naomiwu'.
 * To get the constructure from that, we capitalize the design name, so that
 * is why 'Naomiwu' is exported.
 *
 * However, to be flexible, we also export this design as NaomiWu below.
 * This way, both ways work.
 */
const NaomiWu = Naomiwu

// Named exports
export {
  shared,
  back,
  frontBase,
  frontFlySide,
  frontNoFlySide,
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
  Naomiwu,
  NaomiWu, // See note above
  i18n,
}

import { Design } from '@freesewing/core'
import about from '../about.json' with { type: 'json' }
import { i18n } from '../i18n/index.mjs'
// Parts
import { sidePanel } from './sidepanel.mjs'
import { frontPanel } from './frontpanel.mjs'
import { bottomPanel } from './bottompanel.mjs'
import { zipperPanel } from './zipperpanel.mjs'
import { sidePanelReinforcement } from './sidepanelreinforcement.mjs'
import { strap } from './strap.mjs'

// Create new design
const Hortensia = new Design({
  data: about,
  parts: [sidePanel, frontPanel, bottomPanel, zipperPanel, sidePanelReinforcement, strap],
})

// Named exports
export {
  sidePanel,
  frontPanel,
  bottomPanel,
  zipperPanel,
  sidePanelReinforcement,
  strap,
  Hortensia,
  i18n,
  about,
}

import { Design } from '@freesewing/core'
import { data } from '../data.mjs'
import { i18n } from '../i18n/index.mjs'
// Parts
import { sidepanel } from './sidepanel.mjs'
import { frontpanel } from './frontpanel.mjs'
import { bottompanel } from './bottompanel.mjs'
import { zipperpanel } from './zipperpanel.mjs'
import { sidepanelreinforcement } from './sidepanelreinforcement.mjs'
import { strap } from './strap.mjs'

// Create new design
const Hortensia = new Design({
  data,
  parts: [sidepanel, frontpanel, bottompanel, zipperpanel, sidepanelreinforcement, strap],
})

// Named exports
export {
  sidepanel,
  frontpanel,
  bottompanel,
  zipperpanel,
  sidepanelreinforcement,
  strap,
  Hortensia,
  i18n,
}

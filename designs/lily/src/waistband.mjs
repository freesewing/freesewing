import { back } from './back.mjs'
import { front } from './front.mjs'
import { waistband as pacoWaistband } from '@freesewing/paco'

export const waistband = {
  name: 'lily.waistband',
  after: [back, front],
  hide: 'HIDE_TREE',
  draft: (sh) => {
    const { snippets, part } = sh
    //draft
    pacoWaistband.draft(sh)
    //delete eyelets
    for (let s in snippets) delete snippets[s]

    return part
  },
}

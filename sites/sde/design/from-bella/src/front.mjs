import { frontSideDart as bellaFront } from '@freesewing/bella'

function draftFront({ part }) {
  /*
   * Do your magic here
   */

  return part
}

export const front = {
  name: 'frombella.front',
  from: bellaFront,
  draft: draftFront,
  hide: { from: true },
}

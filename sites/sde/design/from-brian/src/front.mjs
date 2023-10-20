import { front as brianFront } from '@freesewing/brian'

function draftFront({ part }) {
  /*
   * Do your magic here
   */

  return part
}

export const front = {
  name: 'frombrian.front',
  from: brianFront,
  draft: draftFront,
  hide: { from: true },
}

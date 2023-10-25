import { front as bentFront } from '@freesewing/bent'

function draftFront({ part }) {
  /*
   * Do your magic here
   */

  return part
}

export const front = {
  name: 'frombent.front',
  from: bentFront,
  draft: draftFront,
  hide: { from: true },
}

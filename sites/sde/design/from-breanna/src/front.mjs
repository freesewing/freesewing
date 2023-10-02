import { front as breannaFront } from '@freesewing/breanna'

function draftFront({ part }) {
  /*
   * Do your magic here
   */

  return part
}

export const front = {
  name: 'frombreanna.front',
  from: breannaFront,
  draft: draftFront,
  hide: { from: true },
}

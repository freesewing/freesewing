import { sleeve as breannaSleeve } from '@freesewing/breanna'

function draftSleeve({ part }) {
  /*
   * Do your magic here
   */

  return part
}

export const sleeve = {
  name: 'frombreanna.sleeve',
  from: breannaSleeve,
  draft: draftSleeve,
  hide: { from: true },
}

import { topSleeve as bentTopSleeve } from '@freesewing/bent'

function draftTopSleeve({ part }) {
  /*
   * Do your magic here
   */

  return part
}

export const topSleeve = {
  name: 'frombent.topSleeve',
  from: bentTopSleeve,
  draft: draftTopSleeve,
  hide: { from: true },
}

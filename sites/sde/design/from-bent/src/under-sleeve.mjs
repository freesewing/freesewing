import { underSleeve as bentUnderSleeve } from '@freesewing/bent'

function draftUnderSleeve({ part }) {
  /*
   * Do your magic here
   */

  return part
}

export const underSleeve = {
  name: 'frombent.underSleeve',
  from: bentUnderSleeve,
  draft: draftUnderSleeve,
  hide: { from: true },
}

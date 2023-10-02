import { sleeve as brianSleeve } from '@freesewing/brian'

function draftSleeve({ part }) {
  // Do your magic here

  return part
}

export const sleeve = {
  name: 'frombrian.sleeve',
  from: brianSleeve,
  draft: draftSleeve,
  hide: { from: true },
}

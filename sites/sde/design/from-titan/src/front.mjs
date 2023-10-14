import { front as titanFront } from '@freesewing/titan'

function draftFront({ part }) {
  /*
   * Do your magic here
   */

  return part
}

export const front = {
  name: 'fromtitan.front',
  from: titanFront,
  draft: draftFront,
  hide: {
    from: true,
    inherited: true,
  },
}

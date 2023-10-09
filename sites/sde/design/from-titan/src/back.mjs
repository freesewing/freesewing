import { back as titanBack } from '@freesewing/titan'

function draftBack({ part }) {
  /*
   * Do your magic here
   */

  return part
}

export const back = {
  name: 'fromtitan.back',
  from: titanBack,
  draft: draftBack,
  hide: {
    from: true,
    inherited: true,
  },
}

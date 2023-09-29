import { back as bentBack } from '@freesewing/bent'

function draftBack({ part }) {
  // Do your magic here

  return part
}

export const back = {
  name: 'frombent.back',
  from: bentBack,
  draft: draftBack,
  hide: { from: true },
}

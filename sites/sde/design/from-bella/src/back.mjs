import { back as bellaBack } from '@freesewing/bella'

function draftBack({ part }) {
  // Do your magic here

  return part
}

export const back = {
  name: 'frombella.back',
  from: bellaBack,
  draft: draftBack,
  hide: { from: true },
}

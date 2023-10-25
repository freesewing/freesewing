import { back as brianBack } from '@freesewing/brian'

function draftBack({ part }) {
  // Do your magic here

  return part
}

export const back = {
  name: 'frombrian.back',
  from: brianBack,
  draft: draftBack,
  hide: { from: true },
}

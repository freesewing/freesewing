import { back as breannaBack } from '@freesewing/breanna'

function draftBack({ part }) {
  // Do your magic here

  return part
}

export const back = {
  name: 'frombreanna.back',
  from: breannaBack,
  draft: draftBack,
  hide: { from: true },
}

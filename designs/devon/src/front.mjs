import { front as brianFront } from '@freesewing/brian'
// import { back } from './back.mjs'
// import {
//   backDarts,
//   backDartShaping,
//   buttonFreeLength,
//   extraTopButton,
//   separateButtonPlacket,
//   separateButtonholePlacket,
//   buttons,
//   ffsa,
// } from './options.mjs'

function devonFront({
  store,
  measurements,
  sa,
  Point,
  points,
  Path,
  paths,
  macro,
  utils,
  snippets,
  options,
  part,
}) {
  // Clean up
  // for (const i in paths) {
  //   if (['frontArmhole', 'frontCollar'].indexOf(i) === -1) delete paths[i]
  // }
  // for (const i in snippets) {
  //   if (i.indexOf('otch')) delete snippets[i]
  // }

  macro('rmcutonfold')

  const FBA = ((1 + options.chestEase) * (measurements.bust - measurements.highBust)) / 2
  /*
   * If the FBA is negative, that means the high bust measurement is higher than the
   * front bust. That's not uncommon for people who don't have much breast tissue but
   * it generates a negative dart which is confusing and incorrect. So in that case, just
   * return the original part from simon
   */

  console.log({ points: JSON.parse(JSON.stringify(points)) })
  console.log({ paths: JSON.parse(JSON.stringify(paths)) })

  return part
}

export const front = {
  name: 'devon.front',
  from: brianFront,
  // after: back,
  hide: {
    self: true,
    from: true,
    inherited: true,
  },
  options: {
    // backDarts,
    // backDartShaping,
    // buttonFreeLength,
    // extraTopButton,
    // separateButtonPlacket,
    // separateButtonholePlacket,
    // buttons,
    // ffsa,
  },
  draft: devonFront,
}

import { pantsProto } from './pantsproto.mjs'

/*
 * We don't move this draft method under the part object
 * because doing so changes the indentation which causes
 * us to lose all history of changes to this method.
 *
 * So to maintain the history of contributions over the
 * years, keeps this method here, and resist the urge to
 * move it into the named export at the bottom of this file.
 */
// This is an idea to keep the printing to a minimum. The whole patterns is rather large.
// To keep you from printing it completely, you could print this part in paperless mode
// and only have a single sheet with all the dimensions on it.
function waraleeMini(part) {
  const { options, points, paths, Snippet, snippets, complete, sa, paperless, macro, store } =
    part.shorthand()

  const mini = options.minimizer

  for (var p in points) {
    points[p].x = points[p].x / mini
    points[p].y = points[p].y / mini
  }

  paths.waistFoldBack = paths.waistBack
    .offset((-1 * store.get('waistBand')) / mini)
    .attr('class', 'fabric stroke-sm')
  paths.waistFoldFront = paths.waistFront
    .offset((-1 * store.get('waistBand')) / mini)
    .attr('class', 'fabric stroke-sm')

  paths.frontFold = paths.front
    .offset((-1 * store.get('hem')) / mini)
    .attr('class', 'fabric stroke-sm')
  paths.legFold = paths.leg.offset((-1 * store.get('hem')) / mini).attr('class', 'fabric stroke-sm')
  paths.backFold = paths.back
    .offset((-1 * store.get('hem')) / mini)
    .attr('class', 'fabric stroke-sm')

  // Complete?
  if (complete) {
    points.logo = points.fWaistFront.shift(270, 400)
    snippets.logo = new Snippet('logo', points.logo)
    points.text = points.logo
      .shift(-90, 50)
      .attr('data-text', 'hello')
      .attr('data-text-class', 'center')

    if (sa) {
      paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')
    }
  }

  // Paperless?
  if (paperless) {
    macro('hd', {
      from: points.fWaistSide,
      to: points.mWaist,
      y: points.fWaistSide.y,
      text: part.units(points.fWaistSide.dist(points.mWaist) * mini),
    })
  }

  // keep this secret for now:
  part.render = false

  return part
}

export const mini = {
  name: 'waralee.mini',
  from: pantsProto,
  hide: true,
  draft: waraleeMini,
}

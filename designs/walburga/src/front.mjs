import { base, neckline, neckoRatio } from './base.mjs'

function walburgaFront({
  points,
  Path,
  paths,
  measurements,
  options,
  macro,
  snippets,
  Snippet,
  sa,
  store,
  utils,
  part,
}) {
  const head = store.get('hhead') * 2
  const goldenRatio = store.get('goldenRatio')
  const ratio = goldenRatio * options.neckoRatio

  if (options.neckline === true) {
    // calculate neck opening
    let neckotop
    let neckomid // = hhead - neckotop
    //    let necko = neckotop + neckomid

    // actual formula for triangle, from golden Ratio, measurement and Pythagoras
    neckotop =
      (1 / 4) *
      (-(ratio ** 2) * head + Math.sqrt(4 * head ** 2 * ratio ** 2 + head ** 2 * ratio ** 4))

    neckomid = (2 * neckotop) / ratio

    // checks to ensure that neck opening does not become too small
    if (neckotop < measurements.neck / 4) {
      neckotop = measurements.neck / 4
      neckomid = (2 * measurements.neck) / 4 / goldenRatio
    }
    if (neckomid < measurements.neck / 4) {
      neckomid = measurements.neck / 4
      neckotop = ((measurements.neck / 4) * goldenRatio) / 2
    }

    points.neckotop = points.top.shift(0, -neckotop)
    points.neckomid = points.top.shift(-90, neckomid)

    paths.seam = new Path()
      .move(points.neckomid)
      .line(points.neckotop)
      .line(points.headLeft)
      .join(paths.seamBase)
      .line(points.neckomid)
      .close()
      .attr('class', 'fabric')
  }

  if (sa && options.neckline === true) {
    // Insop the start
    paths.saHelper = new Path().move(points.neckomid).line(points.neckotop).offset(sa).hide()
    paths.sa = paths.saBase
      .insop(
        'start',
        new Path()
          .move(points.neckomid)
          .line(
            utils.beamIntersectsX(paths.saHelper.start(), paths.saHelper.end(), points.neckomid.x)
          )
          .line(
            utils.beamIntersectsY(
              paths.saHelper.start(),
              paths.saHelper.end(),
              points.neckotop.y - sa
            )
          )
          .line(points.topLeft.shift(90, sa))
      )
      .attr('class', 'fabric sa')
      .unhide()
  }

  /*
   * Annotations
   */
  // Cut on fold
  if (options.neckline === true) {
    macro('rmcutonfold')
    macro('cutonfold', {
      from: points.triangle,
      to: points.neckomid,
      grainline: true,
    })
  }

  // Logo
  points.logo = points.top.shift(45, points.bottom.dy(points.top) / 5)
  snippets.logo = new Snippet('logo', points.logo)

  // Title
  points.title = points.logo.shift(90, points.bottom.dy(points.top) / 4)
  macro('title', {
    at: points.title,
    nr: 1,
    title: 'front',
    align: 'center',
  })

  // Scalebox
  points.scalebox = points.title.shift(90, points.bottom.dy(points.top) / 5)
  macro('scalebox', { at: points.scalebox })

  // Dimensions
  if (options.neckline) {
    macro('ld', {
      id: 'lNeckOpening',
      from: points.neckotop,
      to: points.neckomid,
      d: -15,
    })
    macro('hd', {
      id: 'wNeckOpening',
      from: points.neckomid,
      to: points.neckotop,
      y: points.top.y - sa - 15,
    })
    macro('vd', {
      id: 'hNeckOpening',
      from: points.neckotop,
      to: points.neckomid,
      x: points.top.x + sa + 15,
    })
  }

  return part
}

export const front = {
  name: 'walburga.front',
  from: base,
  measurements: ['neck'],
  options: { neckline, neckoRatio },
  draft: walburgaFront,
}

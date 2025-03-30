import { front } from './front.mjs'

export const collar = {
  name: 'devon.collar',
  after: front,
  hide: {
    self: true,
    from: true,
    inherited: true,
  },
  options: {
    // Constants
    collarWidthRatio: 28 / 83,
    collarWaveRatio: 0.1,
    collarWaveBackRatio: 0.06,
    // Parameters
  },
  draft: ({ Point, points, Path, paths, macro, options, store, part }) => {
    for (const i in paths) {
      delete paths[i]
    }
    for (const i in points) {
      delete points[i]
    }

    const collarLength = store.get('collarLength') * (1 - options.collarLengthRatio)
    const collarLengthBack = store.get('collarLengthBack')
    const collarWidth = store.get('collarLength') * options.collarWidthRatio
    const collarWave = collarWidth * options.collarWaveRatio

    console.log({
      collarLength: collarLength,
      total: store.get('collarLength'),
      collarWidth: collarWidth,
    })

    points.boxTopLeft = new Point(0, 0)
    points.boxTopRight = new Point(collarLength, 0)
    points.boxBottomLeft = new Point(0, collarWidth)
    points.boxBottomRight = new Point(collarLength, collarWidth)

    points.collarTopLeft = points.boxTopLeft.copy()
    points.collarTopRight = points.boxTopRight.copy()
    points.collarBottomLeft = points.boxBottomLeft.copy()
    points.collarBottomRight = points.boxBottomRight.copy()

    points.collarWaveTop = points.boxTopRight.shift(270, collarWave)
    points.collarWaveBottom = points.boxBottomLeft.shift(90, collarWave)
    points.collarWaveBottomBack = points.boxBottomRight.shift(
      90,
      collarWidth * options.collarWaveBackRatio
    )
    points.collarBackShoulder = points.boxBottomLeft.shift(0, collarLengthBack)

    let waveWidth = points.collarBackShoulder.dist(points.collarBottomRight)
    points.collarBottomWave = new Point(
      points.collarBackShoulder.x + waveWidth / 2,
      points.collarBottomLeft.y
    )
    points.collarBottomWaveCp1 = points.collarBottomWave.shift(0, waveWidth * 0.25)
    points.collarBottomWaveCp2 = points.collarBottomWave.shift(180, waveWidth * 0.25)
    points.collarWaveBottomCp1 = new Point(points.collarBackShoulder.x, points.collarWaveBottom.y)

    points.collarTopLeftCp2 = new Point(collarLengthBack, 0)
    points.collarTopRight = points.collarWaveTop.shift(0, collarWave * 3)

    paths.box = new Path()
      .move(points.boxTopLeft)
      .line(points.boxBottomLeft)
      .line(points.boxBottomRight)
      .line(points.boxTopRight)
      .line(points.boxTopLeft)
      .close()
      .attr('class', 'note')
      .hide()

    paths.seam = new Path()
      .move(points.collarTopLeft)
      .line(points.collarWaveBottom)
      .curve(points.collarWaveBottomCp1, points.collarBottomWaveCp2, points.collarBottomWave)
      .curve(points.collarBottomWaveCp1, points.collarWaveBottomBack, points.collarWaveBottomBack)
      .line(points.collarTopRight)
      .curve(points.collarTopRight, points.collarTopLeftCp2, points.collarTopLeft)
      .close()
      .attr('class', 'fabric')

    points.title = points.collarTopLeft.shiftFractionTowards(points.collarBottomRight, 0.5)
    macro('title', { nr: 15, title: 'collar', at: points.title })

    return part
  },
}

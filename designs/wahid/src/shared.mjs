export const constructMainDart = (part) => {
  let { measurements, options, points, Point, store } = part.shorthand()

  let reduce = {}
  let chest = measurements.chest * (1 + options.chestEase)
  let waist = measurements.waist * (1 + options.waistEase)
  let hips = measurements.hips * (1 + options.hipsEase)

  reduce.waist = chest - waist
  reduce.hips = chest - hips
  if (reduce.hips < 0) reduce.hips = 0
  if (reduce.waist < 0) reduce.waist = 0

  let wr12 = reduce.waist / 12
  let hr12 = reduce.hips / 12
  store.set('wr12', wr12)
  store.set('hr12', hr12)

  points.dartWaistCenter = new Point(points.armhole.x / 2, points.waist.y)
  points.dartWaistRight = points.dartWaistCenter.shift(0, wr12)
  points.dartWaistLeft = points.dartWaistCenter.shift(180, wr12)
  points.dartTop = points.dartWaistCenter.shift(90, points.neck.dy(points.waist) * 0.35)
  points.dartWaistRightCpTop = points.dartWaistRight.shift(
    90,
    points.dartTop.dy(points.waist) * 0.35
  )
  points.dartWaistLeftCpTop = points.dartWaistLeft.shift(90, points.dartTop.dy(points.waist) * 0.35)
  points.dartHipCenter = new Point(points.dartWaistCenter.x, points.hips.y)
  points.dartHipRight = points.dartHipCenter.shift(0, hr12)
  points.dartHipLeft = points.dartHipCenter.shift(180, hr12)
  points.dartHemRight = new Point(points.dartHipRight.x, points.hem.y)
  points.dartHemLeft = new Point(points.dartHipLeft.x, points.hem.y)
  points.dartHipRightCpTop = points.dartHipRight.shift(90, points.waist.dy(points.hips) * 0.25)
  points.dartHipLeftCpTop = points.dartHipLeft.shift(90, points.waist.dy(points.hips) * 0.25)
  points.dartWaistRightCpBottom = points.dartWaistRight.shift(
    -90,
    points.waist.dy(points.hips) * 0.25
  )
  points.dartWaistLeftCpBottom = points.dartWaistLeft.shift(
    -90,
    points.waist.dy(points.hips) * 0.25
  )
}

export const shapeSideSeam = (part) => {
  let { points, Point, store } = part.shorthand()
  let wr12 = store.get('wr12')
  let hr12 = store.get('hr12')

  points.waist = points.waist.shift(180, wr12)
  points.waistCp2 = new Point(points.waist.x, points.dartWaistRightCpTop.y)
  points.waistCp1 = new Point(points.waist.x, points.dartWaistRightCpBottom.y)
  points.hips = points.hips.shift(180, hr12)
  points.hipsCp2 = new Point(points.hips.x, points.dartHipRightCpTop.y)
  points.hem = points.hem.shift(180, hr12)
}

export const dartPath = (part) => {
  let { Path, points } = part.shorthand()
  return new Path()
    .move(points.dartStart)
    .line(points.dartHipLeft)
    .curve(points.dartHipLeftCpTop, points.dartWaistLeftCpBottom, points.dartWaistLeft)
    .curve_(points.dartWaistLeftCpTop, points.dartTop)
    ._curve(points.dartWaistRightCpTop, points.dartWaistRight)
    .curve(points.dartWaistRightCpBottom, points.dartHipRightCpTop, points.dartHipRight)
    .line(points.dartEnd)
}

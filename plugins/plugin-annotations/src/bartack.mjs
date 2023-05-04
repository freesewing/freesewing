// Method that draws the actual bartack
const drawBartack = (pointList, { Path }) => {
  let path = new Path().move(pointList.path1[0])
  for (const i in pointList.path1) {
    if (pointList.path1[i]) path = path.line(pointList.path1[i])
    if (pointList.path2[i]) path = path.line(pointList.path2[i])
  }

  return path
}

// Helper method to generate the points to draw on later
const getPoints = (path, so) => {
  let path1 = path.offset(so.width / 2)
  let path2 = path.offset(so.width / -2)
  let len = path1.length()
  let len2 = path2.length()

  // Make sure path1 is always the longest one
  if (len2 > len) {
    let tmp = path2
    path2 = path1
    path1 = tmp
    len = len2
  }

  let points = {
    path1: [path1.start()],
    path2: [path2.start()],
  }
  let steps = Math.ceil((len / so.width) * so.density)
  for (let i = 1; i < steps; i++) {
    points.path1.push(path1.shiftFractionAlong((1 / steps) * i))
    points.path2.push(path2.shiftFractionAlong((1 / steps) * i))
  }

  return points
}

const bartackPath = (path, so, props) => (path ? drawBartack(getPoints(path, so), props) : null)

function createBartack(so, props) {
  const defaults = {
    width: 3,
    length: 15,
    density: 3,
    angle: 0,
    prefix: '',
    suffix: '',
    anchor: false,
    path: false,
    from: false,
    to: false,
    start: 0,
    end: 1,
    bartackAlong: false,
    bartackFractionAlong: false,
  }
  so = { ...defaults, ...so }

  const { Path, paths, scale } = props

  so.width *= scale

  // Handle negative angle
  if (so.angle < 0) so.angle = 360 + (so.angle % -360)

  let guide = false

  if (so.anchor)
    // Anchor + angle + length
    guide = new Path().move(so.anchor).line(so.anchor.shift(so.angle, so.length))
  else if (so.from && so.to)
    // From to
    guide = new Path().move(so.from).line(so.to)
  else if (so.path) {
    // Along path
    let start = false
    let end = false
    if (so.bartackAlong) guide = so.path.clone()
    else if (so.bartackFractionAlong) {
      if (so.start === so.end) return null
      if (so.start > so.end) {
        const newEnd = so.start
        so.start = so.end
        so.end = newEnd
      }
      if (so.start > 0) start = so.path.shiftFractionAlong(so.start)
      if (so.end < 1) end = so.path.shiftFractionAlong(so.end)
      if (start && end) guide = so.path.split(start).pop().split(end).shift()
      else if (start) guide = so.path.split(start).pop()
      else if (end) guide = so.path.split(end).shift()
      else guide = so.path.clone()
    }
  }

  paths[`${so.prefix}bartack${so.suffix}`] = bartackPath(guide, so, props).attr(
    'class',
    'stroke-sm stroke-mark'
  )

  return true
}

// Export macros
export const bartackMacros = {
  bartack: function (so, props) {
    return createBartack(so, props)
  },
  bartackAlong: function (so, props) {
    so.bartackFractionAlong = false
    so.bartackAlong = true
    so.anchor = false
    so.from = false
    so.to = false
    return createBartack(so, props)
  },
  bartackFractionAlong: function (so, props) {
    so.bartackFractionAlong = true
    so.bartackAlong = false
    so.anchor = false
    so.from = false
    so.to = false
    return createBartack(so, props)
  },
}

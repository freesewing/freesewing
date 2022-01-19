const name = (n, so) => `${so.prefix}${n}${so.suffix}`

const drawBartack = (points, self) => {
  let path = new self.Path().move(points.path1[0])
  for (const i in points.path1) {
    if (points.path1[i]) path = path.line(points.path1[i])
    if (points.path2[i]) path = path.line(points.path2[i])
  }

  return path
}

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

const bartackPath = (path, so, self) => (path ? drawBartack(getPoints(path, so), self) : null)

export default function bartack(so, self) {
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

  let guide = false

  if (so.anchor)
    // Anchor + angle + length
    guide = new self.Path().move(so.anchor).line(so.anchor.shift(so.angle, so.length))
  else if (so.from && so.to)
    // From to
    guide = new self.Path().move(so.from).line(so.to)
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

  self.paths[name('bartack', so)] = bartackPath(guide, so, self).attr(
    'class',
    'stroke-sm stroke-mark'
  )

  return true
}

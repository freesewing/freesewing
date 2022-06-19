export default function (part, s) {
  let { macro, points, sa } = part.shorthand()

  macro('ld', {
    from: points[s + 'WristLeft'],
    to: points[s + 'WristRight'],
    d: 15,
  })
  macro('ld', {
    from: points[s + 'ElbowLeft'],
    to: points.elbowRight,
  })
  macro('ld', {
    from: points[s + 'LeftEdge'],
    to: points[s + 'RightEdge'],
  })
  macro('hd', {
    from: points[s + 'LeftEdge'],
    to: points[s + 'ElbowLeft'],
    y: points[s + 'WristRight'].y + 3 * sa + 15,
  })
  macro('hd', {
    from: points[s + 'LeftEdge'],
    to: points[s + 'WristLeft'],
    y: points[s + 'WristRight'].y + 3 * sa + 30,
  })
  macro('hd', {
    from: points[s + 'LeftEdge'],
    to: points[s + 'WristRight'],
    y: points[s + 'WristRight'].y + 3 * sa + 45,
  })
  macro('hd', {
    from: points[s + 'LeftEdge'],
    to: points.elbowRight,
    y: points[s + 'WristRight'].y + 3 * sa + 60,
  })
  macro('vd', {
    from: points[s + 'ElbowLeft'],
    to: points[s + 'LeftEdge'],
    x: points[s + 'LeftEdge'].x - sa - 15,
  })
  macro('vd', {
    from: points[s + 'WristLeft'],
    to: points[s + 'LeftEdge'],
    x: points[s + 'LeftEdge'].x - sa - 30,
  })
  macro('vd', {
    from: points[s + 'WristRight'],
    to: points[s + 'LeftEdge'],
    x: points[s + 'LeftEdge'].x - sa - 45,
  })
}

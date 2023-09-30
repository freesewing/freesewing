export function dimensions(part, s) {
  let { macro, points, sa } = part.shorthand()

  macro('ld', {
    id: 'wAtCuff',
    from: points[s + 'WristLeft'],
    to: points[s + 'WristRight'],
    d: 15,
  })
  macro('ld', {
    id: 'wAtElbow',
    from: points[s + 'ElbowLeft'],
    to: points.elbowRight,
  })
  macro('ld', {
    id: 'wAtArmhole',
    from: points[s + 'LeftEdge'],
    to: points[s + 'RightEdge'],
  })
  macro('hd', {
    id: 'wArmholeInnerToElbowInner',
    from: points[s + 'LeftEdge'],
    to: points[s + 'ElbowLeft'],
    y: points[s + 'WristRight'].y + 3 * sa + 15,
  })
  macro('hd', {
    id: 'wArmholeInnerToCuffInner',
    from: points[s + 'LeftEdge'],
    to: points[s + 'WristLeft'],
    y: points[s + 'WristRight'].y + 3 * sa + 30,
  })
  macro('hd', {
    id: 'wCuffHorizontal',
    from: points[s + 'LeftEdge'],
    to: points[s + 'WristRight'],
    y: points[s + 'WristRight'].y + 3 * sa + 45,
  })
  macro('hd', {
    id: 'wCuffInnerToElbow',
    from: points[s + 'LeftEdge'],
    to: points.elbowRight,
    y: points[s + 'WristRight'].y + 3 * sa + 60,
  })
  macro('vd', {
    id: 'hElbowToArmholeInner',
    from: points[s + 'ElbowLeft'],
    to: points[s + 'LeftEdge'],
    x: points[s + 'LeftEdge'].x - sa - 15,
  })
  macro('vd', {
    id: 'hCuffInnerToArmholeInner',
    from: points[s + 'WristLeft'],
    to: points[s + 'LeftEdge'],
    x: points[s + 'LeftEdge'].x - sa - 30,
  })
  macro('vd', {
    id: 'hCuffOuterToArmholeInner',
    from: points[s + 'WristRight'],
    to: points[s + 'LeftEdge'],
    x: points[s + 'LeftEdge'].x - sa - 45,
  })
}

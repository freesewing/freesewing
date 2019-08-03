export function dimensions(macro, points, sa) {
  macro('hd', {
    from: points.cfHem,
    to: points.hem,
    y: points.hem.y + sa * 2.5 + 15
  })
  macro('hd', {
    from: points.cfNeck,
    to: points.strapLeft,
    y: points.neck.y - sa - 15
  })
  macro('hd', {
    from: points.cfNeck,
    to: points.strapRight,
    y: points.neck.y - sa - 30
  })
  macro('vd', {
    from: points.hem,
    to: points.aaronArmhole,
    x: points.aaronArmhole.x + sa + 15
  })
  macro('vd', {
    from: points.hem,
    to: points.strapRight,
    x: points.aaronArmhole.x + sa + 30
  })
  macro('vd', {
    from: points.hem,
    to: points.strapLeft,
    x: points.aaronArmhole.x + sa + 45
  })
  macro('hd', {
    from: points.cfNeck,
    to: points.aaronArmhole,
    y: points.neck.y - sa - 45
  })
}

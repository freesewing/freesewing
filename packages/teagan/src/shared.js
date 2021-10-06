export function dimensions(macro, points, sa) {
  macro('hd', {
    from: points.cfHem,
    to: points.hem,
    y: points.hem.y + sa * 2.5 + 15,
  })
  macro('vd', {
    from: points.hem,
    to: points.armhole,
    x: points.armhole.x + sa + 15,
  })
  macro('vd', {
    from: points.hem,
    to: points.shoulder,
    x: points.armhole.x + sa + 30,
  })
  macro('vd', {
    from: points.hem,
    to: points.neck,
    x: points.armhole.x + sa + 45,
  })

  macro('hd', {
    from: points.cfNeck,
    to: points.neck,
    y: points.neck.y - sa - 15,
  })
  macro('hd', {
    from: points.cfNeck,
    to: points.shoulder,
    y: points.neck.y - sa - 30,
  })
  macro('hd', {
    from: points.cfNeck,
    to: points.armhole,
    y: points.neck.y - sa - 45,
  })
}

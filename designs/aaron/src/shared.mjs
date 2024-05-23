export function dimensions(macro, points, sa) {
  macro('hd', {
    id: 'wHem',
    from: points.cfHem,
    to: points.hem,
    y: points.hem.y + sa * 2.5 + 15,
  })
  macro('hd', {
    id: 'wCfToStrapIn',
    from: points.cfNeck,
    to: points.strapLeft,
    y: points.neck.y - sa - 15,
  })
  macro('hd', {
    id: 'wCfToStrapOut',
    from: points.cfNeck,
    to: points.strapRight,
    y: points.neck.y - sa - 30,
  })
  macro('vd', {
    id: 'hHemToArmhole',
    from: points.hem,
    to: points.armhole,
    x: points.armhole.x + sa + 15,
  })
  macro('vd', {
    id: 'hHemToStrapOut',
    from: points.hem,
    to: points.strapRight,
    x: points.armhole.x + sa + 30,
  })
  macro('vd', {
    id: 'hHemToStrapIn',
    from: points.hem,
    to: points.strapLeft,
    x: points.armhole.x + sa + 45,
  })
  macro('hd', {
    id: 'wFull',
    from: points.cfNeck,
    to: points.armhole,
    y: points.neck.y - sa - 45,
  })
}

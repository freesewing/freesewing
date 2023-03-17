const getMethods = (obj) => {
  let properties = new Set()
  let currentObj = obj
  do {
    Object.getOwnPropertyNames(currentObj).map((item) => properties.add(item))
  } while ((currentObj = Object.getPrototypeOf(currentObj)))
  return [...properties.keys()].filter((item) => typeof obj[item] === 'function')
}

export function adjustPoints(points, origin) {
  const o = origin.clone()
  for (let p in points) {
    points[p].x -= o.x
    points[p].y -= o.y
  }
}

export function scalePoints(points, scale) {
  for (let p in points) {
    points[p].x *= scale
    points[p].y *= scale
  }
}

export function addPoint(point, add, x, y) {
  console.log({ p: point })
  point.x += add * x
  point.y += add * y
}
export function addPointX(points, add) {
  for (let p in points) {
    points[p].x += add
  }
}
export function addPointY(points, add) {
  for (let p in points) {
    points[p].y += add
  }
}

export function consoleLogPoints(points) {
  for (let p in points) {
    console.log(
      'points.' + points[p].name + ' = new Point(' + points[p].x + ',' + points[p].y + ')'
    )
  }
}

export function makeRelativePoints(Point, points, p0, waist, ease) {
  for (let p in points) {
    const pt = new Point(points[p].x / (ease + 1), points[p].y / (ease + 1))
    // points['r' + points[p].name] = points.p0.shift(p0.angle(pt), p0.dist(pt))

    // console.log({p:p,x:x,px:points[p].x,y:y,py:points[p].y})

    const matches = p.match(/(.+)(Cp[12])/)

    if (null != matches) {
      const po = new Point(points[matches[1]].x / (ease + 1), points[matches[1]].y / (ease + 1))

      console.log(
        'points.r' +
          points[p].name +
          ' = points.' +
          matches[1] +
          '.shift(' +
          po.angle(pt) +
          ',' +
          po.dist(pt) +
          ' * (ease + 1))'
      )
    } else {
      console.log(
        'points.r' +
          points[p].name +
          ' = points.p0.shift(' +
          p0.angle(pt) +
          ',' +
          p0.dist(pt) +
          ' * (ease + 1))'
      )
    }
  }
}

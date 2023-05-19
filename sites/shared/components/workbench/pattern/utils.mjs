export const getProps = (obj) => {
  /** I can't believe it but there seems to be no method on NPM todo this */
  const cssKey = (key) => {
    let chunks = key.split('-')
    if (chunks.length > 1) {
      key = chunks.shift()
      for (let s of chunks) key += s.charAt(0).toUpperCase() + s.slice(1)
    }

    return key
  }

  const convert = (css) => {
    let style = {}
    let rules = css.split(';')
    for (let rule of rules) {
      let chunks = rule.split(':')
      if (chunks.length === 2) style[cssKey(chunks[0].trim())] = chunks[1].trim()
    }
    return style
  }

  let rename = {
    class: 'className',
    'marker-start': 'markerStart',
    'marker-end': 'markerEnd',
  }
  let props = {}
  for (let key in obj.attributes.list) {
    if (key === 'style') props[key] = convert(obj.attributes.get(key))
    if (Object.keys(rename).indexOf(key) !== -1) props[rename[key]] = obj.attributes.get(key)
    else if (key !== 'style') props[key] = obj.attributes.get(key)
  }

  return props
}

export const dx = (pointA, pointB) => pointB.x - pointA.x
export const dy = (pointA, pointB) => pointB.y - pointA.y
export const rad2deg = (radians) => radians * 57.29577951308232
export const angle = (pointA, pointB) => {
  let rad = Math.atan2(-1 * dy(pointA, pointB), dx(pointA, pointB))
  while (rad < 0) rad += 2 * Math.PI

  return rad2deg(rad)
}
export const withinPartBounds = (point, part) =>
  point.x >= part.topLeft.x &&
  point.x <= part.bottomRight.x &&
  point.y >= part.topLeft.y &&
  point.y <= part.bottomRight.y
    ? true
    : false

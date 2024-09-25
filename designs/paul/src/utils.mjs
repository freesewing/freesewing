export function shiftAndExtend(path, offset) {
  const length = path.length()
  if (offset > length) {
    const endPoint = path.end().shift(path.angleAt(path.end()), offset - length)
    path.line(endPoint)
    return endPoint
  }
  return path.shiftAlong(offset)
}

export function safeSplit(p, point) {
  const result = p.split(point)
  if (result[0] === null) {
    result[0] = new p.constructor().move(p.start())
  }
  if (result[1] === null) {
    result[1] = new p.constructor().move(p.end())
  }
  return result
}

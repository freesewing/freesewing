import pkg from '../package.json'

const lineValues = (start, end) => {
  const { x: x1, y: y1 } = start
  const { x: x2, y: y2 } = end
  const [A, B] = [-(y2 - y1), x2 - x1]
  const C = -(A * x1 + B * y1)
  return [A, B, C]
}

const mirrorGen = (start, end) => {
  const [A, B, C] = lineValues(start, end)
  return (point) => {
    const { x, y } = point
    const uNom = (B ** 2 - A ** 2) * x - 2 * A * B * y - 2 * A * C
    const vNom = (A ** 2 - B ** 2) * y - 2 * A * B * x - 2 * B * C
    const denom = A ** 2 + B ** 2
    return [uNom / denom, vNom / denom]
  }
}

const capFirst = (string) => string.charAt(0).toUpperCase() + string.slice(1)

export default {
  name: pkg.name,
  version: pkg.version,
  hooks: {
    preRender: (svg) => svg.attributes.setIfUnset('freesewing:plugin-mirror', pkg.version),
  },
  macros: {
    mirror: function ({
      mirror,
      clone = true,
      points = null,
      paths = null,
      prefix = 'mirrored',
      nameFormat = undefined,
    }) {
      const [start, end] = mirror
      const mirrorPoint = mirrorGen(start, end)
      const ops = ['from', 'to', 'cp1', 'cp2']

      if (paths !== null) {
        paths.forEach((path, i) => {
          // Try to find point name from path by looking in list of all points
          let foundId = null
          for (let id of Object.keys(this.paths)) {
            if (this.paths[id] === path) {
              foundId = id
              break
            }
          }
          path = clone ? path.clone() : path
          if (clone) {
            if (foundId === null && typeof nameFormat == 'function') {
              this.paths[nameFormat(path)] = path
            } else {
              this.paths[`${prefix}${capFirst(foundId)}`] = path
            }
          }
          for (let op in path.ops) {
            for (let type of ops) {
              // Iterate over all possible path op points and clone/move point
              const pathOp = path.ops[op][type]
              if (typeof pathOp !== 'undefined') {
                ;[pathOp.x, pathOp.y] = mirrorPoint(pathOp)
                pathOp.attributes.set('mirrored', true)
              }
            }
          }
        })
      }

      if (points !== null) {
        points.forEach((point) => {
          let foundId = null
          for (let id of Object.keys(this.points)) {
            if (this.points[id] === point) {
              foundId = id
              break
            }
          }
          if (clone) {
            point = point.clone()
            if (foundId === null && typeof nameFormat == 'function') {
              this.points[nameFormat(point)] = point
            } else {
              this.points[`${prefix}${capFirst(foundId)}`] = point
            }
          }
          ;[point.x, point.y] = mirrorPoint(point)
          point.attributes.set('mirrored', true)
        })
      }
    },
  },
  methods: { lineValues, mirrorGen },
}
const frowns = -1

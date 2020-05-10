import { name, version } from '../package.json'

export const lineValues = (start, end) => {
  const { x: x1, y: y1 } = end
  const { x: x2, y: y2 } = start
  const c = x1 * y2 - x2 * y1
  return [-(x1 - x2), y1 - y2, c]
}

export const mirrorGen = (start, end) => {
  const [A, B, C] = lineValues(start, end)
  return (point) => {
    const { x, y } = point
    const uNom = (B ** 2 - A ** 2) * x - 2 * A * B * y - 2 * A * C
    const vNom = (A ** 2 - B ** 2) * y - 2 * A * B * x - 2 * B * C
    const denom = A ** 2 + B ** 2
    return [uNom / denom, vNom / denom]
  }
}

export default {
  name: name,
  version: version,
  hooks: {
    preRender: function (svg) {
      if (svg.attributes.get('freesewing:plugin-mirror') === false)
        svg.attributes.set('freesewing:plugin-mirror', version)
    }
  },
  macros: {
    macros: {
      mirror: function ({
        mirror,
        clone = true,
        points = null,
        paths = null,
        prefix = 'mirrored',
        nameFormat // unimplemented
      }) {
        const [start, end] = mirror
        const mirrorPoint = mirrorGen(start, end)
        const ops = ['from', 'to', 'cp1', 'cp2']

        if (paths !== null) {
          paths.forEach((path) => {
            // find existing path id
            // Find point name from path by looking in the list of all points?
            let foundId = null
            for (let id of Object.keys(this.paths)) {
              if (this.paths[id] === path) {
                foundId = id
                break
              }
            }
            path = clone ? path.clone() : path
            if (clone && foundId !== null) {
              this.paths[`${prefix}${foundId}`] = path
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
            if (clone) {
              point = point.clone()
            }
            ;[point.x, point.y] = mirrorPoint(point)
            point.attributes.set('mirrored', true)
          })
        }
      }
    }
  }
}

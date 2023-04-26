import { name, version } from '../data.mjs'

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

    point.x = uNom / denom
    point.y = vNom / denom

    const mirrorCount = Number(point.attributes.get('data-mirrored'))
    // some points returned by utils do not have logs
    if (mirrorCount > 0 && point.log)
      point.log.warning(
        `Point ${point.name} was mirrored more than once (${
          mirrorCount + 1
        }) which can lead to hard to trace bugs`
      )
    point.attributes.set('data-mirrored', mirrorCount + 1)

    return point
  }
}

const capFirst = (string) => string.charAt(0).toUpperCase() + string.slice(1)

export const plugin = {
  name,
  version,
  macros: {
    mirror: function ({
      mirror,
      clone = true,
      points = [],
      paths = [],
      prefix = 'mirrored',
      nameFormat = undefined,
    }) {
      const [start, end] = mirror
      const mirrorPoint = mirrorGen(start, end)

      for (const pathId of paths) {
        // Make sure the path exists
        if (this.paths[pathId]) {
          const path = clone ? this.paths[pathId].clone() : this.paths[pathId]

          const newId = clone
            ? typeof nameFormat == 'function'
              ? nameFormat(pathId, 'path')
              : `${prefix}${capFirst(pathId)}`
            : pathId

          for (const op of path.ops) {
            switch (op.type) {
              case 'move':
              case 'line':
                op.to = mirrorPoint(op.to)
                break
              case 'curve':
                op.to = mirrorPoint(op.to)
                op.cp1 = mirrorPoint(op.cp1)
                op.cp2 = mirrorPoint(op.cp2)
                break
              default:
              // Do nothing
            }
          }

          this.paths[newId] = path
        }
      }

      for (const pointId of points) {
        // Make sure the point exists
        if (this.points[pointId]) {
          const point = clone
            ? mirrorPoint(this.points[pointId].clone())
            : mirrorPoint(this.points[pointId])

          const newId = clone
            ? typeof nameFormat == 'function'
              ? nameFormat(pointId, 'point')
              : `${prefix}${capFirst(pointId)}`
            : pointId

          this.points[newId] = point
        }
      }
    },
  },
  methods: { lineValues, mirrorGen },
}

// More specifically named exports
export const mirrorPlugin = plugin
export const pluginMirror = plugin

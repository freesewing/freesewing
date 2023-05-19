import { name, version } from '../data.mjs'

export const plugin = {
  name,
  version,
  macros: {
    gore: function (so, { points, paths, Path }) {
      const from = so.from
      const gores = Number(so.gores)
      const radius = Number(so.radius) //radius of the sphere
      const prefix = so.prefix || 'gore'
      const extraLength = Number(so.extraLength) //the length of the straight section after a complete semisphere

      points[prefix + 'p1'] = from.shift(0, (radius * Math.PI) / 2 + extraLength)
      points[prefix + 'Cp1'] = points[prefix + 'p1'].shift(
        180 - 180 / gores,
        radius / 2 / Math.cos(Math.PI / gores)
      )
      points[prefix + 'p3'] = from.shift(90, (radius * Math.PI) / gores)
      points[prefix + 'p2'] = points[prefix + 'p3'].shift(0, extraLength)
      points[prefix + 'Cp2'] = points[prefix + 'p2'].shift(0, (radius * (Math.PI - 2)) / 2)

      if (extraLength < 0) {
        //top curve used to calculate the new points if extraLength < 0
        paths.auxiliaryPath = new Path()
          .move(points[prefix + 'p1'])
          .curve(points[prefix + 'Cp1'], points[prefix + 'Cp2'], points[prefix + 'p2'])
          .hide()

        points[prefix + 'p2'] = paths.auxiliaryPath.intersectsX(0)[0] //the new point p2 is the one in which the auxiliary curve intersects x=0
        paths.auxiliaryPath = paths.auxiliaryPath.split(points[prefix + 'p2'])[0] //the auxiliary curve is split
        points[prefix + 'Cp1'] = paths.auxiliaryPath.ops[1].cp1 //the new control points are those of the new curve
        points[prefix + 'Cp2'] = paths.auxiliaryPath.ops[1].cp2
        points[prefix + 'p3'] = points[prefix + 'p2'].clone()
      }

      //the seam path is generated
      paths[prefix + 'seam'] = new Path()
        .move(from)
        .line(points[prefix + 'p1'])
        .curve(points[prefix + 'Cp1'], points[prefix + 'Cp2'], points[prefix + 'p2'])
        .line(points[prefix + 'p3'])
        .line(from)
        .close()
        .attr('class', so.class ? so.class : '')

      if (so.hidden) paths[prefix + 'seam'].hide()
      else paths[prefix + 'seam'].unhide()
    },
  },
}

// More specifically named exports
export const gorePlugin = plugin
export const pluginGore = plugin

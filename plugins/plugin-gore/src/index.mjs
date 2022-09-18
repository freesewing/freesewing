import { name, version } from '../data.mjs'

export const plugin = {
  name,
  version,
  macros: {
    gore: function (so) {
      const from = so.from
      const gores = so.gores
      const radius = so.radius //radius of the sphere
      const prefix = so.prefix
      const extraLength = so.extraLength //the length of the straight section after a complete semisphere

      this.points[prefix + 'p1'] = from.shift(0, (radius * Math.PI) / 2 + extraLength)
      this.points[prefix + 'Cp1'] = this.points[prefix + 'p1'].shift(
        180 - 180 / gores,
        radius / 2 / Math.cos(Math.PI / gores)
      )
      this.points[prefix + 'p3'] = from.shift(90, (radius * Math.PI) / gores)
      this.points[prefix + 'p2'] = this.points[prefix + 'p3'].shift(0, extraLength)
      this.points[prefix + 'Cp2'] = this.points[prefix + 'p2'].shift(
        0,
        (radius * (Math.PI - 2)) / 2
      )

      if (extraLength < 0) {
        //top curve used to calculate the new points if extraLength < 0
        this.paths.auxiliaryPath = new this.Path()
          .move(this.points[prefix + 'p1'])
          .curve(
            this.points[prefix + 'Cp1'],
            this.points[prefix + 'Cp2'],
            this.points[prefix + 'p2']
          )
          .hide()

        this.points[prefix + 'p2'] = this.paths.auxiliaryPath.intersectsX(0)[0] //the new point p2 is the one in which the auxiliary curve intersects x=0
        this.paths.auxiliaryPath = this.paths.auxiliaryPath.split(this.points[prefix + 'p2'])[0] //the auxiliary curve is split
        this.points[prefix + 'Cp1'] = this.paths.auxiliaryPath.ops[1].cp1 //the new control points are those of the new curve
        this.points[prefix + 'Cp2'] = this.paths.auxiliaryPath.ops[1].cp2
        this.points[prefix + 'p3'] = this.points[prefix + 'p2'].clone()
      }

      //the seam path is generated
      this.paths[prefix + 'seam'] = new this.Path()
        .move(from)
        .line(this.points[prefix + 'p1'])
        .curve(this.points[prefix + 'Cp1'], this.points[prefix + 'Cp2'], this.points[prefix + 'p2'])
        .line(this.points[prefix + 'p3'])
        .line(from)
        .close()
        .attr('class', so.class ? so.class : '')

      if (so?.hidden) this.paths[prefix + 'seam'].hide()
      else this.paths[prefix + 'seam'].unhide()
    },
  },
}

// More specifically named exports
export const gorePlugin = plugin
export const pluginGore = plugin

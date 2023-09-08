import { name, version } from '../data.mjs'

export const plugin = {
  name,
  version,
  macros: {
    round: function (so) {
      const C = 0.55191502449
      const { hide = true } = so
      // Find angle between points
      let from = so.from
      let to = so.to
      let via = so.via
      let radius = so.radius
      let prefix = so.prefix || 'round'
      //let angle1 = from.angle(via)
      //let angle2 = via.angle(to)
      //if ((Math.round(angle1) - Math.round(angle2)) % 90 !== 0)
      //  console.log('Warning: The round macro only handles 90 degree angles correctly.')
      let fd = from.dist(via)
      let td = to.dist(via)
      if (radius > fd || radius > td || typeof radius === 'undefined') radius = fd > td ? td : fd
      this.points[prefix + 'Start'] = via.shiftTowards(from, radius)
      this.points[prefix + 'Cp1'] = via.shiftTowards(from, radius * (1 - C))
      this.points[prefix + 'Cp2'] = via.shiftTowards(to, radius * (1 - C))
      this.points[prefix + 'End'] = via.shiftTowards(to, radius)
      this.paths[prefix + 'Rounded'] = new this.Path()
        .move(this.points[prefix + 'Start'])
        .curve(
          this.points[prefix + 'Cp1'],
          this.points[prefix + 'Cp2'],
          this.points[prefix + 'End']
        )
        .attr('class', so.class ? so.class : '')
      if (hide) this.paths[prefix + 'Rounded'].hide()
      else this.paths[prefix + 'Rounded'].unhide()
    },
  },
}

// More specifically named exports
export const roundPlugin = plugin
export const pluginRound = plugin

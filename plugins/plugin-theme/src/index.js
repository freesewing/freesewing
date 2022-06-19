import pkg from '../package.json'
import gridMetric from './defs/grid-metric'
import gridImperial from './defs/grid-imperial'
import draft from './lib/draft'
import paperless from './lib/paperless'
import sample from './lib/sample'

export default {
  name: pkg.name,
  version: pkg.version,
  hooks: {
    preRender: function (svg) {
      if (svg.attributes.get('freesewing:plugin-theme') === false) {
        svg.attributes.set('class', 'freesewing')
        svg.style += sample
        svg.style += paperless
        svg.style += draft(svg.pattern.settings.scale)
        if (svg.pattern.settings.paperless) {
          svg.pattern.settings.units === 'imperial'
            ? (svg.defs += gridImperial)
            : (svg.defs += gridMetric)
          for (let key in svg.pattern.parts) {
            let part = svg.pattern.parts[key]
            if (part.render && svg.pattern.needs(key)) {
              let anchor = new svg.pattern.Point(0, 0)
              if (typeof part.points.gridAnchor !== 'undefined') anchor = part.points.gridAnchor
              else if (typeof part.points.anchor !== 'undefined') anchor = part.points.anchor
              svg.defs += `<pattern id="grid_${key}" `
              svg.defs += `xlink:href="#grid" x="${anchor.x}" y="${anchor.y}">`
              svg.defs += '</pattern>'
              part.paths[part.getId()] = new svg.pattern.Path()
                .move(part.topLeft)
                .line(new svg.pattern.Point(part.topLeft.x, part.bottomRight.y))
                .line(part.bottomRight)
                .line(new svg.pattern.Point(part.bottomRight.x, part.topLeft.y))
                .close()
                .attr('class', 'grid')
                .attr('style', `fill: url(#grid_${key})`)
            }
          }
        }
        svg.attributes.set('freesewing:plugin-theme', pkg.version)
      }
    },
  },
}

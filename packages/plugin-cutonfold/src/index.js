import markers from './lib/markers'
import { version, name } from '../package.json'

export default {
  name: name,
  version: version,
  hooks: {
    preRender: function (svg) {
      if (svg.attributes.get('freesewing:plugin-cutonfold') === false) {
        svg.attributes.set('freesewing:plugin-cutonfold', version)
        svg.defs += markers
      }
    }
  },
  macros: {
    cutonfold: function (so) {
      if (so === false) {
        delete this.points.cutonfoldFrom
        delete this.points.cutonfoldTo
        delete this.points.cutonfoldVia1
        delete this.points.cutonfoldVia2
        delete this.paths.cutonfold
        return true
      }
      let points = this.points
      so = {
        offset: 15,
        margin: 5,
        prefix: '',
        ...so
      }
      points['cutonfoldFrom' + so.prefix] = so.from.shiftFractionTowards(so.to, so.margin / 100)
      points['cutonfoldTo' + so.prefix] = so.to.shiftFractionTowards(so.from, so.margin / 100)
      points['cutonfoldVia1' + so.prefix] = points['cutonfoldFrom' + so.prefix]
        .shiftTowards(so.from, so.offset)
        .rotate(-90, points['cutonfoldFrom' + so.prefix])
      points['cutonfoldVia2' + so.prefix] = points['cutonfoldTo' + so.prefix]
        .shiftTowards(so.to, so.offset)
        .rotate(90, points['cutonfoldTo' + so.prefix])
      let text = so.grainline ? 'cutOnFoldAndGrainline' : 'cutOnFold'
      this.paths['cutonfold' + so.prefix] = new this.Path()
        .move(points['cutonfoldFrom' + so.prefix])
        .line(points['cutonfoldVia1' + so.prefix])
        .line(points['cutonfoldVia2' + so.prefix])
        .line(points['cutonfoldTo' + so.prefix])
        .attr('class', 'note')
        .attr('marker-start', 'url(#cutonfoldFrom)')
        .attr('marker-end', 'url(#cutonfoldTo)')
        .attr('data-text', text)
        .attr('data-text-class', 'center fill-note')
    }
  }
}

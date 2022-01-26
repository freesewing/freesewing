import freesewing from '@freesewing/core'
import plugins from '@freesewing/plugin-bundle'
import config from '../config'
import draftFront from './front'
import draftStrap from './strap'
import draftPocket from './pocket'

const crossBox = {
  //name,
  //version,
  macros: {
    crossBox: function (so) {
      let id = this.getId()
      let shiftFraction = 0.1
      this.points[id + '_boxTopLeft'] = so.from.copy()
      this.points[id + '_boxBottomRight'] = so.to.copy()
      this.points[id + '_boxTopRight'] = new this.Point(so.to.x, so.from.y)
      this.points[id + '_boxBottomLeft'] = new this.Point(so.from.x, so.to.y)

      this.points[id + '_topCrossTL'] = this.points[id + '_boxTopLeft'].shiftFractionTowards(
        this.points[id + '_boxBottomRight'],
        shiftFraction
      )
      this.points[id + '_topCrossTR'] = this.points[id + '_boxTopRight'].shiftFractionTowards(
        this.points[id + '_boxBottomLeft'],
        shiftFraction
      )
      this.points[id + '_topCrossBL'] = this.points[id + '_boxBottomLeft'].shiftFractionTowards(
        this.points[id + '_boxTopRight'],
        shiftFraction
      )
      this.points[id + '_topCrossBR'] = this.points[id + '_boxBottomRight'].shiftFractionTowards(
        this.points[id + '_boxTopLeft'],
        shiftFraction
      )

      this.paths[id + 'crossBox'] = new this.Path()
        .move(this.points[id + '_boxTopLeft'])
        .line(this.points[id + '_boxTopRight'])
        .line(this.points[id + '_boxBottomRight'])
        .line(this.points[id + '_boxBottomLeft'])
        .line(this.points[id + '_boxTopLeft'])
        .close()
        .attr('class', 'lining dotted stroke-sm')
      this.paths[id + '_topCross'] = new this.Path()
        .move(this.points[id + '_topCrossTL'])
        .line(this.points[id + '_topCrossBR'])
        .line(this.points[id + '_topCrossTR'])
        .line(this.points[id + '_topCrossBL'])
        .line(this.points[id + '_topCrossTL'])
        .line(this.points[id + '_topCrossTR'])
        .move(this.points[id + '_topCrossBR'])
        .line(this.points[id + '_topCrossBL'])
        .attr('class', 'lining dotted stroke-sm')
      if (typeof so.text === 'string') {
        this.points.textAnchor = this.points[id + '_boxTopLeft']
          .shiftFractionTowards(this.points[id + '_boxBottomRight'], 0.5)
          .attr('data-text', so.text)
          .attr('data-text-class', 'center')
      }
    },
  },
}

// Create new design
const Pattern = new freesewing.Design(config, [plugins, crossBox])

// Attach the draft methods to the prototype
Pattern.prototype.draftFront = draftFront
Pattern.prototype.draftStrap = draftStrap
Pattern.prototype.draftPocket = draftPocket

export default Pattern
const frowns = -1

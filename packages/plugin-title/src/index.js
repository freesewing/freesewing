import style from './lib/style'
import { version, name } from '../package.json'

export default {
  name: name,
  version: version,
  hooks: {
    preRender: function (svg) {
      if (svg.attributes.get('freesewing:plugin-title') === false) {
        svg.attributes.set('freesewing:plugin-title', version)
        svg.style += style
      }
    },
  },
  macros: {
    title: function (so) {
      const transform = function (anchor) {
        let cx = anchor.x - so.scale * anchor.x
        let cy = anchor.y - so.scale * anchor.y

        return `matrix(${so.scale}, 0, 0, ${so.scale}, ${cx}, ${cy}) rotate(${so.rotation} ${anchor.x} ${anchor.y})`
      }
      let defaults = {
        scale: 1,
        rotation: 0,
      }
      so = { ...defaults, ...so }
      let overwrite = true
      if (so.append) overwrite = false
      let prefix = ''
      if (so.prefix) prefix = so.prefix
      this.points[`_${prefix}_titleNr`] = so.at
        .clone()
        .attr('data-text', so.nr, overwrite)
        .attr('data-text-class', 'title-nr note fill-note')
        .attr('data-text-transform', transform(so.at))
      let shift = 10
      if (so.title) {
        this.points[`_${prefix}_titleName`] = so.at
          .shift(-90 - so.rotation, 13 * so.scale)
          .attr('data-text', so.title)
          .attr('data-text-class', 'title-name')
          .attr('data-text-transform', transform(so.at.shift(-90 - so.rotation, 13 * so.scale)))
        shift += 10
      }
      this.points[`_${prefix}_titlePattern`] = so.at
        .shift(-90 - so.rotation, shift * so.scale)
        .attr('data-text', this.context.config.name)
        .attr('data-text', 'v' + this.context.config.version)
        .attr('data-text-class', 'title-pattern fill-note')
        .attr('data-text-transform', transform(so.at.shift(-90 - so.rotation, shift * so.scale)))
      if (this.context.settings.metadata && this.context.settings.metadata.for) {
        shift += 8
        this.points[`_${prefix}_titleFor`] = so.at
          .shift(-90 - so.rotation, shift * so.scale)
          .attr('data-text', '( ' + this.context.settings.metadata.for + ' )')
          .attr('data-text-class', 'title-pattern')
          .attr('data-text-transform', transform(so.at.shift(-90 - so.rotation, shift * so.scale)))
      }
      if (this.context.config.cut && this.context.config.cut[this.name]) {
        shift += 8
        let cid = `_${prefix}_titleCut`
        let cut = this.context.config.cut[this.name]
        this.points[cid] = so.at
          .shift(-90 - so.rotation, shift * so.scale)
          .attr('data-text', 'cut')
          .attr('data-text-class', 'title-pattern')
          .attr('data-text-transform', transform(so.at.shift(-90 - so.rotation, shift * so.scale)))
        if (typeof cut === 'number') this.points[cid].attr('data-text', ` ${cut}x`)
        else if (Array.isArray(cut)) {
          cut = Array.from(cut) // Don't change the original array
          this.points[cid].attr('data-text', ` ${cut.shift()}x`)
          for (const txt of cut) this.points[cid].attr('data-text', txt)
        }
      }
    },
  },
}

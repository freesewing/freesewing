import pkg from '../package.json'

const style = `
text.title-nr {
  font-size: 24pt;
  font-weight: 700;
  text-anchor: middle;
  dominant-baseline: reset-size;
}
text.title-name {
      font-size: 7pt;
      font-weight: 500;
      text-anchor: middle;
      dominant-baseline: reset-size;
}
text.title-pattern {
      font-size: 4pt;
      font-weight: 500;
      dominant-baseline: reset-size;
      text-anchor: middle;
      font-style: italic;
}
`

export default {
  name: pkg.name,
  version: pkg.version,
  hooks: {
    preRender: (svg) => {
      if (svg.attributes.get('freesewing:plugin-title') === false) {
        svg.attributes.set('freesewing:plugin-title', pkg.version)
        svg.style += style
      }
    },
  },
  macros: {
    title: function (so) {
      let prefix = ''
      if (so.prefix) prefix = so.prefix

      // Passing `false` will remove the title
      if (so === false) {
        for (const id of [
          `_${prefix}_titleNr`,
          `_${prefix}_titleName`,
          `_${prefix}_titleCut`,
          `_${prefix}_titlePattern`,
          `_${prefix}_titleFor`,
        ])
          delete this.points[id]
        return true
      }

      const transform = function (anchor) {
        const cx = anchor.x - so.scale * anchor.x
        const cy = anchor.y - so.scale * anchor.y

        return `matrix(${so.scale}, 0, 0, ${so.scale}, ${cx}, ${cy}) rotate(${so.rotation} ${anchor.x} ${anchor.y})`
      }
      const nextPoint = (shiftAmt) => {
        return so.at.shift(-90 - so.rotation, shiftAmt * so.scale)
      }

      const defaults = {
        scale: 1,
        rotation: 0,
        cutList: true,
      }
      so = { ...defaults, ...so }
      so.scale = so.scale * this.context.settings.scale
      let overwrite = true
      if (so.append) overwrite = false
      this.points[`_${prefix}_titleNr`] = so.at
        .clone()
        .attr('data-text', so.nr, overwrite)
        .attr('data-text-class', 'text-4xl fill-note font-bold')
        .attr('data-text-transform', transform(so.at))
      let shift = 8
      if (so.title) {
        this.points[`_${prefix}_titleName`] = nextPoint(shift)
          .attr('data-text', so.title)
          .attr('data-text-class', 'text-lg fill-current font-bold')
          .attr('data-text-transform', transform(nextPoint(13)))
        shift += 8
      }
      if (so.cutList) {
        let cutList = this.context.config.cutList[this.name.replace(/_cutPiece\d+/, '')]
        let cutCount = 1;
        let pairs = '';
        if (cutList) {
          cutCount = cutList.isPair ? cutList.cut / 2 : cutList.cut
          pairs = cutList.isPair ?
            (cutCount > 1 ? ' Pairs' : ' Pair') :
            ''
        }
        this.points[`_${prefix}_titleCut`] = nextPoint(shift)
            .attr('data-text', `Cut ${cutCount}${pairs}`)
            .attr('data-text-class', 'fill-secondary')
            .attr('data-text-transform', transform(nextPoint(shift)))

        shift += 8
      }

      this.points[`_${prefix}_titlePattern`] = nextPoint(shift)
        .attr('data-text', this.context.config.name)
        .attr('data-text', 'v' + this.context.config.version)
        .attr('data-text-class', 'fill-note')
        .attr('data-text-transform', transform(nextPoint(shift)))
      if (this.context.settings.metadata && this.context.settings.metadata.for) {
        shift += 8
        this.points[`_${prefix}_titleFor`] = nextPoint()
          .attr('data-text', '( ' + this.context.settings.metadata.for + ' )')
          .attr('data-text-class', 'fill-current font-bold')
          .attr('data-text-transform', transform(nextPoint(shift)))
      }
    },
  },
}

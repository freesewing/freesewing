import { name, version } from '../data.mjs'

const markers = `
<marker orient="auto" refY="4.0" refX="0.0" id="cutonfoldFrom" style="overflow:visible;" markerWidth="12" markerHeight="8">
	<path class="note fill-note" d="M 0,4 L 12,0 C 10,2 10,6  12,8 z" />
</marker>
<marker orient="auto" refY="4.0" refX="12.0" id="cutonfoldTo" style="overflow:visible;" markerWidth="12" markerHeight="8">
	<path class="note fill-note" d="M 12,4 L 0,0 C 2,2 2,6  0,8 z" />
</marker>
`

export const plugin = {
  name,
  version,
  hooks: {
    preRender: (svg) => {
      if (svg.defs.indexOf(markers) === -1) svg.defs += markers
    },
  },
  macros: {
    cutonfold: function (so, { points, paths, Path, complete, setCutOnFold, setGrain, scale }) {
      if (so === false) {
        delete points.cutonfoldFrom
        delete points.cutonfoldTo
        delete points.cutonfoldVia1
        delete points.cutonfoldVia2
        delete paths.cutonfold
        // setCutOnFold relies on plugin-cutlist
        if (typeof setCutOnFold === 'function') {
          setCutOnFold(false) // Restore default
        }
        return true
      }
      so = {
        offset: 15,
        margin: 5,
        prefix: '',
        ...so,
      }
      if (typeof setCutOnFold === 'function') {
        setCutOnFold(so.from, so.to)
        if (so.grainline) setGrain(so.from.angle(so.to))
      }
      if (complete) {
        points['cutonfoldFrom' + so.prefix] = so.from.shiftFractionTowards(so.to, so.margin / 100)
        points['cutonfoldTo' + so.prefix] = so.to.shiftFractionTowards(so.from, so.margin / 100)
        points['cutonfoldVia1' + so.prefix] = points['cutonfoldFrom' + so.prefix]
          .shiftTowards(so.from, so.offset * scale)
          .rotate(-90, points['cutonfoldFrom' + so.prefix])
        points['cutonfoldVia2' + so.prefix] = points['cutonfoldTo' + so.prefix]
          .shiftTowards(so.to, so.offset * scale)
          .rotate(90, points['cutonfoldTo' + so.prefix])
        const text = so.grainline ? 'cutOnFoldAndGrainline' : 'cutOnFold'
        paths['cutonfold' + so.prefix] = new Path()
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
    },
  },
}

// More specifically named exports
export const cutonfoldPlugin = plugin
export const pluginCutonfold = plugin

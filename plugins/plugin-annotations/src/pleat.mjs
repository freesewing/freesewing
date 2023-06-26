// Export defs
export const pleatDefs = [
  {
    name: 'notch',
    def: `
<marker id="pleatTo" markerWidth="12" markerHeight="8" orient="auto" refY="4" refX="12">
  <path class="note fill-note" d="M 12,4 L 0,0 C 2,2 2,6  0,8 z" />
</marker>
`,
  },
]

// Export macros
export const pleatMacros = {
  pleat: function (so, { points, paths, Path, complete, scale }) {
    if (so === false) {
      delete points.pleatFrom
      delete points.pleatFromIn
      delete points.pleatTo
      delete points.pleatToIn
      delete paths.pleatTo
      delete paths.pleatFrom
      delete paths.pleatArrow
      return true
    }
    so = {
      margin: 35,
      prefix: 'pleat',
      reverse: false,
      ...so,
    }
    if (complete) {
      points[so.prefix + 'From'] = so.from
      points[so.prefix + 'To'] = so.to
      points[so.prefix + 'FromIn'] = points[so.prefix + 'From'].shift(
        so.from.shiftTowards(so.to, 0.1).angle(so.from) + 270,
        so.margin * scale
      )
      points[so.prefix + 'ToIn'] = points[so.prefix + 'To'].shift(
        so.from.shiftTowards(so.to, 0.1).angle(so.to) + 90,
        so.margin * scale
      )
      paths[so.prefix + 'PleatFrom'] = new Path()
        .move(points[so.prefix + 'From'])
        .line(points[so.prefix + 'FromIn'])
        .attr('class', 'note' + (so.reverse ? ' dashed' : ''))
      paths[so.prefix + 'PleatTo'] = new Path()
        .move(points[so.prefix + 'To'])
        .line(points[so.prefix + 'ToIn'])
        .attr('class', 'note' + (so.reverse ? '' : ' dashed'))
      paths[so.prefix + 'PleatArrow'] = new Path()
        .move(
          points[so.prefix + (so.reverse ? 'To' : 'From')].shiftFractionTowards(
            points[so.prefix + (so.reverse ? 'ToIn' : 'FromIn')],
            0.25
          )
        )
        .line(
          points[so.prefix + (so.reverse ? 'From' : 'To')].shiftFractionTowards(
            points[so.prefix + (so.reverse ? 'FromIn' : 'ToIn')],
            0.25
          )
        )
        .attr('class', 'note')
        .attr('marker-end', 'url(#pleatTo)')
    }
  },
}

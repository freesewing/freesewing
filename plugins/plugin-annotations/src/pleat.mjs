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
    const prefix = (so.prefix || '') + '_pleat'

    if (so === false) {
      for (const pointName in points) {
        if (pointName.match('_pleat')) delete points[pointName]
      }
      for (const pathName in paths) {
        if (pathName.match('_pleat')) delete paths[pathName]
      }
      return true
    }
    so = {
      margin: 35,
      reverse: false,
      ...so,
    }

    if (complete) {
      points[prefix + 'From'] = so.from
      points[prefix + 'To'] = so.to
      points[prefix + 'FromIn'] = points[prefix + 'From'].shift(
        so.from.shiftTowards(so.to, 0.1).angle(so.from) + 270,
        so.margin * scale
      )
      points[prefix + 'ToIn'] = points[prefix + 'To'].shift(
        so.from.shiftTowards(so.to, 0.1).angle(so.to) + 90,
        so.margin * scale
      )
      paths[prefix + 'PleatFrom'] = new Path()
        .move(points[prefix + 'From'])
        .line(points[prefix + 'FromIn'])
        .attr('class', 'note' + (so.reverse ? ' dashed' : ''))
      paths[prefix + 'PleatTo'] = new Path()
        .move(points[prefix + 'To'])
        .line(points[prefix + 'ToIn'])
        .attr('class', 'note' + (so.reverse ? '' : ' dashed'))
      paths[prefix + 'PleatArrow'] = new Path()
        .move(
          points[prefix + (so.reverse ? 'To' : 'From')].shiftFractionTowards(
            points[prefix + (so.reverse ? 'ToIn' : 'FromIn')],
            0.25
          )
        )
        .line(
          points[prefix + (so.reverse ? 'From' : 'To')].shiftFractionTowards(
            points[prefix + (so.reverse ? 'FromIn' : 'ToIn')],
            0.25
          )
        )
        .attr('class', 'note')
        .attr('marker-end', 'url(#pleatTo)')
    }
  },
}

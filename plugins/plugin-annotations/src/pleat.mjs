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
    let prefix
    if (so.id) {
      prefix = '_' + so.id
    } else {
      prefix = ''
    }

    const id = prefix + '_pleat'

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
      points[id + 'From'] = so.from
      points[id + 'To'] = so.to
      points[id + 'FromIn'] = points[id + 'From'].shift(
        so.from.shiftTowards(so.to, 0.1).angle(so.from) + 270,
        so.margin * scale
      )
      points[id + 'ToIn'] = points[id + 'To'].shift(
        so.from.shiftTowards(so.to, 0.1).angle(so.to) + 90,
        so.margin * scale
      )
      paths[id + 'PleatFrom'] = new Path()
        .move(points[id + 'From'])
        .line(points[id + 'FromIn'])
        .attr('class', 'note' + (so.reverse ? ' dashed' : ''))
      paths[id + 'PleatTo'] = new Path()
        .move(points[id + 'To'])
        .line(points[id + 'ToIn'])
        .attr('class', 'note' + (so.reverse ? '' : ' dashed'))
      paths[id + 'PleatArrow'] = new Path()
        .move(
          points[id + (so.reverse ? 'To' : 'From')].shiftFractionTowards(
            points[id + (so.reverse ? 'ToIn' : 'FromIn')],
            0.25
          )
        )
        .line(
          points[id + (so.reverse ? 'From' : 'To')].shiftFractionTowards(
            points[id + (so.reverse ? 'FromIn' : 'ToIn')],
            0.25
          )
        )
        .attr('class', 'note')
        .attr('marker-end', 'url(#pleatTo)')
    }
  },
}

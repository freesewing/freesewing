// Export defs
export const sewtogetherDefs = [
  {
    name: 'sewTogetherStart',
    def: `
<marker id="sewTogetherStart" markerWidth="4" markerHeight="4" orient="auto" refX="0" refY="2">
  <path class="note stroke-sm" d="M4,4 L0,2 4,0" />
</marker>`,
  },
  {
    name: 'sewTogetherEnd',
    def: `
<marker id="sewTogetherEnd" markerWidth="4" markerHeight="4" orient="auto" refX="4" refY="2">
  <path class="note stroke-sm" d="M0,0 L4,2 0,4" />
</marker>`,
  },
  {
    name: 'sewTogetherCross',
    def: `
<marker id="sewTogetherCross" markerWidth="4" markerHeight="4" orient="auto" refX="2" refY="2">
  <path d="M 0,0 L 4,4 M 4,0 L 0,4" class="note stroke-sm"/>
</marker>`,
  },
]

// Export macros
export const sewtogetherMacros = {
  sewTogether: function (so, { points, paths, Path, complete, sa }) {
    let prefix
    if (so.id) {
      prefix = '_' + so.id
    } else {
      prefix = ''
    }
    const id = prefix + '_sewtogether'

    if (so === false) {
      for (const pointName in points) {
        if (pointName.match('_sewtogether')) delete points[pointName]
      }
      for (const pathName in paths) {
        if (pathName.match('_sewtogether')) delete paths[pathName]
      }
      return true
    }
    so = {
      ...so,
    }

    if (complete) {
      if (null == so.middle) {
        so.middle = so.from.shiftFractionTowards(so.to, 0.5)
      }
      points[id + 'From'] = so.from
      points[id + 'Middle'] = so.middle
      points[id + 'To'] = so.to

      points[id + 'FromCp'] = points[id + 'From'].shift(
        points[id + 'From'].angle(points[id + 'Middle']) + 90,
        points[id + 'From'].dist(points[id + 'Middle']) / 1.5
      )
      points[id + 'ToCp'] = points[id + 'To'].shift(
        points[id + 'To'].angle(points[id + 'Middle']) - 90,
        points[id + 'To'].dist(points[id + 'Middle']) / 1.5
      )

      if (so.hinge) {
        points[id + 'Hinge'] = points[id + 'Middle'].shift(
          points[id + 'Middle'].angle(points[id + 'To']) +
            Math.abs(
              points[id + 'Middle'].angle(points[id + 'From']) -
                points[id + 'Middle'].angle(points[id + 'To'])
            ) /
              2 +
            (sa ? 180 : 0),
          sa
            ? sa
            : Math.min(
                points[id + 'From'].dist(points[id + 'Middle']),
                points[id + 'From'].dist(points[id + 'Middle'])
              ) / 4
        )
        paths[id + 'SewTogetherHinge'] = new Path()
          .move(points[id + 'Middle'])
          .line(points[id + 'Hinge'])
          .attr('marker-start', 'url(#sewTogetherCross)')
          .attr('class', 'dotted note stroke-sm')
      }
      paths[id + 'SewTogether'] = new Path()
        .move(points[id + 'From'])
        .curve(points[id + 'FromCp'], points[id + 'ToCp'], points[id + 'To'])
        .attr('class', 'dotted note stroke-sm')
        .attr('marker-start', 'url(#sewTogetherStart)')
        .attr('marker-end', 'url(#sewTogetherEnd)')
        .attr('data-text', 'sewTogether')
        .attr('data-text-class', 'center fill-note text-xs')
    }
  },
}

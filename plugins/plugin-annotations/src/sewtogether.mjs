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
    if (so === false) {
      delete points.sewtogetherFrom
      delete points.sewtogetherFromCp
      delete points.sewtogetherMiddle
      delete points.sewtogetherTo
      delete points.sewtogetherHinge
      delete points.sewtogetherToCp
      delete paths.sewtogetherSewTogetherHinge
      delete paths.sewtogetherSewTogether
      return true
    }
    so = {
      // prefix: 'sewtogether',
      ...so,
    }
    if (complete) {
      if (null == so.middle) {
        so.middle = so.from.shiftFractionTowards(so.to, 0.5)
      }
      points[so.id + 'From'] = so.from
      points[so.id + 'Middle'] = so.middle
      points[so.id + 'To'] = so.to

      points[so.id + 'FromCp'] = points[so.id + 'From'].shift(
        points[so.id + 'From'].angle(points[so.id + 'Middle']) + 90,
        points[so.id + 'From'].dist(points[so.id + 'Middle']) / 1.5
      )
      points[so.id + 'ToCp'] = points[so.id + 'To'].shift(
        points[so.id + 'To'].angle(points[so.id + 'Middle']) - 90,
        points[so.id + 'To'].dist(points[so.id + 'Middle']) / 1.5
      )

      if (so.hinge) {
        points[so.id + 'Hinge'] = points[so.id + 'Middle'].shift(
          points[so.id + 'Middle'].angle(points[so.id + 'To']) +
            Math.abs(
              points[so.id + 'Middle'].angle(points[so.id + 'From']) -
                points[so.id + 'Middle'].angle(points[so.id + 'To'])
            ) /
              2 +
            (sa ? 180 : 0),
          sa
            ? sa
            : Math.min(
                points[so.id + 'From'].dist(points[so.id + 'Middle']),
                points[so.id + 'From'].dist(points[so.id + 'Middle'])
              ) / 4
        )
        paths[so.id + 'SewTogetherHinge'] = new Path()
          .move(points[so.id + 'Middle'])
          .line(points[so.id + 'Hinge'])
          .attr('marker-start', 'url(#sewTogetherCross)')
          .attr('class', 'dotted note stroke-sm')
      }
      paths[so.id + 'SewTogether'] = new Path()
        .move(points[so.id + 'From'])
        .curve(points[so.id + 'FromCp'], points[so.id + 'ToCp'], points[so.id + 'To'])
        .attr('class', 'dotted note stroke-sm')
        .attr('marker-start', 'url(#sewTogetherStart)')
        .attr('marker-end', 'url(#sewTogetherEnd)')
        .attr('data-text', 'sewTogether')
        .attr('data-text-class', 'center fill-note text-xs')
    }
  },
}

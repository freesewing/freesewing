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
    so = {
      ...so,
    }
    if (complete) {
      if (null == so.middle) {
        so.middle = so.from.shiftFractionTowards(so.to, 0.5)
      }
      points[so.id + '_From'] = so.from
      points[so.id + '_Middle'] = so.middle
      points[so.id + '_To'] = so.to

      points[so.id + '_FromCp'] = points[so.id + '_From'].shift(
        points[so.id + '_From'].angle(points[so.id + '_Middle']) + 90,
        points[so.id + '_From'].dist(points[so.id + '_Middle']) / 1.5
      )
      points[so.id + '_ToCp'] = points[so.id + '_To'].shift(
        points[so.id + '_To'].angle(points[so.id + '_Middle']) - 90,
        points[so.id + '_To'].dist(points[so.id + '_Middle']) / 1.5
      )

      if (so.hinge) {
        points[so.id + '_Hinge'] = points[so.id + '_Middle'].shift(
          points[so.id + '_Middle'].angle(points[so.id + '_To']) +
            Math.abs(
              points[so.id + '_Middle'].angle(points[so.id + '_From']) -
                points[so.id + '_Middle'].angle(points[so.id + '_To'])
            ) /
              2 +
            (sa ? 180 : 0),
          sa
            ? sa
            : Math.min(
                points[so.id + '_From'].dist(points[so.id + '_Middle']),
                points[so.id + '_From'].dist(points[so.id + '_Middle'])
              ) / 4
        )
        paths[so.id + '_SewTogetherHinge'] = new Path()
          .move(points[so.id + '_Middle'])
          .line(points[so.id + '_Hinge'])
          .attr('marker-start', 'url(#sewTogetherCross)')
          .attr('class', 'dotted note stroke-sm')
      }
      paths[so.id + '_SewTogether'] = new Path()
        .move(points[so.id + '_From'])
        .curve(points[so.id + '_FromCp'], points[so.id + '_ToCp'], points[so.id + '_To'])
        .attr('class', 'dotted note stroke-sm')
        .attr('marker-start', 'url(#sewTogetherStart)')
        .attr('marker-end', 'url(#sewTogetherEnd)')
        .attr('data-text', 'sewTogether')
        .attr('data-text-class', 'center fill-note text-xs')
    }
  },
  rmsewTogether: function (so, { points, paths, Path, complete, sa }) {
    delete points[so.id + '_From']
    delete points[so.id + '_FromCp']
    delete points[so.id + '_Middle']
    delete points[so.id + '_To']
    delete points[so.id + '_Hinge']
    delete points[so.id + '_ToCp']
    delete paths[so.id + '_SewTogetherHinge']
    delete paths[so.id + '_SewTogether']
    return true
  },
}

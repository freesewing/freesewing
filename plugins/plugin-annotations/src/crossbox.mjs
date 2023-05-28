// Export macros
export const crossboxMacros = {
  crossbox: function (so, { points, Point, paths, Path, complete }) {
    let prefix
    if (so.id) {
      prefix = '_' + so.id
    } else {
      prefix = ''
    }
    const id = prefix + '_crossbox'

    if (so === false) {
      for (const pointName in points) {
        if (pointName.match('_crossbox')) delete points[pointName]
      }
      for (const pathName in paths) {
        if (pathName.match('_crossbox')) delete paths[pathName]
      }
      // setCutonfold relies on plugin-cutlist
      if (typeof setCutonfold === 'function') {
        setCutonfold(false) // Restore default
      }
      return true
    }

    so = {
      detail: true,
      ...so,
    }

    if ((complete && so.detail) || !so.detail) {
      let shiftFraction = 0.1
      points[id + 'TopLeft'] = so.from.copy()
      points[id + 'BottomRight'] = so.to.copy()
      points[id + 'TopRight'] = new Point(so.to.x, so.from.y)
      points[id + 'BottomLeft'] = new Point(so.from.x, so.to.y)

      points[id + 'TopCrossTL'] = points[id + 'TopLeft'].shiftFractionTowards(
        points[id + 'BottomRight'],
        shiftFraction
      )
      points[id + 'TopCrossTR'] = points[id + 'TopRight'].shiftFractionTowards(
        points[id + 'BottomLeft'],
        shiftFraction
      )
      points[id + 'TopCrossBL'] = points[id + 'BottomLeft'].shiftFractionTowards(
        points[id + 'TopRight'],
        shiftFraction
      )
      points[id + 'TopCrossBR'] = points[id + 'BottomRight'].shiftFractionTowards(
        points[id + 'TopLeft'],
        shiftFraction
      )

      paths[id] = new Path()
        .move(points[id + 'TopLeft'])
        .line(points[id + 'TopRight'])
        .line(points[id + 'BottomRight'])
        .line(points[id + 'BottomLeft'])
        .line(points[id + 'TopLeft'])
        .close()
        .attr('class', 'lining dotted stroke-sm')
      paths[id + 'TopCross'] = new Path()
        .move(points[id + 'TopCrossTL'])
        .line(points[id + 'TopCrossBR'])
        .line(points[id + 'TopCrossTR'])
        .line(points[id + 'TopCrossBL'])
        .line(points[id + 'TopCrossTL'])
        .line(points[id + 'TopCrossTR'])
        .move(points[id + 'TopCrossBR'])
        .line(points[id + 'TopCrossBL'])
        .attr('class', 'lining dotted stroke-sm')
      if (typeof so.text === 'string') {
        points[id + 'textAnchor'] = points[id + 'TopLeft']
          .shiftFractionTowards(points[id + 'BottomRight'], 0.5)
          .attr('data-text', so.text)
          .attr('data-text-class', 'center')
      }
    }
  },
}

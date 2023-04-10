// Export macros
export const bannerboxMacros = {
  bannerbox: function (so, { points, Point, paths, Path, getId, macro }) {
    // Spread so settings into defaults
    so = {
      topLeft: new Point(0, 0),
      bottomRight: new Point(100, 100),
      title: 'No title for this bannerbox',
      margin: 15,
      className: 'text-xs fill-note',
      dy: 4,
      spaces: 12,
      repeat: 10,
      ...so,
    }
    const offset = Math.sqrt(2 * Math.pow(so.margin, 2))

    const id = getId()
    paths[id] = new Path()
      .move(so.topLeft.shift(135, offset))
      .line(new Point(so.bottomRight.x, so.topLeft.y).shift(45, offset))
      .line(so.bottomRight.shift(315, offset))
      .line(new Point(so.topLeft.x, so.bottomRight.y).shift(225, offset))
      .line(so.topLeft.shift(135, offset))
      .close()

    macro('banner', {
      path: paths[id],
      text: so.title,
      className: 'text-xs fill-note',
      repeat: 99,
      dy: 4,
    })
  },
}

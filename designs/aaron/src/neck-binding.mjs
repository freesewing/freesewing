import { back } from './back.mjs'

export const neckBinding = {
  name: 'aaron.neckBinding',
  after: back,
  draft: ({ store, sa, Point, points, Path, paths, Snippet, snippets, macro, expand, part }) => {
    if (!expand) return part.hide()

    const w = store.get('bindingWidth')
    const h = store.get('neckBindingLength')

    points.topLeft = new Point(0, 0)
    points.bottomLeft = new Point(0, h)
    points.bottomRight = new Point(w, h)
    points.topRight = new Point(w, 0)

    paths.seam = new Path()
      .move(points.topLeft)
      .line(points.bottomLeft)
      .line(points.bottomRight)
      .line(points.topRight)
      .line(points.topLeft)
      .close()
      .addClass('fabric')

    /*
     * Annotations
     */
    // Provide cutting instructions
    store.cutlist.addCut({ cut: 1 })

    // Add title
    points.title = new Point(w / 2, h / 8)
    macro('title', {
      at: points.title,
      nr: 3,
      title: 'aaron:neckBinding',
      align: 'center',
      scale: 0.5,
    })

    // Logo
    points.logo = points.title.shift(-90, 75)
    snippets.logo = new Snippet('logo', points.logo).scale(0.75)

    // Dimensions
    macro('vd', {
      from: points.bottomRight,
      to: points.topRight,
      x: points.topRight.x + sa + 15,
    })
    macro('hd', {
      from: points.bottomLeft,
      to: points.bottomRight,
      y: points.bottomRight.y + sa + 15,
    })

    return part
  },
}

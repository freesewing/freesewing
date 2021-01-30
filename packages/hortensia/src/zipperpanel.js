export default function(part) {
  let {
    store,
    options,
    Point,
    Path,
    points,
    paths,
    Snippet,
    snippets,
    complete,
    sa,
    paperless,
    macro
  } = part.shorthand();

  let z = store.get( 'zipperWidth' );
  let w = (store.get( 'zipperPanelWidth' ) -z) /2;
  let h = store.get( 'depth' );
  console.log( z );
  console.log( w );
  console.log( h );

  points.topLeft = new Point(0, 0)
  points.topRight = new Point(w, 0)
  points.bottomLeft = new Point(0, h)
  points.bottomRight = new Point(w, h)

  paths.seam = new Path()
    .move(points.topLeft)
    .line(points.bottomLeft)
    .line(points.bottomRight)
    .line(points.topRight)
    .line(points.topLeft)
    .close()
    .attr('class', 'fabric')

  // Complete?
  if (complete) {
    paths.text = new Path()
      .move(points.topLeft)
      .line(points.bottomLeft)
      .attr('data-text', 'ZipperPanel')
      .attr('data-text-class', 'center text-xs')

    if (sa) {
      paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')
    }
  }

  // Paperless?
  if (paperless) {
    macro('hd', {
      from: points.bottomLeft,
      to: points.bottomRight,
      y: points.bottomLeft.y + sa + 15
    })
    macro('vd', {
      from: points.bottomRight,
      to: points.topRight,
      x: points.topRight.x + sa + 15
    })
  }

  return part
}

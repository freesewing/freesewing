const draftButtons = (part) => {
  const { points, Point, paths, Path, snippets, Snippet, options } = part.shorthand()

  if (['logo', 'all'].indexOf(options.plugin) !== -1) {
    points.a = new Point(40, 40)
    snippets.a = new Snippet('logo', points.a)
      .attr('data-scale', options.logoScale)
      .attr('data-rotate', options.logoRotate)

    // Prevent clipping of text
    paths.box = new Path().move(new Point(0, 0)).line(new Point(80, 60)).attr('class', 'hidden')
  }

  return part
}

export default draftButtons

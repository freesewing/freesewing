const draftI18n = (part) => {
  const { points, Point, paths, Path, options } = part.shorthand()

  if (['i18n', 'all'].indexOf(options.plugin) !== -1) {
    points.a = new Point(0, 0).attr('data-text', 'cutTwoStripsToFinishTheArmholes')

    // Prevent clipping of text
    paths.box = new Path().move(new Point(0, -10)).line(new Point(130, 0)).attr('class', 'hidden')
  }

  return part
}

export default draftI18n

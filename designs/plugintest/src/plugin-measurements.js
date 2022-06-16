const measies = [
  'seatFront',
  'seatBackArc',
  'seatFrontArc',
  'waistFront',
  'waistBackArc',
  'waistFrontArc',
  'crossSeamFront',
  'crossSeamBack',
]

const draftI18n = (part) => {
  const { points, Point, paths, Path, measurements, options } = part.shorthand()

  if (['measurements', 'all'].indexOf(options.plugin) !== -1) {
    let y = 10
    for (const m of measies) {
      points[m] = new Point(0, y).attr('data-text', [m, measurements[m]])
      y += 10
    }

    // Prevent clipping of text
    paths.box = new Path().move(new Point(0, -10)).line(new Point(130, 90)).attr('class', 'hidden')
  }

  return part
}

export default draftI18n

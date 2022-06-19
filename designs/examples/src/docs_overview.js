export default (part) => {
  let { Point, points, Path, paths, options } = part.shorthand()

  /**
   * Returs the value passed to it randomized with a given tolerance
   */
  const about = (value, tolerance = 5) => {
    let randomized = (tolerance / 100) * Math.random() * value
    let fixed = (1 - tolerance / 100) * value

    return fixed + randomized
  }

  /**
   * like about, but also randomly makes value negative
   * This is for degrees
   */
  const nabout = (value, tolerance = 5) => {
    if (Math.random() > 0.5) return about(value, tolerance)
    else return -1 * about(value, tolerance)
  }

  /**
   * Draws a w*h box that's randomized by tolerance to give it
   * that hand-drawn look.
   *
   * Returns a Path object
   */
  const box = (name, origin, width, height, tolerance = 10) => {
    let base = height
    if (width < height) base = width
    let t = base * (tolerance / 100)
    points[name + 'TopLeft'] = new Point(about(origin.x, t), about(origin.y, t))
    points[name + 'BottomLeft'] = new Point(about(origin.x, t), about(origin.y + height, t))
    points[name + 'BottomRight'] = new Point(
      about(origin.x + width, t),
      about(origin.y + height, t)
    )
    points[name + 'TopRight'] = new Point(about(origin.x + width, t), about(origin.y, t))
    points[name + 'Mid'] = points[name + 'TopLeft'].shiftFractionTowards(
      points[name + 'BottomRight'],
      0.5
    )
    points[name + 'Mid'].y += 3

    let f = 0.3
    let r = tolerance / 2
    points[name + 'TopLeftCp1'] = points[name + 'TopLeft']
      .shiftFractionTowards(points[name + 'BottomLeft'], about(f))
      .rotate(nabout(r), points[name + 'TopLeft'])
    points[name + 'TopLeftCp2'] = points[name + 'TopLeft']
      .shiftFractionTowards(points[name + 'TopRight'], about(f))
      .rotate(nabout(r), points[name + 'TopLeft'])
    points[name + 'BottomLeftCp1'] = points[name + 'BottomLeft']
      .shiftFractionTowards(points[name + 'TopLeft'], about(f))
      .rotate(nabout(r), points[name + 'BottomLeft'])
    points[name + 'BottomLeftCp2'] = points[name + 'BottomLeft']
      .shiftFractionTowards(points[name + 'BottomRight'], about(f))
      .rotate(nabout(r), points[name + 'BottomLeft'])
    points[name + 'BottomRightCp1'] = points[name + 'BottomRight']
      .shiftFractionTowards(points[name + 'BottomLeft'], about(f))
      .rotate(nabout(r), points[name + 'BottomRight'])
    points[name + 'BottomRightCp2'] = points[name + 'BottomRight']
      .shiftFractionTowards(points[name + 'TopRight'], about(f))
      .rotate(nabout(r), points[name + 'BottomRight'])
    points[name + 'TopRightCp1'] = points[name + 'TopRight']
      .shiftFractionTowards(points[name + 'BottomRight'], about(f))
      .rotate(nabout(r), points[name + 'TopRight'])
    points[name + 'TopRightCp2'] = points[name + 'TopRight']
      .shiftFractionTowards(points[name + 'TopLeft'], about(f))
      .rotate(nabout(r), points[name + 'TopRight'])

    return new Path()
      .move(points[name + 'TopLeft'])
      .curve(
        points[name + 'TopLeftCp1'],
        points[name + 'BottomLeftCp1'],
        points[name + 'BottomLeft']
      )
      .curve(
        points[name + 'BottomLeftCp2'],
        points[name + 'BottomRightCp1'],
        points[name + 'BottomRight']
      )
      .curve(
        points[name + 'BottomRightCp2'],
        points[name + 'TopRightCp1'],
        points[name + 'TopRight']
      )
      .curve(points[name + 'TopRightCp2'], points[name + 'TopLeftCp2'], points[name + 'TopLeft'])
      .close()
      .attr('class', options.focus === name ? 'note' : 'fabric')
  }

  /**
   * Draws an arrow from to
   * Returns a Path object
   */
  const arrow = (name, text = '', tolerance = 10) => {
    let from = points[name + 'From']
    let to = points[name + 'To']
    from = from.shiftTowards(to, 3)
    to = to.shiftTowards(from, 3)
    let base = from.dist(to)
    let t = base * (tolerance / 100)
    from.x = about(from.x, t)
    from.x = about(from.x, t)
    to.x = about(to.x, t)
    to.x = about(to.x, t)
    let f = 0.3
    let r = tolerance / 2
    points[name + 'FromCp'] = from.shiftFractionTowards(to, about(f)).rotate(nabout(r), from)
    points[name + 'ToCp'] = to.shiftFractionTowards(from, about(f)).rotate(nabout(r), to)
    points[name + 'Tip1'] = to.shiftTowards(from, about(3.8)).rotate(about(15), to)
    points[name + 'Tip2'] = to.shiftTowards(from, about(3.5)).rotate(about(-15), to)
    let path = new Path()
      .move(from)
      .curve(points[name + 'FromCp'], points[name + 'ToCp'], to)
      .move(points[name + 'Tip1'])
      .line(to)
      .line(points[name + 'Tip2'])
      .attr('class', 'fabric')
    if (options.focus === name) path = path.attr('class', 'note')
    if (text)
      return path
        .attr('data-text', '  ' + text)
        .attr('data-text-class', 'scribble')
        .attr('data-text-class', options.focus === name ? 'fill-note' : '')
    else return path
  }

  const drawBox = (name, x, y, width, height, tolerance = 5, text = true) => {
    points[name + 'Origin'] = new Point(x, y)
    paths[name] = box(name, points[name + 'Origin'], width, height, tolerance)
    if (text) {
      points[name + 'Mid'].attr('data-text', name).attr('data-text-class', 'center scribble')
      if (options.focus === name) points[name + 'Mid'].attr('data-text-class', 'fill-note')
    }
  }

  const svgLogo = (anchor, size = 1) => {
    points.svg15 = anchor
      .shift(45, 4 * size)
      .attr('data-circle', 1.2 * size)
      .attr('data-circle-class', 'fill-fabric')
    points.svg3 = anchor
      .shift(0, 4 * size)
      .attr('data-circle', 1.2 * size)
      .attr('data-circle-class', 'fill-fabric')
    points.svg45 = anchor
      .shift(-45, 4 * size)
      .attr('data-circle', 1.2 * size)
      .attr('data-circle-class', 'fill-fabric')
    points.svg6 = anchor
      .shift(-90, 4 * size)
      .attr('data-circle', 1.2 * size)
      .attr('data-circle-class', 'fill-fabric')
    points.svg75 = anchor
      .shift(-135, 4 * size)
      .attr('data-circle', 1.2 * size)
      .attr('data-circle-class', 'fill-fabric')
    points.svg9 = anchor
      .shift(180, 4 * size)
      .attr('data-circle', 1.2 * size)
      .attr('data-circle-class', 'fill-fabric')
    points.svg105 = anchor
      .shift(135, 4 * size)
      .attr('data-circle', 1.2 * size)
      .attr('data-circle-class', 'fill-fabric')
    points.svg12 = anchor
      .shift(90, 4 * size)
      .attr('data-circle', 1.2 * size)
      .attr('data-circle-class', 'fill-fabric')
    points.svgText = anchor
      .clone()
      .attr('data-text', 'SVG')
      .attr('data-text-class', 'text-xl scribble')
    points.svgText.x += size * 7
    points.svgText.y += 6
    paths.svgLogo = new Path()
      .move(points.svg15)
      .line(points.svg75)
      .move(points.svg3)
      .line(points.svg9)
      .move(points.svg45)
      .line(points.svg105)
      .move(points.svg6)
      .line(points.svg12)
      .attr('class', 'stroke-l')
  }
  const reactLogo = (anchor, size = 1) => {
    h = 3 * size
    w = 6 * size
    points.reactTop1 = anchor.shift(45, w)
    points.reactBottom1 = anchor.shift(-135, w)
    points.reactTop1Cp1 = points.reactTop1.shift(135, h)
    points.reactTop1Cp2 = points.reactTop1.shift(-45, h)
    points.reactBottom1Cp1 = points.reactBottom1.shift(135, h)
    points.reactBottom1Cp2 = points.reactBottom1.shift(-45, h)
    points.reactTop2 = points.reactTop1.rotate(60, anchor)
    points.reactBottom2 = points.reactBottom1.rotate(60, anchor)
    points.reactTop2Cp1 = points.reactTop1Cp1.rotate(60, anchor)
    points.reactTop2Cp2 = points.reactTop1Cp2.rotate(60, anchor)
    points.reactBottom2Cp1 = points.reactBottom1Cp1.rotate(60, anchor)
    points.reactBottom2Cp2 = points.reactBottom1Cp2.rotate(60, anchor)
    points.reactTop3 = points.reactTop1.rotate(-60, anchor)
    points.reactBottom3 = points.reactBottom1.rotate(-60, anchor)
    points.reactTop3Cp1 = points.reactTop1Cp1.rotate(-60, anchor)
    points.reactTop3Cp2 = points.reactTop1Cp2.rotate(-60, anchor)
    points.reactBottom3Cp1 = points.reactBottom1Cp1.rotate(-60, anchor)
    points.reactBottom3Cp2 = points.reactBottom1Cp2.rotate(-60, anchor)
    points.svgLogo = anchor
      .clone()
      .attr('data-circle', 1 * size)
      .attr('data-circle-class', 'fill-fabric')
    points.reactText = anchor
      .clone()
      .attr('data-text', 'React')
      .attr('data-text-class', 'text-xl scribble')
    points.reactText.x += size * 7
    points.reactText.y += 6

    paths.reactLogo = new Path()
      .move(points.reactTop1)
      .curve(points.reactTop1Cp1, points.reactBottom1Cp1, points.reactBottom1)
      .curve(points.reactBottom1Cp2, points.reactTop1Cp2, points.reactTop1)
      .close()
      .move(points.reactTop2)
      .curve(points.reactTop2Cp1, points.reactBottom2Cp1, points.reactBottom2)
      .curve(points.reactBottom2Cp2, points.reactTop2Cp2, points.reactTop2)
      .close()
      .move(points.reactTop3)
      .curve(points.reactTop3Cp1, points.reactBottom3Cp1, points.reactBottom3)
      .curve(points.reactBottom3Cp2, points.reactTop3Cp2, points.reactTop3)
      .close()
  }

  // Other parts first so they're behind
  drawBox('Part4', 4, -19, 40, 65, 5, false)
  drawBox('Part3', 1, -16, 40, 65, 5, false)
  drawBox('Part2', -2, -13, 40, 65, 5, false)
  drawBox('Part', -5, -10, 40, 65, 5)
  paths.Part4.attr('class', 'fill-bg')
  paths.Part3.attr('class', 'fill-bg')
  paths.Part2.attr('class', 'fill-bg')
  paths.Part.attr('class', 'fill-bg')
  points.PartMid.y = points.PartTopLeft.y + 9
  let x = 0
  let y = 0
  let w = 30
  let h = 15
  drawBox('Points', x, y, w, h)
  y += 18
  drawBox('Paths', x, y, w, h)
  y += 18
  drawBox('Snippets', x, y, w, h)
  x = -35
  y = -3
  w = 25
  h = 20
  drawBox('config', x, y, w, h)
  y += 23
  drawBox('Store', x, y, w, h)
  x = -40
  y = -30
  drawBox('Pattern', x, y, 90, 90)
  points.PatternMid.y = points.PatternTopLeft.y + 9

  drawBox('settings', -100, 6, 40, 20)
  drawBox('draft', 80, 3, 20, 25)

  points.arrow1From = points.settingsTopRight.shiftFractionTowards(points.settingsBottomRight, 0.5)
  points.arrow1To = points.PatternTopLeft.shiftFractionTowards(points.PatternBottomLeft, 0.5)
  paths.arrow1 = arrow('arrow1')
  points.arrow2From = points.PatternTopRight.shiftFractionTowards(points.PatternBottomRight, 0.5)
  points.arrow2To = points.draftTopLeft.shiftFractionTowards(points.draftBottomLeft, 0.5)
  paths.arrow2 = arrow('arrow2', 'draft()')

  svgLogo(points.draftMid.shift(70, 50))
  reactLogo(points.draftMid.shift(-80, 36))

  points.arrow3From = points.draftTopLeft.shiftFractionTowards(points.draftTopRight, 0.5)
  points.arrow3To = points.svgText.clone()
  paths.arrow3 = arrow('arrow3', 'render()')
  points.arrow4From = points.draftBottomLeft.shiftFractionTowards(points.draftBottomRight, 0.5)
  points.arrow4To = points.reactText.clone().shift(40, 15)
  paths.arrow4 = arrow('arrow4')

  paths.extend = new Path()
    .move(points.draftTopRight)
    .line(points.draftTopRight.shift(0, 40))
    .attr('class', 'hidden')

  return part
}

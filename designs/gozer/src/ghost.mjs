export const ghost = {
  name: 'gozer.ghost',
  measurements: ['hpsToWaistBack', 'waistToFloor', 'head'],
  draft: ({
    measurements,
    Point,
    points,
    Snippet,
    snippets,
    sa,
    macro,
    expand,
    store,
    units,
    part,
  }) => {
    const eyeSize = measurements.head * 0.0416
    const eyeLine = measurements.head / Math.PI / 2
    const eyeWidth = measurements.head * 0.13
    const fullSize =
      measurements.hpsToWaistBack + measurements.waistToFloor + measurements.head / Math.PI
    const partialSize = eyeWidth * 3
    const fullFabric = 'fabric'
    const partialFabric = 'help note'
    let size = fullSize
    let fabric = fullFabric

    points.middle = new Point(0, 0)
    points.eyeLine = points.middle.shift(270, eyeLine)
    points.eyeLeft = points.eyeLine.shift(180, eyeWidth)
    points.eyeRight = points.eyeLine.shift(0, eyeWidth)
    points.eyeLeft.addCircle(eyeSize)
    points.eyeRight.addCircle(eyeSize)

    if (expand) store.flag.preset('expandIsOn')
    else {
      // Expand is on, do not draw the part but flag this to the user
      store.flag.note({
        msg: 'gozer:partialPart',
        notes: [sa ? 'flag:saIncluded' : 'flag:saExcluded', 'flag:partPartiallyShownByExpand'],
        replace: {
          radius: units(fullSize + sa),
        },
        suggest: {
          text: 'flag:show',
          icon: 'expand',
          update: {
            settings: ['expand', 1],
          },
        },
      })
      // Also hint about expand
      store.flag.preset('expandIsOff')
      size = partialSize
      fabric = partialFabric
    }

    points.middle.addCircle(size, fabric)
    snippets.center = new Snippet('notch', points.middle)
    snippets.eyeLeft = new Snippet('notch', points.eyeLeft)
    snippets.eyeRight = new Snippet('notch', points.eyeRight)

    if (!expand) {
      points.text = new Point(size * -0.25, size * -0.5).addText(
        '(Outer circle is not the actual radius.\nSee designer messages for actual radius.'
      )
    }
    points.left = new Point(-1 * size, 0)
    points.right = new Point(size, 0)

    points.title = points.middle.shift(10, size * 0.5)
    macro('title', {
      nr: 1,
      at: points.title,
      title: 'Gozer',
      align: 'center',
    })
    points.logo = points.middle.shift(200, size * 0.6)
    snippets.logo = new Snippet('logo', points.logo)

    if (sa && expand) {
      points.sa = new Point(0, 0).addCircle(size + sa, fabric + ' sa')
    }

    if (expand)
      // Show full dimension only when expanded.
      macro('hd', {
        from: points.left,
        to: points.right,
        id: 'width',
        y: points.right.y,
      })
    macro('hd', {
      from: points.eyeLeft,
      to: points.middle,
      id: 'eyeh',
      y: points.eyeLeft.y,
    })
    macro('vd', {
      from: points.eyeLeft,
      to: points.middle,
      id: 'eyew',
      x: points.eyeLeft.x,
    })
    macro('hd', {
      from: points.eyeRight.shift(180, eyeSize),
      to: points.eyeRight.shift(0, eyeSize),
      id: 'eyewidth',
      y: points.eyeRight.y - eyeSize * 1.25,
    })
    macro('ld', {
      from: points.middle,
      to: points.eyeLeft,
      id: 'eyeradius',
    })

    return part
  },
}

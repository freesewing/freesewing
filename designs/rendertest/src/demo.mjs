export const demo = {
  name: 'rendertest.demo',
  options: {
    width: { mm: 200, min: 50, max: 500, testIgnore: false },
    only: {
      menu: 'show',
      dflt: 'false',
      list: [
        'false',
        'circles',
        'colors',
        'widths',
        'styles',
        'combos',
        'text',
        'snippets',
        'macros',
      ],
    },
  },
  draft: (params) => {
    const { store, options, Path, paths, Point, part } = params
    // Keep things in store
    store.set('y', 0)
    store.set('w', options.width)
    store.set('colors', [
      'fabric',
      'lining',
      'interfacing',
      'canvas',
      'various',
      'mark',
      'contrast',
      'note',
    ])
    store.set('widths', [
      'stroke-xs',
      'stroke-sm',
      'default-width',
      'stroke-lg',
      'stroke-xl',
      'stroke-2xl',
    ])
    store.set('styles', ['default-style', 'dotted', 'dashed', 'lashed', 'sa', 'help', 'hidden'])

    // We are drafting all this in one part to control the layout
    if (options.only === 'false' || options.only === 'colors') addColors(params, true)
    if (options.only === 'false' || options.only === 'widths') addWidths(params, true)
    if (options.only === 'false' || options.only === 'styles') addStyles(params, true)
    if (options.only === 'false' || options.only === 'combos') addCombos(params, true)
    if (options.only === 'false' || options.only === 'circles') addCircles(params)
    if (options.only === 'false' || options.only === 'text') addText(params, true)
    if (options.only === 'false' || options.only === 'snippets') addSnippets(params, true)
    if (options.only === 'false' || options.only === 'macros') addMacros(params, true)

    // Make sure no text is cut off
    paths.box = new Path()
      .move(new Point(-10, -10))
      .line(new Point(store.get('w') + 10, store.get('y')))
      .attr('class', 'hidden')

    return part
  },
}

function addCircles({ Point, points, store, options, part }) {
  if (options.only === 'circles') {
    let y = store.get('y')
    const w = store.get('w')

    y += w / 8 + 5
    for (let i = 1; i < 6; i++) {
      points[`circles1-${i}`] = new Point(w / 3 - w / 6, y)
        .attr('data-circle', i * (w / 50))
        .attr('data-circle-class', store.get('colors')[i])
      points[`circles2-${i}`] = new Point((w / 3) * 2 - w / 6, y)
        .attr('data-circle', i * (w / 50))
        .attr(
          'data-circle-class',
          'fabric ' + store.get('styles')[i] + ' ' + store.get('colors')[i]
        )
      points[`circles3-${i}`] = new Point(w - w / 6, y)
        .attr('data-circle', i * (w / 50))
        .attr(
          'data-circle-class',
          'fabric ' +
            store.get('widths')[i] +
            ' ' +
            store.get('styles')[i] +
            ' ' +
            store.get('colors')[i]
        )
    }
    y += w / 8
    store.set('y', y)
  }

  return part
}

function addColors({ Point, Path, points, paths, store, options, part }, demo = false) {
  if (options.only === 'colors' || demo) {
    let y = store.get('y')
    const w = store.get('w')

    // Stroke colors
    y += 10
    if (!demo)
      paths.noClip = new Path()
        .move(new Point(0, y - 5))
        .line(new Point(10, y - 5))
        .attr('class', 'hidden')
    points.colors = new Point(0, y)
      .attr('data-text', 'Stroke colors')
      .attr('data-text-class', 'text-lg bold')
    for (const color of store.get('colors').sort()) {
      y += 12
      points[`l-${color}`] = new Point(0, y)
      points[`r-${color}`] = new Point(w, y)
      paths[`color${color}`] = new Path()
        .move(points[`l-${color}`])
        .line(points[`r-${color}`])
        .attr('class', color)
        .attr('data-text', `.${color}`)
    }

    // Update y
    store.set('y', y)
  }

  return part
}

function addCombos({ Point, Path, points, paths, store, options, part }, demo = false) {
  if (options.only === 'combos' || demo) {
    let y = store.get('y')
    const w = store.get('w')

    // Stroke combos
    y += 25
    if (!demo)
      paths.noClip = new Path()
        .move(new Point(0, y - 5))
        .line(new Point(10, y - 5))
        .attr('class', 'hidden')
    points.combos = new Point(0, y)
      .attr('data-text', 'Combining stroke classes')
      .attr('data-text-class', 'text-lg bold')

    y += 12
    points.combo1l = new Point(0, y)
    points.combo1r = new Point(w, y)
    paths.combo1 = new Path()
      .move(points.combo1l)
      .line(points.combo1r)
      .attr('class', 'lining sa')
      .attr('data-text', `.lining.sa`)

    y += 12
    points.combo2l = new Point(0, y)
    points.combo2r = new Point(w, y)
    paths.combo2 = new Path()
      .move(points.combo2l)
      .line(points.combo2r)
      .attr('class', 'stroke-lg various help')
      .attr('data-text', `.stroke-lg various help`)

    // Update y
    store.set('y', y)
  }

  return part
}

function addMacros({ macro, Point, Path, points, paths, store, options, part }, demo = false) {
  if (options.only === 'macros' || demo) {
    let y = store.get('y')
    const w = store.get('w')
    y += 10
    if (!demo)
      paths.noClip = new Path().move(new Point(0, y)).line(new Point(10, y)).attr('class', 'hidden')
    else
      points.macros = new Point(0, y)
        .attr('data-text', 'Macros')
        .attr('data-text-class', 'text-lg bold')

    // title
    y += 60
    macro('title', {
      at: new Point(10, y),
      nr: 5,
      title: 'title',
    })

    // grainline
    y += 40
    macro('grainline', {
      from: new Point(0, y),
      to: new Point(w, y),
    })

    // cutonfold
    y += 35
    macro('cutonfold', {
      from: new Point(0, y),
      to: new Point(w, y),
    })

    // cutonfold * grainline
    y += 30
    macro('cutonfold', {
      from: new Point(0, y),
      to: new Point(w, y),
      grainline: true,
      prefix: 'combo',
    })

    // hd, vd, ld, and pd
    y += 30
    points.dimf = new Point(20, y)
    points.dimt = new Point(w - 20, y + 120)
    points.dimv = new Point(20, y + 80)
    paths.dims = new Path().move(points.dimf)._curve(points.dimv, points.dimt)
    macro('hd', {
      from: points.dimf,
      to: points.dimt,
      text: 'hd',
      y: y - 15,
    })
    macro('vd', {
      from: points.dimt,
      to: points.dimf,
      text: 'vd',
      x: 0,
    })
    macro('ld', {
      from: points.dimf,
      to: points.dimt,
      text: 'ld',
    })
    macro('pd', {
      path: paths.dims,
      text: 'pd',
      d: 10,
    })

    // scalebox
    y += 170
    macro('scalebox', {
      at: new Point(w / 2, y),
    })

    // miniscale
    y += 45
    macro('miniscale', {
      at: new Point(w / 2, y),
    })

    store.set('y', y)
  }

  return part
}

function addSnippets(
  { Point, Path, points, paths, snippets, Snippet, store, options, part },
  demo = false
) {
  if (options.only === 'snippets' || demo) {
    let y = store.get('y')
    let w = store.get('w')

    const snips = {
      logo: 35,
      notch: 15,
      bnotch: 15,
      button: 15,
      buttonhole: 25,
      'buttonhole-start': 15,
      'buttonhole-end': 25,
      'snap-socket': 25,
      'snap-stud': 15,
    }
    y += 20
    if (!demo)
      paths.noClip = new Path()
        .move(new Point(0, y - 5))
        .line(new Point(10, y - 5))
        .attr('class', 'hidden')
    else
      points.snippets = new Point(0, y)
        .attr('data-text', 'Snippets')
        .attr('data-text-class', 'text-lg bold')
    y += 10
    points['sl1'] = new Point(w * 0.25, y)
    points['sl2'] = new Point(w * 0.5, y)
    points['sl3'] = new Point(w * 0.75, y)
    points['sl1']
      .attr('data-text', 'data-scale: 1\ndata-rotate: 0')
      .attr('data-text-class', 'center text')
      .attr('data-text-lineheight', 7)
    points['sl2']
      .attr('data-text', 'data-scale: 1.25\ndata-rotate: 0')
      .attr('data-text-class', 'center text')
      .attr('data-text-lineheight', 7)
    points['sl3']
      .attr('data-text', 'data-scale: 0.75\ndata-rotate: 90')
      .attr('data-text-class', 'center text')
      .attr('data-text-lineheight', 7)
    y += 55
    for (let i in snips) {
      points['snt' + i] = new Point(0, y)
      points['snt' + i].attr('data-text', i)
      points['sn1' + i] = new Point(w * 0.3, y)
      points['sn2' + i] = new Point(w * 0.55, y)
      points['sn3' + i] = new Point(w * 0.8, y)
      snippets['sn1' + i] = new Snippet(i, points['sn1' + i])
      snippets['sn2' + i] = new Snippet(i, points['sn2' + i])
      snippets['sn2' + i].attr('data-scale', 1.25)
      snippets['sn3' + i] = new Snippet(i, points['sn3' + i])
      snippets['sn3' + i].attr('data-scale', 0.75).attr('data-rotate', 90)
      y += snips[i]
    }
    store.set('y', y)
    if (!demo) paths.noClip.line(new Point(w, y))
  }

  return part
}

function addStyles({ Point, Path, points, paths, store, options, part }, demo = false) {
  if (options.only === 'styles' || demo) {
    let y = store.get('y')
    const w = store.get('w')

    // Stroke styles
    y += 25
    if (!demo)
      paths.noClip = new Path()
        .move(new Point(0, y - 5))
        .line(new Point(10, y - 5))
        .attr('class', 'hidden')
    points.styles = new Point(0, y)
      .attr('data-text', 'Stroke styles')
      .attr('data-text-class', 'text-lg bold')
    for (const style of store.get('styles')) {
      y += 12
      points[`l-${style}`] = new Point(0, y)
      points[`r-${style}`] = new Point(w, y)
      paths[`color${style}`] = new Path()
        .move(points[`l-${style}`])
        .line(points[`r-${style}`])
        .attr('class', `fabric ${style}`)
        .attr('data-text', style === 'default-style' ? '' : `.${style}`)
    }

    // Update y
    store.set('y', y)
  }

  return part
}

function addText({ Point, Path, points, paths, store, options, part }, demo = false) {
  if (options.only === 'text' || demo) {
    let y = store.get('y')
    const w = store.get('w')

    // Text sizes
    y += 15
    if (!demo)
      paths.noClip = new Path()
        .move(new Point(0, y - 5))
        .line(new Point(10, y - 5))
        .attr('class', 'hidden')
    points.textsize = new Point(0, y)
      .attr('data-text', 'Text sizes')
      .attr('data-text-class', 'text-lg bold')
    const sizes = {
      'text-xs': 3,
      'text-sm': 5,
      text: 8,
      'text-lg': 10,
      'text-xl': 14,
      'text-2xl': 22,
      'text-3xl': 28,
      'text-4xl': 42,
    }
    for (const [size, shift] of Object.entries(sizes)) {
      y += shift
      points['t' + size] = new Point(0, y)
        .attr('data-text', size)
        .attr('data-text-class', `text ${size}`)
    }
    // Text alignment
    y += 15
    points.textalign = new Point(0, y)
      .attr('data-text', 'Text alignment')
      .attr('data-text-class', 'text-lg bold')
    y += 10
    points.tl = new Point(0, y)
    points.tr = new Point(w, y)
    paths.text = new Path().move(points.tl).line(points.tr).attr('data-text', 'text')

    // Align center
    points.tlc = new Point(0, y)
    points.trc = new Point(w, y)
    paths.textc = new Path()
      .move(points.tlc)
      .line(points.trc)
      .attr('data-text', 'text.center')
      .attr('data-text-class', 'center')
    // Align right
    points.tlr = new Point(0, y)
    points.trr = new Point(w, y)
    paths.textr = new Path()
      .move(points.tlr)
      .line(points.trr)
      .attr('data-text', 'text.right')
      .attr('data-text-class', 'right')

    // Text style
    y += 20
    points.textstyle = new Point(0, y)
      .attr('data-text', 'Text style')
      .attr('data-text-class', 'text-lg bold')
    y += 10
    points.titalic = new Point(0, y).attr('data-text', '.italic').attr('data-text-class', 'italic')
    y += 10
    points.tbold = new Point(0, y).attr('data-text', '.bold').attr('data-text-class', 'bold')

    store.set('y', y)
  }

  return part
}

function addWidths({ Point, Path, points, paths, store, options, part }, demo = false) {
  if (options.only === 'widths' || demo) {
    let y = store.get('y')
    const w = store.get('w')

    // Stroke widths
    y += 25
    if (!demo)
      paths.noClip = new Path()
        .move(new Point(0, y - 5))
        .line(new Point(10, y - 5))
        .attr('class', 'hidden')
    points.widths = new Point(0, y)
      .attr('data-text', 'Stroke widths')
      .attr('data-text-class', 'text-lg bold')
    for (const width of store.get('widths')) {
      y += 12
      points[`l-${width}`] = new Point(0, y)
      points[`r-${width}`] = new Point(w, y)
      paths[`color${width}`] = new Path()
        .move(points[`l-${width}`])
        .line(points[`r-${width}`])
        .attr('class', `fabric ${width}`)
        .attr('data-text', width === 'default-width' ? '' : `.${width}`)
    }

    // Update y
    store.set('y', y)
  }

  return part
}

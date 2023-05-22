const titleMacro = function (so, { points, scale, locale, store, part }) {
  const prefix = so.prefix || ''
  let overwrite = !so.append

  // Passing `false` will remove the title
  if (so === false || overwrite) {
    for (const id of [
      `_${prefix}_titleNr`,
      `_${prefix}_titleName`,
      `_${prefix}_titlePattern`,
      `_${prefix}_titleFor`,
      `_${prefix}_exportDate`,
    ])
      delete points[id]

    if (so === false) return true
  }

  const transform = function (anchor) {
    const cx = anchor.x - so.scale * anchor.x
    const cy = anchor.y - so.scale * anchor.y

    return `matrix(${so.scale}, 0, 0, ${so.scale}, ${cx}, ${cy}) rotate(${so.rotation} ${anchor.x} ${anchor.y})`
  }
  let shift = 8
  const nextPoint = (text, textClass, shiftAmt = shift) => {
    const newPoint = so.at.shift(-90 - so.rotation, shiftAmt * so.scale).addText(text, textClass)
    newPoint.attr('data-text-transform', transform(newPoint))
    return newPoint
  }
  const defaults = {
    scale: 1,
    rotation: 0,
    cutlist: true,
    align: 'left',
  }

  so = { ...defaults, ...so }
  so.scale = so.scale * scale

  const validAlignments = ['left', 'right', 'center']
  const alignment = validAlignments.includes(so.align) ? ' ' + so.align : ' left'

  points[`_${prefix}_titleNr`] = so.at
    .clone()
    .attr('data-text', so.nr, overwrite)
    .attr('data-text-class', 'text-4xl fill-note font-bold' + alignment)
    .attr('data-text-transform', transform(so.at))

  if (so.title) {
    points[`_${prefix}_titleName`] = nextPoint(
      so.title,
      'text-lg fill-current font-bold' + alignment
    )
    shift += 8
  }

  // Cut List instructions
  const partCutlist = store.get(['cutlist', part.name], null)
  // if there's a cutlist and it should be included
  if (so.cutlist && partCutlist?.materials) {
    // get the default cutonfold
    const cutonfold = partCutlist.cutOnFold
    // each material
    for (const material in partCutlist.materials) {
      // each set of instructions
      partCutlist.materials[material].forEach(({ cut, identical, bias, ignoreOnFold }, c) => {
        // make a new point for this set of instructions
        const cutPoint = nextPoint('plugin:cut', 'text-md fill-current' + alignment).addText(cut)

        // if they're not identical, add that to the point's text
        if (!identical && cut > 1) cutPoint.addText('plugin:mirrored')

        // if they should be cut on the fold add that, with bias or without
        if (cutonfold && !ignoreOnFold)
          cutPoint.addText(bias ? 'plugin:onFoldAndBias' : 'plugin:onFoldLower')
        // otherwise if they should be on the bias, say so
        else if (bias) cutPoint.addText('plugin:onBias')

        // add 'from' the material
        cutPoint.addText('plugin:from').addText('plugin:' + material)

        // save and shift
        points[`_${prefix}_titleCut_${material}_${c}`] = cutPoint
        shift += 8
      })
    }
  }

  let name = store.data?.name || 'No Name'
  name = name.replace('@freesewing/', '')
  name += ' v' + (store.data?.version || 'No Version')
  points[`_${prefix}_titlePattern`] = nextPoint(name, 'fill-note' + alignment)

  if (store.data.for) {
    shift += 8
    points[`_${prefix}_titleFor`] = nextPoint(
      `( ${store.data.for} )`,
      'fill-current font-bold' + alignment
    )
  }
  shift += 6
  const now = new Date()
  let hours = now.getHours()
  let mins = now.getMinutes()
  if (hours < 10) hours = `0${hours}`
  if (mins < 10) mins = `0${mins}`
  const exportDate = now.toLocaleDateString(locale || 'en', {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
  points[`_${prefix}_exportDate`] = nextPoint(
    `${exportDate}@ ${hours}:${mins}`,
    'text-sm' + alignment
  )
}

// Export macros
export const titleMacros = { title: titleMacro }

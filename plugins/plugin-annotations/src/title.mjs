const style = `
text.title-nr {
  font-size: 24pt;
  font-weight: 700;
  text-anchor: middle;
  dominant-baseline: reset-size;
}
text.title-name {
      font-size: 7pt;
      font-weight: 500;
      text-anchor: middle;
      dominant-baseline: reset-size;
}
text.title-pattern {
      font-size: 4pt;
      font-weight: 500;
      dominant-baseline: reset-size;
      text-anchor: middle;
      font-style: italic;
}
`

const titleMacro = function (so, { points, scale, locale, store }) {
  const prefix = so.prefix || ''

  // Passing `false` will remove the title
  if (so === false) {
    for (const id of [
      `_${prefix}_titleNr`,
      `_${prefix}_titleName`,
      `_${prefix}_titlePattern`,
      `_${prefix}_titleFor`,
      `_${prefix}_exportDate`,
    ])
      delete points[id]
    return true
  }

  const transform = function (anchor) {
    const cx = anchor.x - so.scale * anchor.x
    const cy = anchor.y - so.scale * anchor.y

    return `matrix(${so.scale}, 0, 0, ${so.scale}, ${cx}, ${cy}) rotate(${so.rotation} ${anchor.x} ${anchor.y})`
  }
  const defaults = {
    scale: 1,
    rotation: 0,
  }

  so = { ...defaults, ...so }
  so.scale = so.scale * scale
  let overwrite = true
  if (so.append) overwrite = false
  points[`_${prefix}_titleNr`] = so.at
    .clone()
    .attr('data-text', so.nr, overwrite)
    .attr('data-text-class', 'text-4xl fill-note font-bold')
    .attr('data-text-transform', transform(so.at))
  let shift = 8
  if (so.title) {
    points[`_${prefix}_titleName`] = so.at
      .shift(-90 - so.rotation, shift * so.scale)
      .attr('data-text', so.title)
      .attr('data-text-class', 'text-lg fill-current font-bold')
      .attr('data-text-transform', transform(so.at.shift(-90 - so.rotation, 13 * so.scale)))
    shift += 8
  }
  let name = store.data?.name || 'No Name'
  name = name.replace('@freesewing/', '')
  points[`_${prefix}_titlePattern`] = so.at
    .shift(-90 - so.rotation, shift * so.scale)
    .attr('data-text', name)
    .attr('data-text', 'v' + (store.data?.version || 'No Version'))
    .attr('data-text-class', 'fill-note')
    .attr('data-text-transform', transform(so.at.shift(-90 - so.rotation, shift * so.scale)))
  if (store.data.for) {
    shift += 8
    points[`_${prefix}_titleFor`] = so.at
      .shift(-90 - so.rotation, shift * so.scale)
      .attr('data-text', '( ' + store.data.for + ' )')
      .attr('data-text-class', 'fill-current font-bold')
      .attr('data-text-transform', transform(so.at.shift(-90 - so.rotation, shift * so.scale)))
  }
  shift += 6
  const now = new Date()
  let hours = now.getHours()
  let mins = now.getMinutes()
  if (hours < 10) hours = `0${hours}`
  if (mins < 10) mins = `0${mins}`
  points[`_${prefix}_exportDate`] = so.at
    .shift(-90 - so.rotation, shift * so.scale)
    .attr(
      'data-text',
      now.toLocaleDateString(locale || 'en', {
        weekday: 'long',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    )
    .attr('data-text', `@ ${hours}:${mins}`)
    .attr('data-text-class', 'text-sm')
    .attr('data-text-transform', transform(so.at.shift(-90 - so.rotation, shift * so.scale)))
}

// Export macros
export const titleMacros = { title: titleMacro }

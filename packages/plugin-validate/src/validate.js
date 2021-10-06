const validate = {}

validate.point = function (point, partId, pointId, debug) {
  if (typeof point !== 'object') {
    debug({
      type: 'error',
      label: 'Problem with point',
      msg: points,
    })
    throw new Error(`Point pattern.parts.${partId}.points.${pointId} is not an object`)
  } else if (typeof point.x !== 'number' || isNaN(point.x)) {
    debug({
      type: 'error',
      label: 'Problem with point X-value',
      msg: points,
    })
    throw new Error(`X-value of point pattern.parts.${partId}.points.${pointId} is not a number`)
  } else if (typeof point.y !== 'number' || isNaN(point.y)) {
    debug({
      type: 'error',
      label: 'Problem with point Y-value',
      msg: points,
    })
    debug(dbg, 'Problem with point Y-value:', point)
    throw new Error(`Y-value of point pattern.parts.${partId}.points.${pointId} is not a number`)
  } else if (
    typeof point.attributes !== 'object' ||
    !(point.attributes.clone instanceof Function)
  ) {
    debug({
      type: 'error',
      label: 'Problem with point attributes',
      msg: points,
    })
    throw new Error(
      `attributes property of point pattern.parts.${partId}.points.${pointId} is not an object`
    )
  } else if (!(point.clone instanceof Function)) {
    debug({
      type: 'error',
      label: 'Problem with point',
      msg: points,
    })
    throw new Error(`Point pattern.parts.${partId}.points.${pointId} is not a valid Point object`)
  }

  return true
}

validate.text = function (type, item, partId, itemId, debug) {
  let text = item.attributes.getAsArray('data-text')
  if (text === false) return true
  else {
    if (item.attributes.get('data-validate-skip-text') !== false) {
      debug({
        type: 'warning',
        label: '🌐 Possible translation issue',
        msg: `This text might be a translation problem:, ${item} However, the error was suppresed, so moving on.`,
      })
      return true
    }
    for (let t of text) {
      if (typeof t !== 'string' && typeof t !== 'number') {
        debug({
          type: 'error',
          label: 'This text is not a string or number',
          msg: t,
        })
        throw new Error(
          `${type} pattern.parts.${partId}.${type}s.${itemId} has text that is not a string nor a number. Set the 'data-validate-skip-text' attribute to true to suppress this error.`
        )
      } else if (typeof t === 'string' && t.indexOf(' ') !== -1) {
        debug({
          type: 'warning',
          label: '🌐 Possible translation issue',
          msg: t,
        })
        debug({
          type: 'info',
          label: '💡 Tip',
          msg: `${type} pattern.parts.${partId}.${type}s.${itemId} has text containing spaces. Please insert translation identifiers, and not actual text. Set the 'data-validate-skip-text' attribute to true to suppress this warning.`,
        })
      }
    }
  }
  return true
}

validate.path = function (path, partId, pathId, debug) {
  if (typeof path !== 'object') {
    debug({
      type: 'error',
      label: 'Problem with path',
      msg: path,
    })
    throw new Error(`Path pattern.parts.${partId}.paths.${pathId} is not an object`)
  } else if (typeof path.ops !== 'object') {
    debug({
      type: 'error',
      label: 'Problem with path ops',
      msg: path,
    })
    throw new Error(`ops property of path pattern.parts.${partId}.paths.${pathId} is not an object`)
  } else if (path.ops.length < 2) {
    debug({
      type: 'error',
      label: 'Problem with path ops',
      msg: path,
    })
    throw new Error(`Path pattern.parts.${partId}.paths.${pathId} does not do anything`)
  } else if (typeof path.attributes !== 'object') {
    debug({
      type: 'error',
      label: 'Problem with path attributes',
      msg: path,
    })
    throw new Error(
      `attributes property of path pattern.parts.${partId}.paths.${pathId} is not an object`
    )
  } else if (!(path.clone instanceof Function)) {
    debug({
      type: 'error',
      label: 'Problem with path',
      msg: path,
    })
    throw new Error(`Path pattern.parts.${partId}.paths.${pathId} is not a valid Path object`)
  } else if (!(path.attributes.clone instanceof Function)) {
    debug({
      type: 'error',
      label: 'Problem with path attributes',
      msg: path,
    })
    throw new Error(
      `attributes property of path pattern.parts.${partId}.paths.${pathId} is not a valid Attributes object`
    )
  }
  for (let o in path.ops) {
    let op = path.ops[o]
    if (op.type !== 'close') {
      if (!validate.point(op.to, partId, '_unknown_', debug)) {
        debug({
          type: 'error',
          label: 'Problem with path TO point',
          msg: op.to,
        })
        throw new Error(
          `Point in pattern.parts.${partId}.paths.${pathId}.ops[o].to is not a valid Point object`
        )
      }
    } else if (op.type === 'curve') {
      if (!validate.point(op.cp1, partId, '_unknown_', debug)) {
        debug({
          type: 'error',
          label: 'Problem with path CP1 point',
          msg: op.cp1,
        })
        throw new Error(
          `Point in pattern.parts.${partId}.paths.${pathId}.ops[o].cp1 is not a valid Point object`
        )
      } else if (!validate.point(op.cp2, partId, '_unknown_', debug)) {
        debug({
          type: 'error',
          label: 'Problem with path CP2 point',
          msg: op.cp2,
        })
        throw new Error(
          `Point in pattern.parts.${partId}.paths.${pathId}.ops[o].cp2 is not a valid Point object`
        )
      }
    }
  }

  return true
}

validate.snippet = function (snippet, partId, snippetId, debug) {
  if (typeof snippet !== 'object') return false
  if (!validate.point(snippet.anchor, partId, '_unknown_', debug)) return false
  if (typeof snippet.attributes !== 'object') return false
  if (!(snippet.clone instanceof Function)) return false
  if (!(snippet.attributes.clone instanceof Function)) return false

  return true
}

export default validate

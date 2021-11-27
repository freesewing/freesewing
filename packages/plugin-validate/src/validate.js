const validate = {}

validate.point = function (point, partId, pointId, raise) {
  if (typeof point !== 'object') {
    raise.error(`Point pattern.parts.${partId}.points.${pointId} is not an object`)
    throw new Error(`Point pattern.parts.${partId}.points.${pointId} is not an object`)
  } else if (typeof point.x !== 'number' || isNaN(point.x)) {
    raise.error(`Problem with point X-value for ${pointId} on part ${partId}`)
    throw new Error(`X-value of point pattern.parts.${partId}.points.${pointId} is not a number`)
  } else if (typeof point.y !== 'number' || isNaN(point.y)) {
    raise.error(`Problem with point Y-value for ${pointId} on part ${partId}`)
    throw new Error(`Y-value of point pattern.parts.${partId}.points.${pointId} is not a number`)
  } else if (
    typeof point.attributes !== 'object' ||
    !(point.attributes.clone instanceof Function)
  ) {
    raise.error('Problem with point attributes')
    throw new Error(
      `attributes property of point pattern.parts.${partId}.points.${pointId} is not an object`
    )
  } else if (!(point.clone instanceof Function)) {
    raise.error('Problem with point')
    throw new Error(`Point pattern.parts.${partId}.points.${pointId} is not a valid Point object`)
  }

  return true
}

validate.text = function (type, item, partId, itemId, raise) {
  let text = item.attributes.getAsArray('data-text')
  if (text === false) return true
  else {
    if (item.attributes.get('data-validate-skip-text') !== false) {
      raise.info(
        `🌐 Possible translation issue: This text might be a translation problem:, ${item} However, the error was suppresed, so moving on.`
      )
      return true
    }
    for (let t of text) {
      if (typeof t !== 'string' && typeof t !== 'number') {
        raise.error(`This text is not a string or number: ${t}`)
        throw new Error(
          `${type} pattern.parts.${partId}.${type}s.${itemId} has text that is not a string nor a number. Set the 'data-validate-skip-text' attribute to true to suppress this error.`
        )
      } else if (typeof t === 'string' && t.indexOf(' ') !== -1) {
        raise.warning(`🌐 Possible translation issue with: ${t}`)
        raise.info(
          `${type} pattern.parts.${partId}.${type}s.${itemId} has text containing spaces. Please insert translation identifiers, and not actual text. Set the 'data-validate-skip-text' attribute to true to suppress this warning.`
        )
        //This would fix the unit test but might have a lot of downstream impacts
        //throw new Error(
        //  `${type} pattern.parts.${partId}.${type}s.${itemId} has text containing spaces`
        //)
      }
    }
  }
  return true
}

validate.path = function (path, partId, pathId, raise) {
  if (typeof path !== 'object') {
    raise.error(`Problem with path ${path}`)
    throw new Error(`Path pattern.parts.${partId}.paths.${pathId} is not an object`)
  } else if (typeof path.ops !== 'object') {
    raise.error(`Problem with path ops on ${path}`)
    throw new Error(`ops property of path pattern.parts.${partId}.paths.${pathId} is not an object`)
  } else if (path.ops.length < 2) {
    raise.error(`Problem with path ops on ${path}`)
    throw new Error(`Path pattern.parts.${partId}.paths.${pathId} does not do anything`)
  } else if (typeof path.attributes !== 'object') {
    raise.error(`Problem with path attributes on ${path}`)
    throw new Error(
      `attributes property of path pattern.parts.${partId}.paths.${pathId} is not an object`
    )
  } else if (!(path.clone instanceof Function)) {
    raise.error(`Problem with path ${path}: not a valid Path object`)
    throw new Error(`Path pattern.parts.${partId}.paths.${pathId} is not a valid Path object`)
  } else if (!(path.attributes.clone instanceof Function)) {
    raise.error(`Problem with path attributes on ${path}`)
    throw new Error(
      `attributes property of path pattern.parts.${partId}.paths.${pathId} is not a valid Attributes object`
    )
  }
  for (let o in path.ops) {
    let op = path.ops[o]
    if (op.type !== 'close') {
      if (!validate.point(op.to, partId, '_unknown_', raise)) {
        raise.error(`Problem with path TO point ${op.to}`)
        throw new Error(
          `Point in pattern.parts.${partId}.paths.${pathId}.ops[o].to is not a valid Point object`
        )
      }
    } else if (op.type === 'curve') {
      if (!validate.point(op.cp1, partId, '_unknown_', raise)) {
        raise.error(`Problem with path CP1 point ${op.cp1}`)
        throw new Error(
          `Point in pattern.parts.${partId}.paths.${pathId}.ops[o].cp1 is not a valid Point object`
        )
      } else if (!validate.point(op.cp2, partId, '_unknown_', raise)) {
        raise.error(`Problem with path CP2 point ${op.cp2}`)
        throw new Error(
          `Point in pattern.parts.${partId}.paths.${pathId}.ops[o].cp2 is not a valid Point object`
        )
      }
    }
  }

  return true
}

validate.snippet = function (snippet, partId, snippetId, raise) {
  if (typeof snippet !== 'object') return false
  if (!validate.point(snippet.anchor, partId, '_unknown_', raise)) return false
  if (typeof snippet.attributes !== 'object') return false
  if (!(snippet.clone instanceof Function)) return false
  if (!(snippet.attributes.clone instanceof Function)) return false

  return true
}

export default validate

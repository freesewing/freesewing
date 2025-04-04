import React from 'react'

export const getProps = (obj) => {
  /** I can't believe it but there seems to be no method on NPM todo this */
  const cssKey = (key) => {
    let chunks = key.split('-')
    if (chunks.length > 1) {
      key = chunks.shift()
      for (let s of chunks) key += s.charAt(0).toUpperCase() + s.slice(1)
    }

    return key
  }

  const convert = (css) => {
    let style = {}
    let rules = css.split(';')
    for (let rule of rules) {
      let chunks = rule.split(':')
      if (chunks.length === 2) style[cssKey(chunks[0].trim())] = chunks[1].trim()
    }
    return style
  }

  let rename = {
    class: 'className',
    'marker-start': 'markerStart',
    'marker-end': 'markerEnd',
  }
  let props = {}
  for (let key in obj.attributes.list) {
    if (key === 'style') props[key] = convert(obj.attributes.list[key].join(' '))
    if (Object.keys(rename).indexOf(key) !== -1)
      props[rename[key]] = obj.attributes.list[key].join(' ')
    else if (key !== 'style') props[key] = obj.attributes.list[key].join(' ')
  }

  return props
}

export const withinPartBounds = (point, part) =>
  point.x >= part.topLeft.x &&
  point.x <= part.bottomRight.x &&
  point.y >= part.topLeft.y &&
  point.y <= part.bottomRight.y
    ? true
    : false

export const getId = ({
  settings = {},
  stackName = false,
  partName = false,
  pathName = false,
  pointName = false,
  snippetName = false,
  name = false,
}) => {
  let id = settings.idPrefix || ''
  if (stackName) id += `${stackName}-`
  if (partName) id += `${partName}-`
  if (pathName) id += `${pathName}-`
  if (pointName) id += `${pointName}-`
  if (snippetName) id += `${snippetName}-`
  if (name) id += name

  return id
}

export const translateStrings = (list, translations = {}) => {
  let translated = ''
  if (!list) return translated
  for (const string of list) {
    if (Array.isArray(string)) translated += translateStrings(string, translations)
    else if (string) {
      if (translations[string]) {
        translated += `${translations[string]}`.replace(/&quot;/g, '"') + ' '
      } else translated += `${string}`
    }
  }

  return translated
}

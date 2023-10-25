//  __SDEFILE__ - This file is a dependency for the stand-alone environment
// eslint-disable-next-line no-unused-vars
import React from 'react'
import { getProps } from './utils.mjs'

export const Snippet = ({ snippet, settings }) => {
  if (!snippet?.anchor || !snippet.def) return null
  if (!settings[0].complete && !snippet.attributes.list?.['data-force']?.[0]) return null
  const snippetProps = {
    xlinkHref: '#' + snippet.def,
    x: snippet.anchor.x,
    y: snippet.anchor.y,
  }
  const scale = snippet.attributes.list['data-scale']?.[0] || false
  const rotate = snippet.attributes.list['data-rotate']?.[0] || false
  if (scale || rotate) {
    snippetProps.transform = ''
    if (scale) {
      snippetProps.transform += `translate(${snippetProps.x}, ${snippetProps.y}) `
      snippetProps.transform += `scale(${scale}) `
      snippetProps.transform += `translate(${snippetProps.x * -1}, ${snippetProps.y * -1}) `
    }
    if (rotate) {
      snippetProps.transform += `rotate(${rotate}, ${snippetProps.x}, ${snippetProps.y}) `
    }
  }

  return <use {...snippetProps} {...getProps(snippet)} color="currentColor" />
}

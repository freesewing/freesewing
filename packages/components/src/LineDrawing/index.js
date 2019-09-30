import React from 'react'
import PropTypes from 'prop-types'
import patterns from './patterns'

const LineDrawing = props => {
  const attr = {
    style: props.style,
    className: 'fs linedrawing ' + props.className,
    xmlns: 'http://www.w3.org/2000/svg',
    viewBox: '0 0 270 270'
  }
  if (props.size) {
    attr.width = props.size
    attr.height = props.size
  }
  return <svg {...attr}>{patterns[props.pattern].map(el => el)}</svg>
}

LineDrawing.propTypes = {
  size: PropTypes.number,
  pattern: PropTypes.string,
  style: PropTypes.object
}

LineDrawing.defaultProps = {
  size: false,
  className: '',
  pattern: 'aaron',
  style: {}
}

export default LineDrawing

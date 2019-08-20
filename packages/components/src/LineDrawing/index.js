import React from 'react'
import PropTypes from 'prop-types'
import patterns from './patterns'

const LineDrawing = props => {
  return (
    <svg
      style={props.style}
      className={'fs linedrawing ' + props.className}
      xmlns="http://www.w3.org/2000/svg"
      width={props.size}
      height={props.size}
      viewBox="0 0 270 270"
    >
      {patterns[props.pattern].map(el => el)}
    </svg>
  )
}

LineDrawing.propTypes = {
  size: PropTypes.number,
  viewBox: PropTypes.string,
  pattern: PropTypes.string,
  style: PropTypes.object
}

LineDrawing.defaultProps = {
  size: 64,
  className: '',
  pattern: 'aaron',
  color: false,
  style: {}
}

export default LineDrawing

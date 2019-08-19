import React from 'react'
import PropTypes from 'prop-types'
import patterns from './patterns'

const LineDrawing = props => {
  return (
    <svg
      style={props.style}
      className={props.className}
      xmlns="http://www.w3.org/2000/svg"
      width={props.size}
      height={props.size}
      viewBox={props.viewBox}
    >
      <path
        stroke="none"
        fill={props.color ? props.color : 'currentColor'}
        d={patterns[props.pattern]}
      />
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
  size: 24,
  viewBox: '0 0 24 24',
  className: '',
  pattern: 'github',
  color: false,
  style: {}
}

export default LineDrawing

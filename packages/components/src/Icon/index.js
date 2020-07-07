import React from 'react'
import icons from './icons'

const Icon = ({
  size = 24,
  viewBox = '0 0 24 24',
  className = '',
  icon = 'github',
  color = false,
  style = {}
}) => (
  <svg
    style={style}
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox={viewBox}
  >
    <path stroke="none" fill={color ? color : 'currentColor'} d={icons[icon]} />
  </svg>
)

export default Icon

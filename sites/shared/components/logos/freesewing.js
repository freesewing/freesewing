import React from 'react'
import { path } from '../icons/freesewing.js'
import colors from 'tailwindcss/colors'

const strokes = {
  light: colors.neutral[300],
  dark: colors.neutral[800],
  hax0r: colors.lime[700],
  lgbtq: colors.neutral[500],
  trans: colors.neutral[500],
}
let step = 0

const Logo = ({ className='w-20 h-20', theme='light', stroke=false }) => {
  const svgProps = {
    xmlns: 'http://www.w3.org/2000/svg',
    viewBox: '1 0 25 25',
    className: className
  }
  return (
    <svg {...svgProps}>
      <defs>
        <path id="react-logo" d={path} />
      </defs>
      <use xlinkHref="#react-logo" fill="none" stroke={stroke || strokes[theme]} strokeWidth="0.5"/>
      <use xlinkHref="#react-logo" fill="currentColor" stroke="none"/>
    </svg>
  )
}

export default Logo

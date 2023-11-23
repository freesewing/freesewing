//  __SDEFILE__ - This file is a dependency for the stand-alone environment
import React from 'react'
import colors from 'tailwindcss/colors'
import { logoPath } from 'config/logo.mjs'

const strokes = {
  light: colors.neutral[300],
  dark: colors.neutral[800],
  hax0r: colors.lime[700],
  lgbtq: colors.neutral[500],
  trans: colors.neutral[500],
}

export const FreeSewingLogo = ({ className = 'w-20 h-20', theme = 'light', stroke = false }) => {
  const svgProps = {
    xmlns: 'http://www.w3.org/2000/svg',
    viewBox: '1 0 25 25',
    className: className,
  }
  return (
    <svg {...svgProps}>
      <defs>
        <path id="react-logo" d={logoPath} />
      </defs>
      <use
        xlinkHref="#react-logo"
        fill="none"
        stroke={stroke || strokes[theme]}
        strokeWidth="0.5"
      />
      <use xlinkHref="#react-logo" fill="currentColor" stroke="none" />
    </svg>
  )
}

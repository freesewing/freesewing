import React from 'react'
import { logoPath } from '@freesewing/config'

/*
 * The FreeSewing logo, aka Skully, as a React component
 *
 * @params {object} props - All React props
 * @params {string} className - Custom CSS classes to apply
 * @params {string} theme - The theme, light or dark. Although by default this component will auto-adapt by using currentColor
 * @params {number} stroke - Set this to also stroke the logo
 */
export const FreeSewingLogo = ({ className = 'w-20 h-20', theme = 'light', stroke = false }) => {
  const svgProps = {}
  const strokes = { light: '#000', darf: '#fff' }

  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="1 0 25 25" className={className}>
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

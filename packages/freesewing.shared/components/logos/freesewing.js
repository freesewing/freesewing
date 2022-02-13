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

const fills = {
  light: (
    <linearGradient id="light" x1="0%" y1="0%" x2="50%" y2="100%">
      <stop offset={`10%`} stopColor={colors.yellow[500]} stopOpacity="1.0" />
      <stop offset={`40%`} stopColor={colors.pink[500]} stopOpacity="1.0" />
      <stop offset={`75%`} stopColor={colors.violet[500]} stopOpacity="1.0" />
      <stop offset={`90%`} stopColor={colors.yellow[500]} stopOpacity="1.0" />
    </linearGradient>
  ),
  dark: (
    <linearGradient id="dark" x1="50%" y1="0%" x2="0%" y2="100%">
      <stop offset={`0%`} stopColor={colors.sky[500]} stopOpacity="1.0" />
      <stop offset={`20%`} stopColor={colors.violet[500]} stopOpacity="1.0" />
      <stop offset={`55%`} stopColor={colors.yellow[500]} stopOpacity="1.0" />
      <stop offset={`85%`} stopColor={colors.pink[500]} stopOpacity="1.0" />
    </linearGradient>
  ),
  hax0r: (
    <linearGradient id="hax0r" x1="0%" y1="0%" x2="50%" y2="100%">
      {[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20].map( i => (
        <React.Fragment key={i}>
          <stop key={i} offset={`${i*5}%`} stopColor={colors.lime[900]} stopOpacity="1.0" />
          <stop key={i} offset={`${i*5+1}%`} stopColor={colors.lime[800]} stopOpacity="1.0" />
          <stop key={i} offset={`${i*5+2}%`} stopColor={colors.lime[900]} stopOpacity="1.0" />
        </React.Fragment>
      ))}
    </linearGradient>
  ),
  lgbtq: (
    <linearGradient id="lgbtq" x1="0%" y1="0%" x2="0%" y2="100%">
      {['red', 'orange', 'yellow', 'green', 'blue', 'violet'].map(c => {
        let next = step + 100/6
        const stop = <React.Fragment key={c}>
          <stop offset={`${step}%`} stopColor={colors[c][500]} stopOpacity="1.0" />
          <stop offset={`${next}%`} stopColor={colors[c][500]} stopOpacity="1.0" />
        </React.Fragment>
        step = next
        return stop
      })}
    </linearGradient>
  ),
  trans: (
    <linearGradient id="trans" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stopColor="#77cbf9" stopOpacity="1.0" />
      <stop offset="20%" stopColor="#77cbf9" stopOpacity="1.0" />
      <stop offset="20%" stopColor="#ecadb9" stopOpacity="1.0" />
      <stop offset="40%" stopColor="#ecadb9" stopOpacity="1.0" />
      <stop offset="40%" stopColor="#ffffff" stopOpacity="1.0" />
      <stop offset="60%" stopColor="#ffffff" stopOpacity="1.0" />
      <stop offset="60%" stopColor="#ecadb9" stopOpacity="1.0" />
      <stop offset="80%" stopColor="#ecadb9" stopOpacity="1.0" />
      <stop offset="80%" stopColor="#77cbf9" stopOpacity="1.0" />
      <stop offset="100%" stopColor="#77cbf9" stopOpacity="1.0" />
    </linearGradient>
  ),
}

const Logo = ({ size=false, className='stroke-0', theme='light', fill=false, stroke=false }) => {
  const svgProps = {
    xmlns: 'http://www.w3.org/2000/svg',
    viewBox: '-1 0 25 25',
    className: className
  }
  if (size) {
    svgProps.width = size
    svgProps.height = size
  }
  return (
    <svg {...svgProps}>
      <defs>
        {fill && fills[theme]}
        <path id="react-logo" d={path} />
      </defs>
      <use xlinkHref="#react-logo" fill="none" stroke={stroke || strokes[theme]} strokeWidth="0.5"/>
      <use xlinkHref="#react-logo" fill={fill || `url(#${theme})`} stroke="none"/>
    </svg>
  )
}

export default Logo

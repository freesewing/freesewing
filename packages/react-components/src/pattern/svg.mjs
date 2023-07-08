// eslint-disable-next-line no-unused-vars
import React from 'react'
import { forwardRef } from 'react'

export const Svg = forwardRef(
  (
    {
      embed = true,
      locale = 'en',
      className = 'freesewing pattern',
      style = {},
      viewBox = false,
      width,
      height,
      children,
    },
    ref
  ) => {
    if (width < 1) width = 1000
    if (height < 1) height = 1000
    let attributes = {
      xmlns: 'http://www.w3.org/2000/svg',
      'xmlns:svg': 'http://www.w3.org/2000/svg',
      xmlnsXlink: 'http://www.w3.org/1999/xlink',
      xmlLang: locale,
      viewBox: viewBox || `0 0 ${width} ${height}`,
      className,
      style,
    }

    if (!embed) {
      attributes.width = width + 'mm'
      attributes.height = height + 'mm'
    }

    return (
      <svg {...attributes} ref={ref}>
        {children}
      </svg>
    )
  }
)

Svg.displayName = 'Svg'
